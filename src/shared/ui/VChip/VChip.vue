<script setup lang="ts">
import { VIcon, type IconNames } from '../VIcon';
import $s from './VChip.module.scss';

type ChipVariants = 'default' | 'accent' | 'negative' | 'info' | 'positive';

const props = withDefaults(
  defineProps<{
    /** Defines variant */
    variant?: ChipVariants,
    /** Icon on the left side of main content */
    iconLeft?: IconNames,
    /** Icon on the right side of main content */
    iconRight?: IconNames,
    /** Defines presents of close button and emission on closed event */
    removable?: boolean,
  }>(), {
  variant: 'default',
  removable: false,
})

const emits = defineEmits<{
  /** Triggers when close button clicked */
  removed: [],
  /** Trigger when chip body being clicked */
  clicked: [],
}>();

defineSlots<{
  /** Chip's inner text */
  default?: string,
}>();

function getVariantClass(): string | undefined {
  return $s[`chip_${props.variant}`]
}
</script>

<template>
  <div :class="[$s.chip, getVariantClass()]" @click="emits('clicked')" role="note">
    <div :class="$s.chip__content">
      <VIcon v-if="iconLeft" :name="iconLeft" :class-name="$s.chip__icon" />
      <slot>
        Chip
      </slot>
      <VIcon v-if="iconRight" :name="iconRight" :class-name="$s.chip__icon" />
    </div>
    <button v-if="removable" aria-label="remove" type="button" :class="$s.chip__remove" @click.stop="emits('removed')">
      <VIcon name="x" :class-name="$s.chip__remove_icon" aria-label="remove" />
    </button>
  </div>
</template>
