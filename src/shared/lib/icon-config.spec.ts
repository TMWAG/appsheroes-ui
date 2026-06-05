import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('icon-config', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('returns the default URL when no override is set', async () => {
    const { getIconSpriteUrl } = await import('./icon-config');
    expect(getIconSpriteUrl('/default.svg')).toBe('/default.svg');
  });

  it('returns the overridden URL after configure() is called', async () => {
    const { configure, getIconSpriteUrl } = await import('./icon-config');
    configure({ iconSpriteUrl: '/custom.svg' });
    expect(getIconSpriteUrl('/default.svg')).toBe('/custom.svg');
  });

  it('uses the last value when configure() is called multiple times', async () => {
    const { configure, getIconSpriteUrl } = await import('./icon-config');
    configure({ iconSpriteUrl: '/first.svg' });
    configure({ iconSpriteUrl: '/second.svg' });
    expect(getIconSpriteUrl('/default.svg')).toBe('/second.svg');
  });

  it('returns the default URL when called before configure()', async () => {
    const { getIconSpriteUrl, configure } = await import('./icon-config');
    expect(getIconSpriteUrl('/fallback.svg')).toBe('/fallback.svg');
    configure({ iconSpriteUrl: '/custom.svg' });
    expect(getIconSpriteUrl('/fallback.svg')).toBe('/custom.svg');
  });

  it('returns empty string when configure() is called with empty string', async () => {
    const { configure, getIconSpriteUrl } = await import('./icon-config');
    configure({ iconSpriteUrl: '' });
    expect(getIconSpriteUrl('/default.svg')).toBe('');
  });
});
