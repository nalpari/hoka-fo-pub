import type { Meta, StoryObj } from '@storybook/react';

import { MainContentCard } from '@/components/common/molecules/MainContentCard';

const meta = {
  title: 'Molecules/MainContentCard',
  component: MainContentCard,
  decorators: [
    (Story) => (
      <>
        <div style={{ width: '360px' }}>
          <Story />
        </div>
      </>
    ),
  ],
  args: {
    title: 'Road Running',
    image: '/images/temp/category-road-running.webp',
    actions: [
      { label: '남성 바로가기', to: '/products?gender=men' },
      { label: '여성 바로가기', to: '/products?gender=women' },
    ],
  },
} satisfies Meta<typeof MainContentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TitleLinks: Story = {};

export const DescriptionLink: Story = {
  args: {
    variant: 'descriptionLink',
    description: '활동에 맞는 쿠셔닝과 접지력을 확인하세요.',
    actions: [{ label: '상품 바로가기', to: '/products' }],
  },
};

export const Overlay: Story = {
  args: {
    variant: 'overlay',
    image: '/images/temp/@explore-2.png',
    description: '도시와 트레일을 위한 새로운 러닝 컬렉션입니다.',
    actions: [
      { label: '상품 바로가기', to: '/products' },
    ],
  },
};

export const ImagePill: Story = {
  args: {
    variant: 'imagePill',
    image: '/images/temp/@explore-3.png',
    title: 'Fly to the finish',
    description: '레이스 당일을 위해 제작된 가벼운 장비로, 오직 달리기에만 집중할 수 있습니다.',
    actions: [
      { label: '남성 바로가기', to: '/products?gender=men', variant: 'secondary' },
      { label: '여성 바로가기', to: '/products?gender=women', variant: 'secondary' },
    ],
  },
};

export const OverlayBright: Story = {
  args: {
    variant: 'overlay',
    image: '/images/temp/category-road-running.webp',
    description: '밝은 이미지에서는 검정색 콘텐츠와 검정 pill 버튼을 사용합니다.',
    actions: [{ label: '상품 바로가기', to: '/products', variant: 'secondary' }],
  },
};

export const OverlayPrimary: Story = {
  args: {
    variant: 'overlay',
    image: '/images/temp/@explore-2.png',
    title: 'Marathon Pack',
    description: '획기적인 속도와 지속적인 편안함을 위해 설계되었습니다.',
    actions: [{ label: '상품 보러가기', to: '/products', variant: 'primary' }],
  },
};
