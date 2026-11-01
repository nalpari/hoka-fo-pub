'use client';

import Link from 'next/link';

import { type ReactNode } from 'react';

import { Box, HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';

function ShippingReturnsNumberedList({
  items,
  compact = false,
}: {
  items: readonly ReactNode[];
  compact?: boolean;
}) {
  return (
    <Stack as="ol" gap={compact ? '2' : '4'} m="0" p="0" listStyleType="none">
      {items.map((item, index) => (
        <HStack as="li" key={index} alignItems="flex-start" gap="2">
          <Box flexShrink="0">
            <Typography variant="body4">{index + 1}.</Typography>
          </Box>
          <Typography variant="body4">{item}</Typography>
        </HStack>
      ))}
    </Stack>
  );
}

function ShippingReturnsBulletList({ items }: { items: readonly ReactNode[] }) {
  return (
    <Stack as="ul" gap="0" pl="2" listStyleType="none">
      {items.map((item, index) => (
        <HStack as="li" key={index} alignItems="flex-start" gap="1">
          <Typography as="span" variant="body4" tone="subtle" aria-hidden="true">
            ・
          </Typography>
          <Typography variant="body4" tone="subtle">
            {item}
          </Typography>
        </HStack>
      ))}
    </Stack>
  );
}

function ShippingReturnsGuidePanel({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <ContentSection
      title={title}
      headerProps={{ titleAs: 'h3', titleProps: { variant: 'heading10', weight: 'semibold' } }}
      gap="4"
      px={{ base: '4', _mobile: '2' }}
      pt={{ base: '3', _mobile: '4' }}
    >
      {children}
    </ContentSection>
  );
}

const shippingItems: ReactNode[] = [
  <>
    현재 HOKA는 고객님들의 편의를 위해 전상품을 무료로 배송해드리고 있습니다.
    <br />
    (단, 반품 시 최초 구매건에 대한 배송비 포함하여 반품 배송비 차감)
  </>,
  <>
    결제일로부터 1~5일 이내에 상품이 출고됩니다.
    <br />
    (토, 일 공휴일 제외)
    <br />
    단, 제주도 및 기타 도서산간지역의 경우 또는 택배사의 사정에 따라 1~2일 배송이 지연될 수
    있습니다.
  </>,
  '배송은 본사 물류센터(HOKA 지정업체) 또는 매장에서 발송(HOKA 지정업체) 됩니다.',
  '“마이페이지 > 구매내역 > 주문/배송 조회” 에서 구매하신 상품의 배송 상태를 확인하실 수 있습니다.',
];

function ShippingGuidePanel() {
  return (
    <ShippingReturnsGuidePanel title="배송 안내">
      <ShippingReturnsNumberedList items={shippingItems} />
    </ShippingReturnsGuidePanel>
  );
}

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

function ReturnCautionsPanel() {
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
      <Stack bg="black.10" p="6" gap="3">
        <Typography variant="heading7">고객센터</Typography>
        <Typography variant="body3">TEL. 080-2225-6660</Typography>
        <Typography variant="body4">평일 10:00~17:00 (점심시간 12:00~13:00)</Typography>
      </Stack>
      <HStack gap="4" flexWrap="wrap">
        {[
          { href: '/support/inquiries/new', label: '1:1 문의' },
          { href: '/support/faq', label: 'FAQs' },
          { href: '/mypage/orders', label: '주문/배송 조회' },
        ].map((item) => (
          <Link key={item.href} href={item.href}>
            <Typography variant="textLink3">{item.label} →</Typography>
          </Link>
        ))}
      </HStack>
    </ShippingReturnsGuidePanel>
  );
}

const returnSteps = [
  '마이페이지 내 상세내역 확인',
  '반품 신청 선택, 신청 후 2~3일 후 택배 수거',
  '수령 상태 동일하게 이중 포장 후 기사님 전달',
  '반품 완료 및 결제수단 환불 진행',
  '요청 및 상품 확인',
  '물류센터에 상품 도착',
] as const;

function ProductReturnsPanel() {
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
        titleProps={{ variant: 'heading10', weight: 'semibold' }}
      />
      <ShippingReturnsNumberedList items={returnSteps} compact />
    </ShippingReturnsGuidePanel>
  );
}

export const tabs = [
  { value: 'shipping', label: '배송 안내', content: <ShippingGuidePanel /> },
  { value: 'return-cautions', label: '반품 주의사항', content: <ReturnCautionsPanel /> },
  { value: 'product-returns', label: '상품 반품 안내', content: <ProductReturnsPanel /> },
] as const;
