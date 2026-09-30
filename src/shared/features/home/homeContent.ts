import type {
  MainContentCardAction,
  MainContentCardImageAspectRatio,
} from '@/shared/components/molecules/MainContentCard/MainContentCard';

export type HomeCategory = {
  actions: readonly MainContentCardAction[];
  image: string;
  title: string;
};

export const homeCategories: readonly HomeCategory[] = [
  {
    title: 'Road Running',
    image: '/images/temp/category-road-running.webp',
    actions: [
      { label: '남성 바로가기', to: '/products?category=Road%20Running&gender=men' },
      { label: '여성 바로가기', to: '/products?category=Road%20Running&gender=women' },
    ],
  },
  {
    title: 'Trail Running & Hiking',
    image: '/images/temp/category-trail-running-hiking.webp',
    actions: [
      {
        label: '남성 바로가기',
        to: '/products?category=Trail%20Running%20%26%20Hiking&gender=men',
      },
      {
        label: '여성 바로가기',
        to: '/products?category=Trail%20Running%20%26%20Hiking&gender=women',
      },
    ],
  },
  {
    title: 'Lifestyle',
    image: '/images/temp/category-lifestyle.webp',
    actions: [
      { label: '남성 바로가기', to: '/products?category=Lifestyle&gender=men' },
      { label: '여성 바로가기', to: '/products?category=Lifestyle&gender=women' },
    ],
  },
  {
    title: 'Apparel',
    image: '/images/temp/category-apparel.webp',
    actions: [
      { label: '남성 바로가기', to: '/products?category=Apparel&gender=men' },
      { label: '여성 바로가기', to: '/products?category=Apparel&gender=women' },
    ],
  },
  {
    title: 'Walking',
    image: '/images/temp/category-walking.webp',
    actions: [
      { label: '남성 바로가기', to: '/products?category=Walking&gender=men' },
      { label: '여성 바로가기', to: '/products?category=Walking&gender=women' },
    ],
  },
  {
    title: 'Working',
    image: '/images/temp/category-working.webp',
    actions: [
      { label: '남성 바로가기', to: '/products?category=Working&gender=men' },
      { label: '여성 바로가기', to: '/products?category=Working&gender=women' },
    ],
  },
];

export const bestSellerTabs = [
  '전체',
  '로드 러닝',
  '트레일 러닝',
  '라이프스타일',
  '하이킹',
  '워킹',
] as const;

export type HomeExplore = {
  actions: readonly MainContentCardAction[];
  description: string;
  image: string;
  imageAspectRatio?: MainContentCardImageAspectRatio;
  title: string;
};

const homeExploreImageAspectRatio: MainContentCardImageAspectRatio = {
  desktop: '1 / 1.32',
  mobile: '1 / 1',
};

export const homeExplores: readonly HomeExplore[] = [
  {
    title: 'Marathon Pack',
    description: '획기적인 속도와 지속적인 편안함을 위해 설계되었습니다.',
    image: '/images/temp/@explore-1.png',
    imageAspectRatio: homeExploreImageAspectRatio,
    actions: [{ label: '상품 보러가기', to: '/explore' }],
  },
  {
    title: 'Fly to the finish',
    description: '레이스 당일을 위해 제작된 가벼운 장비로, 오직 달리기에만 집중할 수 있습니다.',
    image: '/images/temp/@explore-2.png',
    imageAspectRatio: homeExploreImageAspectRatio,
    actions: [
      { label: '남성 보러가기', to: '/explore' },
      { label: '여성 보러가기', to: '/explore' },
    ],
  },
  {
    title: 'Clifton 11 GTX',
    description: 'A cushioned ride, rain or shine.',
    image: '/images/temp/@explore-3.png',
    imageAspectRatio: homeExploreImageAspectRatio,
    actions: [
      { label: '남성 보러가기', to: '/explore' },
      { label: '여성 보러가기', to: '/explore' },
    ],
  },
] as const;

export type HomeShoeFinder = {
  actions: readonly MainContentCardAction[];
  description: string;
  images: Record<HomeShoeFinderCardVariant, string>;
  title: string;
};

export type HomeShoeFinderCardVariant = 'overlay' | 'imagePill';

const shoeFinderActions: readonly MainContentCardAction[] = [
  { label: '남성 바로가기', to: '/explore/shoe-finder' },
  { label: '여성 바로가기', to: '/explore/shoe-finder' },
];

export const shoeFinderItems: readonly HomeShoeFinder[] = [
  {
    title: 'Arahi',
    description: '놀라울 정도로 날렵한 안정화',
    images: {
      overlay: '/images/temp/@find-my-hoka-1.png',
      imagePill: '/images/temp/@find-my-hoka-6.png',
    },
    actions: shoeFinderActions,
  },
  {
    title: 'Clifton',
    description: '일상적인 러닝을 위해 가볍고 푹신한 착화감',
    images: {
      overlay: '/images/temp/@find-my-hoka-2.png',
      imagePill: '/images/temp/@find-my-hoka-7.png',
    },
    actions: shoeFinderActions,
  },
  {
    title: 'Bondi',
    description: '극강의 쿠셔닝으로 판도를 바꿀 혁신적인 제품',
    images: {
      overlay: '/images/temp/@find-my-hoka-3.png',
      imagePill: '/images/temp/@find-my-hoka-8.png',
    },
    actions: shoeFinderActions,
  },
  {
    title: 'Mafate',
    description: '험난한 지형에서도 뛰어난 쿠션감',
    images: {
      overlay: '/images/temp/@find-my-hoka-4.png',
      imagePill: '/images/temp/@find-my-hoka-9.png',
    },
    actions: shoeFinderActions,
  },
  {
    title: 'Speedgoat',
    description: '젖은 환경에서 제 역할을 톡톡히 해내는 만능 도구',
    images: {
      overlay: '/images/temp/@find-my-hoka-5.png',
      imagePill: '/images/temp/@find-my-hoka-10.png',
    },
    actions: shoeFinderActions,
  },
];
