import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/shared/ShopShell';
import { SupportPage } from '@/shared/features/support/SupportPage';
import { FaqPage } from '@/shared/features/faq/FaqPage';
import { NoticesPage } from '@/shared/features/notices/NoticesPage';
import { NoticeDetailPage } from '@/shared/features/notices/NoticeDetailPage';
import { InquiryPage } from '@/shared/features/support/InquiryPage';
import { InquiryNewPage } from '@/shared/features/support/InquiryNewPage';
import { ShippingReturnsPage } from '@/shared/features/support/ShippingReturnsPage';

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
