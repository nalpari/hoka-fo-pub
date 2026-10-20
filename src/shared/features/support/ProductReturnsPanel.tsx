import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { ShippingReturnsGuidePanel, ShippingReturnsNumberedList } from './ShippingReturnsGuide';

const returnSteps = [
  '마이페이지 내 상세내역 확인',
  '반품 신청 선택, 신청 후 2~3일 후 택배 수거',
  '수령 상태 동일하게 이중 포장 후 기사님 전달',
  '반품 완료 및 결제수단 환불 진행',
  '요청 및 상품 확인',
  '물류센터에 상품 도착',
] as const;

export function ProductReturnsPanel() {
  return (
    <ShippingReturnsGuidePanel title="상품 반품 안내">
      <ShippingReturnsNumberedList
        items={[
          '온라인 스토어에서 구매한 상품만 온라인 반품이 가능합니다.',
          '고객님 변심으로 인해 발생되는 반품관련 배송 비용은, 시스템에서 자동으로 차감 후 환불처리 됩니다.',
        ]}
      />
      <ContentHeader
        titleAs="h3"
        title={<>상품 반품 절차</>}
        titleProps={{ variant: 'heading9', weight: 'semibold' }}
      />
      <ShippingReturnsNumberedList items={returnSteps} compact />
    </ShippingReturnsGuidePanel>
  );
}
