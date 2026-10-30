// PC/MO 시안의 서로 다른 금액·쿠폰 표기를 준비한 표시 fixture이며 등급 정책 계산에 사용하지 않습니다.
export const rewardPreview = {
  web: {
    name: '박연진',
    tier: 'RUNNER',
    tierInitial: 'R',
    purchaseAmount: '258,000',
    tierProgress: {
      percent: 59,
      label: '300,000원 구매시 등급 업!',
      currentAmount: '524,000',
      targetAmount: '880,000',
    },
  },
  mobile: {
    name: '박연진',
    tier: 'RUNNER',
    tierInitial: 'R',
    purchaseAmount: '182,500',
    tierProgress: undefined,
  },
} as const;

export const tiers = [
  {
    name: 'ELITE',
    initial: 'E',
    benefits: [
      { title: 'TIER 1. 10% 할인 쿠폰 (*월 1회 지급)', detail: '최대 구매 가능 금액 : 700,000원' },
      { title: '무료 반품 쿠폰 3장(*연 3회 지급)', detail: '' },
      { title: '스페셜 래플 응모 기회 제공(이벤트, 상품 etc)', detail: '' },
    ],
  },
  {
    name: 'ADVANCED',
    initial: 'A',
    benefits: [
      { title: 'TIER 2. 7% 할인 쿠폰 (*월 1회 지급)', detail: '최대 구매 가능 금액 : 500,000원' },
      { title: '무료 반품 쿠폰 2장(*연 2회 지급)', detail: '' },
    ],
  },
  {
    name: 'RUNNER',
    initial: 'R',
    benefits: [
      {
        title: 'TIER 3. 5% 할인 쿠폰 (*월 1회 지급)',
        detail: '최대 구매 가능 금액 : 700,000원',
        mobileDetail: '최대 구매 가능 금액 : 300,000원',
      },
      {
        title: '무료 반품 쿠폰 3장(*연 3회 지급)',
        mobileTitle: '무료 반품 쿠폰 1장(*연 1회 지급)',
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
