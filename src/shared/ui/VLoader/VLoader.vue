<script setup lang="ts">
import { computed, watch } from 'vue';

export type Status = 'loading' | 'success' | 'error';

const props = withDefaults(defineProps<{
  /**
   * Defines progress
   * @default 0
   */
  progress?: number;
  /**
   * Is it just a spinner
   * @default false
   */
  infinite?: boolean;
  /**
   * Defines wether completion percentage should be shown or not
   * @default false
   */
  showPercentage?: boolean;
  /**
   * Message to be displayed beneath spinner
   */
  label?: string;
  /**
   * Additional text to be displayed beneath spinner and label or instead of label
   */
  hint?: string;
  /**
   * Loading status
   * @default 'loading'
   */
  status?: Status;
  /**
   * Should it be in overlay mode (cover all parent block)
   * @default false
   */
  overlay?: boolean;
  /**
   * Delay before appearance in ms
   */
  delay?: number;
  /**
   * Minimal time to be shown
   */
  minDisplayTime?: number;
  ariaLabel?: string;
  sm?: boolean,
}>(), {
  progress: 0,
  infinite: false,
  showPercentage: false,
  status: 'loading',
  overlay: false,
  delay: 0,
  minDisplayTime: 0,
  ariaLabel: 'loading',
  sm: false,
});

const emits = defineEmits<{
  'update:progress': [value: number];
  'complete': [];
  'status-change': [status: Status];
}>();

const circumference = 2 * Math.PI * 40;

const formattedProgress = computed(() => {
  return Math.min(100, Math.max(0, Math.round(props.progress)));
});

const progressOffset = computed(() => {
  if (props.infinite || props.status !== 'loading') return 0;
  return circumference * (1 - formattedProgress.value / 100);
});

const ariaRole = computed(() => {
  if (props.status === 'loading') return 'progressbar';
  if (props.status === 'success') return 'status';
  if (props.status === 'error') return 'alert';
  return 'img';
});

watch(() => props.progress, (newProgress) => {
  if (newProgress >= 100) {
    emits('complete');
    emits('status-change', 'success');
  }
});

const setProgress = (value: number) => {
  emits('update:progress', value);
};

defineExpose({
  setProgress
})
</script>

<template>
  <div :class="['loading-circle',
      overlay ? 'loading-circle--with-overlay' : '',
      sm ? 'loading-circle--sm' : '' ]">
    <div v-if="overlay" class="loading-circle__overlay" />
    <svg :class="[
        'loading-circle__svg',
        infinite && status === 'loading' ? 'loading-circle__svg--infinite' : '',
      ]"
      viewBox="0 0 100 100"
      :aria-label="ariaLabel"
      :role="ariaRole">
      <circle class="loading-circle__track"
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke-width="8"/>
      <circle class="loading-circle__progress"
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke-width="8"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="progressOffset"/>
      <g v-if="status === 'success'" :class="['loading-circle__icon', 'loading-circle__icon--positive']">
        <path d="M30 50 L45 65 L70 35" stroke-width="6" fill="none" />
      </g>
      <g v-else-if="status === 'error'" :class="['loading-circle__icon', 'loading-circle__icon--negative']">
        <path d="M35 35 L65 65 M65 35 L35 65" stroke-width="6" fill="none" />
      </g>
    </svg>
    <span v-if="!infinite && showPercentage"
      class="loading-circle__percentage">
      {{ formattedProgress }}%
    </span>
    <span v-if="label" class="loading-circle__label">
      {{ label }}
    </span>
    <span v-if="hint" class="loading-circle__hint">
      {{ hint }}
    </span>
  </div>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as *;
@use '../../styles/reset';

.loading-circle {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  &--sm {
    width: 26px;
    height: 26px;
  }
  &__svg {
    rotate: -90deg;
    width: 52px;
    height: 52px;
    position: relative;
    z-index: 2;

    &--infinite {
      animation: spin 1.5s linear infinite;

      .loading-circle__progress {
        stroke-dasharray: 80 160;
        transform-origin: center;
        animation: dash 1.5s ease-in-out infinite;
      }
    }
  }

  &__track {
    stroke: var(--border-disable);
    stroke-linecap: round;
  }

  &__progress {
    stroke: var(--border-active);
    stroke-linecap: round;
    transition: stroke-dashoffset 0.3s ease;
  }

  &__percentage {
    @include text(s);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--text-primary);
  }
   &__label {
    @include text(s);
    position: absolute;
    bottom: calc(50% - 40px);
    left: 50%;
    transform: translateX(-50%);
    color: var(--text-secondary);
    white-space: nowrap;
    z-index: 2;
  }

  &__hint {
    @include text(xs);
    position: absolute;
    bottom: calc(50% - 52px);
    left: 50%;
    transform: translateX(-50%);
    color: var(--text-secondary);
    white-space: nowrap;
    z-index: 2;
  }
  &--with-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: color-mix(in srgb, var(--bg-primary) 50%, transparent);
    backdrop-filter: blur(4px);
    z-index: 1;
  }
   &__icon {
    rotate: 90deg;
    stroke: var(--border-disable);
    stroke-linecap: round;
    stroke-linejoin: round;
    transform-origin: center;
    animation: icon-appear 0.3s ease;
    &--positive {
      stroke: var(--graphic-positive);
    }
    &--negative {
      stroke: var(--graphic-negative);
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(315deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 80;
  }
  50% {
    stroke-dashoffset: 160;
  }
  100% {
    stroke-dashoffset: 80;
  }
}

@keyframes icon-appear {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
