import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VTooltip from './VTooltip.vue';

const meta = {
  component: VTooltip,
  title: 'Components/Tooltip',
  tags: ['autodocs'],
  render: (args) => ({
    components: { VTooltip },
    setup() {
      return { args };
    },
    template:
      '<VTooltip v-bind="args">{{args.default}}<template #content>{{args.content}}</template></VTooltip>',
  }),
} satisfies Meta<typeof VTooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Left: Story = {
  args: {
    default: 'tooltip trigger',
    content: 'tooltip',
    placement: 'left',
  },
};

export const Top: Story = {
  args: {
    default: 'tooltip trigger',
    content: 'tooltip',
    placement: 'top',
  },
};

export const Bottom: Story = {
  args: {
    default: 'tooltip trigger',
    content: 'tooltip',
    placement: 'bottom',
  },
};

export const Right: Story = {
  args: {
    default: 'tooltip trigger',
    content: 'tooltip',
    placement: 'right',
  },
};
