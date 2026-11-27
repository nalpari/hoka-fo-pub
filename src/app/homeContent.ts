/**
 * [ 개발팀 바인딩 ]
 * 홈의 고정 카테고리/에디토리얼 카드 데이터입니다. 통합 소유자가 BO 응답을 기존 image/title/actions 모델로 변환해 홈 콘텐츠 슬롯에 조합합니다. 현재 연결 Context·요청은 없습니다.
 * 링크는 내부 경로/외부 URL 의미를 유지하고 배너 표시 순서/이미지/대체 텍스트를 같은 콘텐츠 응답에서 갱신합니다.
 */

import type { Platform } from '@/context/platform';

import type {
  MainContentCardAction,
  MainContentCardImageAspectRatio,
} from '@/components/common/molecules/MainContentCard';
import type { ProductCardProduct } from '@/components/common/molecules/ProductCard/ProductCard';

export type HomeCategory = {
  actions: readonly MainContentCardAction[];
  image: string;
  title: string;
};

export const homeCategories: readonly HomeCategory[] = [
  {
    title: 'Road Running',
    image: '/images/home/categories/road-running.jpg',
    actions: [
      { label: '남성 보러가기', to: '/products?activity=road-running&gender=men' },
      { label: '여성 보러가기', to: '/products?activity=road-running&gender=women' },
    ],
  },
  {
    title: 'Trail Running',
    image: '/images/home/categories/trail-running.jpg',
    actions: [
      {
        label: '남성 보러가기',
        to: '/products?activity=trail-running&gender=men',
      },
      {
        label: '여성 보러가기',
        to: '/products?activity=trail-running&gender=women',
      },
    ],
  },
  {
    title: 'Lifestyle',
    image: '/images/home/categories/lifestyle.jpg',
    actions: [
      { label: '남성 보러가기', to: '/products?activity=lifestyle&gender=men' },
      { label: '여성 보러가기', to: '/products?activity=lifestyle&gender=women' },
    ],
  },
  {
    title: 'Hiking',
    image: '/images/home/categories/hiking.jpg',
    actions: [
      { label: '남성 보러가기', to: '/products?activity=hiking&gender=men' },
      { label: '여성 보러가기', to: '/products?activity=hiking&gender=women' },
    ],
  },
  {
    title: 'Walking',
    image: '/images/home/categories/walking.jpg',
    actions: [
      { label: '남성 보러가기', to: '/products?activity=walking&gender=men' },
      { label: '여성 보러가기', to: '/products?activity=walking&gender=women' },
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
  '리커버리',
] as const;

const trailPreviewItems = {
  'clifton-url': { name: 'Clifton URL', gender: 'Men’s' },
  'speedgoat-brown': { name: 'Speedgoat 7 GTX', gender: 'All Gender' },
  'speedgoat-black': { name: 'Speedgoat 7 GTX', gender: 'Men’s', mobileGender: 'Women’s' },
  'speedgoat-red': { name: 'Speedgoat 7 GTX', gender: 'Women’s' },
  'clifton-olive': { name: 'Clifton 11', gender: 'Men’s' },
  'clifton-grey': { name: 'Clifton 11', gender: 'Men’s' },
};

const trailPreviewOrder = {
  web: [
    'clifton-url',
    'speedgoat-brown',
    'speedgoat-black',
    'speedgoat-red',
    'clifton-olive',
    'clifton-grey',
  ],
  mobile: [
    'speedgoat-brown',
    'speedgoat-black',
    'clifton-olive',
    'speedgoat-red',
    'clifton-url',
    'clifton-grey',
  ],
} as const satisfies Record<Platform, readonly (keyof typeof trailPreviewItems)[]>;

/**
 * [ 개발팀 바인딩 ]
 * 트레일 러닝 탭의 고정 시안 데이터입니다. 키는 카드 표시용이며 실제 상품 ID가 아닙니다.
 * 홈 통합 소유자가 카테고리 변경에 따라 현재 상품 목록·상세 href를 연결합니다.
 * 현재는 시안 카드가 카테고리 목록으로 이동하며 상품 조회 요청은 실행하지 않습니다.
 */
export function getHomeTrailPreviewProducts(platform: Platform): ProductCardProduct[] {
  const imagePlatform = platform === 'web' ? 'pc' : 'mo';
  return trailPreviewOrder[platform].map((key) => {
    const item = trailPreviewItems[key];
    return {
      id: key,
      name: item.name,
      gender: platform === 'mobile' && 'mobileGender' in item ? item.mobileGender : item.gender,
      price: 240000,
      primaryImage: `/images/home/best-sellers/${imagePlatform}-${key}.webp`,
    };
  });
}

export type HomeExplore = {
  actions: readonly MainContentCardAction[];
  description: string;
  image: string;
  imageAspectRatio?: MainContentCardImageAspectRatio;
  mobileDescription?: string;
  mobileImage: string;
  title: string;
};

const homeExploreImageAspectRatio: MainContentCardImageAspectRatio = {
  desktop: '500 / 665.77',
  mobile: '375 / 500',
};

export const homeExplores: readonly HomeExplore[] = [
  {
    title: 'Marathon Pack',
    description: '획기적인 속도와 지속적인 편안함을 위해 설계되었습니다.',
    image: '/images/home/explore/pc-marathon-pack.webp',
    imageAspectRatio: homeExploreImageAspectRatio,
    mobileDescription: '획기적인 속도와 지속적인 편안함을 위해\n설계되었습니다.',
    mobileImage: '/images/home/explore/mo-marathon-pack.webp',
    actions: [{ label: '상품 보러가기', to: '/explore' }],
  },
  {
    title: 'Fly to the finish',
    description: '레이스 당일을 위해 제작된 가벼운 장비로, 오직 달리기에만 집중할 수 있습니다.',
    image: '/images/home/explore/pc-fly-to-the-finish.webp',
    imageAspectRatio: homeExploreImageAspectRatio,
    mobileDescription:
      '레이스 당일을 위해 제작된 가벼운 장비로,\n오직 달리기에만 집중할 수 있습니다.',
    mobileImage: '/images/home/explore/mo-fly-to-the-finish.webp',
    actions: [
      { label: '남성 보러가기', to: '/explore' },
      { label: '여성 보러가기', to: '/explore' },
    ],
  },
  {
    title: 'Clifton 11 GTX',
    description: 'A cushioned ride, rain or shine.',
    image: '/images/home/explore/pc-clifton-11-gtx.webp',
    imageAspectRatio: homeExploreImageAspectRatio,
    mobileImage: '/images/home/explore/mo-clifton-11-gtx.webp',
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
  mobileDescription?: string;
  title: string;
};

export type HomeShoeFinderCardVariant = 'overlay' | 'imagePill';

const shoeFinderActions: readonly MainContentCardAction[] = [
  { label: '상품 보러가기', to: '/explore/shoe-finder' },
];

/**
 * [ 개발팀 바인딩 ]
 * 홈 콘텐츠 소유자는 제목·설명·이미지·링크를 준비된 표시 데이터로 전달합니다.
 * `mobileDescription`은 모바일 문구가 다른 경우에만 지정하며, 생략 시 공통 설명을 표시합니다.
 * 이 목록은 고정 시안 데이터이며 화면에서 조회 요청을 실행하지 않습니다.
 */
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
    description: '일상적인 러닝을 위한 가벼운 착화감',
    images: {
      overlay: '/images/temp/@find-my-hoka-2.png',
      imagePill: '/images/temp/@find-my-hoka-7.png',
    },
    actions: shoeFinderActions,
  },
  {
    title: 'Bondi',
    description: '판도를 바꿀 혁신적인 제품',
    mobileDescription: '극강의 쿠셔닝으로 판도를 바꿀 제품',
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
    description: '젖은 환경에서 제 역할을 해내는 만능 도구',
    images: {
      overlay: '/images/temp/@find-my-hoka-5.png',
      imagePill: '/images/temp/@find-my-hoka-10.png',
    },
    actions: shoeFinderActions,
  },
];
