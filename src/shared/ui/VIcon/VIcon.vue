<script setup lang="ts">
import { computed } from 'vue';
import { supportedIconMap, type IconNames } from './supportedIconMap';
import { getIconSpriteUrl } from '@/shared/lib/icon-config';
import defaultSpriteUrl from './bootstrap-icons.svg?url';

const FALLBACK_SPRITE_PATH = 'icons/bootstrap-icons.svg';

const props = defineProps<{
  /** Icon name from bootstrap icons */
  name: IconNames;
  /** text for screen readers, if absent icon considered decorative */
  ariaLabel?: string;
  /** additional classes for svg */
  className?: string;
}>();

const isDecorative = computed(() => !props.ariaLabel);
const resolvedDefault = defaultSpriteUrl.startsWith('data:')
  ? FALLBACK_SPRITE_PATH
  : defaultSpriteUrl;
const spriteUrl = getIconSpriteUrl(resolvedDefault);
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
