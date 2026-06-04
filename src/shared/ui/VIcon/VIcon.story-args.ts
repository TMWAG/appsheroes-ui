import type { Meta, StoryObj } from "@storybook/vue3-vite"
import type VIcon from "./VIcon.vue"

type IconStoryArgs = StoryObj<Meta<typeof VIcon>>['args'];

export class vIconVariants {
  static Archive = {
    name: 'archive',
  } satisfies IconStoryArgs;

  static Calendar = {
    name: 'calendar',
  } satisfies IconStoryArgs;

  static Check = {
    name: 'check',
  } satisfies IconStoryArgs;

  static Chevron = {
    name: 'chevron',
  } satisfies IconStoryArgs;

  static Copy = {
    name: 'copy',
  } satisfies IconStoryArgs;

  static Download = {
    name: 'download',
  } satisfies IconStoryArgs;

  static Downloads = {
    name: 'downloads',
  } satisfies IconStoryArgs;

  static Error = {
    name: 'error',
  } satisfies IconStoryArgs;

  static Filter = {
    name: 'filter',
  } satisfies IconStoryArgs;

  static Info = {
    name: 'info',
  } satisfies IconStoryArgs;

  static iOS = {
    name: 'ios',
  } satisfies IconStoryArgs;

  static Link = {
    name: 'link',
  } satisfies IconStoryArgs;

  static Locked = {
    name: 'locked',
  } satisfies IconStoryArgs;

  static New = {
    name: 'new',
  } satisfies IconStoryArgs;

  static Plus = {
    name: 'plus',
  } satisfies IconStoryArgs;

  static Settings = {
    name: 'settings',
  } satisfies IconStoryArgs;

  static Size = {
    name: 'size',
  } satisfies IconStoryArgs;

  static Square = {
    name: 'square',
  } satisfies IconStoryArgs;

  static Stats = {
    name: 'stats',
  } satisfies IconStoryArgs;

  static Success = {
    name: 'success',
  } satisfies IconStoryArgs;

  static Top = {
    name: 'top',
  } satisfies IconStoryArgs;

  static Trash = {
    name: 'trash',
  } satisfies IconStoryArgs;

  static Upload = {
    name: 'upload',
  } satisfies IconStoryArgs;

  static X = {
    name: 'x',
  } satisfies IconStoryArgs;
}
