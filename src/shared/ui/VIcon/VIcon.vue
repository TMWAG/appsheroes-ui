<script setup lang="ts">
import { computed } from 'vue';
import { BOOTSTRAP_SPRITE_URL } from '@/shared/assets/icons/bootstrap';
import { supportedIconMap, type IconNames } from './supportedIconMap'

const props = defineProps<{
  /** Icon name from bootstrap icons */
  name: IconNames,
  /** text for screen readers, if absent icon considered decorative */
  ariaLabel?: string,
  /** additional classes for svg */
  className?: string,
}>();

const isDecorative = computed(() => !props.ariaLabel);
const href = computed(() => `${BOOTSTRAP_SPRITE_URL}#${supportedIconMap[props.name]}`);
</script>

<template>
  <svg
    :class="['bi', className]"
    role="img"
    :aria-hidden="isDecorative ? 'true' : undefined"
    :aria-label="ariaLabel || undefined">
    <use :href="href"/>
    </svg>
</template>


