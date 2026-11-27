// 회원등급 화면의 공통 표시 예시입니다.
export const rewardPreview = {
  name: '박연진',
  tier: 'RUNNER',
  tierInitial: 'R',
  purchaseAmount: '182,500',
  tierProgress: {
    percent: 63,
    label: '120,000원 구매 시 등급 업!',
    currentAmount: '180,000',
    targetAmount: '300,000',
  },
} as const;

// 최신 마이페이지 시안의 개인 요약 예시이며 운영 구매금액과는 별개입니다.
const accountSummaryPreview = {
  ...rewardPreview,
  tierProgress: { ...rewardPreview.tierProgress, label: '120,000원 구매시 등급 업!' },
} as const;

export const accountRewardPreview = {
  web: { ...accountSummaryPreview, purchaseAmount: '258,000' },
  mobile: accountSummaryPreview,
} as const;

export type MembershipBenefitsDisplay = {
  tiers: readonly {
    name: string;
    initial: string;
    requirement: string;
    benefits: readonly { title: string }[];
  }[];
  commonBenefits: readonly {
    title: string;
    description: string;
    accountMobile?: {
      titleLines?: readonly [string, string];
      description?: string;
      validity: string;
    };
  }[];
};

export const tiers = [
  {
    name: 'ELITE',
    initial: 'E',
    requirement: '구매 금액 100만원 이상',
    benefits: [
      { title: '10% 할인 쿠폰 (*월 1회 지급)', detail: '' },
      { title: '무료 반품 쿠폰 3장(*연 3회 지급)', detail: '' },
      { title: '스페셜 래플 응모 기회 제공', detail: '' },
    ],
  },
  {
    name: 'ADVANCED',
    initial: 'A',
    requirement: '구매 금액 30만원 이상',
    benefits: [
      { title: '7% 할인 쿠폰(*월 1회 지급)', detail: '' },
      { title: '무료 반품 쿠폰 2장(*연 2회 지급)', detail: '' },
    ],
  },
  {
    name: 'RUNNER',
    initial: 'R',
    requirement: '회원 가입 시 기본 설정 등급',
    benefits: [
      {
        title: '5% 할인 쿠폰(*월 1회 지급)',
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
    accountMobile: {
      description: '최초 신규 가입 시 1회 지급 / 재가입 시 지급 불가',
      validity: '유효 기간 1년',
    },
  },
  {
    title: '첫 구매 감사 1만원 쿠폰',
    description: '최초 1회 지급/ 구매 확정 후 24시간 이내 지급/유효 기간 6개월',
    accountMobile: {
      description: '최초 1회 지급 / 구매 확정 후 24시간 이내 지급',
      validity: '유효 기간 6개월',
    },
  },
  {
    title: '생일 축하 1만원 쿠폰',
    description: '매달 고객 별 생일 자동 발급, 유효 기간 6개월',
    accountMobile: { description: '매달 고객별 생일 자동 발급', validity: '유효 기간 6개월' },
  },
  {
    title: '카카오 플러스 친구 추가 시 5,000원 쿠폰',
    description: '유효기간 6개월',
    accountMobile: {
      titleLines: ['카카오 플러스 친구 추가 시', '5,000원 쿠폰'],
      validity: '유효 기간 6개월',
    },
  },
] as const;

export const membershipBenefitsPreview: MembershipBenefitsDisplay = { tiers, commonBenefits };
