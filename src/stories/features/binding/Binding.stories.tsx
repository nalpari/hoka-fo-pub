import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fireEvent, fn, userEvent, waitFor, within } from 'storybook/test';
import { CheckoutContext, type CheckoutSubmission } from '@/context/CheckoutContext';
import { MyPageDataContext } from '@/context/MyPageDataContext';
import { OrdersContext } from '@/context/OrdersContext';
import { PhoneVerificationContext } from '@/context/PhoneVerificationContext';
import { PlatformProvider } from '@/context/platform';
import { usePhoneVerification } from '@/hooks/usePhoneVerification';

import { Button } from '@/components/common/atoms/Button';

import CheckoutPage from '@/app/checkout/page';
import LoginPage from '@/app/login/page';
import AddressPage from '@/app/mypage/addresses/page';
import ReviewPage from '@/app/mypage/reviews/page';
import { ProductListingPage } from '@/components/catalog/ProductListingPage';
import { previewOrders } from '@/components/orders/orders.data';
import type { OrderRecord } from '@/components/orders/orders.types';
import { OrdersRoute } from '@/components/orders/OrdersRoute';
import { PhoneVerificationContent } from '@/components/phone-verification/PhoneVerificationContent';
import { products } from '@/mocks/products';
import { ShopStatePreview } from '@/stories/features/ShopStatePreview';
import type { Address } from '@/types/mypage-address.types';

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

const product = { ...products[0], id: 'api-product-973', name: '서버 상품', price: 100000 };

const item = { id: product.id, color: '화이트', width: 'Regular', size: '250', quantity: 2 };

const remove = fn();

const checkoutSubmit = fn<(input: CheckoutSubmission) => Promise<void>>();

function CheckoutFixture() {
  const [coupon, setCoupon] = useState('api-coupon');
  const [maxBenefit, setMaxBenefit] = useState(false);
  return (
    <ShopStatePreview cart={[item]} products={[product]} remove={remove}>
      <CheckoutContext.Provider
        value={{
          coupon,
          maxBenefit,
          discount: 10000,
          shippingFee: 3000,
          couponOptions: [{ value: 'api-coupon', label: '서버 쿠폰' }],
          savedAddress: {
            id: 'api-address',
            label: '서버 배송지',
            name: '김호카',
            phone: '01012345678',
            address: '서울시 종로구',
            postalCode: '03000',
            addressDetail: '101호',
          },
          onCouponChange: setCoupon,
          onMaxBenefitChange: setMaxBenefit,
          submit: checkoutSubmit,
        }}
      >
        <CheckoutPage />
      </CheckoutContext.Provider>
    </ShopStatePreview>
  );
}

export const CheckoutRetry: Story = {
  beforeEach: () => {
    remove.mockClear();
    checkoutSubmit
      .mockReset()
      .mockImplementationOnce(async () => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        throw new Error('결제 승인에 실패했습니다.');
      })
      .mockResolvedValue(undefined);
  },
  render: () => <CheckoutFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('서버 상품')).toBeInTheDocument();
    const pay = canvas.getByRole('button', { name: '193,000원 결제하기' });
    for (const checkbox of canvas.getAllByRole('checkbox').slice(1))
      await userEvent.click(checkbox);
    await userEvent.click(pay);
    await expect(pay).toBeDisabled();
    await expect(checkoutSubmit).toHaveBeenCalledTimes(1);
    await expect(await canvas.findByRole('alert')).toHaveTextContent('결제 승인에 실패했습니다.');
    await expect(canvas.queryByText(/주문이 정상적으로 접수되었습니다/)).not.toBeInTheDocument();
    await expect(remove).not.toHaveBeenCalled();
    await expect(checkoutSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        items: [item],
        savedAddressId: 'api-address',
        payment: 'kakao',
        coupon: 'api-coupon',
        maxBenefit: false,
        orderAgreed: true,
        privacyAgreed: true,
        shipping: expect.objectContaining({
          name: '김호카',
          postalCode: '03000',
          addressDetail: '101호',
        }),
      }),
    );
    await userEvent.click(pay);
    await waitFor(() =>
      expect(canvas.getByText(/주문이 정상적으로 접수되었습니다/)).toBeInTheDocument(),
    );
    await expect(remove).not.toHaveBeenCalled();
  },
};

export const MobileCheckoutRetry: Story = { ...CheckoutRetry, parameters: { platform: 'mobile' } };

const login = fn();

export const LoginMarkup: Story = {
  beforeEach: () => {
    login.mockReset();
  },
  render: () => (
    <ShopStatePreview login={login}>
      <LoginPage />
    </ShopStatePreview>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    getRouter().push.mockClear();
    await fireEvent.change(canvas.getByLabelText(/아이디$/, { selector: 'input' }), {
      target: { value: 'tester' },
    });
    await fireEvent.change(canvas.getByLabelText(/비밀번호/, { selector: 'input' }), {
      target: { value: 'Hoka1234!@' },
    });
    await userEvent.click(canvas.getByRole('button', { name: '로그인' }));
    await expect(login).not.toHaveBeenCalled();
    await expect(getRouter().push).not.toHaveBeenCalled();
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
  },
};

const queryChanged = fn();

function CatalogFixture() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Button onClick={() => setLoaded(true)}>조회 결과 도착</Button>
      <ProductListingPage
        data={{
          items: loaded ? [product] : [],
          totalCount: loaded ? 73 : 0,
          hasMore: false,
          pending: !loaded,
          onQueryChange: queryChanged,
          onLoadMore: fn(),
        }}
      />
    </>
  );
}

export const CatalogResponse: Story = {
  render: () => <CatalogFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('status')).toHaveTextContent('상품을 불러오고 있습니다.');
    await expect(canvas.queryByText('조건에 맞는 상품이 없습니다')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: '조회 결과 도착' }));
    await expect(await canvas.findByText('서버 상품')).toBeInTheDocument();
    await expect(canvas.getByText(/73/)).toBeInTheDocument();
    await expect(queryChanged).toHaveBeenCalled();
  },
};

const address: Address = {
  id: 973,
  recipient: '김호카',
  name: '서버 배송지',
  phone: '01012345678',
  alternatePhone: '',
  zip: '03000',
  address: '서울시 종로구',
  detail: '101호',
  isDefault: false,
};

const deleteAddress = fn();

function AddressFixture() {
  const [items, setItems] = useState<Address[]>([]);
  return (
    <>
      <Button onClick={() => setItems([address])}>배송지 조회 결과 도착</Button>
      <MyPageDataContext.Provider
        value={{
          addresses: {
            items,
            save: fn(),
            remove: async (id) => {
              await deleteAddress(id);
              setItems([]);
            },
          },
        }}
      >
        <AddressPage />
      </MyPageDataContext.Provider>
    </>
  );
}

export const AddressResponse: Story = {
  beforeEach: () => {
    deleteAddress
      .mockReset()
      .mockRejectedValueOnce(new Error('배송지를 삭제하지 못했습니다.'))
      .mockResolvedValue(undefined);
  },
  render: () => <AddressFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '배송지 조회 결과 도착' }));
    await expect(await canvas.findByText('서버 배송지')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: '삭제' }));
    const dialog = within(body.getByRole('dialog'));
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await expect(await dialog.findByRole('alert')).toHaveTextContent(
      '배송지를 삭제하지 못했습니다.',
    );
    await expect(canvas.getByText('서버 배송지')).toBeInTheDocument();
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await waitFor(() => expect(canvas.queryByText('서버 배송지')).not.toBeInTheDocument());
    await expect(deleteAddress).toHaveBeenCalledWith(973);
  },
};

const saveReview = fn();

export const ReviewData: Story = {
  beforeEach: () => {
    saveReview
      .mockReset()
      .mockRejectedValueOnce(new Error('리뷰 저장에 실패했습니다.'))
      .mockResolvedValue(undefined);
  },
  render: () => (
    <MyPageDataContext.Provider
      value={{
        reviews: {
          ready: [
            {
              id: 'api-review',
              purchasedAt: '2026.10.29',
              product: {
                name: '서버 상품',
                imageSrc: product.primaryImage,
                optionLabel: '블랙 / 280',
              },
            },
          ],
          written: [],
          save: saveReview,
        },
      }}
    >
      <ReviewPage />
    </MyPageDataContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('서버 상품')).toBeInTheDocument();
    await expect(canvas.getByText('2026.10.29')).toBeInTheDocument();
    await expect(canvas.getByText('옵션 : 블랙 / 280')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: '리뷰 작성' }));
    await expect(
      within(canvasElement.ownerDocument.body).getByText('서버 상품은(는) 어떠셨나요?'),
    ).toBeInTheDocument();
    const body = within(canvasElement.ownerDocument.body);
    const dialog = within(body.getByRole('dialog'));
    await userEvent.click(dialog.getByRole('radio', { name: '5점' }));
    await fireEvent.change(dialog.getByRole('textbox', { name: '리뷰 내용' }), {
      target: { value: '서버 상품 리뷰' },
    });
    await userEvent.click(dialog.getByRole('button', { name: '저장' }));
    await expect(await dialog.findByRole('alert')).toHaveTextContent('리뷰 저장에 실패했습니다.');
    await expect(dialog.getByRole('textbox', { name: '리뷰 내용' })).toHaveValue('서버 상품 리뷰');
    await userEvent.click(dialog.getByRole('button', { name: '저장' }));
    await waitFor(() => expect(body.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(saveReview).toHaveBeenCalledWith('api-review', {
      rating: 5,
      body: '서버 상품 리뷰',
    });
  },
};

const confirmPurchase = fn();

function OrdersFixture() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  return (
    <ShopStatePreview>
      <Button onClick={() => setOrders([{ ...previewOrders[2], id: 'api-order-973' }])}>
        주문 조회 결과 도착
      </Button>
      <OrdersContext.Provider
        value={{
          orders,
          submitClaim: fn(),
          deleteOrder: fn(),
          confirmPurchase: async (id) => {
            await confirmPurchase(id);
            setOrders((previous) =>
              previous.map((order) =>
                order.id === id ? { ...order, status: 'purchased' } : order,
              ),
            );
          },
        }}
      >
        <OrdersRoute />
      </OrdersContext.Provider>
    </ShopStatePreview>
  );
}

export const OrdersResponse: Story = {
  beforeEach: () => {
    confirmPurchase
      .mockReset()
      .mockRejectedValueOnce(new Error('구매 확정에 실패했습니다.'))
      .mockResolvedValue(undefined);
  },
  render: () => <OrdersFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '주문 조회 결과 도착' }));
    await expect(await canvas.findByText(/api-order-973/)).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: '구매 확정' }));
    const dialog = within(body.getByRole('dialog'));
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await expect(await dialog.findByRole('alert')).toHaveTextContent('구매 확정에 실패했습니다.');
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await waitFor(() => expect(canvas.getByText('구매가 확정되었습니다.')).toBeInTheDocument());
    await expect(confirmPurchase).toHaveBeenCalledWith('api-order-973');
  },
};

const requestCode = fn();

const verifyCode = fn();

const verified = fn();

function VerificationFixture() {
  const verification = usePhoneVerification(verified);
  return (
    <>
      <Button
        onClick={() => {
          verification.onInformationChange('name', '김호카');
          verification.onInformationChange('birthDate', '19900101');
          verification.onInformationChange('phone', '01012345678');
          verification.onAllAgree(true);
        }}
      >
        인증 정보 입력
      </Button>
      <PhoneVerificationContent {...verification} />
    </>
  );
}

export const VerificationRetry: Story = {
  beforeEach: () => {
    requestCode
      .mockReset()
      .mockResolvedValue({ requestId: 'api-verification', expiresInSeconds: 180 });
    verifyCode
      .mockReset()
      .mockRejectedValueOnce(new Error('인증번호가 일치하지 않습니다.'))
      .mockResolvedValue(undefined);
    verified.mockClear();
  },
  render: () => (
    <PhoneVerificationContext.Provider value={{ request: requestCode, verify: verifyCode }}>
      <VerificationFixture />
    </PhoneVerificationContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '인증 정보 입력' }));
    await userEvent.click(canvas.getByRole('button', { name: '인증번호 요청' }));
    const code = await canvas.findByLabelText(/인증번호/, { selector: 'input' });
    await waitFor(() => expect(code).not.toBeDisabled());
    await fireEvent.change(code, { target: { value: '123456' } });
    await userEvent.click(canvas.getByRole('button', { name: '인증번호 확인' }));
    await expect(await canvas.findByText('인증번호가 일치하지 않습니다.')).toBeInTheDocument();
    await expect(verified).not.toHaveBeenCalled();
    await expect(verifyCode).toHaveBeenCalledWith(
      expect.objectContaining({ requestId: 'api-verification', code: '123456' }),
    );
    await userEvent.click(canvas.getByRole('button', { name: '인증번호 확인' }));
    await waitFor(() => expect(verified).toHaveBeenCalledTimes(1));
  },
};
