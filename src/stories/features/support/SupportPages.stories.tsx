import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/shared/ShopShell';
import { SupportPage } from '@/shared/features/support/SupportPage';
import { FaqPage } from '@/shared/features/faq/FaqPage';
import { NoticesPage } from '@/shared/features/notices/NoticesPage';
import { NoticeDetailPage } from '@/shared/features/notices/NoticeDetailPage';
import { InquiryPage } from '@/shared/features/support/InquiryPage';
import { InquiryNewPage } from '@/shared/features/support/InquiryNewPage';
import { ShippingReturnsPage } from '@/shared/features/support/ShippingReturnsPage';
import { StoreFinderPage } from '@/shared/Mockup/store-finder/StoreFinderPage';
import { TeamwearPage } from '@/shared/features/teamwear/TeamwearPage';
import { CareGuidePage } from '@/shared/features/care-guide/CareGuidePage';
import { TermsPage } from '@/shared/features/terms/TermsPage';
import { SupportExperiencePage } from '@/shared/features/support/SupportExperiencePage';

type Args = { platform: 'web' | 'mobile' };

const meta = {
  title: 'PAGES/SUPPORT/Customer Center',
  args: { platform: 'web' },
  render: ({ platform }) => (
    <ShopShell platform={platform}>
      <SupportPage />
    </ShopShell>
  ),
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/support' } } },
} satisfies Meta<Args>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  name: 'Desktop / 1600px',
  globals: { viewport: 'hoka1600' },
};

export const Mobile375: Story = {
  name: 'Mobile / 375px',
  args: { platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const FaqDesktop: Story = {
  name: 'FAQs / Desktop',
  render: () => (
    <ShopShell platform="web">
      <FaqPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/faq' } } },
  globals: { viewport: 'hoka1600' },
};

export const FaqMobile375: Story = {
  name: 'FAQs / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <FaqPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/faq' } } },
  globals: { viewport: 'hoka375' },
};

export const NoticesDesktop: Story = {
  name: 'Notices / Desktop',
  render: () => (
    <ShopShell platform="web">
      <NoticesPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/notices' } } },
  globals: { viewport: 'hoka1600' },
};

export const NoticesMobile375: Story = {
  name: 'Notices / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <NoticesPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/notices' } } },
  globals: { viewport: 'hoka375' },
};

export const NoticeDetailMobile375: Story = {
  name: 'Notice Detail / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <NoticeDetailPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/notices/1' } } },
  globals: { viewport: 'hoka375' },
};

export const InquiriesDesktop: Story = {
  name: 'Inquiries / Desktop',
  render: () => (
    <ShopShell platform="web">
      <InquiryPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/inquiries' } } },
  globals: { viewport: 'hoka1600' },
};

export const InquiriesMobile375: Story = {
  name: 'Inquiries / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <InquiryPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/inquiries' } } },
  globals: { viewport: 'hoka375' },
};

export const InquiryNewMobile375: Story = {
  name: 'Inquiry Form / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <InquiryNewPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/inquiries/new' } } },
  globals: { viewport: 'hoka375' },
};

export const InquiryPendingDesktop: Story = {
  name: 'Inquiries / Pending / Desktop',
  render: () => (
    <ShopShell platform="web">
      <InquiryPage preview="pending" />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/inquiries' } } },
  globals: { viewport: 'hoka1600' },
};

export const InquiryPendingMobile375: Story = {
  name: 'Inquiries / Pending / Mobile',
  render: () => (
    <ShopShell platform="mobile">
      <InquiryPage preview="pending" />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/inquiries' } } },
  globals: { viewport: 'hoka375' },
};

export const InquiryAnsweredMobile375: Story = {
  name: 'Inquiries / Answered / Mobile',
  render: () => (
    <ShopShell platform="mobile">
      <InquiryPage preview="answered" />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/inquiries' } } },
  globals: { viewport: 'hoka375' },
};

export const ShippingReturnsDesktop: Story = {
  name: 'Shipping & Returns / Desktop',
  render: () => (
    <ShopShell platform="web">
      <ShippingReturnsPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/after-sales' } } },
  globals: { viewport: 'hoka1600' },
};

export const ShippingReturnsMobile375: Story = {
  name: 'Shipping & Returns / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <ShippingReturnsPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/after-sales' } } },
  globals: { viewport: 'hoka375' },
};

export const StoreFinderDesktop: Story = {
  name: 'Store Finder / Desktop',
  render: () => (
    <ShopShell platform="web">
      <StoreFinderPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/store' } } },
  globals: { viewport: 'hoka1600' },
};

export const StoreFinderMobile375: Story = {
  name: 'Store Finder / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <StoreFinderPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/store' } } },
  globals: { viewport: 'hoka375' },
};

export const TeamwearDesktop: Story = {
  name: 'Teamwear / Desktop',
  render: () => (
    <ShopShell platform="web">
      <TeamwearPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/teamwear' } } },
  globals: { viewport: 'hoka1600' },
};

export const TeamwearMobile375: Story = {
  name: 'Teamwear / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <TeamwearPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/teamwear' } } },
  globals: { viewport: 'hoka375' },
};

export const CareGuideDesktop: Story = {
  name: 'Care Guide / Desktop',
  render: () => (
    <ShopShell platform="web">
      <CareGuidePage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/care' } } },
  globals: { viewport: 'hoka1600' },
};

export const CareGuideMobile375: Story = {
  name: 'Care Guide / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <CareGuidePage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/care' } } },
  globals: { viewport: 'hoka375' },
};

export const TermsDesktop: Story = {
  name: 'Terms / Desktop',
  render: () => (
    <ShopShell platform="web">
      <TermsPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/terms' } } },
  globals: { viewport: 'hoka1600' },
};

export const TermsMobile375: Story = {
  name: 'Terms / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <TermsPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/terms' } } },
  globals: { viewport: 'hoka375' },
};

export const MemberBenefitsDesktop: Story = {
  name: 'Member Benefits / Desktop',
  render: () => (
    <ShopShell platform="web">
      <SupportExperiencePage kind="member-benefits" />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/member-benefits' } } },
  globals: { viewport: 'hoka1600' },
};
