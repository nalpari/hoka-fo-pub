import type { StoryObj } from '@storybook/react';

import base, * as scenarios from './SupportPages.scenarios';

const meta = {
  ...base,
  title: 'PAGES/고객센터/3. 1:1문의/WEB',
  globals: { viewport: 'hoka1600' },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { ...scenarios.InquiriesDesktop, name: 'Default' };

export const List: Story = { ...scenarios.InquiryListDesktop, name: '문의 목록 (대기·완료)' };

export const Attachments: Story = {
  ...scenarios.InquiryAttachmentsDesktop,
  name: '첨부파일',
};

export const AttachmentPreview: Story = {
  ...scenarios.InquiryAttachmentPreviewDesktop,
  name: '첨부파일 미리보기',
};

export const New: Story = { ...scenarios.InquiryNewDesktop, name: '문의 작성' };

export const NewOrderLookup: Story = {
  ...scenarios.InquiryOrderLookupDesktop,
  name: '문의 작성 / 주문상품 조회',
};

export const NewOrderSelected: Story = {
  ...scenarios.InquiryOrderSelectedDesktop,
  name: '주문 상품 조회 / 선택 상태',
};

export const OrderProductLookup: Story = {
  ...scenarios.InquiryOrderLookupPageDesktop,
  name: '주문 상품 조회 페이지',
};

export const NewOrderRequired: Story = {
  ...scenarios.InquiryOrderRequiredDesktop,
  name: '문의 작성 / 주문번호 필수 안내',
};

export const NewRequiredErrors: Story = {
  ...scenarios.InquiryNewRequiredErrorsDesktop,
  name: '문의 작성 / 필수 항목 오류',
};

export const NewAllValidationErrors: Story = {
  ...scenarios.InquiryNewAllValidationErrorsDesktop,
  name: '문의 작성 / 전체 오류',
};

export const NewAttachmentInvalidType: Story = {
  ...scenarios.InquiryAttachmentInvalidTypeDesktop,
  name: '문의 작성 / 첨부 형식 오류',
};

export const NewAttachmentTooLarge: Story = {
  ...scenarios.InquiryAttachmentTooLargeDesktop,
  name: '문의 작성 / 첨부 용량 초과',
};

export const NewAttachmentCountExceeded: Story = {
  ...scenarios.InquiryAttachmentCountExceededDesktop,
  name: '문의 작성 / 첨부 개수 초과',
};
