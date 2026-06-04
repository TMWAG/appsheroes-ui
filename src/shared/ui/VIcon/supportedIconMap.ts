export const supportedIconMap = {
  archive: 'archive',
  calendar: 'calendar3',
  chevron: 'chevron-down',
  copy: 'copy',
  download: 'file-earmark-arrow-down',
  downloads: 'download',
  error: 'exclamation-lg',
  filter: 'funnel',
  info: 'info-lg',
  ios: 'apple',
  link: 'link-45deg',
  locked: 'shield-lock',
  new: 'stars',
  plus: 'plus-lg',
  settings: 'gear',
  size: 'boxes',
  stats: 'graph-up-arrow',
  success: 'check-lg',
  top: 'arrow-up-right',
  trash: 'trash3',
  upload: 'file-earmark-arrow-up',
  x: 'x-lg',
  square: 'square',
  check: 'check-square',
} as const;

export const iconNames = Object.keys(supportedIconMap);

export type IconNames = keyof typeof supportedIconMap;
