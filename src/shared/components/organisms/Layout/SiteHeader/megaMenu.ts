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
  columns: { title: string; items: MegaMenuItem[] }[];
  promo: MegaMenuPromo;
};

const productLink = (query: string) => `/products?${query}`;

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
        { label: 'Triple Black', to: productLink(`gender=${gender}&color=triple-black`) },
        { label: 'Ready for UTMB', to: `/collection/utmb-${gender}` },
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
      items: [
        { label: '전체보기', to: productLink(`gender=${gender}&category=footwear`) },
        {
          label: '로드 러닝',
          to: productLink(`gender=${gender}&category=footwear&activity=road-running`),
        },
        {
          label: '트레일 러닝',
          to: productLink(`gender=${gender}&category=footwear&activity=trail-running`),
        },
        {
          label: '라이프스타일',
          to: productLink(`gender=${gender}&category=footwear&activity=lifestyle`),
        },
        { label: '하이킹', to: productLink(`gender=${gender}&category=footwear&activity=hiking`) },
        { label: '워킹', to: productLink(`gender=${gender}&category=footwear&activity=walking`) },
        { label: '리커버리', to: productLink(`gender=${gender}&activity=recovery`) },
      ],
    },
    {
      title: '의류',
      items: [
        { label: '전체보기', to: productLink(`gender=${gender}&category=apparel`) },
        {
          label: '러닝 웨어',
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
        { label: '기타 용품', to: productLink(`gender=${gender}&category=other-accessories`) },
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
        title: 'Shop By Activity',
        items: [
          { label: '로드 러닝', to: productLink('activity=road-running') },
          { label: '트레일 러닝', to: productLink('activity=trail-running') },
          { label: '하이킹', to: productLink('activity=hiking') },
          { label: '워킹', to: productLink('activity=walking') },
          { label: '트레이닝', to: productLink('activity=training') },
        ],
      },
      {
        title: 'Shop By Feel',
        items: [
          { label: '맥시 쿠셔닝', to: productLink('cushioning=max') },
          { label: '밸런스 쿠셔닝', to: productLink('cushioning=balanced') },
          { label: '안정화', to: productLink('support=stability') },
          { label: '와이드', to: productLink('width=wide') },
        ],
      },
      {
        title: 'Shop By Model',
        items: [
          { label: 'Bondi', to: '/explore/models/bondi' },
          { label: 'Clifton', to: '/explore/models/clifton' },
          { label: 'Speedgoat', to: '/explore/models/speedgoat' },
          { label: 'Mach', to: '/explore/models/mach' },
        ],
      },
      {
        title: 'Essentials',
        items: [
          { label: '신상품', to: productLink('sort=new') },
          { label: '베스트셀러', to: productLink('sort=popular') },
          { label: '샌들 & 슬라이드', to: productLink('category=sandals') },
          { label: 'SHOE FINDER', to: '/explore/shoe-finder' },
        ],
      },
    ],
    promo: {
      to: '/explore/shoe-finder',
      imageSrc: '/images/temp/MegaMenuAD.png',
      title: 'Clifton UTL',
    },
  },
  {
    id: 'explore',
    label: 'Explore',
    columns: [
      {
        title: 'Guides',
        items: [
          { label: '로드 러닝 가이드', to: '/explore/guides/road-running' },
          { label: '트레일 러닝 가이드', to: '/explore/guides/trail-running' },
          { label: '하이킹 가이드', to: '/explore/guides/hiking' },
          { label: '러닝 입문 가이드', to: '/explore/guides/running' },
        ],
      },
      {
        title: 'Technology',
        items: [
          { label: '쿠셔닝 기술', to: '/explore/technology/cushioning' },
          { label: '안정성 기술', to: '/explore/technology/stability' },
          { label: '트레일 기술', to: '/explore/technology/trail' },
        ],
      },
      {
        title: 'Stories',
        items: [
          { label: 'HOKA 스토리', to: '/explore/stories' },
          { label: '러너 인터뷰', to: '/explore/stories/runners' },
          { label: '이벤트', to: '/explore/stories/events' },
        ],
      },
      {
        title: 'Support',
        items: [
          { label: '고객센터', to: '/support' },
          { label: '주문/배송 조회', to: '/mypage/orders' },
          { label: '매장 안내', to: '/support/store' },
        ],
      },
    ],
    promo: {
      to: '/explore/stories',
      imageSrc: '/images/temp/MegaMenuAD.png',
      title: 'Clifton UTL',
    },
  },
];
