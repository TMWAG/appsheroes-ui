import { ref, computed, watch } from 'vue';

export interface UseVLoaderOptions {
  initialProgress?: number;
  infinite?: boolean;
  autoStart?: boolean;
  step?: number;
  interval?: number;
}

export function useVLoader(options: UseVLoaderOptions = {}) {
  const {
    initialProgress = 0,
    infinite = false,
    autoStart = false,
    step = 1,
    interval = 50
  } = options;

  const progress = ref(initialProgress);
  const isActive = ref(autoStart);
  const status = ref<'loading' | 'success' | 'error'>('loading');

  let timer: number | null = null;

  const formattedProgress = computed(() => Math.round(progress.value));
  const isComplete = computed(() => progress.value >= 100);
  const isLoading = computed(() => status.value === 'loading' && isActive.value);

  const start = () => {
    if (isComplete.value) {
      progress.value = 0;
    }
    isActive.value = true;
    status.value = 'loading';

    if (!infinite) {
      timer = window.setInterval(() => {
        progress.value = Math.min(100, progress.value + step);
      }, interval);
    }
  };

  const stop = () => {
    isActive.value = false;
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const reset = () => {
    stop();
    progress.value = 0;
    status.value = 'loading';
  };

  const complete = () => {
    progress.value = 100;
    status.value = 'success';
    stop();
  };

  const error = () => {
    status.value = 'error';
    stop();
  };

  watch(isComplete, (completed) => {
    if (completed) {
      status.value = 'success';
      stop();
    }
  });

  return {
    progress,
    isActive,
    status,
    formattedProgress,
    isComplete,
    isLoading,
    start,
    stop,
    reset,
    complete,
    error
  };
}
