<script setup lang="ts">
import $s from './VInput.module.scss';
import { VIcon } from '../VIcon';
import { VTooltip } from '../VTooltip';

const props = withDefaults(
  defineProps<{
    /** Defines input's label */
    label: string;
    /** Optionally defines input's name, if needed in form data constructor */
    name?: string;
    /** Input's value */
    value?: string;
    /** Optional input's caption, use for notices */
    caption?: string;
    /** Error message on failed validation */
    error?: string;
    /** Defines presence of reset button */
    resettable?: boolean;
  }>(),
  { name: 'input', resettable: false },
);

const emits = defineEmits<{
  input: [value: string];
  reset: [];
}>();

function generateId(name: string): string {
  const number = Math.floor(Math.random() * 1000);
  return `${name}-${number}}`;
}

const inputId = generateId(props.name);
</script>

<template>
  <div :class="$s.input" ref="input">
    <div :class="$s.input__wrapper">
      <button
        v-if="resettable && value"
        :class="$s.input__reset_button"
        @click.prevent="emits('reset')"
        type="button"
        aria-label="reset"
      >
        <VIcon name="x" :class-name="$s.input__reset_icon" />
      </button>
      <input
        type="text"
        placeholder=" "
        :name="name"
        :id="inputId"
        :value="value"
        :class="$s.input__input"
        @input="emits('input', ($event.target as HTMLInputElement).value)"
      />
      <label :class="$s.input__label" :for="inputId">
        {{ label }}
      </label>
    </div>
    <div :class="$s.input__footer" ref="subtitlesBlock">
      <VTooltip v-if="caption" placement="bottom" persistent>
        <span :class="$s.input__caption">{{ caption }}</span>
        <template #content>{{ caption }}</template>
      </VTooltip>
      <VTooltip v-if="error" placement="bottom">
        <span :class="$s.input__error">{{ error }}</span>
        <template #content>{{ error }}</template>
      </VTooltip>
    </div>
  </div>
</template>
