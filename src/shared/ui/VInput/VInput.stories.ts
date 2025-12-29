import type { Meta, StoryObj } from "@storybook/vue3-vite";
import VInput from "./VInput.vue";

const meta = {
  component: VInput,
  title: 'Components/Input',
  render: (args) => ({
    components: { VInput },
    setup() {
      return { args };
    },
    template: '<VInput v-bind="args"/>',
  })
} satisfies Meta<typeof VInput>

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'input',
    name: 'test',
  },
};

export const Filled: Story = {
  args: {
    label: 'Label',
    name: 'test',
    value: 'Value'
  }
};

export const Resettable: Story = {
  args: {
    ...Default.args,
    resettable: true,
    value: 'value',
    }
}

export const Caption: Story = {
  args: {
    label: 'Label',
    name: 'test',
    caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quae nesciunt maiores aliquid, hic earum dicta, iste laborum doloribus sed praesentium inventore ipsa omnis voluptate sapiente natus recusandae pariatur libero.',
  },
};

export const Error: Story = {
  args: {
    label: 'Label',
    name: 'test',
    error: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quae nesciunt maiores aliquid, hic earum dicta, iste laborum doloribus sed praesentium inventore ipsa omnis voluptate sapiente natus recusandae pariatur libero.'
  },
};

export const ErrorAndCaption: Story = {
  args: {
    label: 'Label',
    name: 'test',
    caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quae nesciunt maiores aliquid, hic earum dicta, iste laborum doloribus sed praesentium inventore ipsa omnis voluptate sapiente natus recusandae pariatur libero.',
    error: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quae nesciunt maiores aliquid, hic earum dicta, iste laborum doloribus sed praesentium inventore ipsa omnis voluptate sapiente natus recusandae pariatur libero.'
  }
}
