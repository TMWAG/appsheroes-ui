<script setup lang="ts">
import $s from './VInput.module.scss';
import { onMounted, onUpdated, ref, type Ref } from 'vue';
import VTooltip from '../VTooltip/VTooltip.vue';
import VIcon from '../VIcon/VIcon.vue';

const props = withDefaults(
  defineProps<{
    /** Defines input's label */
    label: string;
    /** Optionally defines input's name, if needed in form data constructor */
    name?: string;
    /** Input's value */
    value?: string;
    /** Optional input's caption, use for notices */
    caption?: string;
    /** Error message on failed validation */
    error?: string;
    /** Defines presence of reset button */
    resettable?: boolean;
  }>(),
  { name: 'input', resettable: false },
);

const emits = defineEmits<{
  input: [value: string];
  reset: [];
}>();

function generateId(name: string): string {
  const number = Math.floor(Math.random() * 1000);
  return `${name}-${number}}`;
}

const inputId = generateId(props.name);
const errorId = generateId('error');
const captionId = generateId('caption');

const input = ref<HTMLElement>();
const subtitlesBlock = ref<HTMLElement>();

const isCaptionWiderThanBlock = ref<boolean>(false);
const isErrorWiderThanBlock = ref<boolean>(false);

/**
 * Used to determine if text content of block will fit in one line and not be wider than parent element
 * @param text String which width should be measured
 * @param block Ref to a block containing text
 * @param parent Ref to a parent containing block
 * @throws when values are not provided
 */
function isBlockWiderThanParent(
  text: string | undefined,
  block: Ref<Element | undefined>,
  parent: Ref<Element | undefined>,
): boolean {
  if (!parent.value) throw Error('No parent element was provided');

  if (!text) throw Error('No text was provided');

  if (!block.value) throw Error('No block was provided');

  const { fontStyle, fontWeight, fontSize, fontFamily } = getComputedStyle(block.value);
  const fontString = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
  const canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  if (!context) throw Error('No canvas context was provided');
  context.font = fontString;
  const width = context.measureText(text).width;
  canvas.remove();
  context = null;
  return width > parent.value.clientWidth;
}

function determineWidthOfBlocks() {
  try {
    if (props.caption)
      isCaptionWiderThanBlock.value = isBlockWiderThanParent(props.caption, subtitlesBlock, input);
    if (props.error)
      isErrorWiderThanBlock.value = isBlockWiderThanParent(props.error, subtitlesBlock, input);
  } catch (err) {
    if (err instanceof Error) console.error(err.message);
  }
}

onMounted(() => {
  determineWidthOfBlocks();
});

onUpdated(() => {
  determineWidthOfBlocks();
});
</script>

<template>
  <div :class="$s.input" ref="input">
    <div :class="$s.input__wrapper">
      <button
        v-if="resettable && value"
        :class="$s.input__reset_button"
        @click.prevent="emits('reset')"
        type="button"
        aria-label="reset"
      >
        <VIcon name="x" :class-name="$s.input__reset_icon" />
      </button>
      <input
        type="text"
        placeholder=" "
        :name="name"
        :id="inputId"
        :value="value"
        :class="$s.input__input"
        @input="emits('input', ($event.target as HTMLInputElement).value)"
      />
      <label :class="$s.input__label" :for="inputId">
        {{ label }}
      </label>
    </div>
    <div :class="$s.input__footer" ref="subtitlesBlock">
      <VTooltip v-if="isCaptionWiderThanBlock && caption" :text="caption" :id="captionId">
        <span v-show="caption" :class="$s.input__caption">{{ caption }}</span>
        <template #content>
          <span>{{ caption }}</span>
        </template>
      </VTooltip>
      <span
        v-if="caption && !isCaptionWiderThanBlock"
        ref="captionBlock"
        :class="$s.input__caption"
      >
        {{ caption }}
      </span>
      <VTooltip
        v-if="isErrorWiderThanBlock && error"
        :text="error"
        :class="$s.input__error_tooltip"
        :id="errorId"
      >
        <span :class="$s.input__error">{{ error }}</span>
        <template #content>
          <span>{{ error }}</span>
        </template>
      </VTooltip>
      <span v-if="error && !isErrorWiderThanBlock" ref="errorBlock" :class="$s.input__error">
        {{ error }}
      </span>
    </div>
  </div>
</template>
