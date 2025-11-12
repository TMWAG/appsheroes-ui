<script setup lang="ts">
import { type ButtonProps } from './VButton';
import $s from './VButton.module.scss';

const props = withDefaults(
  defineProps<ButtonProps>(),
  { variant: 'primary' },
);

const getVariantClass = (): string | undefined => $s[`btn_${props.variant}`];
</script>

<template>
<button :class="[$s.btn, getVariantClass()]">
  <slot name="icon"></slot>
  <slot>
    Button
  </slot>
</button>
</template>
