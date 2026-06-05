<script setup lang="ts">
import { computed } from 'vue';
import { supportedIconMap, type IconNames } from './supportedIconMap';
import { getIconSpriteUrl } from '@/shared/lib/icon-config';

const DEFAULT_SPRITE_URL = 'icons/bootstrap-icons.svg';

const props = defineProps<{
  /** Icon name from bootstrap icons */
  name: IconNames;
  /** text for screen readers, if absent icon considered decorative */
  ariaLabel?: string;
  /** additional classes for svg */
  className?: string;
}>();

const isDecorative = computed(() => !props.ariaLabel);
const spriteUrl = getIconSpriteUrl(DEFAULT_SPRITE_URL);
const href = computed(() => `${spriteUrl}#${supportedIconMap[props.name]}`);
</script>

<template>
  <svg
    :class="['bi', className]"
    role="img"
    :aria-hidden="isDecorative ? 'true' : undefined"
    :aria-label="ariaLabel || undefined">
    <use :href="href" />
  </svg>
</template>
