import { onMounted, onUnmounted, ref } from "vue";

export function useMouseTracker() {
  const x = ref<number>(0);
  const y = ref<number>(0);
  const target = ref<HTMLElement | null>(null);

  function updateCoords(e: MouseEvent) {
    x.value = e.layerX;
    y.value = e.layerY;
  }

  onMounted(() => {
    if(target.value)
      target.value.addEventListener('mousemove', updateCoords);
  });

  onUnmounted(() => {
    if(target.value)
      target.value.removeEventListener('mousemove', updateCoords);
  });

  return {
    x,
    y,
    target,
  };
}
