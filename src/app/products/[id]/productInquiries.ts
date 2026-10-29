/**
 * [개발팀 바인딩]
 * productInquiries는 상품 문의 예시입니다. 실제 상품 ID별 응답을 page.tsx의 ProductDetailInquiryContent/InquiryBoard.items 연결 소유자에 전달합니다.
 * 비공개 글은 권한 없는 응답에 본문/답변을 포함하지 않습니다. visibility: restricted는 표시 상태이며 서버 접근 통제를 대신하지 않습니다.
 * 현재 더보기는 전달된 배열의 표시 수 증가입니다. 서버 페이지를 붙일 때 전체 건수/추가 조회/상태 계약은 별도로 확장해야 합니다.
 */

import type { InquiryBoardEntry } from '@/types/component-contracts/app-products-id-page';

/** Sample entries for the product detail wireframe. */
export const productInquiries: readonly InquiryBoardEntry[] = [
  {
    id: 'product-inquiry-1',
    author: 'hok*****',
    date: '2026-10-20',
    status: 'pending',
    visibility: 'public',
    title: '재입고 문의',
    content: '재입고 일정을 알고 싶습니다.',
  },
  {
    id: 'product-inquiry-2',
    author: 'hok*****',
    date: '2026-10-20',
    status: 'answered',
    visibility: 'public',
    title: 'UV 차단여부',
    content:
      '냉감 티셔츠 원단에 익숙하지 않아서 어떤 느낌일지,\n체형에 따라 어떻게 보일지 몰라서 망설여지네요.',
    answer:
      '안녕하세요 고객님, 호카 코리아 입니다.\n\n문의 주신 상품 특성상 체형, 원하시는 핏에 따라 개인차 있을 수 있어 가까운 매장 방문 후 구매결정 하시는 것을 권해드립니다.\n다른 문의 사항 있으시면 언제든지 문의 남겨주시기 바랍니다.\n\n감사합니다.',
  },
  {
    id: 'product-inquiry-3',
    author: 'hok*****',
    date: '2026-10-20',
    status: 'pending',
    visibility: 'public',
    title: '배송 문의합니다.',
    content: '배송 일정을 확인하고 싶습니다.',
  },
  {
    id: 'product-inquiry-4',
    author: 'hok*****',
    date: '2026-10-20',
    status: 'answered',
    visibility: 'restricted',
  },
  {
    id: 'product-inquiry-5',
    author: 'hok*****',
    date: '2026-10-20',
    status: 'pending',
    visibility: 'public',
    title: '사이즈가 어떻게 되나요?',
    content: '평소 착용하는 사이즈로 선택하면 될까요?',
  },
  // Additional publishing samples exercise the 56-count and 16-at-a-time disclosure.
  ...Array.from({ length: 51 }, (_, index): InquiryBoardEntry => ({
    id: `product-inquiry-${index + 6}`,
    author: 'hok*****',
    date: '2026-10-20',
    status: 'pending',
    visibility: 'public',
    title: `상품 문의 ${index + 6}`,
    content: '상품 관련 문의입니다.',
  })),
];
