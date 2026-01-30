import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VButton from './VButton.vue';

const meta = {
  component: VButton,
  title: 'Components/Button',
  tags: ['autodocs'],
  render: (args) => ({
    components: { VButton },
    setup() {
      return { args };
    },
    template: '<VButton v-bind="args">{{args.default}}</VButton>',
  }),
} satisfies Meta<typeof VButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    default: 'Button',
  },
};

export const PrimaryDisable: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    default: 'Button',
  },
};

export const SecondaryDisable: Story = {
  args: {
    ...Secondary.args,
    disabled: true,
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    default: 'Button',
  },
};

export const TertiaryDisable: Story = {
  args: {
    ...Tertiary.args,
    disabled: true,
  },
};

export const Negative: Story = {
  args: {
    variant: 'negative',
    default: 'Button',
  },
};

export const NegativeDisable: Story = {
  args: {
    ...Negative.args,
    disabled: true,
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'primary',
    icon: 'plus',
  },
};

export const IconLeft: Story = {
  args: {
    ...Primary.args,
    iconLeft: 'plus',
  },
};

export const IconRight: Story = {
  args: {
    ...Primary.args,
    iconRight: 'plus',
  },
};

export const BothIcons: Story = {
  args: {
    ...Primary.args,
    iconLeft: 'plus',
    iconRight: 'plus',
  },
};
