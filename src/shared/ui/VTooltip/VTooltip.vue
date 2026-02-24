<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, type StyleValue } from 'vue';
import $s from './VTooltip.module.scss';

defineOptions({ inheritAttrs: false });

type Placement = 'left' | 'top' | 'right' | 'bottom';

const props = withDefaults(
  defineProps<{
    /** Defines where tooltip should appear, relatively to target element */
    placement?: Placement,
    /** Defines if tooltip should appear */
    disabled?: boolean,
    /** Space between trigger and tooltip in pixels */
    gap?: number,
    /** Defines tooltip padding */
    padding?: number,
    /** Unique identifier for accessability attributes */
    id?: string,
  }>(), {
  gap: 6,
  padding: 8,
  placement: 'bottom',
});

const slots = defineSlots<{
  /** Tooltip trigger */
  default(): void,
  /** Tooltip contents  */
  content(): void,
}>();

const open = ref<boolean>(false);
const triggerRef = ref<HTMLElement | null>(null);
const tooltipRef = ref<HTMLElement | null>(null);
const coords = ref({ x: 0, y: 0 });

const actualPlacement = ref<Placement>(props.placement);

const style = computed<StyleValue>(() => ({
  position: 'fixed',
  left: `${coords.value.x}px`,
  top: `${coords.value.y}px`,
}));

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function desiredXY(t: DOMRect, f: DOMRect, placement: Placement, gap: number) {
  switch (placement) {
    case 'top': return {
      x: t.left + (t.width - f.width) / 2,
      y: t.top - f.height - gap,
    };
    case 'bottom': return {
      x: t.left + (t.width - f.width) / 2,
      y: t.bottom + gap
    };
    case 'left': return {
      x: t.left - f.width - gap,
      y: t.top + (t.height - f.height) / 2
    }
    case 'right': return {
      x: t.right + gap,
      y: t.top + (t.height - f.height) / 2
    }
  }
}

function overflowAmount(x: number, y: number, f: DOMRect, pad: number) {
  const left = pad - x
  const top = pad - y
  const right = (x + f.width) - (window.innerWidth - pad)
  const bottom = (y + f.height) - (window.innerHeight - pad)
  return Math.max(left, top, right, bottom, 0)
}

async function updatePosition() {
  if (!triggerRef.value || !tooltipRef.value) return

  const t = triggerRef.value.getBoundingClientRect()
  const f = tooltipRef.value.getBoundingClientRect()

  const pad = props.padding
  const gap = props.gap

  let place: Placement = props.placement
  let { x, y } = desiredXY(t, f, place, gap)

  actualPlacement.value = place;

  const opposite: Record<Placement, Placement> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }
  const o1 = overflowAmount(x, y, f, pad)

  const flipped = opposite[place]
  const d2 = desiredXY(t, f, flipped, gap)
  const o2 = overflowAmount(d2.x, d2.y, f, pad)

  if (o2 < o1) {
    place = flipped
    x = d2.x
    y = d2.y
  }

  x = clamp(x, pad, window.innerWidth - pad - f.width)
  y = clamp(y, pad, window.innerHeight - pad - f.height)

  coords.value = { x, y }
}

function show() {
  if (props.disabled || !slots.content) return
  open.value = true
  nextTick(updatePosition)
}

function hide() {
  open.value = false
}

function onWinChange() {
  if (open.value) updatePosition()
}

window.addEventListener('scroll', onWinChange, true)
window.addEventListener('resize', onWinChange)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onWinChange, true)
  window.removeEventListener('resize', onWinChange)
})
</script>

<template>
  <span ref="triggerRef" :class="$s['tooltip__trigger']" tabindex="1" @mouseenter="show" @mouseleave="hide"
    @focusin="show" @focusout="hide">
    <slot></slot>
  </span>
  <Teleport to="body">
    <transition :enter-from-class="$s['enter-from']" :enter-active-class="$s['enter-active']"
      :enter-to-class="$s['enter-to']" :leave-from-class="$s['leave-from']" :leave-active-class="$s['leave-active']"
      :leave-to-class="$s['leave-to']">
      <div v-if="open" ref="tooltipRef" role="tooltip" :class="[$s.tooltip, $s[`dir-${actualPlacement}`], $attrs.class]"
        :style="style">
        <slot name="content"></slot>
      </div>
    </transition>
  </Teleport>
</template>
