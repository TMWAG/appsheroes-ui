import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VSelect, { type SelectOption } from './VSelect.vue';

const meta = {
  component: VSelect,
  title: 'Components/Select',
  tags: ['autodocs'],
  render: (args) => ({
    components: { VSelect },
    setup() {
      return { args };
    },
    template: '<VSelect v-bind="args" v-model="args.modelValue"/>',
  }),
} satisfies Meta<typeof VSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
      { value: '1', label: 'first', notice: '1' },
      { value: '2', label: 'second', notice: '2' },
      { value: '3', label: 'third', notice: '3' },
      { value: '4', label: 'forth', notice: '4' },
      { value: '5', label: 'fifth', notice: '5' },
      { value: '6', label: 'sixth', notice: '6' },
      { value: '7', label: 'seventh', notice: '7' },
      { value: '8', label: 'eight', notice: '8' },
    ] satisfies SelectOption[];

export const Default: Story = {
  args: {
    label: 'select',
    options,
    name: 'select',
    modelValue: [],
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    modelValue: ['1'],
  },
};

export const Multiple: Story = {
  args: {
    ...Default.args,
    modelValue: ['1', '2', '5'],
    multiple: true,
  },
};

export const Resettable: Story = {
  args: {
    ...Default.args,
    resettable: true,
  },
};

export const MultipleResettable: Story = {
  args: {
    ...Multiple.args,
    resettable: true,
  },
};

