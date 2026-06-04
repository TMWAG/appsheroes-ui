import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed } from 'vue';
import { mapArgsToAttrs } from '@/shared/ui/helpers/storybook-ce';
import { vChipVariants } from './VChip.story-args';
import { iconNames } from '@/shared/ui/VIcon/supportedIconMap';

const meta = {
  title: 'Custom Elements/Chip',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'negative', 'info', 'positive'],
    },
    removable: { control: 'boolean' },
    iconLeft: { control: 'select', options: iconNames },
    iconRight: { control: 'select', options: iconNames },
    default: { control: 'text' },
  },
  render: (args) => ({
    setup() {
      const attrs = computed(() => mapArgsToAttrs(args));
      return { args, attrs };
    },
    template: '<v-chip v-bind="attrs">{{ args.default }}</v-chip>',
  }),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: vChipVariants.Default };
export const DefaultRemovable: Story = { args: vChipVariants.DefaultRemovable };
export const DefaultIconLeft: Story = { args: vChipVariants.DefaultIconLeft };
export const DefaultIconRight: Story = { args: vChipVariants.DefaultIconRight };
export const DefaultBothIcons: Story = { args: vChipVariants.DefaultBothIcons };
export const DefaultRemovableIconLeft: Story = { args: vChipVariants.DefaultRemovableIconLeft };
export const DefaultRemovableIconRight: Story = { args: vChipVariants.DefaultRemovableIconRight };
export const DefaultRemovableBothIcons: Story = { args: vChipVariants.DefaultRemovableBothIcons };
export const Accent: Story = { args: vChipVariants.Accent };
export const AccentRemovable: Story = { args: vChipVariants.AccentRemovable };
export const AccentIconLeft: Story = { args: vChipVariants.AccentIconLeft };
export const AccentIconRight: Story = { args: vChipVariants.AccentIconRight };
export const AccentBothIcons: Story = { args: vChipVariants.AccentBothIcons };
export const AccentRemovableIconLeft: Story = { args: vChipVariants.AccentRemovableIconLeft };
export const AccentRemovableIconRight: Story = { args: vChipVariants.AccentRemovableIconRight };
export const AccentRemovableBothIcons: Story = { args: vChipVariants.AccentRemovableBothIcons };
export const Negative: Story = { args: vChipVariants.Negative };
export const NegativeRemovable: Story = { args: vChipVariants.NegativeRemovable };
export const NegativeIconLeft: Story = { args: vChipVariants.NegativeIconLeft };
export const NegativeIconRight: Story = { args: vChipVariants.NegativeIconRight };
export const NegativeBothIcons: Story = { args: vChipVariants.NegativeBothIcons };
export const NegativeRemovableIconLeft: Story = { args: vChipVariants.NegativeRemovableIconLeft };
export const NegativeRemovableIconRight: Story = { args: vChipVariants.NegativeRemovableIconRight };
export const NegativeRemovableBothIcons: Story = { args: vChipVariants.NegativeRemovableBothIcons };
export const Positive: Story = { args: vChipVariants.Negative };
export const PositiveRemovable: Story = { args: vChipVariants.NegativeRemovable };
export const PositiveIconLeft: Story = { args: vChipVariants.NegativeIconLeft };
export const PositiveIconRight: Story = { args: vChipVariants.NegativeIconRight };
export const PositiveBothIcons: Story = { args: vChipVariants.NegativeBothIcons };
export const PositiveRemovableIconLeft: Story = { args: vChipVariants.NegativeRemovableIconLeft };
export const PositiveRemovableIconRight: Story = { args: vChipVariants.NegativeRemovableIconRight };
export const PositiveRemovableBothIcons: Story = { args: vChipVariants.NegativeRemovableBothIcons };
