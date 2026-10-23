import type { Meta, StoryObj } from '@storybook/react';
import { OrderRecommendations } from '@/shared/components/organisms/OrderRecommendations/OrderRecommendations';
import { orderRecommendations } from '@/mocks/orderRecommendations';
import { PlatformProvider } from '@/shared/context/platform';

const meta = {
  title: 'Organisms/OrderRecommendations',
  component: OrderRecommendations,
  tags: ['autodocs'],
  args: { items: orderRecommendations },
} satisfies Meta<typeof OrderRecommendations>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = { args: { items: [] } };

export const Portrait: Story = {
  args: { layout: 'portrait' },
  globals: { viewport: 'hoka375' },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile">
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
};

export const CompactMobile: Story = {
  ...Portrait,
  args: { layout: 'compact' },
};

export const CustomData: Story = {
  args: {
    title: '최근 본 상품',
    items: orderRecommendations.slice(0, 1).map((item) => ({
      ...item,
      href: '/products?recommendation=recent',
      name: '주입한 추천 상품 이름이 두 줄까지 표시됩니다',
    })),
  },
};
