/** 같은 화면 상태의 PC·모바일 시안은 하나의 반응형 URL을 공유합니다. */
export const inquiryListPreviews = [
  {
    label: '접수완료',
    href: '/support/inquiries/preview-pending',
    state: 'pending',
    figmaNodes: ['1973:16510', '1973:16713'],
  },
  {
    label: '답변완료',
    href: '/support/inquiries/preview-answered',
    state: 'answered',
    figmaNodes: ['1973:16544', '1973:16753'],
  },
  {
    label: '접수완료 · 첨부파일',
    href: '/support/inquiries/preview-pending-attachments',
    state: 'pending-attachments',
    figmaNodes: ['1973:16583'],
  },
  {
    label: '답변완료 · 첨부파일',
    href: '/support/inquiries/preview-attachments',
    state: 'attachments',
    figmaNodes: ['1973:16789'],
  },
  {
    label: '첨부파일 미리보기',
    href: '/support/inquiries/preview-attachment',
    state: 'attachment-preview',
    figmaNodes: ['1973:16636', '1973:16423'],
  },
] as const;

export const inquiryFormPreviews = [
  {
    label: '작성 취소 안내',
    href: '/support/inquiries/new/preview-cancel',
    state: 'cancel',
    figmaNodes: ['1973:16663', '1973:16455'],
  },
  {
    label: '주문상품 조회 전',
    href: '/support/inquiries/new/preview-order-lookup',
    state: 'order-lookup',
    figmaNodes: ['1973:17121', '1973:17047'],
  },
  {
    label: '주문상품 선택 후',
    href: '/support/inquiries/new/preview-order-selected',
    state: 'order-selected',
    figmaNodes: ['1973:17270', '1973:17185'],
  },
] as const;
