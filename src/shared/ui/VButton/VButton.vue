<script setup lang="ts">
import { VIcon, type IconNames } from '../VIcon';
import { VLoader } from '../VLoader';
import { computed, getCurrentInstance } from 'vue';

type ButtonVariants = 'primary' | 'secondary' | 'tertiary' | 'negative';

const props = withDefaults(
  defineProps<{
    /** Defines variant */
    variant?: ButtonVariants;
    /** Defines interactivity  */
    disabled?: boolean;
    /** Icon in the middle */
    icon?: IconNames;
    /** Icon on the left */
    iconLeft?: IconNames;
    /** Icon on the right */
    iconRight?: IconNames;
    /** Optional link to router location or href */
    href?: string;
    /** Defines loading state */
    isLoading?: boolean,
  }>(),
  {
    variant: 'primary',
    disabled: false,
    isLoading: false,
  },
);

defineSlots<{
  /** Buttons's inner text */
  default?: string;
}>();

function hasRouterLink(): boolean {
  try {
    const instance = getCurrentInstance();
    if (!instance) return false;
    return !!instance.appContext.config.globalProperties.$router;
  } catch {
    return false;
  }
}

const tag = computed(() =>
  props.href && !props.disabled && !props.isLoading
    ? hasRouterLink()
      ? 'RouterLink'
      : 'a'
    : props.href
      ? 'span'
      : 'button'
);

const getVariantClass = (): string | undefined =>
  `btn_${props.variant}${tag.value === 'span' ? '-disabled' : ''}`;
</script>

<template>
  <component :is="tag"
    :to="tag === 'RouterLink' ? href : undefined"
    :href="tag === 'a' ? href : undefined"
    :class="['btn', getVariantClass()]"
    :tabindex="tag === 'button' ? 1 : 0"
    :disabled="disabled || isLoading">
    <VIcon v-if="iconLeft" :name="iconLeft" class-name="btn__icon" />
    <VLoader v-if="isLoading" infinite sm aria-label="loading"/>
    <template v-else>
      <VIcon v-if="icon" :name="icon" class-name="btn__icon" />
      <span v-else>
        <slot />
      </span>
    </template>
    <VIcon v-if="iconRight" :name="iconRight" class-name="btn__icon" />
  </component>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as *;

.btn {
  @include text(m);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  width: fit-content;
  padding: 0 8px;
  transition: all 150ms;
  background-color: transparent;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  &:has(> .btn__icon:only-child) {
    border-radius: 99999px;
    padding: 0;
    width: 32px;
  }
  &_primary {
    background-color: var(--bg-action);
    color: var(--text-button);
    fill: var(--graphic-button);
    &:hover {
      background-color: var(--bg-hover);
    }
    &:active {
      background-color: var(--bg-active);
    }
    &:disabled,
    &-disabled {
      color: var(--text-disable);
      background-color: var(--bg-disable);
      cursor: not-allowed;
      fill: var(--graphic-disable);
    }
  }
  &_secondary {
    border-color: var(--border-button);
    color: var(--text-primary);
    fill: var(--graphic-primary);
    &:hover {
      border-color: var(--border-button-hover);
    }
    &:active {
      border-color: var(--border-button-active);
    }
    &:disabled,
    &-disabled {
      border-color: var(--border-disable);
      color: var(--text-disable);
      cursor: not-allowed;
      fill: var(--graphic-disable);
    }
  }
  &_tertiary {
    fill: var(--graphic-primary);
    color: var(--text-primary);
    &:hover {
      border-color: var(--border-button-hover);
    }
    &:active {
      border-color: var(--border-button-active);
    }
    &:disabled,
    &-disabled {
      border-color: transparent;
      color: var(--text-disable);
      cursor: not-allowed;
      fill: var(--graphic-disable);
    }
  }
  &_negative {
    fill: var(--graphic-negative);
    color: var(--text-negative);
    &:hover {
      border-color: var(--border-negative);
    }
    &:active {
      border-color: var(--border-negative-secondary);
    }
    &:disabled,
    &-disabled {
      border-color: transparent;
      fill: var(--graphic-disable);
      cursor: not-allowed;
      color: var(--text-disable);
    }
  }
  &__icon {
    height: 16px;
    width: 16px;
  }
}
</style>
