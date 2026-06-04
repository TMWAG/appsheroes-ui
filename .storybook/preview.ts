import type { Preview } from '@storybook/vue3-vite';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { App } from 'vue';
import { defineCustomElement } from 'vue';

import '@/shared/styles/index.scss';

import VButtonCE from '@/shared/ui/VButton/VButton.vue?custom-element';
import VChipCE from '@/shared/ui/VChip/VChip.vue?custom-element';
import VIconCE from '@/shared/ui/VIcon/VIcon.vue?custom-element';
import VInputCE from '@/shared/ui/VInput/VInput.vue?custom-element';
import VLoaderCE from '@/shared/ui/VLoader/VLoader.vue?custom-element';
import VModalCE from '@/shared/ui/VModal/VModal.vue?custom-element';
import VSelectCE from '@/shared/ui/VSelect/VSelect.vue?custom-element';
import VTooltipCE from '@/shared/ui/VTooltip/VTooltip.vue?custom-element';
import VirtualScrollCE from '@/shared/ui/VirtualScroll/VirtualScroll.vue?custom-element';

const ceRegistrations: Array<[string, ReturnType<typeof defineCustomElement>]> = [
  ['v-button', defineCustomElement(VButtonCE)],
  ['v-chip', defineCustomElement(VChipCE)],
  ['v-icon', defineCustomElement(VIconCE)],
  ['v-input', defineCustomElement(VInputCE)],
  ['v-loader', defineCustomElement(VLoaderCE)],
  ['v-modal', defineCustomElement(VModalCE)],
  ['v-select', defineCustomElement(VSelectCE as never)],
  ['v-tooltip', defineCustomElement(VTooltipCE)],
  ['v-virtual-scroll', defineCustomElement(VirtualScrollCE as never)],
];

for (const [tag, ceClass] of ceRegistrations) {
  if (!customElements.get(tag)) {
    customElements.define(tag, ceClass);
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}

export const setup = (app: App) => {
  app.config.compilerOptions.isCustomElement = (tag: string) =>
    tag.startsWith('v-');
};

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
}

export default preview
