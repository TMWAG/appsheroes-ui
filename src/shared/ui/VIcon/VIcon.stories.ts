import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VIcon from './VIcon.vue';

const meta = {
  component: VIcon,
  title: 'Components/Icon',
  tags: ['autodocs'],
  render: (args) => ({
    components: { VIcon },
    setup() {
      return { args };
    },
    template: '<VIcon v-bind="args"/>',
  }),
} satisfies Meta<typeof VIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Archive: Story = {
  args: {
    name: 'archive',
  },
};

export const Calendar: Story = {
  args: {
    name: 'calendar',
  },
};

export const Chevron: Story = {
  args: {
    name: 'chevron',
  },
};

export const Copy: Story = {
  args: {
    name: 'copy',
  },
};

export const Download: Story = {
  args: {
    name: 'download',
  },
};

export const Downloads: Story = {
  args: {
    name: 'downloads',
  },
};

export const Error: Story = {
  args: {
    name: 'error',
  },
};

export const Filter: Story = {
  args: {
    name: 'filter',
  },
};

export const Info: Story = {
  args: {
    name: 'info',
  },
};

export const Ios: Story = {
  args: {
    name: 'ios',
  },
};

export const Link: Story = {
  args: {
    name: 'link',
  },
};

export const Locked: Story = {
  args: {
    name: 'locked',
  },
};

export const New: Story = {
  args: {
    name: 'new',
  },
};

export const Plus: Story = {
  args: {
    name: 'plus',
  },
};

export const Settings: Story = {
  args: {
    name: 'settings',
  },
};

export const Size: Story = {
  args: {
    name: 'size',
  },
};

export const Stats: Story = {
  args: {
    name: 'stats',
  },
};

export const Success: Story = {
  args: {
    name: 'success',
  },
};

export const Top: Story = {
  args: {
    name: 'top',
  },
};

export const Trash: Story = {
  args: {
    name: 'trash',
  },
};

export const Upload: Story = {
  args: {
    name: 'upload',
  },
};

export const X: Story = {
  args: {
    name: 'x',
  },
};
