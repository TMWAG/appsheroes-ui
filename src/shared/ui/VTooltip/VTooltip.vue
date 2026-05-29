<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
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
  <span ref="triggerRef" class="tooltip__trigger" @mouseenter="show" @mouseleave="hide"
    @focusin="show" @focusout="hide">
    <slot></slot>
  </span>
  <transition :enter-from-class="'enter-from'" :enter-active-class="'enter-active'"
    :enter-to-class="'enter-to'" :leave-from-class="'leave-from'" :leave-active-class="'leave-active'"
    :leave-to-class="'leave-to'">
    <div v-if="open" ref="tooltipRef" role="tooltip" :class="['tooltip', `dir-${actualPlacement}`, $attrs.class]"
      :style="style">
      <slot name="content"></slot>
    </div>
  </transition>
</template>

<style scoped lang="scss">
@use '../../styles/mixins' as *;

.tooltip {
  @include text(s);
  padding: 4px 8px;
  border-radius: 4px;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  max-width: 25vw;
  width: max-content;
  pointer-events: none;
  display: inline-flex;
  flex-grow: 1;
}

.enter-from,
.leave-to {
  opacity: 0;
}

.enter-to,
.leave-from {
  opacity: 1;
  transform: translate(0, 0);
}

.enter-active,
.leave-active {
  transition: opacity 300ms ease, transform 300ms ease;
  will-change: opacity, transform;
}

.dir-top.enter-from,
.dir-top.leave-to {
  transform: translateY(6px);
}

.dir-bottom.enter-from,
.dir-bottom.leave-to {
  transform: translateY(-6px);
}

.dir-left.enter-from,
.dir-left.leave-to {
  transform: translateX(6px);
}

.dir-right.enter-from,
.dir-right.leave-to {
  transform: translateX(-6px);
}
</style>
