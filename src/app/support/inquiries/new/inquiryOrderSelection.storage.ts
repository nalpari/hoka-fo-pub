import { type InquiryOrder, type InquiryOrderProduct, inquiryOrders } from './inquiryOrders.data';

export type InquiryOrderSelection = { order: InquiryOrder; products: InquiryOrderProduct[] } | null;

const draftKey = 'hoka-inquiry-order-selection-draft';

const resultKey = 'hoka-inquiry-order-selection-result';

const returnMarkerKey = 'hoka-inquiry-order-selection-return';

function resolveSelection(value: string | null): InquiryOrderSelection {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as { orderId?: string; productIds?: string[] };
    const order = inquiryOrders.find((item) => item.id === parsed.orderId);
    const products = order?.products.filter((item) => parsed.productIds?.includes(item.id)) ?? [];
    return order && products.length > 0 ? { order, products } : null;
  } catch {
    return null;
  }
}

function serializeSelection(selection: InquiryOrderSelection) {
  return JSON.stringify(
    selection
      ? { orderId: selection.order.id, productIds: selection.products.map((item) => item.id) }
      : null,
  );
}

export function saveInquiryOrderDraft(selection: InquiryOrderSelection) {
  sessionStorage.setItem(draftKey, serializeSelection(selection));
  sessionStorage.setItem(returnMarkerKey, '1');
}

export function readInquiryOrderDraft() {
  const selection = resolveSelection(sessionStorage.getItem(draftKey));
  sessionStorage.removeItem(draftKey);
  return selection;
}

export function saveInquiryOrderResult(selection: InquiryOrderSelection) {
  sessionStorage.setItem(resultKey, serializeSelection(selection));
  window.dispatchEvent(new Event('hoka-inquiry-order-selection-result'));
}

export function shouldReturnToInquiry() {
  return sessionStorage.getItem(returnMarkerKey) === '1';
}

export function clearInquiryOrderReturnMarker() {
  sessionStorage.removeItem(returnMarkerKey);
}

export function readInquiryOrderResult() {
  if (sessionStorage.getItem(resultKey) === null) return null;
  const selection = resolveSelection(sessionStorage.getItem(resultKey));
  sessionStorage.removeItem(resultKey);
  return selection;
}

/** 개발팀 적용: 서버 ID를 resolve로 복원합니다. 요청 실패 시 저장된 선택을 유지하며 성공한 뒤에만 소비합니다. */
export async function restoreInquiryOrderSelection(
  kind: 'draft' | 'result',
  resolve: (ids: {
    orderId: string;
    productIds: readonly string[];
  }) => Promise<InquiryOrderSelection>,
): Promise<InquiryOrderSelection | undefined> {
  const key = kind === 'draft' ? draftKey : resultKey;
  const raw = sessionStorage.getItem(key);
  if (raw === null) return undefined;
  const ids: unknown = JSON.parse(raw);
  if (ids === null) {
    sessionStorage.removeItem(key);
    return null;
  }
  if (
    typeof ids !== 'object' ||
    !('orderId' in ids) ||
    typeof ids.orderId !== 'string' ||
    !('productIds' in ids) ||
    !Array.isArray(ids.productIds) ||
    !ids.productIds.every((id) => typeof id === 'string')
  )
    throw new Error('선택 상품 정보를 확인할 수 없습니다.');
  const selection = await resolve({ orderId: ids.orderId, productIds: ids.productIds });
  if (!selection) throw new Error('선택한 주문 상품을 조회하지 못했습니다. 다시 시도해 주세요.');
  if (sessionStorage.getItem(key) !== raw) return undefined;
  return selection;
}

/** 화면에 선택을 적용한 뒤 호출합니다. Strict Mode 재실행/중단된 조회는 결과를 소비하지 않습니다. */
export function consumeInquiryOrderSelection(kind: 'draft' | 'result') {
  sessionStorage.removeItem(kind === 'draft' ? draftKey : resultKey);
}
