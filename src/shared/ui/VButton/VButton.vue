<script setup lang="ts">
import type { RouteLocationAsStringTyped } from 'vue-router';
import $s from './VButton.module.scss';
import { VIcon, type IconNames } from '@/shared/ui/VIcon';
import { VLoader } from '@/shared/ui/VLoader';
import { computed } from 'vue';

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
    /** Optional link to router location */
    href?: RouteLocationAsStringTyped;
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

const tag = computed(() =>
  props.href || props.isLoading
  ? (
    props.disabled || props.isLoading
    ? 'span'
    : 'RouterLink'
  )
  : 'button'
);

const getVariantClass = (): string | undefined =>
  $s[`btn_${props.variant}${tag.value === 'span' ? '-disabled' : ''}`];
</script>

<template>
  <component :is="tag"
    :to="href"
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
