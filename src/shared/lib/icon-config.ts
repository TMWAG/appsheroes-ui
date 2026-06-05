let customUrl: string | null = null;

declare global {
  interface Window {
    __APPSHEROES_ICON_SPRITE_URL__?: string;
  }
}

if (typeof window !== 'undefined' && window.__APPSHEROES_ICON_SPRITE_URL__) {
  customUrl = window.__APPSHEROES_ICON_SPRITE_URL__;
}

export function configure({ iconSpriteUrl }: { iconSpriteUrl: string }): void {
  customUrl = iconSpriteUrl;
}

export function getIconSpriteUrl(defaultUrl: string): string {
  return customUrl ?? defaultUrl;
}
