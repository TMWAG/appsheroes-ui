import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed } from 'vue';
import { vButtonVariants } from './VButton.story-args';
import { mapArgsToAttrs } from '@/shared/ui/helpers/storybook-ce';
import { supportedIconMap } from '@/shared/ui/VIcon/supportedIconMap';

const iconNames = Object.keys(supportedIconMap);

const meta = {
  title: 'Custom Elements/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'negative'],
    },
    disabled: { control: 'boolean' },
    icon: { control: 'select', options: iconNames },
    iconLeft: { control: 'select', options: iconNames },
    iconRight: { control: 'select', options: iconNames },
    href: { control: 'text' },
    isLoading: { control: 'boolean' },
    default: { control: 'text' },
  },
  render: (args) => ({
    setup() {
      const attrs = computed(() => mapArgsToAttrs(args));
      return { args, attrs };
    },
    template: '<v-button v-bind="attrs">{{ args.default }}</v-button>',
  }),
} satisfies Meta;

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
