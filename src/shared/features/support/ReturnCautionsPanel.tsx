import { Typography } from '@/shared/components/atoms/Typography/Typography';
import {
  ShippingReturnsGuidePanel,
  ShippingReturnsNumberedList,
  ShippingReturnsBulletList,
} from './ShippingReturnsGuide';

const unavailableReturns = [
  '상품을 이미 사용한 경우',
  '상품 수령일로부터 7일이 경과한 경우',
  <>
    상품과 상품 액세서리(신발 박스, 가격 택, 라벨, 폴리백 포장 등)를 분실 또는 훼손한 경우
    <br />
    (ex. 박스에 테이핑 한 경우, 의류에 섬유탈취제를 뿌렸거나 세탁한 경우)
  </>,
  '이벤트 등으로 제공된 사은품을 사용하였거나 분실 또는 훼손한 경우',
  '기타 ‘전자상거래 등에서의 소비자 보호에 관한 법률’이 정하는 소비자 청약철회 제한에 해당하는 경우',
  '(언더웨어) 패키지 스티커를 개봉한 경우',
] as const;

const returnCosts = [
  '상품 불량 또는 오배송으로 인한 반품 시 배송비는 본사 부담입니다.',
  '고객님의 변심으로 인한 반품 시 배송비는 고객 부담입니다.',
  '제주도 및 기타 도서 산간지역에서 발생하는 추가 배송비는 고객 부담입니다.',
  <>
    HOKA 지정업체 이용 시
    <br />- 일반배송/내일도착 반품 배송비: 5,000원 입금(초기 무료 배송비+반품 택배비)
    <br />- 오늘도착 반품 배송비 : 3,000원 입금(반품 택배비)
  </>,
  <>
    타 택배사 이용 시
    <br />- 일반배송/내일도착/오늘도착 반품 : 발송시의 배송비 선불 지급, 착불로 보내시는 경우 발생된
    전체 착불 비용을 HOKA 측으로 지급
  </>,
] as const;

export function ReturnCautionsPanel() {
  return (
    <ShippingReturnsGuidePanel title="반품 유의 사항">
      <ShippingReturnsNumberedList
        items={[
          '상품 수령일로부터 7일 이내에 반품 신청을 해주시기 바랍니다.',
          '교환 정책 변경 : HOKA 코리아 온라인 공식 홈페이지 구매 상품은 2023년 8월 24일 부터 교환 서비스가 제공되지 않습니다. 수령하신 상품은 반품하시고, 교환을 희망하시는 상품은 별도로 구매 해주시기 바랍니다.',
        ]}
      />
      <Typography variant="body4">3. 다음과 같은 경우 반품 처리가 불가합니다.</Typography>
      <ShippingReturnsBulletList items={unavailableReturns} />
      <Typography variant="body4">4. 반품 배송비 정책</Typography>
      <ShippingReturnsBulletList items={returnCosts} />
    </ShippingReturnsGuidePanel>
  );
}
