<script setup lang="ts">
import { computed, watch } from 'vue';
import $s from './VLoader.module.scss';

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
  <div :class="[$s['loading-circle'],
      overlay ? $s['loading-circle--with-overlay'] : '',
      sm ? $s['loading-circle--sm'] : '' ]">
    <div v-if="overlay" :class="$s['loading-circle__overlay']" />
    <svg :class="[
        $s['loading-circle__svg'],
        infinite && status === 'loading' ? $s['loading-circle__svg--infinite'] : '',
      ]"
      viewBox="0 0 100 100"
      :aria-label="ariaLabel"
      :role="ariaRole">
      <circle :class="$s['loading-circle__track']"
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke-width="8"/>
      <circle :class="$s['loading-circle__progress']"
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke-width="8"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="progressOffset"/>
      <g v-if="status === 'success'" :class="[$s['loading-circle__icon'], $s['loading-circle__icon--positive']]">
        <path d="M30 50 L45 65 L70 35" stroke-width="6" fill="none" />
      </g>
      <g v-else-if="status === 'error'" :class="[$s['loading-circle__icon'], $s['loading-circle__icon--negative']]">
        <path d="M35 35 L65 65 M65 35 L35 65" stroke-width="6" fill="none" />
      </g>
    </svg>
    <span v-if="!infinite && showPercentage"
      :class="$s['loading-circle__percentage']">
      {{ formattedProgress }}%
    </span>
    <span v-if="label" :class="$s['loading-circle__label']">
      {{ label }}
    </span>
    <span v-if="hint" :class="$s['loading-circle__hint']">
      {{ hint }}
    </span>
  </div>
</template>


