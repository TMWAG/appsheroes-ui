import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VButton from './VButton.vue';
import { vButtonVariants } from './VButton.story-args';

const meta = {
  component: VButton,
  title: 'Vue/Button',
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

export const Primary: Story = { args: vButtonVariants.Primary };
export const PrimaryDisable: Story = { args: vButtonVariants.PrimaryDisable };
export const Secondary: Story = { args: vButtonVariants.Secondary };
export const SecondaryDisable: Story = { args: vButtonVariants.SecondaryDisable };
export const Tertiary: Story = { args: vButtonVariants.Tertiary };
export const TertiaryDisable: Story = { args: vButtonVariants.TertiaryDisable };
export const Negative: Story = { args: vButtonVariants.Negative };
export const NegativeDisable: Story = { args: vButtonVariants.NegativeDisable };
export const IconOnly: Story = { args: vButtonVariants.IconOnly };
export const IconLeft: Story = { args: vButtonVariants.IconLeft };
export const IconRight: Story = { args: vButtonVariants.IconRight };
export const BothIcons: Story = { args: vButtonVariants.BothIcons };
