import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ShopShell } from '@/context/ShopShell';

import ShippingReturnsPage from '@/app/support/after-sales/page';
import CareGuidePage from '@/app/support/care/page';
import FaqPage from '@/app/support/faq/page';
import InquiryOrderLookupPage from '@/app/support/inquiries/new/order-products/page';
import InquiryNewPage from '@/app/support/inquiries/new/page';
import InquiryListPage from '@/app/support/inquiries/preview-list/page';
import MemberBenefitsPage from '@/app/support/member-benefits/page';
import MileagePage from '@/app/support/mileage/page';
import NoticeDetailPage from '@/app/support/notices/[id]/page';
import NoticesPage from '@/app/support/notices/page';
import SupportPage from '@/app/support/page';
import SizeGuidePage from '@/app/support/size-guide/page';
import StoreFinderPage from '@/app/support/store/page';
import TermsPage from '@/app/support/terms/page';
import { InquiryPage } from '@/stories/features/support/InquiryPagePreview';

type Args = { platform: 'web' | 'mobile' };

const meta = {
  title: 'PAGES/고객센터/0. 고객센터 메인',
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
  await expect(list.getByRole('link', { name: /네이버페이 9월/ })).toHaveAttribute(
    'href',
    '/support/notices/1',
  );
  await expect(list.getByRole('link', { name: /광복절/ })).toHaveAttribute(
    'href',
    '/support/notices/2',
  );
};

export const Desktop: Story = {
  name: 'Desktop / 1600px',
  globals: { viewport: 'hoka1600' },
};

const verifySizeGuide: NonNullable<Story['play']> = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  for (const category of [
    '신발',
    '상의',
    '하의',
    '러닝 베스트',
    '러닝 벨트',
    '모자',
    '양말',
    '장갑',
  ]) {
    await userEvent.click(canvas.getByRole('tab', { name: category }));
    const panel = within(canvas.getByRole('tabpanel'));
    await expect(panel.getByRole('heading', { name: category })).toBeVisible();
    await userEvent.click(panel.getByRole('button', { name: '여성' }));
    await expect(panel.getByRole('button', { name: '여성' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await userEvent.click(panel.getByRole('button', { name: 'INCH' }));
    await expect(panel.getByRole('table')).toHaveAccessibleName(
      new RegExp(`${category} 여성.*INCH`),
    );
    await userEvent.click(panel.getByRole('button', { name: '남성' }));
    await userEvent.click(panel.getByRole('button', { name: 'CM' }));
  }
  await userEvent.click(canvas.getByRole('tab', { name: '신발' }));
  const panel = within(canvas.getByRole('tabpanel'));
  await userEvent.click(panel.getByRole('button', { name: 'X-와이드' }));
  await expect(panel.getByRole('table')).toHaveAccessibleName(/X-와이드/);
  await userEvent.click(panel.getByRole('button', { name: '레귤러' }));
};

export const SizeGuideDesktop: Story = {
  play: verifySizeGuide,
  render: () => (
    <ShopShell platform="web">
      <SizeGuidePage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/size-guide' } } },
  globals: { viewport: 'hoka1600' },
};

export const SizeGuideMobile375: Story = {
  play: verifySizeGuide,
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

export const NoticeDetailDesktop: Story = {
  name: 'Notice Detail / Desktop',
  render: () => (
    <ShopShell platform="web">
      <NoticeDetailPage />
    </ShopShell>
  ),
  parameters: {
    nextjs: { navigation: { pathname: '/support/notices/1' } },
  },
  globals: { viewport: 'hoka1600' },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: '문의 유형' })).toHaveTextContent(
      '문의 분류를 선택해주세요',
    );
    await expect(canvas.getByRole('button', { name: '상세 유형' })).toHaveTextContent(
      '상세 유형을 선택해주세요',
    );
  },
};

export const InquiryNewRequiredErrorsMobile375: Story = {
  ...InquiryNewMobile375,
  name: 'Inquiry Form / Required field errors / Mobile',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '문의 등록' }));
    await expect(canvas.getByText('문의 분류를 선택해주세요.')).toBeVisible();
    await expect(canvas.getByText('상세 유형을 선택해주세요.')).toBeVisible();
  },
};

export const InquiryNewRequiredErrorsDesktop: Story = {
  ...InquiryNewRequiredErrorsMobile375,
  name: 'Inquiry Form / Required field errors / Desktop',
  render: () => (
    <ShopShell platform="web">
      <InquiryNewPage />
    </ShopShell>
  ),
  globals: { viewport: 'hoka1600' },
};

export const InquiryNewAllValidationErrorsMobile375: Story = {
  ...InquiryNewMobile375,
  name: 'Inquiry Form / All validation errors / Mobile',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '문의 등록' }));
    await userEvent.upload(
      canvas.getByLabelText('파일 첨부'),
      new File(['unsupported'], 'document.pdf', { type: 'application/pdf' }),
      { applyAccept: false },
    );
    for (const message of [
      '문의 분류를 선택해주세요.',
      '상세 유형을 선택해주세요.',
      '제목을 입력해 주세요.',
      '내용을 입력해 주세요.',
      '첨부할 수 없는 파일 형식입니다.',
    ]) {
      await expect(canvas.getByText(message)).toBeVisible();
    }
  },
};

export const InquiryNewAllValidationErrorsDesktop: Story = {
  ...InquiryNewAllValidationErrorsMobile375,
  name: 'Inquiry Form / All validation errors / Desktop',
  render: () => (
    <ShopShell platform="web">
      <InquiryNewPage />
    </ShopShell>
  ),
  globals: { viewport: 'hoka1600' },
};

const verifyAttachmentError =
  (
    fileName: string,
    contentType: string,
    size: number,
    message: string,
  ): NonNullable<Story['play']> =>
  async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('파일 첨부');
    const file = new File([new Uint8Array(size)], fileName, { type: contentType });
    await userEvent.upload(input, file, { applyAccept: false });
    await expect(canvas.getByText(message)).toBeVisible();
  };

export const InquiryAttachmentInvalidTypeMobile375: Story = {
  ...InquiryNewMobile375,
  name: 'Inquiry Form / Attachment type error / Mobile',
  play: verifyAttachmentError(
    'document.pdf',
    'application/pdf',
    100,
    '첨부할 수 없는 파일 형식입니다.',
  ),
};

export const InquiryAttachmentInvalidTypeDesktop: Story = {
  ...InquiryAttachmentInvalidTypeMobile375,
  name: 'Inquiry Form / Attachment type error / Desktop',
  render: () => (
    <ShopShell platform="web">
      <InquiryNewPage />
    </ShopShell>
  ),
  globals: { viewport: 'hoka1600' },
};

export const InquiryAttachmentTooLargeMobile375: Story = {
  ...InquiryNewMobile375,
  name: 'Inquiry Form / Attachment size error / Mobile',
  play: verifyAttachmentError(
    'large.jpg',
    'image/jpeg',
    10 * 1024 * 1024 + 1,
    '첨부파일은 10MB 이하로 첨부해주세요.',
  ),
};

export const InquiryAttachmentTooLargeDesktop: Story = {
  ...InquiryAttachmentTooLargeMobile375,
  name: 'Inquiry Form / Attachment size error / Desktop',
  render: () => (
    <ShopShell platform="web">
      <InquiryNewPage />
    </ShopShell>
  ),
  globals: { viewport: 'hoka1600' },
};

export const InquiryAttachmentCountExceededMobile375: Story = {
  ...InquiryNewMobile375,
  name: 'Inquiry Form / Attachment count error / Mobile',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('파일 첨부');
    const files = Array.from(
      { length: 6 },
      (_, index) => new File(['image'], `image-${index}.jpg`, { type: 'image/jpeg' }),
    );
    await userEvent.upload(input, files);
    await expect(canvas.getByText('파일은 최대 5개까지 첨부할 수 있습니다.')).toBeVisible();
  },
};

export const InquiryAttachmentCountExceededDesktop: Story = {
  ...InquiryAttachmentCountExceededMobile375,
  name: 'Inquiry Form / Attachment count error / Desktop',
  render: () => (
    <ShopShell platform="web">
      <InquiryNewPage />
    </ShopShell>
  ),
  globals: { viewport: 'hoka1600' },
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

const verifyInquiryOrderLookup: NonNullable<Story['play']> = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: '문의 유형' }));
  await userEvent.click(
    within(canvasElement.ownerDocument.body).getByRole('option', { name: '주문/결제' }),
  );
  await expect(canvas.getByRole('button', { name: '주문 상품 조회' })).toBeVisible();
};

const verifyInquiryOrderSelection: NonNullable<Story['play']> = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('radio', { name: 'HK2026091635153701' }));
  const firstProduct = canvas.getByRole('checkbox', { name: 'HRKRGF747G 클리프톤 6 선택' });
  await expect(firstProduct).toBeChecked();
  await userEvent.click(firstProduct);
  await expect(firstProduct).not.toBeChecked();
  await expect(canvas.getByRole('button', { name: '문의 등록' })).toBeVisible();
};

const verifyInquiryOrderRequired: NonNullable<Story['play']> = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: '문의 유형' }));
  await userEvent.click(
    within(canvasElement.ownerDocument.body).getByRole('option', { name: '주문/결제' }),
  );
  await userEvent.click(canvas.getByRole('button', { name: '문의 등록' }));
  const dialog = within(canvasElement.ownerDocument.body);
  await expect(dialog.getByText('주문번호를 선택해주세요.')).toBeVisible();
};

export const InquiryOrderLookupMobile375: Story = {
  ...InquiryNewMobile375,
  name: 'Inquiry Form / Order lookup / Mobile',
  play: verifyInquiryOrderLookup,
};

export const InquiryOrderLookupDesktop: Story = {
  ...InquiryNewDesktop,
  name: 'Inquiry Form / Order lookup / Desktop',
  play: verifyInquiryOrderLookup,
};

export const InquiryOrderSelectedMobile375: Story = {
  ...InquiryNewMobile375,
  name: 'Inquiry Form / Order selected / Mobile',
  play: verifyInquiryOrderSelection,
  render: () => (
    <ShopShell platform="mobile">
      <InquiryOrderLookupPage />
    </ShopShell>
  ),
  parameters: {
    layout: 'fullscreen',
    nextjs: { navigation: { pathname: '/support/inquiries/new/order-products' } },
  },
};

export const InquiryOrderSelectedDesktop: Story = {
  ...InquiryNewDesktop,
  name: 'Inquiry Form / Order selected / Desktop',
  play: verifyInquiryOrderSelection,
  render: () => (
    <ShopShell platform="web">
      <InquiryOrderLookupPage />
    </ShopShell>
  ),
  parameters: {
    nextjs: { navigation: { pathname: '/support/inquiries/new/order-products' } },
  },
};

export const InquiryOrderLookupPageMobile375: Story = {
  name: 'Order product lookup page / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <InquiryOrderLookupPage />
    </ShopShell>
  ),
  parameters: {
    layout: 'fullscreen',
    nextjs: { navigation: { pathname: '/support/inquiries/new/order-products' } },
  },
  globals: { viewport: 'hoka375' },
};

export const InquiryOrderLookupPageDesktop: Story = {
  name: 'Order product lookup page / Desktop',
  render: () => (
    <ShopShell platform="web">
      <InquiryOrderLookupPage />
    </ShopShell>
  ),
  parameters: {
    nextjs: { navigation: { pathname: '/support/inquiries/new/order-products' } },
  },
  globals: { viewport: 'hoka1600' },
};

export const InquiryOrderRequiredMobile375: Story = {
  ...InquiryNewMobile375,
  name: 'Inquiry Form / Order required / Mobile',
  play: verifyInquiryOrderRequired,
};

export const InquiryOrderRequiredDesktop: Story = {
  ...InquiryNewDesktop,
  name: 'Inquiry Form / Order required / Desktop',
  play: verifyInquiryOrderRequired,
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

export const InquiryAttachmentsMobile375: Story = {
  ...InquiryPendingMobile375,
  name: 'Inquiries / Attachments / Mobile',
  render: () => (
    <ShopShell platform="mobile">
      <InquiryPage preview="attachmentPreview" />
    </ShopShell>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const attachment = canvas.getByRole('button', { name: 'IMG_7899.JPG 미리보기' });
    await expect(attachment).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: /문의 답변 접기/ }));
    await expect(attachment).toBeVisible();
    await expect(canvas.getByRole('region', { name: '문의 답변', hidden: true })).not.toBeVisible();
  },
};

export const InquiryAttachmentPreviewMobile375: Story = {
  ...InquiryAttachmentsMobile375,
  name: 'Inquiries / Attachment preview / Mobile',
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: 'IMG_7899.JPG 미리보기' });
    await userEvent.click(trigger);
    const dialog = within(canvasElement.ownerDocument.body).getByRole('dialog', {
      name: '첨부파일 미리보기',
    });
    await expect(dialog).toBeVisible();
  },
};

export const InquiryAttachmentsDesktop: Story = {
  ...InquiryAnsweredDesktop,
  name: 'Inquiries / Attachments / Desktop',
  render: () => (
    <ShopShell platform="web">
      <InquiryPage preview="attachmentPreview" />
    </ShopShell>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const attachment = canvas.getByRole('button', { name: 'IMG_7899.JPG 미리보기' });
    await expect(attachment).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: /문의 답변 접기/ }));
    await expect(attachment).toBeVisible();
    await expect(canvas.getByRole('region', { name: '문의 답변', hidden: true })).not.toBeVisible();
  },
};

export const InquiryAttachmentPreviewDesktop: Story = {
  ...InquiryAttachmentsDesktop,
  name: 'Inquiries / Attachment preview / Desktop',
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole('button', { name: 'IMG_7899.JPG 미리보기' });
    await userEvent.click(trigger);
    const dialog = within(canvasElement.ownerDocument.body).getByRole('dialog', {
      name: '첨부파일 미리보기',
    });
    await expect(dialog).toBeVisible();
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
      <MemberBenefitsPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/member-benefits' } } },
  globals: { viewport: 'hoka1600' },
};

export const MemberBenefitsMobile375: Story = {
  ...MemberBenefitsDesktop,
  name: 'Member Benefits / Mobile / 375px',
  render: () => (
    <ShopShell platform="mobile">
      <MemberBenefitsPage />
    </ShopShell>
  ),
  globals: { viewport: 'hoka375' },
};

export const MileageDesktop: Story = {
  name: 'Mileage / Desktop',
  render: () => (
    <ShopShell platform="web">
      <MileagePage />
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
      <MileagePage />
    </ShopShell>
  ),
  globals: { viewport: 'hoka375' },
};

export const InquiryListDesktop: Story = {
  name: 'Inquiries / Mixed list / Desktop',
  render: () => (
    <ShopShell platform="web">
      <InquiryListPage />
    </ShopShell>
  ),
  parameters: { nextjs: { navigation: { pathname: '/support/inquiries/preview-list' } } },
  globals: { viewport: 'hoka1600' },
};

export const InquiryListMobile375: Story = {
  ...InquiryListDesktop,
  name: 'Inquiries / Mixed list / Mobile',
  render: () => (
    <ShopShell platform="mobile">
      <InquiryListPage />
    </ShopShell>
  ),
  globals: { viewport: 'hoka375' },
};
