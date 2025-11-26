<script setup lang="ts">
import $s from './VTooltip.module.scss';

const props = withDefaults(
  defineProps<{
    /** Tooltip's inner text */
    text?: string,
    /** Defines where tooltip should appear, relatively to target element */
    placement?: 'left' | 'top' | 'right' | 'bottom',
    /** Additional class for styling tooltip appearance */
    className?: string,
    /** Unique identifier for accessability attributes */
    id?: string,
  }>(), {
  text: '',
  placement: 'bottom',
});

defineSlots<{
  /** Element to witch tooltip will be added */
  default: HTMLElement | string,
}>();

function getVariantClass() {
  return $s[`tooltip_${props.placement}`]
}
</script>

<template>
  <span ref="triggerRef" :class="$s.tooltip__trigger" :aria-describedby="id">
    <slot/>
    <div
      :class="[$s.tooltip, getVariantClass(), className ]"
      role="tooltip"
      :id="id">
      {{ text }}
    </div>
  </span>
</template>
