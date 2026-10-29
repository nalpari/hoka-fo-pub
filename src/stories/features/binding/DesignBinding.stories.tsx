import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import {
  CheckoutContext,
  type CheckoutCouponSelection,
  type CheckoutSubmission,
} from '@/context/CheckoutContext';
import { PlatformProvider } from '@/context/platform';
import { RunClubDataContext, type RunClubEntry } from '@/context/RunClubDataContext';

import { Button } from '@/components/common/atoms/Button';

import CheckoutPage from '@/app/checkout/page';
import EntryPage from '@/app/mypage/event-entries/page';
import { runClubSessions } from '@/components/run-club/runClub.data';
import { products } from '@/mocks/products';
import { ShopStatePreview } from '@/stories/features/ShopStatePreview';

const meta = {
  title: 'Integration/Design binding',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story, { parameters }) => (
      <PlatformProvider platform={parameters.platform === 'mobile' ? 'mobile' : 'web'}>
        <div className={parameters.platform === 'mobile' ? 'platform-mobile' : 'platform-web'}>
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const product = {
  ...products[0],
  id: 'server-product-892',
  name: '늦게 도착한 상품',
  price: 100000,
};

const item = { id: product.id, color: '화이트', width: 'Regular', size: '250', quantity: 2 };

const submit = fn<(input: CheckoutSubmission) => Promise<void>>().mockResolvedValue(undefined);

/** 외부 쿠폰 응답 교체와 적용 실패·재시도를 재현합니다. (Exercises external coupon replacement and application failure/retry.) */
function CouponFixture() {
  const [loaded, setLoaded] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [selection, setSelection] = useState<CheckoutCouponSelection>({
    products: {},
    cart: 'none',
  });
  return (
    <>
      <Button onClick={() => setLoaded(true)}>쿠폰 응답 도착</Button>
      <ShopStatePreview cart={[item]} products={[product]}>
        <CheckoutContext.Provider
          value={{
            coupon: 'none',
            maxBenefit: false,
            discount: attempt > 1 ? 15000 : 0,
            shippingFee: 3000,
            couponOptions: [{ value: 'none', label: '선택 안 함' }],
            savedAddress: {
              id: 'server-address-9',
              label: '배송지',
              name: '김호카',
              phone: '01012345678',
              postalCode: '03000',
              address: '서울 종로구',
              addressDetail: '101호',
            },
            couponSelection: selection,
            couponGroups: loaded
              ? [
                  {
                    id: 'server-line-42',
                    name: product.name,
                    coupons: [
                      { id: 'server-discount-19', label: '서버 상품 할인', discount: 15000 },
                      {
                        id: 'server-expired',
                        label: '사용 불가 쿠폰',
                        discount: 30000,
                        disabled: true,
                      },
                    ],
                  },
                ]
              : [],
            cartCoupons: [{ id: 'none', label: '적용 안 함', discount: 0 }],
            onCouponChange: () => {},
            onMaxBenefitChange: () => {},
            submit,
            applyCoupons: async (draft) => {
              setAttempt((previous) => previous + 1);
              await new Promise((resolve) => setTimeout(resolve, 250));
              if (attempt === 0) throw new Error('쿠폰 적용에 실패했습니다.');
              setSelection(draft);
            },
          }}
        >
          <CheckoutPage />
        </CheckoutContext.Provider>
      </ShopStatePreview>
    </>
  );
}

export const CouponRetry: Story = {
  beforeEach: () => {
    submit.mockClear();
  },
  render: () => <CouponFixture />,
  play: async ({ canvasElement }) => {
    canvasElement.removeAttribute('data-design-play-result');
    const canvas = within(canvasElement),
      body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '보유 쿠폰 조회' }));
    await expect(body.getByText('상품별 적용 가능한 쿠폰이 없습니다.')).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: '보유 쿠폰 조회 닫기' }));
    await userEvent.click(canvas.getByRole('button', { name: '쿠폰 응답 도착' }));
    await userEvent.click(canvas.getByRole('button', { name: '보유 쿠폰 조회' }));
    const dialog = within(body.getByRole('dialog', { name: '보유 쿠폰 조회' }));
    await userEvent.click(dialog.getByRole('radio', { name: /서버 상품 할인/ }));
    await expect(dialog.getByRole('radio', { name: /사용 불가 쿠폰/ })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    const apply = dialog.getByRole('button', { name: '쿠폰 적용하기' });
    await userEvent.click(apply);
    await expect(apply).toBeDisabled();
    await expect(await dialog.findByRole('alert')).toHaveTextContent('쿠폰 적용에 실패했습니다.');
    await expect(dialog.getByRole('radio', { name: /서버 상품 할인/ })).toBeChecked();
    await userEvent.click(apply);
    await waitFor(() =>
      expect(body.queryByRole('dialog', { name: '보유 쿠폰 조회' })).not.toBeInTheDocument(),
    );
    await expect(canvas.getByRole('button', { name: '188,000원 결제하기' })).toBeVisible();
    await userEvent.click(canvas.getByRole('checkbox', { name: /주문 내용을 확인/ }));
    await userEvent.click(canvas.getByRole('checkbox', { name: /개인정보 수집/ }));
    await userEvent.click(canvas.getByRole('button', { name: '188,000원 결제하기' }));
    await expect(submit).toHaveBeenCalledWith(
      expect.objectContaining({
        items: [item],
        couponSelection: { products: { 'server-line-42': 'server-discount-19' }, cart: 'none' },
        saveAsDefaultAddress: false,
      }),
    );
    await expect(await canvas.findByText(/주문이 정상적으로 접수되었습니다/)).toBeVisible();
    canvasElement.setAttribute('data-design-play-result', 'passed');
  },
};

export const MobileCouponRetry: Story = { ...CouponRetry, parameters: { platform: 'mobile' } };

const cancel = fn<(id: string) => void>();

/** 신청 응답과 취소 실패 후 재시도를 재현합니다. (Exercises entry response and cancellation failure/retry.) */
function EntryFixture() {
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState<readonly RunClubEntry[]>([
    { id: 'server-entry-781', session: runClubSessions[0], status: '신청완료' },
  ]);
  const [attempt, setAttempt] = useState(0);
  return (
    <>
      <Button onClick={() => setLoaded(true)}>신청내역 응답 도착</Button>
      <RunClubDataContext.Provider
        value={{
          entries: {
            items: loaded ? items : [],
            totalCount: loaded ? 1 : 0,
            hasMore: false,
            pending: !loaded,
            onQueryChange: () => {},
            onLoadMore: () => {},
          },
          cancelEntry: async (id) => {
            cancel(id);
            setAttempt((n) => n + 1);
            await new Promise((resolve) => setTimeout(resolve, 250));
            if (attempt === 0) throw new Error('신청 취소에 실패했습니다.');
            setItems((previous) =>
              previous.map((item) => (item.id === id ? { ...item, status: '취소' } : item)),
            );
          },
        }}
      >
        <EntryPage />
      </RunClubDataContext.Provider>
    </>
  );
}

export const EntryCancelRetry: Story = {
  beforeEach: () => {
    cancel.mockClear();
  },
  render: () => <EntryFixture />,
  play: async ({ canvasElement }) => {
    canvasElement.removeAttribute('data-design-play-result');
    const canvas = within(canvasElement),
      body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '신청내역 응답 도착' }));
    await userEvent.click(canvas.getByRole('button', { name: '신청 취소' }));
    const dialog = within(body.getByRole('dialog', { name: '신청 취소' }));
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await expect(dialog.getByRole('button', { name: '확인' })).toBeDisabled();
    await expect(await dialog.findByRole('alert')).toHaveTextContent('신청 취소에 실패했습니다.');
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await waitFor(() =>
      expect(body.queryByRole('dialog', { name: '신청 취소' })).not.toBeInTheDocument(),
    );
    await expect(cancel).toHaveBeenLastCalledWith('server-entry-781');
    await expect(canvas.queryByRole('button', { name: '신청 취소' })).not.toBeInTheDocument();
    canvasElement.setAttribute('data-design-play-result', 'passed');
  },
};

export const MobileEntryCancelRetry: Story = {
  ...EntryCancelRetry,
  parameters: { platform: 'mobile' },
};
