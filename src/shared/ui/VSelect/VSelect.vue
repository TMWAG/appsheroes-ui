<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
// import { VChip } from '../VChip';
import { VIcon } from '../VIcon';
import $s from './VSelect.module.scss';

export type SelectOption<T = string> = {
  value: T,
  label: string,
  image?: string,
  notice?: string,
};

const props = withDefaults(defineProps<{
  /** Defines input's label */
  label: string,
  /** Select's options */
  options: SelectOption[],
  /** Selected value[s] */
  modelValue: string | string[],
  /** Optionally defines input's name, if needed in form data constructor */
  name?: string,
  /** Defines multi select functionality */
  multiple?: boolean,
  /** Defines ability to reset all values */
  resettable?: boolean,
}>(), {
  name: 'select',
  multiple: false,
});

const emits = defineEmits<{
  'update:modelValue': [value: string | string[]],
  change: [value: string | string[]],
  reset: [],
}>();

defineSlots<{
  /** Use to customize chip's content */
  chip(props: {option: SelectOption, removeFn: (o: SelectOption)=> void, removable: boolean }): HTMLElement;
  /** Use to customize option list content */
  option(props: {option: SelectOption, selected: boolean}): HTMLElement;
}>();

const rootEl = ref<HTMLElement | null>(null);
const select = ref<HTMLElement | null>(null);

const isOpen = ref<boolean>(false);
const focusedIndex = ref<number | null>(null);

const searchQuery = ref<string>('');
const internalOptions = ref<SelectOption[]>([...props.options]);

let resetTimer: number | null = null;

const valueSet = computed(() => new Set(
  Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue],
));
const selectedOptions = computed(
  () => props.options.filter(o => valueSet.value.has(o.value))
);
const chevronClasses = computed(() =>
  `${$s['select__chevron']} ${isOpen.value ? $s['select__chevron--active'] : ''}`
);
watch(
  () => props.options,
  (opts) => {
    internalOptions.value = [...opts];
  },
  { deep: true },
);

function open() {
  if (isOpen.value) return;
  isOpen.value = true;
  const currentIndex = internalOptions.value.findIndex(o => valueSet.value.has(o.value));
  focusedIndex.value = currentIndex !== -1 ? currentIndex : (internalOptions.value.length ? 0 : null);
};
function close() {
  if (!isOpen.value) return;
  isOpen.value = false;
  focusedIndex.value = null;
  clearSearch();
};

function clearSearch() {
  searchQuery.value = '';
  if (resetTimer !== null) {
    clearTimeout(resetTimer);
    resetTimer = null;
  }
};

function focusNext() {
  if (!internalOptions.value.length) return;
  if (focusedIndex.value === null) {
    focusedIndex.value = 0;
  } else {
    focusedIndex.value = (focusedIndex.value + 1) % internalOptions.value.length;
  }
};

function focusPrev() {
  if (!internalOptions.value.length) return;
  if (focusedIndex.value === null) {
    focusedIndex.value = internalOptions.value.length - 1;
  } else {
    focusedIndex.value =
      (focusedIndex.value - 1 + internalOptions.value.length) % internalOptions.value.length;
  }
};

function toggleOption(option: SelectOption) {
  if (props.multiple) {
    const arr = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const exists = valueSet.value.has(option.value);
    const next = exists ? arr.filter(v => v !== option.value) : [...arr, option.value];
    emits('update:modelValue', next);
    emits('change', next);
  } else {
    emits('update:modelValue', option.value);
    emits('change', option.value);
    close();
  }
};
function selectFocused() {
  if (focusedIndex.value === null) return;
  const opt = internalOptions.value[focusedIndex.value];
  if (!opt) return;
  toggleOption(opt);
};

function reset() {
  if (select.value) select.value.focus();
  isOpen.value = true;
  emits('reset');
};
function onOptionMouseEnter(idx: number) {
  focusedIndex.value = idx;
};
function onOptionClick(option: SelectOption, idx: number) {
  focusedIndex.value = idx;
  toggleOption(option);
  if (!props.multiple) {
    clearSearch();
  }
};

function onWrapperKeydown(e: KeyboardEvent) {
  const key = e.key;

  if (key === 'ArrowDown') {
    e.preventDefault();
    if (!isOpen.value) open();
    else focusNext();
    return;
  }
  if (key === 'ArrowUp') {
    e.preventDefault();
    if (!isOpen.value) open();
    else focusPrev();
    return;
  }
  if (key === 'Enter' || key === ' ') {
    if (isOpen.value) {
      e.preventDefault();
      selectFocused();
    } else {
      e.preventDefault();
      open();
    }
    return;
  }
  if (key === 'Escape') {
    if (isOpen.value) {
      e.preventDefault();
      close();
    }
    return;
  }
  if (key.length !== 1 && key !== 'Backspace') return;
  if (key === 'Backspace') {
    searchQuery.value = searchQuery.value.slice(0, -1);
  } else {
    searchQuery.value += key;
  }

  const q = searchQuery.value.toLowerCase();
  internalOptions.value = [...internalOptions.value].sort((a, b) => {
    const al = a.label.toLowerCase();
    const bl = b.label.toLowerCase();
    const aStarts = al.startsWith(q);
    const bStarts = bl.startsWith(q);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return al.localeCompare(bl);
  });

  focusedIndex.value = 0;

  if (resetTimer !== null) {
    clearTimeout(resetTimer);
  }
  resetTimer = window.setTimeout(() => {
    searchQuery.value = '';
    resetTimer = null;
  }, 2000);
}

function onDocumentClick(e: MouseEvent) {
  const target = e.target as Node | null;
  if (!rootEl.value) return;
  if (target && rootEl.value.contains(target)) return;
  close();
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick);
})
</script>

<template>
  <div :class="$s['select']" ref="rootEl">
    <div :class="$s['select__wrapper']"
      tabindex="0"
      ref="select"
      @keydown="onWrapperKeydown"
      @focus="open"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-haspopup="'listbox'">
      <VIcon name="chevron" :class-name="chevronClasses"/>
      <button
        v-if="resettable && valueSet.size"
        type="button"
        role="reset"
        :class="$s['select__reset']"
        @click.stop="reset">
        <VIcon name="x" :class-name="$s['select__reset-icon']"/>
      </button>
      <span :class="$s['select__label']">{{ label }}</span>
      <div :class="$s['select__chips']">
        <slot name="chip"
          v-for="(o, idx) in selectedOptions"
          :option="o"
          :removeFn="toggleOption"
          :removable="multiple">
          <span role="note"
            @click="multiple ? toggleOption(o): null"
            :key="o.value">
            {{ o.label }}<template v-if="multiple && idx < selectedOptions.length - 1">,</template>
          </span>
        </slot>
      </div>
    </div>
    <div :class="$s['select__options']" v-show="isOpen" role="listbox" :aria-hidden="!isOpen" tabindex="0" @keydown="onWrapperKeydown">
      <button
        v-for="(o, idx) in internalOptions"
        role="listitem"
        :class="[$s['select__item'], idx === focusedIndex ? $s['select__item--focused']: '']"
        :key="o.value"
        :aria-selected="valueSet.has(o.value)"
        @mouseenter="onOptionMouseEnter(idx)"
        @click="onOptionClick(o, idx)">
        <slot name="option" :option="o" :selected="valueSet.has(o.value)">
          <div :class="$s['select__item-content']">
            <VIcon
              v-if="multiple"
              :name="valueSet.has(o.value) ? 'check' :'square'"
              :class-name="$s['select__item-icon']" />
            <img v-if="o.image" :src="o.image" :alt="o.label" :class="$s['select__item-image']">
            <span :class="$s['select__item-label']">
              {{ o.label }}
            </span>
          </div>
          <span v-if="o.notice" :class="$s['select__item-notice']">
            {{ o.notice }}
          </span>
        </slot>
      </button>
    </div>
  </div>
</template>
