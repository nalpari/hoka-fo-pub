/**
 * [개발팀 바인딩]
 * MegaMenu의 id/label/columns/promo가 GNB 표시 모델입니다. 서버 카테고리 코드를 현재 products URL 필터 값으로 변환합니다.
 * 현재 고정 메뉴에는 미리 만든 내부 링크가 있습니다. 운영 메뉴 연결 시 label만 바꾸지 말고 목적지·프로모션 이미지도 같은 응답으로 갱신합니다.
 */

export type MegaMenuItem = {
  label: string;
  to: string;
  badge?: string;
};

export type MegaMenuPromo = {
  to: string;
  imageSrc: string;
  title: string;
};

export type MegaMenu = {
  id: 'men' | 'women' | 'shoes' | 'explore';
  label: string;
  columns: { title: string; to?: string; items: MegaMenuItem[] }[];
  promo: MegaMenuPromo;
};

const productLink = (query: string) => `/products?${query}`;

const shoeMenuItems = (gender: 'men' | 'women', compactLabels = false): MegaMenuItem[] => [
  { label: '전체보기', to: productLink(`gender=${gender}`) },
  ...[
    ['로드 러닝', 'road-running'],
    ['트레일 러닝', 'trail-running'],
    ['라이프스타일', 'lifestyle'],
    ['하이킹', 'hiking'],
    ['워킹', 'walking'],
    ['리커버리', 'recovery'],
  ].map(([label, activity]) => ({
    label: compactLabels ? label.replaceAll(' ', '') : label,
    to: productLink(`gender=${gender}&activity=${activity}`),
  })),
];

const genderMenu = (gender: 'men' | 'women', label: string): MegaMenu => ({
  id: gender,
  label,
  columns: [
    {
      title: 'Featured',
      items: [
        { label: 'Best', to: productLink(`gender=${gender}&sort=popular`) },
        { label: 'New', to: productLink(`gender=${gender}&sort=new`) },
        { label: 'Coming Soon', to: productLink(`gender=${gender}&sort=coming-soon`) },
        { label: 'Triple Black', to: productLink(`gender=${gender}&color=black`) },
        { label: 'Ready for UTMB', to: productLink(`gender=${gender}&collection=utmb`) },
        { label: '가을 러닝의 시작, Bondi', to: productLink(`gender=${gender}&model=bondi`) },
        { label: 'Sale', to: productLink(`gender=${gender}&sort=sale`) },
      ],
    },
    {
      title: '액티비티',
      items: [
        { label: '로드 러닝', to: productLink(`gender=${gender}&activity=road-running`) },
        { label: '트레일 러닝', to: productLink(`gender=${gender}&activity=trail-running`) },
        { label: '라이프스타일', to: productLink(`gender=${gender}&activity=lifestyle`) },
        { label: '하이킹', to: productLink(`gender=${gender}&activity=hiking`) },
        { label: '워킹', to: productLink(`gender=${gender}&activity=walking`) },
        { label: '리커버리', to: productLink(`gender=${gender}&activity=recovery`) },
      ],
    },
    {
      title: '신발',
      items: shoeMenuItems(gender, true),
    },
    {
      title: '의류',
      items: [
        { label: '전체보기', to: productLink(`gender=${gender}&category=apparel`) },
        {
          label: '러닝웨어',
          to: productLink(`gender=${gender}&category=apparel&activity=road-running`),
        },
        { label: '아우터', to: productLink(`gender=${gender}&category=outerwear`) },
        { label: '탑&티셔츠', to: productLink(`gender=${gender}&category=tops`) },
        {
          label: '후디&스웻셔츠',
          to: productLink(`gender=${gender}&category=hoodies-sweatshirts`),
        },
        { label: '쇼츠', to: productLink(`gender=${gender}&category=shorts`) },
        { label: '타이즈', to: productLink(`gender=${gender}&category=tights`) },
      ],
    },
    {
      title: '용품',
      items: [
        { label: '전체보기', to: productLink(`gender=${gender}&category=accessories`) },
        { label: '모자', to: productLink(`gender=${gender}&category=hats`) },
        { label: '양말', to: productLink(`gender=${gender}&category=socks`) },
        {
          label: '라이프스타일',
          to: productLink(`gender=${gender}&category=accessories&activity=lifestyle`),
        },
        { label: '베스트&벨트', to: productLink(`gender=${gender}&category=vests-belts`) },
        { label: '기타용품', to: productLink(`gender=${gender}&category=other-accessories`) },
      ],
    },
  ],
  promo: {
    to: '/explore/guides/running',
    imageSrc: '/images/temp/MegaMenuAD.png',
    title: 'Clifton UTL',
  },
});

export const megaMenus: MegaMenu[] = [
  genderMenu('men', 'Men'),
  genderMenu('women', 'Women'),
  {
    id: 'shoes',
    label: 'Shoes',
    columns: [
      {
        title: 'ICONS',
        items: [
          { label: '본디', to: productLink('model=bondi') },
          { label: '클리프톤', to: productLink('model=clifton') },
          { label: '스피드고트', to: productLink('model=speedgoat') },
          { label: '마파테', to: productLink('model=mafate') },
          { label: '호파라', to: productLink('model=hopara') },
        ],
      },
      ...(['men', 'women'] as const).map((gender) => ({
        title: gender === 'men' ? '남성' : '여성',
        items: shoeMenuItems(gender),
      })),
    ],
    promo: {
      to: '/products?model=clifton',
      imageSrc: '/images/temp/MegaMenuAD.png',
      title: 'Clifton UTL',
    },
  },
  {
    id: 'explore',
    label: 'Explore',
    columns: [
      {
        title: 'Featured',
        items: [
          { label: '로드 러닝 가이드', to: '/explore/guides/road-running' },
          { label: '트레일 러닝 가이드', to: '/explore/guides/trail-running' },
          { label: 'Running Session', to: '/explore/running-session' },
        ],
      },
      {
        title: 'Technology',
        items: [
          { label: '고어텍스', to: '/explore/technology/gore-tex' },
          { label: '비브람', to: '/explore/technology/vibram' },
        ],
      },
      { title: '러닝 세션 신청', to: '/running/run-club', items: [] },
    ],
    promo: {
      to: '/running/run-club',
      imageSrc: '/images/temp/MegaMenuAD.png',
      title: 'Clifton UTL',
    },
  },
];
