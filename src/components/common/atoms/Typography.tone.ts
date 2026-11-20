import type { CSSProperties } from 'react';

import { type ColorToken, token } from 'styled-system/tokens';

export const typographyTones = {
  accent: { color: 'accent' },
  error: { color: 'error' },
  inherit: { color: 'inherit' },
  primary: { color: 'var(--color-text-primary)' },
  inverse: { color: 'var(--color-text-inverse)' },
  brand: { color: 'var(--color-text-brand)' },
  subtle: { color: 'var(--color-text-subtle)' },
  disabled: { color: 'var(--color-text-disabled)' },
  tertiary: { color: 'var(--color-text-tertiary)' },
  black40: { color: 'var(--color-black-40)' },
  black20: { color: 'var(--color-black-20)' },
  black10: { color: 'var(--color-black-10)' },
  red80: { color: 'var(--color-red-80)' },
} as const;

type NamedTone = keyof typeof typographyTones;

export type TypographyTone = NamedTone | ColorToken | NonNullable<CSSProperties['color']>;

export function isNamedTone(tone: TypographyTone): tone is NamedTone {
  return Object.prototype.hasOwnProperty.call(typographyTones, tone);
}

export function resolveToneColor(tone: TypographyTone) {
  const color = isNamedTone(tone) ? typographyTones[tone].color : tone;
  return token.var(`colors.${color}` as `colors.${ColorToken}`, color);
}
