import { type Meta, type StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/context/platform';
import { OrderProductSummaryContent } from '@/components/common/molecules/OrderProductSummary/OrderProductSummary';

const meta = {
  title: 'Molecules/OrderProductSummaryContent',
  component: OrderProductSummaryContent,
  args: {
    name: 'Clifton 11 GTX',
    optionText: '옵션 : Regular / Black / 250 2개',
    amount: 480000,
  },
  decorators: [
    (Story, { parameters }) => {
      const platform = parameters.platform === 'mobile' ? 'mobile' : 'web';
      return (
        <PlatformProvider platform={platform}>
          <div className={`platform-${platform}`}>
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
} satisfies Meta<typeof OrderProductSummaryContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checkout: Story = {};

export const Cart: Story = { args: { variant: 'cart', gender: "Men's" } };

export const Coupon: Story = { args: { variant: 'coupon' } };

export const MobileLongName: Story = {
  args: {
    variant: 'cart',
    gender: "Women's",
    name: 'HOKA Clifton Ultra Long Distance Everyday Running All Weather Limited Edition Special Collection',
  },
  parameters: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};
