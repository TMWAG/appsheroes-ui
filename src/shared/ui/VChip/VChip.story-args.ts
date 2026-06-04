import type { Meta, StoryObj } from '@storybook/vue3-vite';
import VChip from './VChip.vue';

type ChipStoryArgs = StoryObj<Meta<typeof VChip>>['args'];

export class vChipVariants {
  static Default = {
    variant: 'default',
    default: 'chip',
  } satisfies ChipStoryArgs;

  static DefaultRemovable = {
      ...this.Default,
      removable: true,
  } satisfies ChipStoryArgs;

  static DefaultIconLeft = {
    ...this.Default,
    iconLeft: 'archive',
  } satisfies ChipStoryArgs;

  static DefaultIconRight = {
    ...this.Default,
    iconRight: 'archive',
  } satisfies ChipStoryArgs;

  static DefaultBothIcons = {
    ...this.DefaultIconLeft,
    iconRight: 'archive',
  } satisfies ChipStoryArgs;

  static DefaultRemovableIconLeft = {
    ...this.DefaultRemovable,
    iconLeft: 'archive',
  } satisfies ChipStoryArgs;

  static DefaultRemovableIconRight = {
    ...this.DefaultRemovable,
    iconRight: 'archive',
  } satisfies ChipStoryArgs;

  static DefaultRemovableBothIcons = {
    ...this.DefaultRemovable,
    iconLeft: 'archive',
    iconRight: 'archive',
  } satisfies ChipStoryArgs;

  static Accent = {
    ...this.Default,
    variant: 'accent',
  } satisfies ChipStoryArgs;

  static AccentRemovable = {
    ...this.DefaultRemovable,
    ...this.Accent,
  } satisfies ChipStoryArgs;

  static AccentIconLeft = {
    ...this.DefaultIconLeft,
    ...this.Accent,
  } satisfies ChipStoryArgs;

  static AccentIconRight = {
    ...this.DefaultIconRight,
    ...this.Accent,
  } satisfies ChipStoryArgs;

  static AccentBothIcons = {
    ...this.DefaultBothIcons,
    ...this.Accent,
  } satisfies ChipStoryArgs;

  static AccentRemovableIconLeft = {
    ...this.DefaultRemovable,
    ...this.AccentIconLeft,
  } satisfies ChipStoryArgs;

  static AccentRemovableIconRight = {
    ...this.DefaultRemovable,
    ...this.AccentIconRight,
  } satisfies ChipStoryArgs;

  static AccentRemovableBothIcons = {
    ...this.DefaultRemovable,
    ...this.AccentBothIcons,
  } satisfies ChipStoryArgs;

  static Negative = {
    ...this.Default,
    variant: 'negative',
  } satisfies ChipStoryArgs;

  static NegativeRemovable = {
    ...this.DefaultRemovable,
    ...this.Negative,
  } satisfies ChipStoryArgs;

  static NegativeIconLeft = {
    ...this.DefaultIconLeft,
    ...this.Negative,
  } satisfies ChipStoryArgs;

  static NegativeIconRight = {
    ...this.DefaultIconRight,
    ...this.Negative,
  } satisfies ChipStoryArgs;

  static NegativeBothIcons = {
    ...this.DefaultBothIcons,
    ...this.Negative,
  } satisfies ChipStoryArgs;

  static NegativeRemovableIconLeft = {
    ...this.DefaultRemovableIconLeft,
    ...this.Negative,
  } satisfies ChipStoryArgs;

  static NegativeRemovableIconRight = {
    ...this.DefaultRemovableIconRight,
    ...this.Negative,
  } satisfies ChipStoryArgs;

  static NegativeRemovableBothIcons = {
    ...this.DefaultRemovableBothIcons,
    ...this.Negative,
  } satisfies ChipStoryArgs;

  static Info = {
    ...this.Default,
    variant: 'info',
  } satisfies ChipStoryArgs;

  static InfoRemovable = {
    ...this.DefaultRemovable,
    ...this.Info,
  } satisfies ChipStoryArgs;

  static InfoIconLeft = {
    ...this.DefaultIconLeft,
    ...this.Info,
  } satisfies ChipStoryArgs;

  static InfoIconRight = {
    ...this.DefaultIconRight,
    ...this.Info,
  } satisfies ChipStoryArgs;

  static InfoBothIcons = {
    ...this.DefaultBothIcons,
    ...this.Info,
  } satisfies ChipStoryArgs;

  static InfoRemovableIconLeft = {
    ...this.DefaultRemovableIconLeft,
    ...this.Info,
  } satisfies ChipStoryArgs;

  static InfoRemovableIconRight = {
    ...this.DefaultRemovableIconRight,
    ...this.Info,
  } satisfies ChipStoryArgs;

  static InfoRemovableBothIcons = {
    ...this.DefaultRemovableBothIcons,
    ...this.Info,
  } satisfies ChipStoryArgs;

  static Positive = {
    ...this.Default,
    variant: 'positive',
  } satisfies ChipStoryArgs;

  static PositiveRemovable = {
    ...this.DefaultRemovable,
    ...this.Positive,
  } satisfies ChipStoryArgs;

  static PositiveIconLeft = {
    ...this.DefaultIconLeft,
    ...this.Positive,
  } satisfies ChipStoryArgs;

  static PositiveIconRight = {
    ...this.DefaultIconRight,
    ...this.Positive,
  } satisfies ChipStoryArgs;

  static PositiveBothIcons = {
    ...this.DefaultBothIcons,
    ...this.Positive,
  } satisfies ChipStoryArgs;

  static PositiveRemovableIconLeft = {
    ...this.DefaultRemovableIconLeft,
    ...this.Positive,
  } satisfies ChipStoryArgs;

  static PositiveRemovableIconRight = {
    ...this.DefaultRemovableIconRight,
    ...this.Positive,
  } satisfies ChipStoryArgs;

  static PositiveRemovableBothIcons = {
    ...this.DefaultRemovableBothIcons,
    ...this.Positive,
  } satisfies ChipStoryArgs;
}
