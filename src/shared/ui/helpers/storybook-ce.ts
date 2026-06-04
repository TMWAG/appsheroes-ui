import type { Args } from '@storybook/vue3-vite';

function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function mapArgsToAttrs(args: Args): Record<string, unknown> {
  const attrs: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(args)) {
    if (key === 'default' || value === undefined || value === null) {
      continue;
    }
    if (typeof value === 'boolean') {
      if (value) {
        attrs[camelToKebab(key)] = '';
      }
    } else {
      attrs[camelToKebab(key)] = value;
    }
  }

  return attrs;
}
