import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/고객센터/3. 1:1문의/Mobile',
  globals: { viewport: 'hoka375' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.InquiriesMobile375, name: 'Default' };

export const Pending: Story = { ...scenarios.InquiryPendingMobile375, name: '답변 대기' };

export const Answered: Story = { ...scenarios.InquiryAnsweredMobile375, name: '답변 완료' };

export const Attachments: Story = {
  ...scenarios.InquiryAttachmentsMobile375,
  name: '첨부파일',
};

export const AttachmentPreview: Story = {
  ...scenarios.InquiryAttachmentPreviewMobile375,
  name: '첨부파일 미리보기',
};

export const New: Story = { ...scenarios.InquiryNewMobile375, name: '문의 작성' };

export const NewOrderLookup: Story = {
  ...scenarios.InquiryOrderLookupMobile375,
  name: '문의 작성 / 주문상품 조회',
};

export const NewOrderSelected: Story = {
  ...scenarios.InquiryOrderSelectedMobile375,
  name: '주문 상품 조회 / 선택 상태',
};

export const OrderProductLookup: Story = {
  ...scenarios.InquiryOrderLookupPageMobile375,
  name: '주문 상품 조회 페이지',
};

export const NewOrderRequired: Story = {
  ...scenarios.InquiryOrderRequiredMobile375,
  name: '문의 작성 / 주문번호 필수 안내',
};

export const NewRequiredErrors: Story = {
  ...scenarios.InquiryNewRequiredErrorsMobile375,
  name: '문의 작성 / 필수 항목 오류',
};

export const NewAllValidationErrors: Story = {
  ...scenarios.InquiryNewAllValidationErrorsMobile375,
  name: '문의 작성 / 전체 오류',
};

export const NewAttachmentInvalidType: Story = {
  ...scenarios.InquiryAttachmentInvalidTypeMobile375,
  name: '문의 작성 / 첨부 형식 오류',
};

export const NewAttachmentTooLarge: Story = {
  ...scenarios.InquiryAttachmentTooLargeMobile375,
  name: '문의 작성 / 첨부 용량 초과',
};

export const NewAttachmentCountExceeded: Story = {
  ...scenarios.InquiryAttachmentCountExceededMobile375,
  name: '문의 작성 / 첨부 개수 초과',
};
