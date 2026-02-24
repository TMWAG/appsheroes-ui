import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VLoader from './VLoader.vue';

const meta = {
  component: VLoader,
  title: 'Components/Loader',
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['loading', 'success', 'error']
    },
    progress: {
      control: { type: 'range', min: 0, max: 100 }
    },
  },
  render: (args) => ({
    components: { VLoader },
    setup() {
      return { args };
    },
    template: `<VLoader v-bind="args"/>`,
  }),
} satisfies Meta<typeof VLoader>;

export default meta;

export const Default: StoryObj = {
  args: {
    progress: 50
  }
};

export const Infinite: StoryObj = {
  args: {
    infinite: true
  }
};

export const WithPercentage: StoryObj = {
  args: {
    progress: 75,
    showPercentage: true
  }
};

export const WithLabel: StoryObj = {
  args: {
    progress: 30,
    label: 'Загрузка файла...',
    hint: 'Осталось 2 MB'
  }
};

export const Success: StoryObj = {
  args: {
    status: 'success',
    progress: 100
  }
};

export const Error: StoryObj = {
  args: {
    status: 'error'
  }
};
