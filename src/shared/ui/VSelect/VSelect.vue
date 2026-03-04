<script setup lang="ts" generic="T extends string | number">
import { computed, onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue';
import { VChip } from '../VChip';
import { VIcon } from '../VIcon';
import $s from './VSelect.module.scss';
import { VLoader } from '@/shared/ui/VLoader';
import { VirtualScroll, type VirtualScrollExpose } from '@/shared/ui/VirtualScroll';

export type SelectOption<T = string> = {
  value: T;
  label: string;
  image?: string;
  notice?: string;
  disabled?: boolean;
};

const props = withDefaults(
  defineProps<{
    label: string;
    options: SelectOption<T>[];
    modelValue: T | T[] | null;
    name?: string;
    multiple?: boolean;
    resettable?: boolean;
    disabled?: boolean;
    loading?: boolean;
    placeholder?: string;
  }>(),
  {
    name: 'select',
    multiple: false,
    disabled: false,
    placeholder: 'Select...',
  },
);

const emits = defineEmits<{
  'update:modelValue': [value: T | T[] | null];
  change: [value: T | T[] | null];
  reset: [];
  open: [];
  close: [];
}>();

defineSlots<{
  chip(props: {
    option: SelectOption<T>;
    removeFn: (o: SelectOption<T>) => void;
    removable: boolean;
  }): HTMLElement;
  option(props: { option: SelectOption<T>; selected: boolean }): HTMLElement;
  loader(): HTMLElement;
  noResultText(): HTMLElement;
}>();

const rootEl = ref<HTMLElement | null>(null);
const triggerEl = ref<HTMLElement | null>(null);
const virtualList = ref<VirtualScrollExpose | null>(null);

const isOpen = ref<boolean>(false);
const focusedIndex = ref<number>(-1);
const searchQuery = ref<string>('');

let resetTimer: ReturnType<typeof setTimeout> | null = null;

const valueArray = computed<T[]>(() => {
  if (props.modelValue === null || props.modelValue === undefined) return [];
  return Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
});

const valueSet = computed(() => new Set(valueArray.value));

const selectedOptions = computed(() =>
  props.options.filter((o) => valueSet.value.has(o.value))
);

const chevronClasses = computed(
  () => `${$s['select__chevron']} ${isOpen.value ? $s['select__chevron--active'] : ''}`,
);

const filteredOptions = computed(() => {
  if (!searchQuery.value) {
    return props.options;
  }

  const q = searchQuery.value.toLowerCase();
  return [...props.options].sort((a, b) => {
    const al = a.label.toLowerCase();
    const bl = b.label.toLowerCase();
    const aStarts = al.startsWith(q);
    const bStarts = bl.startsWith(q);

    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return al.localeCompare(bl);
  });
});

watch(filteredOptions, () => {
  focusedIndex.value = -1;
});

function scrollToFocused() {
  if (virtualList.value && focusedIndex.value > -1) {
    virtualList.value.scrollToIndex(focusedIndex.value);
  }
}

function open() {
  if (isOpen.value || props.disabled) return;
  isOpen.value = true;
  emits('open');

  const selectedIndex = filteredOptions.value.findIndex((o) => valueSet.value.has(o.value));
  focusedIndex.value = selectedIndex !== -1 ? selectedIndex : 0;

  nextTick(() => {
    scrollToFocused();
  });
}

function close() {
  if (!isOpen.value) return;
  isOpen.value = false;
  focusedIndex.value = -1;
  emits('close');
  clearSearch();
}

function toggleOpen() {
  if (props.disabled) return;
  if (isOpen.value) close();
  else open();
}

function clearSearch() {
  searchQuery.value = '';
  if (resetTimer !== null) {
    clearTimeout(resetTimer);
    resetTimer = null;
  }
}

function focusNext() {
  if (!filteredOptions.value.length) return;
  const maxIndex = filteredOptions.value.length - 1;

  if (focusedIndex.value >= maxIndex) {
    focusedIndex.value = 0;
  } else {
    focusedIndex.value++;
  }
  scrollToFocused();
}

function focusPrev() {
  if (!filteredOptions.value.length) return;

  if (focusedIndex.value <= 0) {
    focusedIndex.value = filteredOptions.value.length - 1;
  } else {
    focusedIndex.value--;
  }
  scrollToFocused();
}

function toggleOption(option: SelectOption<T>) {
  if (option.disabled) return;

  if (props.multiple) {
    const arr = [...valueArray.value];
    const exists = valueSet.value.has(option.value);
    const next = exists ? arr.filter((v) => v !== option.value) : [...arr, option.value];
    emits('update:modelValue', next);
    emits('change', next);
    clearSearch();
  } else {
    emits('update:modelValue', option.value);
    emits('change', option.value);
    close();
  }
}

function selectFocused() {
  if (focusedIndex.value < 0 || focusedIndex.value >= filteredOptions.value.length) return;
  const opt = filteredOptions.value[focusedIndex.value];
  if (opt) toggleOption(opt);
}

function reset() {
  const emptyValue = props.multiple ? [] : null;
  emits('update:modelValue', emptyValue);
  emits('change', emptyValue);
  emits('reset');
  close();
  if (triggerEl.value) triggerEl.value.focus();
}

function onOptionMouseEnter(idx: number) {
  focusedIndex.value = idx;
}

function onOptionClick(option: SelectOption<T>, idx: number) {
  focusedIndex.value = idx;
  toggleOption(option);
}

function onWrapperKeydown(e: KeyboardEvent) {
  if (props.disabled) return;

  if (isOpen.value && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
    e.preventDefault();
    searchQuery.value += e.key;
    focusedIndex.value = 0;
    scrollToFocused();

    if (resetTimer !== null) clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      searchQuery.value = '';
      resetTimer = null;
    }, 2000);
    return;
  }

  if (e.key === 'Backspace') {
    if (searchQuery.value) {
      e.preventDefault();
      searchQuery.value = searchQuery.value.slice(0, -1);
      focusedIndex.value = 0;
    } else if (props.multiple && valueArray.value.length && !isOpen.value) {
        e.preventDefault();
        const arr = valueArray.value.slice(0, -1);
        emits('update:modelValue', arr);
        emits('change', arr);
    }
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (!isOpen.value) open();
    else focusNext();
    return;
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (!isOpen.value) open();
    else focusPrev();
    return;
  }

  if (e.key === 'Enter' || e.key === 'Space') {
    e.preventDefault();
    if (!isOpen.value) {
      open();
    } else {
      selectFocused();
    }
    return;
  }

  if (e.key === 'Escape') {
    e.preventDefault();
    close();
    return;
  }
}

function onDocumentClick(e: MouseEvent) {
  const target = e.target as Node | null;
  if (rootEl.value && target && !rootEl.value.contains(target)) {
    close();
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick);
  if (resetTimer !== null) clearTimeout(resetTimer);
});
</script>

<template>
  <div :class="$s['select']" ref="rootEl">
    <div
      :class="[
        $s['select__wrapper'],
        disabled ? $s['select__wrapper--disabled'] : '',
        isOpen ? $s['select__wrapper--active'] : ''
      ]"
      :tabindex="disabled ? -1 : 0"
      ref="triggerEl"
      @keydown="onWrapperKeydown"
      @click="toggleOpen"
      role="combobox"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-activedescendant="isOpen && focusedIndex > -1 ? `option-${focusedIndex}` : undefined"
      :aria-label="label">

      <VIcon name="chevron" :class-name="chevronClasses" />

      <button
        v-if="resettable && valueSet.size"
        type="button"
        tabindex="-1"
        :class="$s['select__reset']"
        @click.stop="reset"
        aria-label="Reset selection">
        <VIcon name="x" :class-name="$s['select__reset-icon']" />
      </button>

      <span :class="$s['select__label']">{{ label }}</span>

      <div :class="$s['select__chips']">
        <VirtualScroll
          v-if="selectedOptions.length"
          :items="selectedOptions"
          direction="horizontal"
          item-key="value">
          <template #default="{ item }">
            <slot
              name="chip"
              :option="item"
              :removeFn="toggleOption"
              :removable="multiple">
              <VChip :removable="multiple" :key="item.value" @removed="toggleOption(item)">
                {{ item.label }}
              </VChip>
            </slot>
          </template>
        </VirtualScroll>
      </div>
    </div>

    <!-- Dropdown -->
    <div
      :class="[
        $s['select__options'],
        loading ? $s['select__options--loading'] : '',
      ]"
      v-show="isOpen"
      role="listbox"
      :aria-hidden="!isOpen"
      tabindex="-1">

      <template v-if="loading">
        <slot name="loader">
          <VLoader :infinite="true"/>
        </slot>
      </template>

      <template v-else>
        <template v-if="filteredOptions.length">
          <VirtualScroll
            ref="virtualList"
            :items="filteredOptions"
            item-key="value"
            :class="$s['select__virtual-list']">
            <template #default="{ item: o, idx }">
              <button
                :id="`option-${idx}`"
                role="option"
                :class="[
                  $s['select__item'],
                  idx === focusedIndex ? $s['select__item--focused'] : '',
                  o.disabled ? $s['select__item--disabled'] : ''
                ]"
                :key="o.value"
                :aria-selected="valueSet.has(o.value)"
                :disabled="o.disabled"
                @mouseenter="onOptionMouseEnter(idx)"
                @click="onOptionClick(o, idx)">
                <slot name="option" :option="o" :selected="valueSet.has(o.value)">
                  <div :class="$s['select__item-content']">
                    <VIcon
                      v-if="multiple"
                      :name="valueSet.has(o.value) ? 'check' : 'square'"
                      :class-name="$s['select__item-icon']"/>
                    <img v-if="o.image" :src="o.image" :alt="o.label" :class="$s['select__item-image']" />
                    <span :class="$s['select__item-label']">
                      {{ o.label }}
                    </span>
                  </div>
                  <span v-if="o.notice" :class="$s['select__item-notice']">
                    {{ o.notice }}
                  </span>
                </slot>
              </button>
            </template>
          </VirtualScroll>
        </template>
        <template v-else>
          <div :class="$s['select__no-result']">
            <slot name="noResultText">No options found</slot>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>
