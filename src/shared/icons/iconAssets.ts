/** SVG assets served from `public` and addressed by a stable icon name. */
export const iconAssets = {
  gift: '/images/icon/gift.svg',
  ipinVerification: '/images/icon/ipin-verification.svg',
  medal: '/images/icon/medal.svg',
  partyHorn: '/images/icon/party-horn.svg',
  phoneVerification: '/images/icon/phone-verification.svg',
} as const;

export type IconAssetName = keyof typeof iconAssets;
