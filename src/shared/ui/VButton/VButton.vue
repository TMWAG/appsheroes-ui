<script setup lang="ts">
import { type VButtonProps } from './VButton';
import $s from './VButton.module.scss';

const props = withDefaults(
  defineProps<VButtonProps>(),
  { variant: 'primary' },
);

const getVariantClass = (): string | undefined => $s[`btn_${props.variant}`];
</script>

<template>
<button :class="[$s.btn, getVariantClass()]" :disabled="disabled">
  <slot name="icon"></slot>
  <slot>
    Button
  </slot>
</button>
</template>
