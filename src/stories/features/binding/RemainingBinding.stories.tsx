import { getRouter } from '@storybook/nextjs-vite/navigation.mock';
import type { Meta, StoryObj } from '@storybook/react';
import { StrictMode, useState } from 'react';
import { expect, fireEvent, fn, userEvent, waitFor, within } from 'storybook/test';
import {
  AccountFlowProvider,
  type AccountServices,
  AccountServicesContext,
  useAccountFlow,
} from '@/context/AccountFlowContext';
import { InquiryDataContext } from '@/context/InquiryDataContext';
import { MyPageDataContext } from '@/context/MyPageDataContext';
import { type ClaimQuoteInput, OrdersContext } from '@/context/OrdersContext';
import { PlatformProvider } from '@/context/platform';
import { RunningSessionDataContext } from '@/context/RunningSessionDataContext';
import { SupportContentContext } from '@/context/SupportContentContext';

import { Button } from '@/components/common/atoms/Button';

import PasswordResetPage from '@/app/login/find-account/password-reset/page';
import CouponPage from '@/app/mypage/coupons/page';
import PaymentPage from '@/app/mypage/payment-methods/page';
import ProfilePage from '@/app/mypage/profile/page';
import RunningSessionDetailPage from '@/app/running/running-session/[sessionId]/page';
import SignupInformationPage from '@/app/signup/information/page';
import SignupTermsPage from '@/app/signup/terms/page';
import FaqPage from '@/app/support/faq/page';
import { inquiryOrders } from '@/app/support/inquiries/new/inquiryOrders.data';
import { saveInquiryOrderResult } from '@/app/support/inquiries/new/inquiryOrderSelection.storage';
import InquiryNewPage from '@/app/support/inquiries/new/page';
import InquiryPage from '@/app/support/inquiries/page';
import NoticePage from '@/app/support/notices/page';
import TermsPage from '@/app/support/terms/page';
import { MyPageProductHistory } from '@/components/mypage/MyPageProductHistory';
import { previewOrders } from '@/components/orders/orders.data';
import { OrdersPage } from '@/components/orders/OrdersRoute';
import { runningSessionSessions } from '@/components/running-session/runningSession.data';
import { products } from '@/mocks/products';
import { ShopStatePreview } from '@/stories/features/ShopStatePreview';

const meta = {
  title: 'Integration/RemainingBinding',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story, { parameters }) => {
      const platform = parameters.platform === 'mobile' ? 'mobile' : 'web';
      return (
        <PlatformProvider platform={platform}>
          <div className={`platform-${platform}`}>
            <ShopStatePreview>
              <Story />
            </ShopStatePreview>
          </div>
        </PlatformProvider>
      );
    },
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const query = fn();

const loadMore = fn(async () => {});

const wait = () => new Promise<void>((resolve) => setTimeout(resolve, 250));

const product = { ...products[0], id: 'service-product-913', name: '서버 전용 상품' };

function FaqFixture() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Button onClick={() => setLoaded(true)}>서버 응답 도착</Button>
      <SupportContentContext.Provider
        value={{
          faq: {
            items: loaded
              ? [
                  { id: 'faq-A', category: '상품정보', question: '동일 제목', answer: '첫 답변' },
                  { id: 'faq-B', category: '상품정보', question: '동일 제목', answer: '둘째 답변' },
                ]
              : [],
            totalCount: 37,
            hasMore: true,
            pending: !loaded,
            onQueryChange: query,
            onLoadMore: loadMore,
          },
        }}
      >
        <FaqPage />
      </SupportContentContext.Provider>
    </>
  );
}

export const ServerFaq: Story = {
  beforeEach: () => {
    query.mockClear();
    loadMore.mockClear();
  },
  render: () => <FaqFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText('검색 결과가 없습니다.')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: '서버 응답 도착' }));
    const questions = canvas.getAllByRole('button', { name: /동일 제목/ });
    await userEvent.click(questions[1]);
    await expect(canvas.getByText('둘째 답변')).toBeVisible();
    await expect(canvas.queryByText('첫 답변')).toBeNull();
    const input = canvas.getByRole('textbox');
    fireEvent.change(input, { target: { value: '실제 검색어' } });
    await waitFor(() =>
      expect(query).toHaveBeenLastCalledWith({ category: '전체', query: '실제 검색어' }),
    );
    await userEvent.click(canvas.getByRole('button', { name: /더보기/ }));
    await expect(loadMore).toHaveBeenCalledTimes(1);
  },
};

export const MobileServerFaq: Story = { ...ServerFaq, parameters: { platform: 'mobile' } };

export const NoticeStableId: Story = {
  render: () => (
    <SupportContentContext.Provider
      value={{
        notices: {
          items: [
            { id: 'notice-api-793', title: '서버 공지', date: '2026.10.29', body: '서버 본문' },
          ],
          totalCount: 42,
          hasMore: false,
          onQueryChange: query,
          onLoadMore: loadMore,
        },
      }}
    >
      <NoticePage />
    </SupportContentContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('link', { name: /서버 공지/ })).toHaveAttribute(
      'href',
      '/support/notices/notice-api-793',
    );
  },
};

const terms = {
  versions: [{ id: 'bo-v7', label: '2026.10.29' }],
  document: {
    id: 'terms-service',
    version: 'v7',
    effectiveAt: '2026.10.29',
    body: 'BO에서 받은 약관 본문',
  },
  onQueryChange: query,
};

export const BoTerms: Story = {
  render: () => (
    <SupportContentContext.Provider value={{ terms: { terms, privacy: terms } }}>
      <TermsPage />
    </SupportContentContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('BO에서 받은 약관 본문')).toBeInTheDocument();
    await waitFor(() => expect(query).toHaveBeenCalledWith({ kind: 'terms', versionId: 'bo-v7' }));
  },
};

export const InquiryContent: Story = {
  render: () => (
    <InquiryDataContext.Provider
      value={{
        list: {
          items: [
            {
              id: 'service-inquiry-9',
              title: '실제 문의 제목',
              answered: true,
              date: '2026.10.29',
              category: '상품',
              body: '실제 질문',
              answer: '실제 답변',
            },
          ],
          totalCount: 1,
          hasMore: false,
          onQueryChange: query,
          onLoadMore: loadMore,
        },
      }}
    >
      <InquiryPage />
    </InquiryDataContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('실제 질문')).toBeVisible();
    await expect(canvas.getByText('실제 답변')).toBeVisible();
    await expect(canvas.queryByText(/문의 내용 노출 영역/)).not.toBeInTheDocument();
  },
};

const order = {
  ...inquiryOrders[0],
  id: 'api-order-761',
  products: [{ ...inquiryOrders[0].products[0], id: 'api-line-392' }],
};

const inquirySubmit = fn(async () => {});

export const InquirySelectionRestore: Story = {
  beforeEach: () => {
    saveInquiryOrderResult({ order, products: order.products });
    inquirySubmit
      .mockReset()
      .mockRejectedValueOnce(new Error('문의 등록 실패'))
      .mockResolvedValue(undefined);
  },
  render: () => (
    <StrictMode>
      <InquiryDataContext.Provider
        value={{
          form: {
            customer: { name: '김호카', phone: '01012345678', email: 'service@example.com' },
            categories: [{ value: '주문/결제', details: ['결제 문의'], requiresOrder: true }],
            resolveSelection: async (ids) => {
              await wait();
              if (ids.orderId !== order.id) throw new Error('주문 ID 오류');
              return { order, products: order.products };
            },
            submit: inquirySubmit,
          },
        }}
      >
        <InquiryNewPage />
      </InquiryDataContext.Provider>
    </StrictMode>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await expect(canvas.getByText('service@example.com')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('combobox', { name: /문의 유형/ }));
    await userEvent.click(await body.findByRole('option', { name: '주문/결제' }));
    await waitFor(() => expect(canvas.getByText(/api-order-761/)).toBeInTheDocument());
    await userEvent.click(canvas.getByRole('combobox', { name: '상세 유형' }));
    await userEvent.click(await body.findByRole('option', { name: '결제 문의' }));
    fireEvent.change(canvas.getByPlaceholderText('제목을 입력해주세요. (50자 이하)'), {
      target: { value: '서비스 문의 제목' },
    });
    const message = canvas.getByPlaceholderText('내용을 입력해주세요.');
    fireEvent.change(message, { target: { value: '서비스 문의 본문' } });
    const file = new File(['image'], 'evidence.png', { type: 'image/png' });
    fireEvent.change(canvas.getByLabelText('파일 첨부', { selector: 'input' }), {
      target: { files: [file] },
    });
    const submit = canvas.getByRole('button', { name: '문의 등록' });
    await userEvent.click(submit);
    await expect(await canvas.findByRole('alert')).toHaveTextContent('문의 등록 실패');
    await expect(message).toHaveValue('서비스 문의 본문');
    await expect(inquirySubmit).toHaveBeenLastCalledWith({
      title: '서비스 문의 제목',
      body: '서비스 문의 본문',
      category: '주문/결제',
      detailCategory: '결제 문의',
      files: [file],
      selection: { orderId: order.id, productIds: [order.products[0].id] },
    });
    await userEvent.click(submit);
    await waitFor(() => expect(getRouter().push).toHaveBeenCalledWith('/support/inquiries'));
  },
};

const registerCoupon = fn<(code: string) => Promise<void>>(async () => {});

export const CouponRetry: Story = {
  beforeEach: () => {
    registerCoupon
      .mockReset()
      .mockImplementationOnce(async () => {
        await wait();
        throw new Error('쿠폰 등록 실패');
      })
      .mockResolvedValue(undefined);
  },
  render: () => (
    <MyPageDataContext.Provider
      value={{
        coupons: {
          items: [],
          totalCount: 0,
          hasMore: false,
          onQueryChange: query,
          onLoadMore: loadMore,
          register: registerCoupon,
        },
      }}
    >
      <CouponPage />
    </MyPageDataContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'API-COUPON-1' } });
    const button = canvas.getByRole('button', { name: '쿠폰 등록' });
    await userEvent.click(button);
    await expect(button).toBeDisabled();
    await expect(await canvas.findByRole('alert')).toHaveTextContent('쿠폰 등록 실패');
    await expect(input).toHaveValue('API-COUPON-1');
    await userEvent.click(button);
    await waitFor(() => expect(input).toHaveValue(''));
    await expect(registerCoupon).toHaveBeenLastCalledWith('API-COUPON-1');
  },
};

const registerPayment = fn<() => Promise<'registered' | 'cancelled'>>();

export const PaymentCancellationAndRetry: Story = {
  beforeEach: () => {
    registerPayment
      .mockReset()
      .mockResolvedValueOnce('cancelled')
      .mockRejectedValueOnce(new Error('등록 실패'))
      .mockResolvedValue('registered');
  },
  render: () => (
    <MyPageDataContext.Provider
      value={{
        paymentMethods: {
          items: [{ id: 'payment-api-1', label: '카드', maskedNumber: '****-1234' }],
          register: registerPayment,
        },
      }}
    >
      <PaymentPage />
    </MyPageDataContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const open = () => userEvent.click(canvas.getByRole('button', { name: '결제수단 등록' }));
    await open();
    await userEvent.click(within(body.getByRole('dialog')).getByRole('button', { name: '확인' }));
    await expect(canvas.queryByText('결제수단이 등록되었습니다.')).not.toBeInTheDocument();
    await open();
    const dialog = within(body.getByRole('dialog'));
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await expect(await dialog.findByRole('alert')).toHaveTextContent('등록 실패');
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await expect(await canvas.findByText('결제수단이 등록되었습니다.')).toBeInTheDocument();
  },
};

const setLiked = fn<(id: string, liked: boolean) => Promise<void>>(async () => {
  throw new Error('찜 변경 실패');
});

export const HistoryActualIds: Story = {
  render: () => (
    <MyPageDataContext.Provider
      value={{
        histories: {
          wishlist: {
            items: [{ id: 'wish-791', product, liked: true }],
            totalCount: 1,
            hasMore: false,
            onQueryChange: query,
            onLoadMore: loadMore,
            setLiked,
            cancelRestock: async () => {},
          },
        },
      }}
    >
      <MyPageProductHistory kind="wishlist" />
    </MyPageDataContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText(product.name)[0]).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: /관심상품/ }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('찜 변경 실패');
    await expect(setLiked).toHaveBeenCalledWith('wish-791', false);
    await expect(canvas.getAllByText(product.name)[0]).toBeInTheDocument();
  },
};

const apply = fn<(id: string) => Promise<void>>(async () => {});

export const RunningSessionApplication: Story = {
  parameters: { nextjs: { navigation: { segments: [['sessionId', 'api-session-99']] } } },
  beforeEach: () => {
    apply
      .mockReset()
      .mockRejectedValueOnce(new Error('세션 접수 실패'))
      .mockResolvedValue(undefined);
  },
  render: () => (
    <RunningSessionDataContext.Provider
      value={{
        detail: {
          session: { ...runningSessionSessions[0], id: 'api-session-99', title: '운영 세션' },
          facts: [
            { label: '정원', value: '45명' },
            { label: '예약금', value: '8,000원' },
          ],
          guide: [{ label: '코스', value: '운영 코스' }],
          onQueryChange: query,
          apply,
        },
      }}
    >
      <RunningSessionDetailPage />
    </RunningSessionDataContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await expect(canvas.getByText('45명')).toBeInTheDocument();
    const button = canvas.getByRole('button', { name: /신청하기/ });
    await userEvent.click(button);
    await expect(await canvas.findByRole('alert')).toHaveTextContent('세션 접수 실패');
    await userEvent.click(button);
    await expect(await body.findByText('세션 신청이 접수되었습니다.')).toBeInTheDocument();
    await expect(apply).toHaveBeenLastCalledWith('api-session-99');
  },
};

const claimSubmit = fn<(input: unknown) => Promise<void>>(async () => {});

const quote = fn(async (input: ClaimQuoteInput) => {
  await wait();
  return {
    id: `quote-${input.reason}`,
    amount: 230000 * (input.quantities['api-line'] ?? 0),
    fee: input.reason === 'mind' ? 5000 : 0,
    refund: 230000 * (input.quantities['api-line'] ?? 0) - (input.reason === 'mind' ? 5000 : 0),
    freeReturnApplied: input.reason !== 'mind',
  };
});

const refundOrder = {
  ...previewOrders[2],
  id: 'refund-service-81',
  items: [{ ...previewOrders[2].items[0], key: 'api-line', quantity: 3 }],
};

export const RefundQuoteAndSubmit: Story = {
  beforeEach: () => {
    claimSubmit
      .mockReset()
      .mockRejectedValueOnce(new Error('반품 접수 실패'))
      .mockResolvedValue(undefined);
    quote.mockClear();
  },
  render: () => (
    <OrdersContext.Provider
      value={{
        orders: [refundOrder],
        quoteClaim: quote,
        submitClaim: claimSubmit,
        confirmPurchase: async () => {},
        deleteOrder: async () => {},
      }}
    >
      <OrdersPage initialOrders={[refundOrder]} initialClaimKind="return" />
    </OrdersContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    const dialog = within(body.getByRole('dialog'));
    await userEvent.click(dialog.getByRole('checkbox'));
    const select = dialog.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'mind' } });
    const submit = dialog.getByRole('button', { name: '신청하기' });
    await expect(submit).toBeDisabled();
    await waitFor(() => expect(submit).toBeEnabled());
    await expect(dialog.getByText('225,000')).toBeInTheDocument();
    fireEvent.change(select, { target: { value: 'missing' } });
    await expect(submit).toBeDisabled();
    await waitFor(() => expect(submit).toBeEnabled());
    await userEvent.click(submit);
    await expect(await dialog.findByRole('alert')).toHaveTextContent('반품 접수 실패');
    await expect(claimSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        orderId: 'refund-service-81',
        quantities: { 'api-line': 1 },
        reason: 'missing',
        quoteId: 'quote-missing',
      }),
    );
    await userEvent.click(submit);
    await expect(await body.findByText('신청이 접수되었습니다.')).toBeInTheDocument();
  },
};

export const MobileRefundQuoteAndSubmit: Story = {
  ...RefundQuoteAndSubmit,
  parameters: { platform: 'mobile' },
};

const resetPassword = fn<(input: { resetProof: string; password: string }) => Promise<void>>(
  async () => {},
);

const services: AccountServices = {
  signupTerms: [],
  checkId: async () => ({ available: true }),
  register: async () => {},
  recovery: {
    request: async () => ({ requestId: 'request', expiresInSeconds: 180 }),
    verify: async () => ({ maskedAccountId: 'user***', resetProof: 'reset-proof-71' }),
    resetPassword,
  },
  unlock: async () => {},
};

function RecoveryFixture() {
  const flow = useAccountFlow();
  return (
    <>
      <Button
        onClick={() =>
          flow?.setRecovery({ maskedAccountId: 'user***', resetProof: 'reset-proof-71' })
        }
      >
        인증 완료 결과
      </Button>
      <PasswordResetPage />
    </>
  );
}

export const PasswordResetRetry: Story = {
  beforeEach: () => {
    resetPassword
      .mockReset()
      .mockRejectedValueOnce(new Error('비밀번호 변경 실패'))
      .mockResolvedValue(undefined);
  },
  render: () => (
    <AccountServicesContext.Provider value={services}>
      <AccountFlowProvider>
        <RecoveryFixture />
      </AccountFlowProvider>
    </AccountServicesContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '인증 완료 결과' }));
    const inputs = canvas.getAllByPlaceholderText(/비밀번호/);
    for (const input of inputs) fireEvent.change(input, { target: { value: 'Hoka!23456' } });
    const submit = canvas.getByRole('button', { name: '비밀번호 변경' });
    await userEvent.click(submit);
    await expect(await canvas.findByRole('alert')).toHaveTextContent('비밀번호 변경 실패');
    await expect(inputs[0]).toHaveValue('Hoka!23456');
    await userEvent.click(submit);
    await expect(await body.findByRole('dialog')).toBeVisible();
    await expect(resetPassword).toHaveBeenLastCalledWith({
      resetProof: 'reset-proof-71',
      password: 'Hoka!23456',
    });
  },
};

function ProfileFixture() {
  const [loaded, setLoaded] = useState(false);
  const [revised, setRevised] = useState(false);
  return (
    <>
      <Button onClick={() => setLoaded(true)}>회원정보 도착</Button>
      <Button onClick={() => setRevised(true)}>회원정보 갱신</Button>
      <MyPageDataContext.Provider
        value={{
          profile: {
            item: loaded
              ? {
                  id: 'member-891',
                  name: revised ? '갱신된 회원' : '서버 회원',
                  birthDate: '1990.01.01',
                  email: revised ? 'new@service.com' : 'old@service.com',
                  phone: '01012345678',
                  address: {
                    postalCode: '03000',
                    address: '서울시 종로구',
                    addressDetail: '101호',
                  },
                  emailPreference: '수신',
                  smsPreference: '수신안함',
                  kakaoPreference: '수신안함',
                }
              : null,
            pending: !loaded,
            save: async () => {},
            changePassword: async () => {},
            withdraw: async () => {},
            requestPhone: async () => ({ requestId: 'phone-api', expiresInSeconds: 60 }),
            verifyPhone: async () => 'phone-proof',
          },
        }}
      >
        <ProfilePage />
      </MyPageDataContext.Provider>
    </>
  );
}

export const ProfileLateAndReplaced: Story = {
  render: () => <ProfileFixture />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByText('hon******')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: '회원정보 도착' }));
    await expect(canvas.getByText('서버 회원')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: '회원정보 갱신' }));
    await expect(canvas.getByText('new@service.com')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: '회원정보 수정' }));
    await expect(canvas.getByDisplayValue('new')).toBeInTheDocument();
    await expect(canvas.getByText('갱신된 회원')).toBeInTheDocument();
  },
};

export const SignupBoConsent: Story = {
  render: () => (
    <AccountServicesContext.Provider
      value={{
        ...services,
        signupTerms: [
          {
            id: 'consent-BO-73',
            version: 'version-9',
            required: true,
            label: '서버 필수 약관',
            body: '가입 BO 본문',
          },
        ],
      }}
    >
      <AccountFlowProvider>
        <SignupTermsPage />
      </AccountFlowProvider>
    </AccountServicesContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await expect(canvas.getByText(/서버 필수 약관/)).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: /자세히 보기/ }));
    await expect(await body.findByText('가입 BO 본문')).toBeInTheDocument();
    await expect(body.queryByText('약관 타이틀1')).not.toBeInTheDocument();
  },
};

const signupRegister = fn<AccountServices['register']>(async () => {});

const signupCheck = fn<AccountServices['checkId']>(async () => ({ available: true }));

const signupTerms = [
  {
    id: 'consent-BO-73',
    version: 'version-9',
    required: true,
    label: '서버 필수 약관',
    body: '가입 BO 본문',
  },
];

function SignupFixture() {
  const flow = useAccountFlow();
  return flow?.identity ? (
    <SignupInformationPage />
  ) : (
    <Button
      onClick={() => {
        flow?.setIdentity({
          proof: 'identity-api-97',
          accountStatus: 'new',
          information: {
            name: '김호카',
            birthDate: '19900101',
            nationality: 'local',
            gender: 'male',
            carrier: 'skt',
            phone: '01012345678',
          },
        });
        flow?.setConsents([{ id: 'consent-BO-73', version: 'version-9', accepted: true }]);
      }}
    >
      서버 인증과 약관 결과
    </Button>
  );
}

export const SignupRequestRetry: Story = {
  beforeEach: () => {
    signupRegister
      .mockReset()
      .mockImplementationOnce(async () => {
        await wait();
        throw new Error('가입 요청 실패');
      })
      .mockResolvedValue(undefined);
    signupCheck.mockClear();
  },
  render: () => (
    <AccountServicesContext.Provider
      value={{ ...services, signupTerms, checkId: signupCheck, register: signupRegister }}
    >
      <AccountFlowProvider>
        <SignupFixture />
      </AccountFlowProvider>
    </AccountServicesContext.Provider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '서버 인증과 약관 결과' }));
    await expect(canvas.getByDisplayValue('19900101')).toBeDisabled();
    fireEvent.change(canvas.getByPlaceholderText('아이디를 입력해주세요'), {
      target: { value: 'hokauser79' },
    });
    await userEvent.click(canvas.getByRole('button', { name: '아이디 중복확인' }));
    await expect(await canvas.findByText('사용 가능한 아이디입니다.')).toBeInTheDocument();
    for (const placeholder of ['비밀번호를 입력해주세요', '비밀번호를 다시 입력해주세요'])
      fireEvent.change(canvas.getByPlaceholderText(placeholder), {
        target: { value: 'Hoka!23456' },
      });
    await userEvent.click(canvas.getByRole('button', { name: '주소 찾기' }));
    const addressDialog = within(body.getByRole('dialog'));
    fireEvent.change(addressDialog.getByPlaceholderText('우편번호를 입력해주세요'), {
      target: { value: '03000' },
    });
    fireEvent.change(addressDialog.getByPlaceholderText('주소를 입력해주세요'), {
      target: { value: '서울시 종로구' },
    });
    await userEvent.click(addressDialog.getByRole('button', { name: '확인' }));
    await waitFor(() => expect(body.queryByRole('dialog')).toBeNull());
    fireEvent.change(canvas.getByPlaceholderText('상세주소를 입력해주세요'), {
      target: { value: '101호' },
    });
    fireEvent.change(canvas.getByPlaceholderText('이메일 주소를 입력해주세요.'), {
      target: { value: 'apiuser' },
    });
    fireEvent.change(canvas.getByPlaceholderText('도메인을 입력해주세요'), {
      target: { value: 'example.com' },
    });
    await userEvent.click(canvas.getByRole('button', { name: '다음' }));
    await expect(canvas.getByText('부가 정보')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: '다음' }));
    const summary = within(body.getByRole('dialog'));
    await userEvent.click(summary.getByRole('button', { name: '확인' }));
    await expect(await summary.findByRole('alert')).toHaveTextContent('가입 요청 실패');
    await expect(signupRegister).toHaveBeenCalledWith(
      expect.objectContaining({
        identity: expect.objectContaining({ proof: 'identity-api-97', accountStatus: 'new' }),
        consents: [{ id: 'consent-BO-73', version: 'version-9', accepted: true }],
        information: expect.objectContaining({
          id: 'hokauser79',
          name: '김호카',
          birthDate: '19900101',
          phone: '01012345678',
          postalCode: '03000',
          addressDetail: '101호',
          email: 'apiuser',
          domain: 'example.com',
        }),
      }),
    );
    await userEvent.click(summary.getByRole('button', { name: '확인' }));
    await waitFor(() => expect(getRouter().push).toHaveBeenCalledWith('/signup/complete'));
  },
};
