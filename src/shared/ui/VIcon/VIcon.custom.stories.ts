import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed } from 'vue';
import { mapArgsToAttrs } from '@/shared/ui/helpers/storybook-ce';
import { vIconVariants } from './VIcon.story-args';
import { iconNames } from '@/shared/ui/VIcon/supportedIconMap';

const meta = {
  title: 'Custom Elements/Icon',
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: iconNames },
  },
  render: (args) => ({
    setup() {
      const attrs = computed(() => mapArgsToAttrs(args));
      return { args, attrs };
    },
    template: '<v-icon v-bind="attrs"/>'
  }),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Archive: Story = { args: vIconVariants.Archive };
export const Calendar: Story = { args: vIconVariants.Calendar };
export const Check: Story = { args: vIconVariants.Check };
export const Chevron: Story = { args: vIconVariants.Chevron };
export const Copy: Story = { args: vIconVariants.Copy };
export const Download: Story = { args: vIconVariants.Download };
export const Downloads: Story = { args: vIconVariants.Downloads };
export const Error: Story = { args: vIconVariants.Error };
export const Filter: Story = { args: vIconVariants.Filter };
export const Info: Story = { args: vIconVariants.Info };
export const iOS: Story = { args: vIconVariants.iOS };
export const Link: Story = { args: vIconVariants.Link };
export const Locked: Story = { args: vIconVariants.Locked };
export const Plus: Story = { args: vIconVariants.Plus };
export const Settings: Story = { args: vIconVariants.Settings };
export const Size: Story = { args: vIconVariants.Size };
export const Square: Story = { args: vIconVariants.Square };
export const Stats: Story = { args: vIconVariants.Stats };
export const Success: Story = { args: vIconVariants.Success };
export const Top: Story = { args: vIconVariants.Top };
export const Trash: Story = { args: vIconVariants.Trash };
export const Upload: Story = { args: vIconVariants.Upload };
export const X: Story = { args: vIconVariants.X };
