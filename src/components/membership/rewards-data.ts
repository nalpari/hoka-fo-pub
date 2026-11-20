// 회원등급 화면의 공통 표시 예시입니다.
export const rewardPreview = {
  name: '박연진',
  tier: 'RUNNER',
  tierInitial: 'R',
  purchaseAmount: '182,500',
  tierProgress: {
    percent: 63,
    label: '120,000원 구매시 등급 업!',
    currentAmount: '180,000',
    targetAmount: '300,000',
  },
} as const;

export type MembershipBenefitsDisplay = {
  tiers: readonly {
    name: string;
    initial: string;
    requirement: string;
    benefits: readonly { title: string }[];
  }[];
  commonBenefits: readonly { title: string; description: string }[];
};

export const tiers = [
  {
    name: 'ELITE',
    initial: 'E',
    requirement: '구매 금액 100만원 이상',
    benefits: [
      { title: '10% 할인 쿠폰 (*분기별 1회 지급)', detail: '' },
      { title: '무료 반품 쿠폰 3장(*연 1회 지급)', detail: '' },
      { title: '스페셜 래플 응모 기회 제공', detail: '' },
    ],
  },
  {
    name: 'ADVANCED',
    initial: 'A',
    requirement: '구매 금액 30만원 이상',
    benefits: [
      { title: '7% 할인 쿠폰 (*분기별 1회 지급)', detail: '' },
      { title: '무료 반품 쿠폰 2장(*연 1회 지급)', detail: '' },
    ],
  },
  {
    name: 'RUNNER',
    initial: 'R',
    requirement: '회원 가입 즉시',
    benefits: [
      {
        title: '5% 할인 쿠폰 (*분기별 1회 지급)',
        detail: '',
      },
      {
        title: '무료 반품 쿠폰 1장 (*연 1회 지급)',
        detail: '',
      },
    ],
  },
] as const;

export const commonBenefits = [
  {
    title: '신규 가입 10% 할인 쿠폰',
    description: '최초 신규 가입 시 1회 지급/재가입 시 지급 불가/유효 기간 1년',
  },
  {
    title: '첫 구매 감사 1만원 쿠폰',
    description: '최초 1회 지급/ 구매 확정 후 24시간 이내 지급/유효 기간 6개월',
  },
  { title: '생일 축하 1만원 쿠폰', description: '매달 고객 별 생일 자동 발급, 유효 기간 6개월' },
  { title: '카카오 플러스 친구 추가 시 5,000원 쿠폰', description: '유효 기간 6개월' },
] as const;

export const membershipBenefitsPreview: MembershipBenefitsDisplay = { tiers, commonBenefits };
