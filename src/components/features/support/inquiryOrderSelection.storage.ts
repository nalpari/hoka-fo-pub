import { inquiryOrders, type InquiryOrder, type InquiryOrderProduct } from './inquiryOrders.data';

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
