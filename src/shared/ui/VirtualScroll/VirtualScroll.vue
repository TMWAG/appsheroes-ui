<script setup lang="ts" generic="T">
import { computed, onBeforeUnmount, onMounted, ref, type CSSProperties } from 'vue';

export interface VirtualScrollExpose {
  scrollToIndex: (index: number) => void;
}

type Directions = 'horizontal' | 'vertical';

const props = withDefaults(defineProps<{
  items: T[],
  direction?: Directions,
  itemKey?: keyof T | string,
  modelScrollTop?: number,
}>(), {
  direction: 'vertical',
  itemKey: 'id',
});

defineSlots<{
  default(props: { item: T, idx: number }): HTMLElement
}>();

const wrapper = ref<HTMLElement | null>(null);
const sizer = ref<HTMLElement | null>(null);
const scrollTop = ref<number>(0);
const containerSize = ref<number>(0);

const itemSize = ref<number>(50);
const isSizeMeasured = ref<boolean>(false);

let rafId: number | null = null;
let resizeObserver: ResizeObserver | null = null;
let sizerObserver: ResizeObserver | null = null;

if (props.modelScrollTop !== undefined) {
  scrollTop.value = props.modelScrollTop;
}

function onScroll(e: Event) {
  if (!wrapper.value) return
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    const target = e.target as HTMLElement;
    scrollTop.value = props.direction === 'vertical' ? target.scrollTop : target.scrollLeft;
    rafId = null;
  })
}

function initSizerObserver() {
  if (!sizer.value) return;

  sizerObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const newSize = props.direction === 'vertical'
        ? entry.contentRect.height
        : entry.contentRect.width;
      if (newSize > 0 && newSize / itemSize.value > 0) {
        const ratio = newSize / itemSize.value;
        const newScroll = scrollTop.value * ratio;
        if (wrapper.value) {
          if (props.direction === 'vertical') {
            wrapper.value.scrollTop = newScroll;
          } else {
            wrapper.value.scrollLeft = newScroll;
          }
        }
      }

      itemSize.value = newSize;
      isSizeMeasured.value = true;
    }
  });
  sizerObserver.observe(sizer.value);
}

const totalSize = computed(() => props.items.length * itemSize.value);

function updateContainerSize() {
  if (!wrapper.value) return;
  containerSize.value = props.direction === 'vertical'
    ? wrapper.value.clientHeight
    : wrapper.value.clientWidth;
}

const visibleCount = computed(() => {
  if (itemSize.value <= 0) return 0;
  const baseCount = Math.ceil(containerSize.value / itemSize.value);
  return baseCount + 10;
});

const startIdx = computed(() => {
  if (itemSize.value <= 0) return 0;
  const idx = Math.floor(scrollTop.value / itemSize.value);
  return Math.max(0, idx);
});

const endIdx = computed(() => {
  return Math.min(startIdx.value + visibleCount.value, props.items.length);
});

const itemsToDisplay = computed(() => {
  return props.items.slice(startIdx.value, endIdx.value);
});

const topSpacerSize = computed(() => startIdx.value * itemSize.value);
const bottomSpacerSize = computed(() => {
  const renderedHeight = itemsToDisplay.value.length * itemSize.value;
  return Math.max(0, totalSize.value - topSpacerSize.value - renderedHeight);
});

const getKey = (item: T, index: number): string | number => {
  if (typeof props.itemKey === 'string' && item !== null && typeof item === 'object') {
    const value = (item as Record<string, unknown>)[props.itemKey];
    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }
  }
  return index;
};

const spacerStyle = computed<CSSProperties>(() => {
  if(props.direction === 'vertical') {
    return {
      paddingTop: `${topSpacerSize.value}px`,
      paddingBottom: `${bottomSpacerSize.value}px`,
      display: 'flex',
      flexDirection: 'column',
    }
  } else {
    return {
      paddingLeft: `${topSpacerSize.value}px`,
      paddingRight: `${bottomSpacerSize.value}px`,
      display: 'flex',
      flexDirection: 'row',
    }
  }
})

function scrollToIndex(index: number) {
  if (!wrapper.value || itemSize.value <= 0) return;
  const targetScroll = index * itemSize.value;

  wrapper.value.scrollTo({
    top: props.direction === 'vertical' ? targetScroll : 0,
    left: props.direction === 'horizontal' ? targetScroll : 0,
    behavior: 'auto',
  });
}

defineExpose({
  scrollToIndex
} as VirtualScrollExpose);

onMounted(() => {
  if (wrapper.value) {
    updateContainerSize();

    resizeObserver = new ResizeObserver(() => {
      updateContainerSize();
    });
    resizeObserver.observe(wrapper.value);
  }
  initSizerObserver();
});

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
  if (resizeObserver) resizeObserver.disconnect();
  if (sizerObserver) sizerObserver.disconnect();
});

</script>

<template>
    <div class="wrapper" ref="wrapper" @scroll.passive="onScroll">
      <div class="wrapper__spacer" :style="spacerStyle">
        <template v-for="(item, idx) in itemsToDisplay" :key="getKey(item, startIdx + idx)">
          <slot :item="item" :idx="startIdx + idx">
            <span ref="items" class="wrapper__item">{{ item }}</span>
          </slot>
        </template>
      </div>
      <div class="wrapper__sizer"
        v-if="items.length > 0"
        ref="sizer">
        <slot :item="items[0]!" :idx="0">
          <span class="wrapper__item">{{ items[0] }}</span>
        </slot>
      </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
  overflow: auto;
  height: 200px;
  position: relative;

  &__spacer {
    width: 100%;
    min-height: 100%;
  }

  &__item {
    padding: 4px 8px;
    box-sizing: border-box;
  }

  &__sizer {
    position: absolute;
    visibility: hidden;
    top: 0;
    left: 0;
    pointer-events: none;
    width: 100%;
    display: flex;
  }
}
</style>
