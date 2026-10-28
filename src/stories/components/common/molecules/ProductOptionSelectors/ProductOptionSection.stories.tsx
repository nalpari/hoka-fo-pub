import type { Meta, StoryObj } from '@storybook/react';
import { ProductOptionSection } from '@/components/common/molecules/ProductOptionSelectors/ProductOptionSection';
import { PlatformProvider } from '@/context/platform';

const meta = {
  title: 'Molecules/ProductOptionSelectors/Section',
  component: ProductOptionSection,
  args: {
    appearance: 'detail',
    title: '사이즈',
    children: '선택 영역',
    action: <a href="/support/size-guide">사이즈 가이드</a>,
  },
  decorators: [
    (Story, { parameters }) => {
      const platform = parameters.platform === 'mobile' ? 'mobile' : 'web';
      return (
        <PlatformProvider platform={platform}>
          <div className={`platform-${platform}`} style={{ width: '360px', maxWidth: '100%' }}>
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
} satisfies Meta<typeof ProductOptionSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Detail: Story = {};

export const Cart: Story = { args: { appearance: 'cart', action: undefined } };
