import { computed, nextTick, onBeforeUnmount, ref, type Ref, type ComputedRef, type StyleValue } from 'vue';

type Placement = 'top' | 'bottom' | 'left' | 'right';

export interface UseFloatingPositionOptions {
  triggerRef: Ref<HTMLElement | null>;
  floatingRef: Ref<HTMLElement | null>;
  placement?: Placement;
  gap?: number;
  padding?: number;
}

export interface UseFloatingPositionReturn {
  coords: Ref<{ x: number; y: number }>;
  actualPlacement: Ref<Placement>;
  style: ComputedRef<StyleValue>;
  updatePosition: () => Promise<void>;
}

function desiredXY(t: DOMRect, f: DOMRect, placement: Placement, gap: number) {
  switch (placement) {
    case 'top':
      return {
        x: t.left + (t.width - f.width) / 2,
        y: t.top - f.height - gap,
      };
    case 'bottom':
      return {
        x: t.left + (t.width - f.width) / 2,
        y: t.bottom + gap,
      };
    case 'left':
      return {
        x: t.left - f.width - gap,
        y: t.top + (t.height - f.height) / 2,
      };
    case 'right':
      return {
        x: t.right + gap,
        y: t.top + (t.height - f.height) / 2,
      };
  }
}

function overflowAmount(x: number, y: number, f: DOMRect, pad: number) {
  const left = pad - x;
  const top = pad - y;
  const right = x + f.width - (window.innerWidth - pad);
  const bottom = y + f.height - (window.innerHeight - pad);
  return Math.max(left, top, right, bottom, 0);
}

export function useFloatingPosition(options: UseFloatingPositionOptions): UseFloatingPositionReturn {
  const { placement = 'bottom', gap = 6, padding = 8 } = options;

  const coords = ref({ x: 0, y: 0 });
  const actualPlacement = ref<Placement>(placement);

  const style = computed<StyleValue>(() => ({
    position: 'fixed',
    left: `${coords.value.x}px`,
    top: `${coords.value.y}px`,
  }));

  async function updatePosition() {
    const triggerEl = options.triggerRef.value;
    const floatingEl = options.floatingRef.value;

    if (!triggerEl || !floatingEl) return;

    await nextTick();

    const t = triggerEl.getBoundingClientRect();
    const f = floatingEl.getBoundingClientRect();

    let place: Placement = placement;
    let { x, y } = desiredXY(t, f, place, gap);

    actualPlacement.value = place;

    const opposite: Record<Placement, Placement> = {
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left',
    };
    const o1 = overflowAmount(x, y, f, padding);

    const flipped = opposite[place];
    const d2 = desiredXY(t, f, flipped, gap);
    const o2 = overflowAmount(d2.x, d2.y, f, padding);

    if (o2 < o1) {
      place = flipped;
      x = d2.x;
      y = d2.y;
    }

    x = Math.max(padding, Math.min(window.innerWidth - padding - f.width, x));
    y = Math.max(padding, Math.min(window.innerHeight - padding - f.height, y));

    coords.value = { x, y };
    actualPlacement.value = place;
  }

  function onWinChange() {
    if (options.floatingRef.value) updatePosition();
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', onWinChange, true);
    window.addEventListener('resize', onWinChange);

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', onWinChange, true);
      window.removeEventListener('resize', onWinChange);
    });
  }

  return { coords, actualPlacement, style, updatePosition };
}
