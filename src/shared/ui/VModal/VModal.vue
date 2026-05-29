<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import $s from './VModal.module.scss';

export interface VModalExpose {
  show(): void;
  hide(): void;
}
defineExpose<VModalExpose>();

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    ariaLabelledby?: string,
    ariaDescribedby?: string,
    strict?: boolean,
  }>(), {
    strict: false,
  }
);

const emits = defineEmits<{
  'open': [],
  'close': [],
}>();

defineSlots<{
  default(props: {
    close: () => void,
  }): HTMLElement;
  trigger(props: {
    open: () => void,
  }): HTMLElement;
}>();

const open = defineModel<boolean>('open');

const id = 'modal_' + Math.floor(Math.random()*1000);

const isModalBeingClosed = ref<boolean>(false);

const modal = ref<HTMLDialogElement | null>(null);

const handleModalClick = computed(() => {
  return props.strict ? undefined : handleModalClickFn;
})


function show() {
  if (!modal.value) return;

  isModalBeingClosed.value = false;
  modal.value.showModal();
  open.value = true
  emits('open');
}


function hide() {
  if (!modal.value) return;

  isModalBeingClosed.value = true;
  nextTick(() => {
    if (!modal.value) return;
    open.value = false;
    modal.value.close();
    emits('close');
  })
}

function handleModalClickFn(e: MouseEvent) {
  if (!modal.value) return;

  const modalRect = modal.value.getBoundingClientRect();

  if (
    e.clientX < modalRect.left ||
    e.clientX > modalRect.right ||
    e.clientY < modalRect.top ||
    e.clientY > modalRect.bottom
  ) {
    hide();
  }
}

watch(() => open.value, (value) => {
  if (!modal.value) return;
  if (value) show();
  else hide();
});

onMounted(() => {
  if(modal.value && open.value) {
    show();
  }
})
</script>

<template>
  <slot name="trigger" :open="show">
  </slot>
  <dialog ref="modal"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="ariaLabelledby"
    :aria-describedby="ariaDescribedby"
    :id="id"
    @click="handleModalClick"
    :class="[
      $s['modal'],
      isModalBeingClosed ? $s['modal--hide'] : '',
    ]">
    <slot :close="hide">

    </slot>
  </dialog>
</template>
