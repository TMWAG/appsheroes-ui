<script setup lang="ts">
import type { RouteLocationAsStringTyped } from 'vue-router';
import $s from './VButton.module.scss';
import { VIcon, type IconNames } from '@/shared/ui/VIcon'

type ButtonVariants = 'primary' | 'secondary' | 'tertiary' | 'negative';

const props = withDefaults(
  defineProps<{
    /** Defines variant */
    variant?: ButtonVariants,
    /** Defines interactivity  */
    disabled?: boolean,
    /** Icon in the middle */
    icon?: IconNames,
    /** Icon on the left */
    iconLeft?: IconNames,
    /** Icon on the right */
    iconRight?: IconNames,
    /** Optional link to router location */
    href?: RouteLocationAsStringTyped,
  }>(), {
  variant: 'primary',
  disabled: false,
});

defineSlots<{
  /** Buttons's inner text */
  default?: string,
}>()

const tag = props.href ?
  props.disabled ? 'span' : 'RouterLink'
  : 'button';

const getVariantClass = (): string | undefined =>
  $s[`btn_${props.variant}${ tag==='span' ? '-disabled' : ''}`];
</script>

<template>
  <component :is="tag" :to="href" :class="[$s.btn, getVariantClass()]" :disabled="disabled">
    <VIcon v-if="iconLeft" :name="iconLeft" :class-name="$s.btn__icon"/>
    <VIcon v-if="icon" :name="icon" :class-name="$s.btn__icon"/>
    <span v-else>
      <slot/>
    </span>
    <VIcon v-if="iconRight" :name="iconRight" :class-name="$s.btn__icon"/>
  </component>
</template>
