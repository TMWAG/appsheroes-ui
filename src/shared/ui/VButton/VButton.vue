<script setup lang="ts">
import $s from './VButton.module.scss';
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
  $s[`btn_${props.variant}${tag.value === 'span' ? '-disabled' : ''}`];
</script>

<template>
  <component :is="tag"
    :to="tag === 'RouterLink' ? href : undefined"
    :href="tag === 'a' ? href : undefined"
    :class="[$s.btn, getVariantClass()]"
    :tabindex="tag === 'button' ? 1 : 0"
    :disabled="disabled || isLoading">
    <VIcon v-if="iconLeft" :name="iconLeft" :class-name="$s.btn__icon" />
    <VLoader v-if="isLoading" infinite sm aria-label="loading"/>
    <template v-else>
      <VIcon v-if="icon" :name="icon" :class-name="$s.btn__icon" />
      <span v-else>
        <slot />
      </span>
    </template>
    <VIcon v-if="iconRight" :name="iconRight" :class-name="$s.btn__icon" />
  </component>
</template>
