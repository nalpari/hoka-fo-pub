import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';

import LoginPage from '@/app/login/page';
import { AddressStatePreview } from '@/app/mypage/addresses/_components/AddressStatePreview';
import { ReviewStatePreview } from '@/app/mypage/reviews/_components/ReviewStatePreview';
import { ProductListingPage } from '@/components/catalog/ProductListingPage';
import { OrdersRoute } from '@/components/orders/OrdersRoute';
import { PhoneVerificationStatePreview } from '@/components/phone-verification/PhoneVerificationStatePreview';
import { products } from '@/mocks/products';

const meta = {
  title: 'Integration/Binding',
  parameters: { layout: 'fullscreen' },
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
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoginMarkup: Story = {
  render: () => <LoginPage />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.type(c.getByLabelText(/아이디$/, { selector: 'input' }), 'tester');
    await userEvent.type(c.getByLabelText(/비밀번호/, { selector: 'input' }), 'Hoka1234!@');
    await userEvent.click(c.getByRole('button', { name: '로그인' }));
    await expect(c.queryByRole('alert')).not.toBeInTheDocument();
  },
};

export const CatalogResponse: Story = {
  name: '준비된 상품 표시 데이터',
  render: () => (
    <ProductListingPage data={{ items: [products[0]], totalCount: 73, hasMore: false }} />
  ),
};

export const AddressResponse: Story = {
  name: '배송지 고정 입력 오류',
  render: () => <AddressStatePreview state="error" />,
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('#address-recipient') as HTMLInputElement;
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(input, '테스트');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};

export const ReviewData: Story = {
  name: '리뷰 고정 목록',
  render: () => <ReviewStatePreview state="ready-list" />,
};

export const OrdersResponse: Story = { name: '주문 고정 목록', render: () => <OrdersRoute /> };

export const VerificationRetry: Story = {
  name: '인증 오류 고정 표시',
  render: () => <PhoneVerificationStatePreview state="error" />,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText(/이름/);
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(input, '홍길동');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};
