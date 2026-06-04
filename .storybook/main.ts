import type { StorybookConfig } from '@storybook/vue3-vite';
import vue from '@vitejs/plugin-vue';
import fs from 'node:fs';
import type { Plugin } from 'vite';

const ceSuffix = '.ce.vue';

function customElementsResolver(): Plugin {
  return {
    name: 'vite:custom-elements-resolver',
    enforce: 'pre',
    async resolveId(id, importer) {
      if (!id.includes('?custom-element')) return;
      const bareId = id.replace('?custom-element', '');
      const resolved = await this.resolve(bareId, importer, { skipSelf: true });
      if (resolved) {
        return resolved.id.replace(/\.vue$/, ceSuffix);
      }
    },
    load(id) {
      if (id.endsWith(ceSuffix)) {
        const sourcePath = id.replace(ceSuffix, '.vue');
        this.addWatchFile(sourcePath);
        return fs.readFileSync(sourcePath, 'utf-8');
      }
    },
  };
}

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes",
  ],
  "framework": {
    "name": "@storybook/vue3-vite",
    "options": {
      docgen: 'vue-component-meta',
    }
  },
  async viteFinal(config) {
    const plugins = (config.plugins ?? []).filter(
      (p) => p && 'name' in p && p.name !== 'vite:vue',
    );
    return {
      ...config,
      plugins: [
        customElementsResolver(),
        ...plugins,
        vue(),
      ],
    };
  },
};
export default config;
