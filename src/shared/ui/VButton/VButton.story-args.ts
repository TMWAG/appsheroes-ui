import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VButton from './VButton.vue';

type ButtonStoryArgs = StoryObj<Meta<typeof VButton>>['args'];

export const vButtonVariants = {
  Primary: {
    variant: 'primary',
    default: 'Button',
  } satisfies ButtonStoryArgs,

  PrimaryDisable: {
    variant: 'primary',
    default: 'Button',
    disabled: true,
  } satisfies ButtonStoryArgs,

  Secondary: {
    variant: 'secondary',
    default: 'Button',
  } satisfies ButtonStoryArgs,

  SecondaryDisable: {
    variant: 'secondary',
    default: 'Button',
    disabled: true,
  } satisfies ButtonStoryArgs,

  Tertiary: {
    variant: 'tertiary',
    default: 'Button',
  } satisfies ButtonStoryArgs,

  TertiaryDisable: {
    variant: 'tertiary',
    default: 'Button',
    disabled: true,
  } satisfies ButtonStoryArgs,

  Negative: {
    variant: 'negative',
    default: 'Button',
  } satisfies ButtonStoryArgs,

  NegativeDisable: {
    variant: 'negative',
    default: 'Button',
    disabled: true,
  } satisfies ButtonStoryArgs,

  IconOnly: {
    variant: 'primary',
    icon: 'plus',
  } satisfies ButtonStoryArgs,

  IconLeft: {
    variant: 'primary',
    default: 'Button',
    iconLeft: 'plus',
  } satisfies ButtonStoryArgs,

  IconRight: {
    variant: 'primary',
    default: 'Button',
    iconRight: 'plus',
  } satisfies ButtonStoryArgs,

  BothIcons: {
    variant: 'primary',
    default: 'Button',
    iconLeft: 'plus',
    iconRight: 'plus',
  } satisfies ButtonStoryArgs,
} as const;
