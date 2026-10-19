export type ExploreScreen = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  status: 'ready' | 'planned';
  sections: { title: string; description: string }[];
};

export const exploreScreens: ExploreScreen[] = [
  {
    slug: 'guides/road-running',
    eyebrow: 'RUNNING GUIDE',
    title: '로드 러닝 가이드',
    description: '거리와 페이스, 착화감을 기준으로 일상 러닝화부터 레이스화까지 비교합니다.',
    status: 'planned',
    sections: [
      { title: '거리와 페이스', description: '러닝 목적에 맞는 쿠셔닝과 반응성을 안내합니다.' },
      { title: '러닝화 선택', description: '발볼과 안정성을 함께 고려하는 비교 영역입니다.' },
    ],
  },
  {
    slug: 'guides/new-runners',
    eyebrow: 'BEGINNER GUIDE',
    title: '초보자 루틴',
    description: '처음 러닝을 시작하는 사람을 위한 간단한 루틴과 신발 선택 기준을 정리합니다.',
    status: 'planned',
    sections: [
      {
        title: '첫 주간 루틴',
        description: '주 3회, 20~30분으로 무리 없이 시작하는 방법을 안내합니다.',
      },
      {
        title: '기초 선택 기준',
        description: '무게와 쿠셔닝, 사이즈를 기준으로 합리적인 첫 신발을 선택합니다.',
      },
    ],
  },
  {
    slug: 'guides/trail-running',
    eyebrow: 'RUNNING GUIDE',
    title: '트레일 러닝 가이드',
    description: '지면 환경과 접지력, 보호 성능을 기준으로 트레일 러닝화를 탐색합니다.',
    status: 'planned',
    sections: [
      { title: '코스별 선택', description: '흙길·암석·혼합 지면에 맞춘 탐색 기준입니다.' },
      { title: '보호와 접지', description: '아웃솔과 갑피의 보호 특성을 설명합니다.' },
    ],
  },
  {
    slug: 'guides/hiking',
    eyebrow: 'OUTDOOR GUIDE',
    title: '하이킹 가이드',
    description: '거리, 지면, 날씨에 따라 필요한 지지력과 내구성을 정리합니다.',
    status: 'planned',
    sections: [
      { title: '하이킹 환경', description: '당일 산행부터 장거리 하이킹까지 환경을 구분합니다.' },
      { title: '준비물', description: '신발과 함께 확인할 착용·관리 정보를 제공합니다.' },
    ],
  },
  {
    slug: 'guides/running',
    eyebrow: 'RUNNING GUIDE',
    title: '러닝 입문 가이드',
    description: '처음 달리는 사람을 위한 기본적인 러닝화 선택과 착용 안내입니다.',
    status: 'planned',
    sections: [
      { title: '첫 러닝화', description: '발볼, 사이즈, 쿠셔닝의 우선순위를 안내합니다.' },
      { title: '착용 팁', description: '교체 주기와 러닝 전후 관리 정보를 제공합니다.' },
    ],
  },
  {
    slug: 'technology/cushioning',
    eyebrow: 'HOKA TECHNOLOGY',
    title: '쿠셔닝 기술',
    description: '쿠셔닝 단계와 반발감의 차이를 제품 탐색에 연결하는 기술 안내 화면입니다.',
    status: 'planned',
    sections: [
      { title: '쿠셔닝 레벨', description: '맥시·밸런스·반응형 쿠셔닝을 비교합니다.' },
      { title: '추천 활동', description: '일상 러닝과 장거리, 레이스에 맞는 선택 기준입니다.' },
    ],
  },
  {
    slug: 'technology/stability',
    eyebrow: 'HOKA TECHNOLOGY',
    title: '안정성 기술',
    description: '안정성과 지지감의 의미를 이해하고 제품 비교로 이어지는 화면입니다.',
    status: 'planned',
    sections: [
      { title: '안정성 이해', description: '뉴트럴과 안정화의 차이를 쉽게 설명합니다.' },
      { title: '추천 제품', description: '향후 안정성 데이터가 연결될 상품 영역입니다.' },
    ],
  },
  {
    slug: 'technology/response',
    eyebrow: 'HOKA TECHNOLOGY',
    title: '반응성 가이드',
    description:
      '쿠셔닝의 무게감과 반발력 차이를 이해해 러닝 목적에 맞는 제품을 고르는 기준을 안내합니다.',
    status: 'planned',
    sections: [
      {
        title: '반응성 비교',
        description: '매트릭스와 미드솔 구조에 따른 지면 반응을 설명합니다.',
      },
      { title: '신발 선택', description: '초보자와 중급 러너의 반응성 선호도를 구분합니다.' },
    ],
  },
  {
    slug: 'technology/trail',
    eyebrow: 'HOKA TECHNOLOGY',
    title: '트레일 기술',
    description: '접지, 보호, 내구성을 중심으로 트레일 제품 기술을 소개합니다.',
    status: 'planned',
    sections: [
      { title: '그립과 접지', description: '지면 조건에 따른 아웃솔 성능을 다룹니다.' },
      { title: '보호 설계', description: '험로에서 필요한 갑피와 미드솔 특성을 안내합니다.' },
    ],
  },
  {
    slug: 'stories',
    eyebrow: 'HOKA STORIES',
    title: 'HOKA 스토리',
    description: '브랜드와 러너의 이야기를 모아 소개하는 콘텐츠 허브입니다.',
    status: 'planned',
    sections: [
      { title: '브랜드 이야기', description: '브랜드 철학과 컬렉션 배경을 담는 영역입니다.' },
      { title: '러너 이야기', description: '러닝을 즐기는 사람들의 경험을 소개합니다.' },
    ],
  },
  {
    slug: 'stories/runners',
    eyebrow: 'RUNNERS',
    title: '러너 인터뷰',
    description: '다양한 거리와 코스를 달리는 러너의 이야기를 담는 인터뷰 화면입니다.',
    status: 'planned',
    sections: [
      { title: '이번 러너', description: '대표 인터뷰 콘텐츠가 노출될 영역입니다.' },
      { title: '러닝 노트', description: '훈련과 장비 선택에 관한 짧은 기록을 제공합니다.' },
    ],
  },
  {
    slug: 'stories/events',
    eyebrow: 'HOKA EVENTS',
    title: '이벤트',
    description: '러닝 이벤트와 오프라인 프로그램을 모아 안내하는 화면입니다.',
    status: 'planned',
    sections: [
      { title: '진행 중인 이벤트', description: '응모·참여 가능한 이벤트가 표시될 영역입니다.' },
      { title: '지난 이벤트', description: '이벤트 기록과 후기를 보관하는 영역입니다.' },
    ],
  },
  {
    slug: 'stories/newsletter',
    eyebrow: 'NEWSLETTER',
    title: '뉴스레터',
    description: '신제품 소식, 이벤트, 러닝 팁을 정기적으로 전달하는 브랜드 업데이트 페이지입니다.',
    status: 'planned',
    sections: [
      { title: '이번 달 소식', description: '주요 신제품과 브랜드 활동 소식을 요약합니다.' },
      { title: '추천 콘텐츠', description: '러닝 팁과 스타일링 가이드를 큐레이션합니다.' },
    ],
  },
  {
    slug: 'recovery',
    eyebrow: 'RECOVERY',
    title: '리커버리 가이드',
    description: '달리기 후 회복과 체력 관리 루틴을 이해하는 실전 가이드입니다.',
    status: 'planned',
    sections: [
      {
        title: '복구 루틴',
        description: '후속 러닝을 위해 필요한 회복 단계와 시간 배분을 안내합니다.',
      },
      { title: '관리 팁', description: '미드솔 상태, 보관 방식, 충격 관리 팁을 정리합니다.' },
    ],
  },
  {
    slug: 'recovery/routine',
    eyebrow: 'RECOVERY',
    title: '회복 루틴',
    description: '짧은 회복 루틴과 통증 관리 기준을 제품과 연결하는 안내 화면입니다.',
    status: 'planned',
    sections: [
      { title: '요가와 스트레칭', description: '달리기 후 근육 회복을 돕는 간단한 루틴입니다.' },
      { title: '복합 피로 관리', description: '체력 소모와 회복 속도를 조절하는 팁을 제시합니다.' },
    ],
  },
  {
    slug: 'recovery/care',
    eyebrow: 'CARE',
    title: '착용 관리',
    description: '신발의 수명과 착화감을 유지하는 보관 및 관리 방법을 정리합니다.',
    status: 'planned',
    sections: [
      { title: '관리 주기', description: '세탁과 건조, 보관 방식의 기준을 설명합니다.' },
      { title: '오래 신기', description: '내구성과 쿠셔닝 유지에 도움 되는 관리 팁입니다.' },
    ],
  },
  {
    slug: 'recovery/checklist',
    eyebrow: 'RECOVERY',
    title: '근육 회복 체크',
    description: '러닝 직후와 며칠 뒤 회복 상태를 점검해 다음 세션을 준비하는 체크리스트입니다.',
    status: 'planned',
    sections: [
      { title: '체력 점검', description: '통증, 피로, 발목 회복 여부를 점검하는 기준입니다.' },
      {
        title: '다음 세션 준비',
        description: '필요한 보상 루틴과 휴식 시간을 조절하는 방법을 안내합니다.',
      },
    ],
  },
  {
    slug: 'journal',
    eyebrow: 'COMMUNITY',
    title: '러닝 저널',
    description: '러너들의 기록, 후기, 코스 리뷰를 공유하는 콘텐츠 영역입니다.',
    status: 'planned',
    sections: [
      { title: '플래너 코스', description: '플랜과 코스를 설계해 꾸준히 달릴 수 있게 돕습니다.' },
      { title: '실전 후기', description: '신발과 루틴을 실제 사용자 관점에서 정리합니다.' },
    ],
  },
  {
    slug: 'community/challenges',
    eyebrow: 'COMMUNITY',
    title: '커뮤니티 챌린지',
    description: '거리, 시간, 목표 달성을 중심으로 러너 커뮤니티 챌린지가 노출됩니다.',
    status: 'planned',
    sections: [
      { title: '챌린지 소개', description: '참여 조건과 기념 배지를 설명합니다.' },
      { title: '참여 리포트', description: '러너들의 기록과 참여 성과를 모아 보여줍니다.' },
    ],
  },
  {
    slug: 'community/local-runs',
    eyebrow: 'LOCAL RUNS',
    title: '지역 러닝 모임',
    description: '지역 기반 러닝 모임과 페이스 그룹을 소개하는 커뮤니티 탐색 화면입니다.',
    status: 'planned',
    sections: [
      {
        title: '모임 둘러보기',
        description: '근처 러닝 모임과 난이도를 한 번에 확인할 수 있습니다.',
      },
      { title: '참여 안내', description: '모임에 참여하는 전반적인 준비와 유의사항을 제공합니다.' },
    ],
  },
  {
    slug: 'community/events',
    eyebrow: 'COMMUNITY',
    title: '이벤트 캘린더',
    description: '러닝 이벤트와 사전 신청 일정이 한눈에 보이는 커뮤니티 화면입니다.',
    status: 'planned',
    sections: [
      { title: '다가오는 이벤트', description: '참여 일정과 장소가 표시되는 영역입니다.' },
      { title: '지난 이벤트', description: '이전 이벤트 결과와 참여 기록을 보관합니다.' },
    ],
  },
  ...['bondi', 'clifton', 'speedgoat', 'mach', 'skyflow'].map((model) => ({
    slug: `models/${model}`,
    eyebrow: 'MODEL GUIDE',
    title: model[0].toUpperCase() + model.slice(1),
    description: `${model[0].toUpperCase() + model.slice(1)} 모델의 특징과 추천 활동을 소개하는 랜딩 화면입니다.`,
    status: 'planned' as const,
    sections: [
      { title: '모델 특징', description: '핵심 착화감과 사용 목적을 소개합니다.' },
      { title: '라인업 비교', description: '향후 옵션과 사이즈 데이터가 연결될 영역입니다.' },
    ],
  })),
];

export const findExploreScreen = (slug: string) =>
  exploreScreens.find((screen) => screen.slug === slug);
