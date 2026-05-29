<script setup lang="ts">
import { useVLoader } from '@/shared/lib/hooks';
import { VButton, VInput, VChip, VSelect, VLoader, VModal } from '@/shared/ui';
import type { Status } from '@/shared/ui/VLoader';
import { ref, watch, type Ref } from 'vue';
import { Tooltip } from 'floating-vue';

const inputValue = ref<string>('test');
const inputError = ref<string | undefined>();

function notValidatedInput(state: Ref<string>): (v: string) => void {
  return (v) => state.value = v;
}

const onInput = notValidatedInput(inputValue);

/* function onInput(v: string): void {
  if (v.includes('re')) {
    inputError.value = 'Не рычи бля';
  } else {
    inputError.value = undefined;
  }
  inputValue.value = v;
} */

const options = [
  { value: '1', label: 'first', notice: '1', image: 'https://placehold.co/600x600/FF0000/FFF?text=1' },
  { value: '2', label: 'second', notice: '2', image: 'https://placehold.co/600x600/00FF00/000?text=2' },
  { value: '3', label: 'third', notice: '3', image: 'https://placehold.co/600x600/0000FF/FFF?text=3' },
  { value: '4', label: 'forth', notice: '4', image: 'https://placehold.co/600x600/0F000F/FFF?text=4' },
  { value: '5', label: 'fifth', notice: '5', image: 'https://placehold.co/600x600/FF0000/FFF?text=5' },
  { value: '6', label: 'sixth', notice: '6', image: 'https://placehold.co/600x600/00FF00/000?text=6' },
  { value: '7', label: 'seventh', notice: '7', image: 'https://placehold.co/600x600/0000FF/FFF?text=7' },
  { value: '8', label: 'eight', notice: '8', image: 'https://placehold.co/600x600/0F000F/FFF?text=8' },
];

const items = [...Array(1000).keys()]

const items2 = items.map((v, i) => ({ value: `${i}`, label: `${v}`}))

const selected1 = ref<string[] | string>([]);
const isSelectDisabled = ref<boolean>(false);

const stat = ref<Status>('loading');

watch(
  () => selected1,
  (e) => {
    console.log('select updated:', e.value)
  },
  { deep: true, }
);
const loader = useVLoader({ autoStart: false })

const isModalOpen = ref<boolean>(false);
</script>

<template>
  <div style="background-color: var(--bg-base); display: flex; justify-items: center; align-items: center; ">
    <VButton @click="loader.start" isLoading>start</VButton>
    <VButton @click="loader.stop" variant="secondary">stop</VButton>
    <VButton @click="loader.reset" variant="tertiary">reset</VButton>
    <Tooltip>
      <VButton variant="negative">test</VButton>
      <template #popper>
        <div style="display: flex; justify-items: center; align-items: center;">
          <span><i>pizdec</i> - eto normalno</span>
          <img src="https://placehold.co/200x600/FF0000/FFF?text=1" alt="1">
        </div>
      </template>
    </Tooltip>
    <VButton iconLeft="info" iconRight="download">
      tttt
    </VButton>
    <VButton href="/test" iconLeft="link">test</VButton>
    <div style="width: 200px;">
      <VInput name="d"
        caption="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, hic veritatis? Ex commodi exercitationem dolores, quas quibusdam doloribus eligendi distinctio assumenda obcaecati qui eos fuga magnam blanditiis dolor possimus voluptates. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, hic veritatis? Ex commodi exercitationem dolores, quas quibusdam doloribus eligendi distinctio assumenda obcaecati qui eos fuga magnam blanditiis dolor possimus voluptates."
        label="Label" :error="inputError" :value="inputValue" @input="onInput" resettable @reset="inputValue = ''" />
    </div>
    <RouterLink to="test">Test</RouterLink>
    <VChip removable iconLeft="archive" @clicked="console.log('clicked')" @removed="console.log('removed')">test</VChip>
    <div style="width: 200px;">
      <VSelect :disabled="isSelectDisabled"
        multiple
        resettable
        v-model="selected1"
        searchable
        label="select"
        :options="options"
        @reset="selected1 = []"
        placeholder="nigger">
        <template #option="{ option, selected }">
          <Tooltip placement="right">
            {{ selected ? '&check;' : '&squ;' }}
            {{ option.label }}
            <template #popper>
              {{ option.notice }}
            </template>
          </Tooltip>
        </template>
        <template #loader>
          Loading
        </template>
      </VSelect>
    </div>
    <Tooltip>
      <span>nigger</span>
      <template #popper>
        aaaaaa
      </template>
    </Tooltip>
    <VLoader infinite hint="NiGgErj" label="FAzGgOj" :status="stat"/>
    <VLoader :progress="loader.formattedProgress.value" :status="loader.status.value"/>
    <VModal v-model:open="isModalOpen" strict>
      <template #trigger="{ open }">
        <VButton variant="secondary"
          iconLeft="info"
          @click="open">
          Open Modal
        </VButton>
      </template>
      <template #default="{ close }">
        modal contents
        <VButton @click="close">Close</VButton>
      </template>
    </VModal>
  </div>
</template>
