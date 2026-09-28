import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { MainCategoryCard } from '@/shared/components/molecules/MainCategoryCard/MainCategoryCard';

const meta = {
  title: 'Molecules/MainCategoryCard',
  component: MainCategoryCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: '304px' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  args: {
    title: 'Road Running',
    image: '/images/temp/category-road-running.webp',
    links: [
      { label: '남성 바로가기', to: '/products?gender=men' },
      { label: '여성 바로가기', to: '/products?gender=women' },
    ],
  },
} satisfies Meta<typeof MainCategoryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TitleLinks: Story = {};

export const DescriptionLink: Story = {
  args: {
    variant: 'descriptionLink',
    description: '활동에 맞는 쿠셔닝과 접지력을 확인하세요.',
    links: [{ label: '상품 바로가기', to: '/products' }],
  },
};

export const Overlay: Story = {
  args: {
    variant: 'overlay',
    description: '도시와 트레일을 위한 새로운 러닝 컬렉션입니다.',
    links: [{ label: '상품 바로가기', to: '/products' }],
  },
};
