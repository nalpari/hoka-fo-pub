import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { MainContentCard } from '@/shared/components/molecules/MainContentCard/MainContentCard';

const meta = {
  title: 'Molecules/MainContentCard',
  component: MainContentCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: '360px' }}>
          <Story />
        </div>
      </MemoryRouter>
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
      { label: '컬렉션 보기', to: '/collection', type: 'pill' },
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
      { label: '남성 바로가기', to: '/products?gender=men', type: 'pill' },
      { label: '여성 바로가기', to: '/products?gender=women', type: 'pill' },
    ],
  },
};

export const OverlayBright: Story = {
  args: {
    variant: 'overlay',
    image: '/images/temp/category-road-running.webp',
    description: '밝은 이미지에서는 검정색 콘텐츠와 검정 pill 버튼을 사용합니다.',
    actions: [{ label: '상품 바로가기', to: '/products', type: 'pill' }],
  },
};
