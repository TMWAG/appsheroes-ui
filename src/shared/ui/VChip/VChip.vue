<script setup lang="ts">
import { VIcon, type IconNames } from '../VIcon';

type ChipVariants = 'default' | 'accent' | 'negative' | 'info' | 'positive';

const props = withDefaults(
  defineProps<{
    /** Defines variant */
    variant?: ChipVariants;
    /** Icon on the left side of main content */
    iconLeft?: IconNames;
    /** Icon on the right side of main content */
    iconRight?: IconNames;
    /** Defines presents of close button and emission on closed event */
    removable?: boolean;
  }>(),
  { variant: 'default', removable: false },
);

const emits = defineEmits<{
  /** Triggers when close button clicked */
  removed: [];
  /** Trigger when chip body being clicked */
  clicked: [];
}>();

defineSlots<{
  /** Chip's inner text */
  default?: string;
}>();

function getVariantClass(): string | undefined {
  return `chip_${props.variant}`;
}
</script>

<template>
  <div
    :class="['chip', getVariantClass()]"
    @click="emits('clicked')"
    role="note">
    <div class="chip__content">
      <VIcon
        v-if="iconLeft"
        :name="iconLeft"
        class-name="chip__icon" />
      <slot> Chip </slot>
      <VIcon
        v-if="iconRight"
        :name="iconRight"
        class-name="chip__icon" />
    </div>
    <button
      v-if="removable"
      aria-label="remove"
      type="button"
      class="chip__remove"
      @click.stop="emits('removed')">
      <VIcon
        name="x"
        class-name="chip__remove_icon"
        aria-label="remove" />
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as *;

.chip {
  @include text(s);
  height: 18px;
  width: fit-content;
  border-radius: 99999px;
  padding: 0 6px;
  display: flex;
  gap: 4px;
  justify-items: center;
  align-items: center;
  &:has(.chip__icon) {
    gap: 8px;
  }
  &_default {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    fill: var(--graphic-primary);
  }
  &_accent {
    background-color: var(--bg-action);
    color: var(--text-button);
    fill: var(--graphic-button);
  }
  &_negative {
    background-color: var(--bg-negative-secondary);
    color: var(--text-negative);
    fill: var(--graphic-negative);
  }
  &_info {
    background-color: var(--bg-warning-secondary);
    color: var(--text-warning);
    fill: var(--graphic-warning);
  }
  &_positive {
    background-color: var(--bg-positive-secondary);
    color: var(--text-positive);
    fill: var(--graphic-positive);
  }
  &__content {
    display: flex;
    gap: 4px;
    justify-items: center;
    align-items: center;
  }
  &__remove {
    background-color: transparent;
    border: none;
    border-radius: 9999px;
    padding: 0;
    height: 12px;
    display: flex;
    align-items: center;
    justify-items: center;
    cursor: pointer;
  }
  &__remove_icon {
    height: 8px;
    width: 8px;
  }
  &__icon {
    height: 10px;
    width: 10px;
  }
}
</style>
