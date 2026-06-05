import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import VIcon from './VIcon.vue';

vi.mock('@/shared/lib/icon-config', () => ({
  getIconSpriteUrl: vi.fn((defaultUrl: string) => defaultUrl),
  configure: vi.fn(),
}));

describe('VIcon', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders an svg with a use element pointing to the sprite', () => {
    const wrapper = mount(VIcon, {
      props: { name: 'check' },
    });
    const use = wrapper.find('use');
    expect(use.attributes('href')).toContain('#check-square');
  });

  it('maps icon names through supportedIconMap', () => {
    const wrapper = mount(VIcon, {
      props: { name: 'x' },
    });
    expect(wrapper.find('use').attributes('href')).toContain('#x-lg');
  });

  it('sets aria-label and exposes icon when ariaLabel is provided', () => {
    const wrapper = mount(VIcon, {
      props: { name: 'info', ariaLabel: 'Information' },
    });
    const svg = wrapper.find('svg');
    expect(svg.attributes('aria-label')).toBe('Information');
    expect(svg.attributes('aria-hidden')).toBeUndefined();
  });

  it('marks icon as decorative when ariaLabel is not provided', () => {
    const wrapper = mount(VIcon, {
      props: { name: 'settings' },
    });
    const svg = wrapper.find('svg');
    expect(svg.attributes('aria-hidden')).toBe('true');
    expect(svg.attributes('aria-label')).toBeUndefined();
  });

  it('applies className to the svg element', () => {
    const wrapper = mount(VIcon, {
      props: { name: 'download', className: 'custom-icon' },
    });
    const svg = wrapper.find('svg');
    expect(svg.classes()).toContain('custom-icon');
    expect(svg.classes()).toContain('bi');
  });

  it('uses the overridden URL when config is set', async () => {
    const { getIconSpriteUrl } = await import('@/shared/lib/icon-config');
    vi.mocked(getIconSpriteUrl).mockReturnValue('/custom-sprites.svg');
    const wrapper = mount(VIcon, {
      props: { name: 'archive' },
    });
    expect(wrapper.find('use').attributes('href')).toBe('/custom-sprites.svg#archive');
  });
});
