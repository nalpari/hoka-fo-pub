/** SVG assets served from `public` and addressed by a stable icon name. */
export const iconAssets = {
  'navigation/membership': '/images/icon/navigation/membership.svg',
  gift: '/images/icon/gift.svg',
  ipinVerification: '/images/icon/ipin-verification.svg',
  medal: '/images/icon/medal.svg',
  partyHorn: '/images/icon/party-horn.svg',
  phoneVerification: '/images/icon/phone-verification.svg',
  timer: '/images/icon/timer.svg',
  'unlock-keyhole': '/images/icon/unlock-keyhole.svg',
  'social/kakao': '/images/icon/social/kakao.svg',
  'social/naver': '/images/icon/social/naver.svg',
} as const;

export type IconAssetName = keyof typeof iconAssets;
