import { expect, userEvent, waitFor, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react';
import { ShopShell } from '@/shared/ShopShell';
import { SupportPage } from '@/shared/features/support/SupportPage';
import { SizeGuidePage } from '@/shared/features/size-guide/SizeGuidePage';
import { FaqPage } from '@/shared/features/faq/FaqPage';
import { NoticesPage } from '@/shared/features/notices/NoticesPage';
import { NoticeDetailPage } from '@/shared/features/notices/NoticeDetailPage';
import { InquiryPage } from '@/shared/features/support/InquiryPage';
import { InquiryNewPage } from '@/shared/features/support/InquiryNewPage';
import { ShippingReturnsPage } from '@/shared/features/support/ShippingReturnsPage';
import { StoreFinderPage } from '@/shared/features/store-finder/StoreFinderPage';
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

const verifyTerms: NonNullable<Story['play']> = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole('button', { name: '약관 시행일 선택' });
  await userEvent.click(trigger);
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await userEvent.keyboard('{Escape}');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await waitFor(() => expect(trigger).toHaveFocus());
  await userEvent.click(trigger);
  await userEvent.click(
    within(canvasElement.ownerDocument.body).getByRole('radio', { name: '2026.02.01' }),
  );
  await expect(trigger).toHaveTextContent('2026. 02. 01');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
};

const verifyNotices: NonNullable<Story['play']> = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const list = within(canvas.getByRole('region', { name: '공지사항 목록' }));
  const first = list.getByRole('button', { name: /네이버페이 9월/ });
  const second = list.getByRole('button', { name: /광복절/ });
  await userEvent.click(second);
  await expect(second).toHaveAttribute('aria-expanded', 'true');
  await expect(first).toHaveAttribute('aria-expanded', 'false');
  await expect(list.getByText(/광복절 고객센터 운영 안내 상세/)).toBeVisible();
  await userEvent.tab({ shift: true });
  await waitFor(() => expect(first).toHaveFocus());
};

export const Desktop: Story = {
  name: 'Desktop / 1600px',
  globals: { viewport: 'hoka1600' },
};

export const SizeGuideDesktop: Story = {
  render: () => (
    <ShopShell platform="web">
      <SizeGuidePage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/size-guide' } } },
  globals: { viewport: 'hoka1600' },
};

export const SizeGuideMobile375: Story = {
  render: () => (
    <ShopShell platform="mobile">
      <SizeGuidePage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/size-guide' } } },
  globals: { viewport: 'hoka375' },
};

export const Mobile375: Story = {
  parameters: { layout: 'fullscreen' },
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
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/support/faq' } } },
  globals: { viewport: 'hoka375' },
};

export const NoticesDesktop: Story = {
  play: verifyNotices,
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
  play: async ({ canvasElement }) => {
    const list = within(within(canvasElement).getByRole('region', { name: '공지사항 목록' }));
    await expect(list.getByRole('link', { name: /네이버페이 9월/ })).toHaveAttribute(
      'href',
      '/support/notices/1',
    );
    await expect(list.getByRole('link', { name: /광복절/ })).toHaveAttribute(
      'href',
      '/support/notices/2',
    );
  },
  name: 'Notices / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <NoticesPage />
    </ShopShell>
  ),
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/support/notices' } } },
  globals: { viewport: 'hoka375' },
};

export const NoticeDetailMobile375: Story = {
  name: 'Notice Detail / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <NoticeDetailPage />
    </ShopShell>
  ),
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/support/notices/1' } } },
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
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/support/inquiries' } } },
  globals: { viewport: 'hoka375' },
};

export const InquiryNewMobile375: Story = {
  name: 'Inquiry Form / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <InquiryNewPage />
    </ShopShell>
  ),
  parameters: {
    layout: 'fullscreen',
    nextjs: { navigation: { pathname: '/support/inquiries/new' } },
  },
  globals: { viewport: 'hoka375' },
};

export const InquiryNewDesktop: Story = {
  ...InquiryNewMobile375,
  name: 'Inquiry Form / Desktop',
  render: () => (
    <ShopShell platform="web">
      <InquiryNewPage />
    </ShopShell>
  ),
  globals: { viewport: 'hoka1600' },
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
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/support/inquiries' } } },
  globals: { viewport: 'hoka375' },
};

export const InquiryAnsweredMobile375: Story = {
  name: 'Inquiries / Answered / Mobile',
  render: () => (
    <ShopShell platform="mobile">
      <InquiryPage preview="answered" />
    </ShopShell>
  ),
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/support/inquiries' } } },
  globals: { viewport: 'hoka375' },
};

export const InquiryAnsweredDesktop: Story = {
  ...InquiryAnsweredMobile375,
  render: () => (
    <ShopShell platform="web">
      <InquiryPage preview="answered" />
    </ShopShell>
  ),
  globals: { viewport: 'hoka1600' },
};

export const InquiryAttachmentPreviewMobile375: Story = {
  ...InquiryPendingMobile375,
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: 'IMG_7899.JPG 미리보기' });
    await userEvent.click(trigger);
    const dialog = within(canvasElement.ownerDocument.body).getByRole('dialog', {
      name: '첨부파일 미리보기',
    });
    await expect(dialog).toBeVisible();
    await userEvent.click(within(dialog).getByRole('button', { name: /^확인$/ }));
    await waitFor(() => expect(dialog).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  },
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
  parameters: {
    layout: 'fullscreen',
    nextjs: { navigation: { pathname: '/support/after-sales' } },
  },
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
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/support/store' } } },
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
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/support/care' } } },
  globals: { viewport: 'hoka375' },
};

export const TermsDesktop: Story = {
  play: verifyTerms,
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
  play: verifyTerms,
  name: 'Terms / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <TermsPage />
    </ShopShell>
  ),
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/support/terms' } } },
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

export const MileageDesktop: Story = {
  name: 'Mileage / Desktop',
  render: () => (
    <ShopShell platform="web">
      <SupportExperiencePage kind="mileage" />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/mileage' } } },
  globals: { viewport: 'hoka1600' },
};

export const MileageMobile375: Story = {
  ...MileageDesktop,
  name: 'Mileage / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <SupportExperiencePage kind="mileage" />
    </ShopShell>
  ),
  globals: { viewport: 'hoka375' },
};
