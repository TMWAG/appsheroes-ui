<script setup lang="ts">
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
  <div class="input" ref="input">
    <div class="input__wrapper">
      <button
        v-if="resettable && value"
        class="input__reset_button"
        @click.prevent="emits('reset')"
        type="button"
        aria-label="reset"
      >
        <VIcon name="x" class-name="input__reset_icon" />
      </button>
      <input
        type="text"
        placeholder=" "
        :name="name"
        :id="inputId"
        :value="value"
        class="input__input"
        @input="emits('input', ($event.target as HTMLInputElement).value)"
      />
      <label class="input__label" :for="inputId">
        {{ label }}
      </label>
    </div>
    <div class="input__footer" ref="subtitlesBlock">
      <VTooltip v-if="caption" placement="bottom" persistent>
        <span class="input__caption">{{ caption }}</span>
        <template #content>{{ caption }}</template>
      </VTooltip>
      <VTooltip v-if="error" placement="bottom">
        <span class="input__error">{{ error }}</span>
        <template #content>{{ error }}</template>
      </VTooltip>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as *;
@use '../../styles/reset';

.input {
  display: flex;
  flex-direction: column;
  gap: 2px;
  &:has(.input__error) .input__input {
    border-color: var(--border-negative);
  }
  &__wrapper {
    position: relative;
    &:has(.input__input:not(:placeholder-shown):is(:focus, :hover)) .input__reset_button {
      opacity: 1;
      visibility: visible;
    }
  }
  &__label {
    @include text(m);
    color: var(--text-secondary);
    position: absolute;
    top: 12px;
    left: 8px;
    transition: all 150ms;
  }
  &__input {
    @include text(m);
    width: 100%;
    padding: 16px 8px 8px 8px;
    height: 40px;
    border: 1px solid var(--border-default);
    border-radius: 4px;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: all 150ms;
    &:hover {
      border-color: var(--border-hover);
    }
    &:focus,
    &:focus-within {
      border-color: var(--border-active);
      outline: none;
    }
    &:focus-within,
    &:not(:placeholder-shown) {
      & + .input__label {
        @include text(xs);
        top: 4px;
        color: var(--text-primary);
      }
    }
    &:invalid {
      border-color: var(--border-negative);
    }
    &:read-only {
      background-color: var(--bg-disable);
      border-color: var(--border-disable);
      cursor: not-allowed;
    }
    &::placeholder {
      color: transparent;
    }
  }
  &__icon {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    height: 20px;
    width: 20px;
    fill: var(--graphic-primary);
  }
  &__footer {
    display: flex;
    flex-direction: column;
    padding: 0 4px;
  }
  &__caption {
    color: var(--text-primary);
  }
  &__error {
    color: var(--text-negative);
  }
  &__caption,
  &__error {
    @include text(s);
    height: 1rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    -webkit-line-clamp: 1;
  }
  &__error_tooltip {
    background-color: var(--bg-negative-secondary) !important;
    color: var(--text-negative) !important;
  }
  &__reset_button {
    opacity: 0;
    visibility: hidden;
    display: flex;
    align-items: center;
    justify-items: center;
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--bg-secondary);
    transition: all 150ms;
    border: none;
    height: 1rem;
    width: 1rem;
    border-radius: 9999px;
    padding: 0.2rem;
    cursor: pointer;
    &:hover {
      opacity: 1;
      visibility: visible;
      background-color: var(--bg-disable);
    }
  }
  &__reset_icon {
    height: 100%;
    width: 100%;
    fill: var(--graphic-primary);
  }
}
</style>
