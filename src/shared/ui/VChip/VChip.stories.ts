import type { Meta, StoryObj } from "@storybook/vue3-vite";
import VChip from "./VChip.vue";

const meta = {
  component: VChip,
  title: 'Components/Chip',
  tags: ['autodocs'],
  render: (args) => ({
    components: { VChip },
    setup() {
      return { args };
    },
    template: '<VChip v-bind="args">{{args.default}}</VChip>',
  })

} satisfies Meta<typeof VChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    default: 'Chip',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    default: 'Chip',
  },
};

export const Negative: Story = {
  args: {
    variant: 'negative',
    default: 'Chip',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    default: 'Chip',
  },
};

export const Positive: Story = {
  args: {
    variant: 'positive',
    default: 'Chip',
  },
};

export const RemovableDefault: Story = {
  args: {
    ...Default.args,
    removable: true,
  },
};

export const RemovableAccent: Story = {
  args: {
    ...Accent.args,
    removable: true,
  },
};

export const RemovableNegative: Story = {
  args: {
    ...Negative.args,
    removable: true,
  },
};

export const RemovableInfo: Story = {
  args: {
    ...Info.args,
    removable: true,
  },
};

export const RemovablePositive: Story = {
  args: {
    ...Positive.args,
    removable: true,
  },
};

export const IconLeft: Story = {
  args: {
    ...Default.args,
    iconLeft: 'archive',
  },
};

export const IconRight: Story = {
  args: {
    ...Default.args,
    iconRight: 'info',
  },
};

export const BothIcons: Story = {
  args: {
    ...Default.args,
    iconLeft: 'archive',
    iconRight: 'archive',
  }
}

export const BothIconsRemovable: Story = {
  args: {
    ...BothIcons.args,
    removable: true,
  }
}
