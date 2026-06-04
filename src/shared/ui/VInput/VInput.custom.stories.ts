import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed } from 'vue';
import { mapArgsToAttrs } from '@/shared/ui/helpers/storybook-ce';
import vInputVariants from './VInput.story-args';

const meta = {
  title: 'Custom Elements/Input',
  tags: ['autodocs'],
  render: (args) => ({
    setup() {
      const attrs = computed(() => mapArgsToAttrs(args));
      return { args, attrs };
    },
    template: '<v-input v-bind="attrs"/>',
  }),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: vInputVariants.Default };
export const Filled: Story = { args: vInputVariants.Filled };
export const Resettable: Story = { args: vInputVariants.Resettable };
export const Caption: Story = { args: vInputVariants.Caption };
export const Error: Story = { args: vInputVariants.Error };
export const ErrorAndCaption: Story = { args: vInputVariants.ErrorAndCaption };
