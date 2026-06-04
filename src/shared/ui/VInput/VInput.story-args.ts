import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VInput from './VInput.vue';

type InputStoryArgs = StoryObj<Meta<typeof VInput>>['args'];

export default class vInputVariants {
  static Default = {
    label: 'label',
    name: 'name',
  } satisfies InputStoryArgs;

  static Filled = {
    ...this.Default,
    value: 'Value',
  } satisfies InputStoryArgs;

  static Resettable = {
    ...this.Filled,
    resettable: true,
  } satisfies InputStoryArgs;

  static Caption = {
    ...this.Default,
    caption: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quae nesciunt maiores aliquid, hic earum dicta, iste laborum doloribus sed praesentium inventore ipsa omnis voluptate sapiente natus recusandae pariatur libero.',
  } satisfies InputStoryArgs;

  static Error = {
    ...this.Default,
    error: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quae nesciunt maiores aliquid, hic earum dicta, iste laborum doloribus sed praesentium inventore ipsa omnis voluptate sapiente natus recusandae pariatur libero.',
  } satisfies InputStoryArgs;

  static ErrorAndCaption = {
    ...this.Caption,
    ...this.Error,
  } satisfies InputStoryArgs;
}
