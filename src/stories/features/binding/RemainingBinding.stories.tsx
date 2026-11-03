import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/context/platform';

import { PasswordResetStatePreview } from '@/app/login/find-account/password-reset/_components/PasswordResetStatePreview';
import { RouteContent as CouponContent } from '@/app/mypage/coupons/_components/CouponManagement';
import { ProfileStatePreview } from '@/app/mypage/profile/_components/ProfileStatePreview';
import RunningSessionDetail from '@/app/running/running-session/[sessionId]/page';
import { RegistrationStatePreview } from '@/app/signup/information/_components/RegistrationStatePreview';
import { SignupTermsStatePreview } from '@/app/signup/terms/_components/SignupTermsStatePreview';
import { RouteContent as FaqContent } from '@/app/support/faq/_components/FaqContent';
import { InquiryListPreview } from '@/app/support/inquiries/_components/InquiryListPreview';
import { InquiryFormStatePreview } from '@/app/support/inquiries/new/_components/InquiryFormStatePreview';
import { NoticesContent } from '@/app/support/notices/_components/NoticesContent';
import { TermsDocument } from '@/app/support/terms/_components/TermsDocument';
import { MyPageProductHistory } from '@/components/mypage/MyPageProductHistory';
import { OrdersPage } from '@/app/mypage/orders/_components/OrdersPage';

const meta = {
  title: 'Integration/RemainingBinding',
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

export const ServerFaq: Story = { name: 'FAQ 고정 마크업', render: () => <FaqContent /> };

export const MobileServerFaq: Story = { ...ServerFaq, parameters: { platform: 'mobile' } };

export const NoticeStableId: Story = {
  name: '공지 목록 고정 마크업',
  render: () => <NoticesContent />,
};

export const BoTerms: Story = {
  name: '약관 고정 표시',
  render: () => <TermsDocument privacy={false} />,
};

export const InquiryContent: Story = {
  name: '문의 답변과 첨부',
  render: () => <InquiryListPreview state="attachments" />,
};

export const InquirySelectionRestore: Story = {
  name: '문의 주문상품 선택 표시',
  render: () => <InquiryFormStatePreview state="order-selected" />,
};

export const CouponRetry: Story = {
  name: '쿠폰 고정 입력 오류',
  render: () => <CouponContent preview="error" />,
};

export const HistoryActualIds: Story = {
  name: '관심상품 고정 목록',
  render: () => <MyPageProductHistory kind="wishlist" />,
};

export const RunningSessionApplication: Story = {
  name: '세션 상세 고정 표시',
  parameters: { nextjs: { navigation: { segments: [['sessionId', 'session-1']] } } },
  render: () => <RunningSessionDetail />,
};

export const MobileRunningSessionApplication: Story = {
  ...RunningSessionApplication,
  parameters: { ...RunningSessionApplication.parameters, platform: 'mobile' },
};

export const RefundQuoteAndSubmit: Story = {
  name: '반품 고정 목록',
  render: () => <OrdersPage returns />,
};

export const MobileRefundQuoteAndSubmit: Story = {
  ...RefundQuoteAndSubmit,
  parameters: { platform: 'mobile' },
};

export const PasswordResetRetry: Story = {
  name: '비밀번호 재설정 고정 오류',
  render: () => <PasswordResetStatePreview />,
};

export const ProfileLateAndReplaced: Story = {
  name: '회원정보 수정 고정 마크업',
  render: () => <ProfileStatePreview />,
};

export const SignupBoConsent: Story = {
  name: '약관 오류 고정 표시',
  render: () => <SignupTermsStatePreview />,
};

export const SignupRequestRetry: Story = {
  name: '회원가입 고정 입력 오류',
  render: () => <RegistrationStatePreview />,
};
