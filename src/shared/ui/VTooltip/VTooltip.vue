<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import $s from './VTooltip.module.scss';
import { useFloatingPosition } from '../../lib/hooks';

defineOptions({ inheritAttrs: false });

type Placement = 'top' | 'bottom' | 'left' | 'right';

const props = withDefaults(
  defineProps<{
    placement?: Placement;
    disabled?: boolean;
    persistent?: boolean;
    gap?: number;
    padding?: number;
    id?: string;
  }>(), {
    gap: 6,
    padding: 8,
    placement: 'bottom',
    persistent: false,
  },
);

const slots = defineSlots<{
  default(): void;
  content(): void;
}>();

const open = ref<boolean>(props.persistent);
const triggerRef = ref<HTMLElement | null>(null);
const tooltipRef = ref<HTMLElement | null>(null);

const { actualPlacement, style, updatePosition } = useFloatingPosition({
  triggerRef,
  floatingRef: tooltipRef,
  placement: props.placement,
  gap: props.gap,
  padding: props.padding,
});

async function show() {
  if (props.disabled || !slots.content) return;
  open.value = true;
  await nextTick();
  updatePosition();
}

function hide() {
  if (props.persistent) return;
  open.value = false;
}

onMounted(() => {
  if (props.persistent) show();
});
</script>

<template>
  <span ref="triggerRef" :class="$s['tooltip__trigger']" @mouseenter="show" @mouseleave="hide"
    @focusin="show" @focusout="hide">
    <slot></slot>
  </span>
  <transition :enter-from-class="$s['enter-from']" :enter-active-class="$s['enter-active']"
    :enter-to-class="$s['enter-to']" :leave-from-class="$s['leave-from']" :leave-active-class="$s['leave-active']"
    :leave-to-class="$s['leave-to']">
    <div v-if="open" ref="tooltipRef" role="tooltip" :class="[$s.tooltip, $s[`dir-${actualPlacement}`], $attrs.class]"
      :style="style">
      <slot name="content"></slot>
    </div>
  </transition>
</template>
