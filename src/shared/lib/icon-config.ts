declare global {
  interface Window {
    __APPSHEROES_ICON_SPRITE_URL__?: string;
  }
}

let customUrl: string | null = null;

export function configure({ iconSpriteUrl }: { iconSpriteUrl: string }): void {
  customUrl = iconSpriteUrl;
}

export function getIconSpriteUrl(defaultUrl: string): string {
  if (typeof window !== 'undefined' && window.__APPSHEROES_ICON_SPRITE_URL__) {
    return window.__APPSHEROES_ICON_SPRITE_URL__;
  }
  return customUrl ?? defaultUrl;
}
