import { dataListRecipe } from '@/components/common/atoms/DataList.recipe';

import { StepIndicator } from '@/components/common/molecules/StepIndicator';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';
import { modalTrackingContentRecipe } from '@/components/common/layouts/ModalDialog.recipe';

import type { OrderRecord } from '@/components/orders/orders.types';

const styles = modalTrackingContentRecipe();

const trackingStages = [
  { label: '배송예약' },
  { label: '상품이동중' },
  { label: '배송중' },
  { label: '배송완료' },
];

const trackingHistory = [
  { place: '옥천HUB', destination: '군포HUB', state: '집하처리', time: '11:31:21' },
  { place: '군포HUB', destination: '대구동', state: '간선하차', time: '11:31:21' },
];

/** 배송 단계·송장 정보와 상품 추적 이력을 표시합니다. (Displays delivery progress, shipment details, and tracking events.) */
export function OrderTrackingDialog({
  order,
  onClose,
}: {
  order: OrderRecord;
  onClose: () => void;
}) {
  const current =
    order.status === 'preparing'
      ? 2
      : order.status === 'shipping'
        ? 3
        : order.status === 'paid'
          ? 1
          : 4;
  // [ 개발팀 바인딩 ] order의 도착 예정일·상품명·날짜·단계를 표시합니다. 송장·송수신인·기사와 trackingHistory는
  // 기존 퍼블리싱 fixture이며 실제 조회가 아닙니다. 배송 조회 소유자가 해당 표시 데이터와 주문/송장 식별자,
  // 조회 pending/실패/재시도 및 최신 응답 갱신을 연결해야 합니다. 이 컴포넌트는 원격 요청을 실행하지 않습니다.
  const information = [
    { term: '운송장번호', value: <span className={styles.number}>0000-0000-0000</span> },
    { term: '상품정보', value: order.items[0]?.name },
    { term: '보내는 분', value: '황**' },
    { term: '받는 분', value: '박**' },
    {
      term: '배송기사',
      value: (
        <>
          김길규 <span className={styles.number}>(010-1234-5678)</span>
        </>
      ),
    },
  ];
  return (
    <ModalDialog
      variant="tracking"
      open
      onOpenChange={(open) => !open && onClose()}
      title="배송조회"
      closeLabel="배송조회 닫기"
      mobilePresentation="bottomSheet"
      blurBackdrop={false}
      actions={{ kind: 'single', label: '닫기', onConfirm: onClose }}
    >
      <div className={styles.root}>
        <h3 className={styles.arrival}>{order.expectedDate} 도착예정</h3>
        <StepIndicator
          variant="connected"
          current={current}
          ariaLabel="배송 진행 단계"
          items={trackingStages}
          className={styles.steps}
        />
        <section aria-label="기본정보">
          <h3 className={styles.heading}>기본정보</h3>
          <dl className={styles.information}>
            {information.map(({ term, value }) => (
              <div key={term} className={styles.row}>
                <dt className={styles.term}>{term}</dt>
                <dd className={styles.value}>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section aria-label="상품추적">
          <h3 className={styles.heading}>상품추적</h3>
          <table className={dataListRecipe({ itemLayout: 'trackingTable' }).root}>
            <caption className={styles.caption}>상품 배송 추적 이력</caption>
            <thead>
              <tr>
                {['집배점', '구분', '처리일자'].map((label) => (
                  <th key={label} scope="col">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trackingHistory.map((event) => (
                <tr key={`${event.place}-${event.destination}`}>
                  <td>{event.destination}</td>
                  <td>{event.state}</td>
                  <td className={styles.date}>
                    {order.date.replaceAll('-', '.')} {event.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </ModalDialog>
  );
}
