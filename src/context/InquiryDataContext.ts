'use client';

import { createContext, type ReactNode } from 'react';

import type { InquiryOrder } from '@/app/support/inquiries/new/inquiryOrders.data';
import type { BindingState, ListBinding } from '@/types/binding';

export type InquiryView = {
  id: string;
  title: string;
  answered: boolean;
  date: string;
  category: string;
  body: ReactNode;
  answer?: ReactNode;
  attachments?: readonly { name: string; kind: 'image' | 'document'; previewUrl?: string }[];
};

export type InquirySelectionIds = { orderId: string; productIds: readonly string[] };

/** 개발팀 적용: 선택 복원은 서버 주문 ID로 조회합니다. 저장소의 ID를 목 배열로 해석하지 않습니다. 파일 업로드는 submit에서 완료하고 성공한 뒤 resolve합니다. */
/**
 * [개발팀 바인딩]
 * list는 실제 문의 id/body/answer/attachments를 전달합니다. answered는 서버의 처리 상태로 매핑하며 본문을 JSX 예시로 대체하지 않습니다.
 * orders는 기간 조건에 맞는 주문/주문상품 id를 반환합니다. form.categories의 value/details와 requiresOrder는 서버 분류 정책에 맞춥니다.
 * resolveSelection은 sessionStorage에 보관한 orderId/productIds로 실제 주문을 조회합니다. 목 주문 배열에서 ID를 찾지 않습니다.
 * submit에는 제목/내용/대분류/상세분류/원본 File[]/선택 orderId와 productIds가 전달됩니다. 업로드와 등록을 마친 뒤 resolve합니다.
 * 등록 실패는 Error로 reject합니다. 입력/파일/선택을 유지하고 성공한 경우에만 목록으로 이동합니다. 사용자 정보는 form.customer로 표시합니다.
 */
export const InquiryDataContext = createContext<{
  list?: ListBinding<InquiryView, Record<string, never>>;
  orders?: ListBinding<InquiryOrder, { period: string; from: string; to: string }>;
  form?: BindingState & {
    customer: { name: string; phone: string; email: string };
    categories: readonly { value: string; details: readonly string[]; requiresOrder: boolean }[];
    resolveSelection: (
      ids: InquirySelectionIds,
    ) => Promise<{ order: InquiryOrder; products: InquiryOrder['products'] } | null>;
    submit: (input: {
      title: string;
      body: string;
      category: string;
      detailCategory: string;
      files: readonly File[];
      selection: InquirySelectionIds | null;
    }) => Promise<void>;
  };
}>({});
