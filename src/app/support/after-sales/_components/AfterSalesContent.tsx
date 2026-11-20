'use client';

import { type ReactNode } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';

const styles = {
  listContent: css({ flex: '1', minW: '0' }),
  mobileLineBreak: css({ display: 'none', _mobile: { display: 'block' } }),
  quickLinkButton: css({ '&& span': { fontWeight: '400', lineHeight: '1.3' } }),
  bulletItem: css({
    '&::before': {
      content: '"·"',
      flexShrink: '0',
      color: 'var(--color-text-subtle)',
      fontFamily: 'korean',
      fontSize: '16px',
      lineHeight: '24px',
      _mobile: { fontSize: '14px', lineHeight: '21px' },
    },
  }),
  phoneLink: css({ textDecoration: 'underline', textUnderlineOffset: '2px' }),
};

function ShippingReturnsNumberedList({
  items,
  compact = false,
  dense = false,
}: {
  items: readonly ReactNode[];
  compact?: boolean;
  dense?: boolean;
}) {
  return (
    <Stack
      as="ol"
      gap={dense ? '10px' : compact ? { base: '2', _mobile: '10px' } : '4'}
      m="0"
      p="0"
      listStyleType="none"
    >
      {items.map((item, index) => (
        <HStack as="li" key={index} alignItems="flex-start" gap="2">
          <Box flexShrink="0">
            <Typography web="body3" mo="body4">
              {index + 1}.
            </Typography>
          </Box>
          <Typography as="div" web="body3" mo="body4" className={styles.listContent}>
            {item}
          </Typography>
        </HStack>
      ))}
    </Stack>
  );
}

function ShippingReturnsBulletList({ items }: { items: readonly ReactNode[] }) {
  return (
    <Stack as="ul" gap="0" pl="0" m="0" listStyleType="none">
      {items.map((item, index) => (
        <HStack as="li" key={index} alignItems="flex-start" gap="1" className={styles.bulletItem}>
          <Typography web="body3" mo="body4" tone="subtle">
            {item}
          </Typography>
        </HStack>
      ))}
    </Stack>
  );
}

function ShippingReturnsGuidePanel({
  title,
  children,
  compact = false,
}: {
  title: ReactNode;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <ContentSection
      title={title}
      headerProps={{ titleAs: 'h3', titleProps: { web: 'heading9', mo: 'heading10' } }}
      gap={compact ? '3' : { base: '6', _mobile: '4' }}
      px="0"
      pt="0"
      pb="0"
    >
      {children}
    </ContentSection>
  );
}

const shippingItems: ReactNode[] = [
  <>
    현재 호카는 고객님들의 편의를 위해 전상품을 무료로 배송해드리고 있습니다.
    <br />
    (단, 반품 시 최초 구매건에 대한 배송비 포함하여 반품 배송비 차감)
  </>,
  <>
    결제일로부터 1~5일 이내에 상품이 출고됩니다. <br className={styles.mobileLineBreak} />
    (단, 토/일요일 및 공휴일 제외)
    <br />
    제주도 및 기타 도서산간지역의 경우 또는 택배사의 사정에 따라 1~2일 배송이 지연될 수 있습니다.
  </>,
  '배송은 본사 물류센터(호카 지정업체) 또는 매장에서 발송(호카 지정업체) 됩니다.',
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
    호카 지정업체 이용 시
    <br />- 반품 배송비: 5,000원 입금(초기 무료 배송비+반품 택배비)
  </>,
  <>
    타 택배사 이용 시
    <br />- 발송시의 배송비 선불 지급, 착불로 보내시는 경우 발생된 전체 착불 비용을 호카 측으로 지급
  </>,
] as const;

const returnContact = {
  phone: '080-6666-7777',
  phoneHref: 'tel:08066667777',
  address: '인천광역시 부평구 부평대로 313번길 63 지하 1층',
};

function ReturnContact() {
  const isMobile = usePlatform() === 'mobile';
  const address = (
    <Stack key="address" gap={{ base: '3', _mobile: '2' }}>
      <Typography variant="body3">반품 접수처</Typography>
      <Typography variant="body4">{returnContact.address}</Typography>
    </Stack>
  );

  const hours = (
    <Stack key="hours" gap={{ base: '3', _mobile: '2' }}>
      <Typography variant="body3">운영시간</Typography>
      <Stack gap="2">
        <HStack gap="1" alignItems="baseline" flexWrap="wrap">
          <Typography as="span" variant="body3">
            평일
          </Typography>
          <Typography as="span" variant="body3" language="en" weight="medium">
            09:00~18:00
          </Typography>
          <Typography as="span" variant="body4">
            (점심시간 12:00~13:00)
          </Typography>
        </HStack>
        <Typography variant="body5" tone="subtle">
          * 토,일요일 및 공휴일 휴무
        </Typography>
      </Stack>
    </Stack>
  );
  return (
    <Stack
      as="section"
      aria-label="호카 반품처"
      direction={{ base: 'row', _mobile: 'column' }}
      gap={{ base: '13px', _mobile: '6' }}
      bg="black.10"
      p="9"
      _mobile={{ px: '4', pt: '6', pb: '8' }}
    >
      <ContentSection
        title="호카 반품처"
        headerProps={{ titleAs: 'h3', titleProps: { web: 'heading9', mo: 'heading5' } }}
        gap={{ base: '3', _mobile: '4' }}
        flex="1"
        minW="0"
      >
        <Stack gap="2">
          <Typography web="body2" mo="body3" language="en" weight="medium">
            TEL.{' '}
            {isMobile ? (
              <a href={returnContact.phoneHref} className={styles.phoneLink}>
                {returnContact.phone}
              </a>
            ) : (
              returnContact.phone
            )}
          </Typography>
          <Typography web="body4" mo="body5" tone="subtle">
            * 아래 1:1 문의를 이용하시면 더 빠르게 답변 받으실 수 있습니다.
          </Typography>
        </Stack>
      </ContentSection>
      <Stack gap={{ base: '52px', _mobile: '6' }} flex="1" minW="0">
        {isMobile ? (
          <>
            {hours}
            {address}
          </>
        ) : (
          <>
            {address}
            {hours}
          </>
        )}
      </Stack>
    </Stack>
  );
}

const returnQuickLinks = [
  {
    href: '/support/inquiries/new',
    title: '배송 및 반품 관련 1:1 문의',
    description: '궁금하신 내용을 1:1 문의에 남겨주시면 확인 후 답변 드리겠습니다.',
    label: '1:1 문의하기',
  },
  {
    href: '/support/faq',
    title: 'FAQs',
    description: '자주 묻는 질문의 답변을 찾아보세요.',
    label: 'FAQs 바로가기',
  },
  {
    href: '/mypage/orders',
    title: '주문/배송 조회',
    description: '구매하신 상품의 주문 및 배송 내역을 확인하고, 반품을 신청하실 수 있습니다.',
    label: '주문/배송 조회하기',
  },
] as const;

function ReturnQuickLinks() {
  return (
    <Stack
      direction={{ base: 'row', _mobile: 'column' }}
      gap={{ base: '0', _mobile: '6' }}
      border="1px solid"
      borderColor="black.20"
      px="6"
      py="8"
      _mobile={{ px: '0' }}
    >
      {returnQuickLinks.map((item) => (
        <ContentSection
          key={item.href}
          title={item.title}
          headerProps={{
            gap: { base: '2', _mobile: item.href === '/mypage/orders' ? '2px' : '3' },
            titleAs: 'h3',
            titleProps: { variant: 'body2', language: 'ko' },
            description: item.description,
            descriptionProps: {
              variant: 'body4',
              tone: 'subtle',
              className: css({ minH: '36px' }),
            },
          }}
          footer={
            <ButtonLink
              href={item.href}
              variant="secondary"
              size="short"
              className={styles.quickLinkButton}
            >
              {item.label}
            </ButtonLink>
          }
          as="section"
          aria-label={item.title}
          flex="1"
          minW="0"
          alignItems="flex-start"
          gap="6"
          px="18px"
          css={{
            '&:first-child': { pl: '0' },
            '&:last-child': { pr: '0' },
            '& + section': { borderLeft: '1px solid token(colors.black.20)' },
            _mobile: {
              px: '4',
              '&:first-child': { pl: '4' },
              '&:last-child': { pr: '4' },
              '& + section': {
                borderLeft: '0',
                borderTop: '1px solid token(colors.black.20)',
                pt: '6',
              },
            },
          }}
        ></ContentSection>
      ))}
    </Stack>
  );
}

function ReturnCautionsPanel() {
  return (
    <Stack gap={{ base: '8', _mobile: '6' }}>
      <ShippingReturnsGuidePanel title="반품 주의 사항" compact>
        <ShippingReturnsNumberedList
          dense
          items={[
            '상품 수령일로부터 7일 이내에 반품 신청을 해주시기 바랍니다.',
            '호카 코리아 온라인 공식 홈페이지 구매 상품은 교환 서비스를 제공하지 않습니다. 수령한 상품은 반품하시고, 교환을 희망하시는 상품은 별도로 구매 해주시기를 바랍니다.',
            <Stack gap="2">
              <span>다음과 같은 경우 반품 처리가 불가합니다.</span>
              <ShippingReturnsBulletList items={unavailableReturns} />
            </Stack>,
            <Stack gap="2">
              <span>반품 배송비 정책</span>
              <ShippingReturnsBulletList items={returnCosts} />
            </Stack>,
          ]}
        />
      </ShippingReturnsGuidePanel>
      <ReturnContact />
      <ReturnQuickLinks />
    </Stack>
  );
}

const returnSteps = [
  'My Page > 구매내역 > 주문/배송 조회 > 상세내역 확인',
  <>
    페이지 하단의 반품신청 선택 <br className={styles.mobileLineBreak} />
    (신청 완료후 2~3일내 지정택배사 수거 방문)
  </>,
  '최초 수령 상태와 동일하게 이중포장하여 방문 기사님께 전달',
  '물류센터에 상품 도착',
  '요청 및 상품 확인',
  '반품 완료 및 결제수단 환불 진행',
] as const;

function ProductReturnsPanel() {
  return (
    <Stack gap={{ base: '8', _mobile: '6' }}>
      <ContentSection
        title="호카 반품 안내"
        gap={{ base: '4', _mobile: '3' }}
        headerProps={{ titleAs: 'h3', titleProps: { web: 'heading9', mo: 'heading10' } }}
      >
        <ShippingReturnsNumberedList
          compact
          items={[
            '온라인 스토어에서 구매한 상품만 온라인 반품이 가능합니다.',
            '고객님 변심으로 인해 발생되는 반품관련 배송 비용은, 시스템에서 자동으로 차감 후 환불처리 됩니다.',
          ]}
        />
      </ContentSection>
      <Stack gap="4">
        <ContentHeader
          titleAs="h3"
          title={<>상품 반품 절차</>}
          titleProps={{ web: 'heading9', mo: 'heading10' }}
        />
        <Stack as="ol" gap="2" m="0" p="0" listStyleType="none">
          {returnSteps.map((step, index) => (
            <Stack
              as="li"
              key={index}
              direction={{ base: 'row', _mobile: 'column' }}
              gap={{ base: '4', _mobile: '2' }}
              px="4"
              py="6"
              bg="black.10"
            >
              <Typography variant="body3" language="en" weight="medium">
                STEP {index + 1}.
              </Typography>
              <Typography web="body3" mo="body4">
                {step}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

export const tabs = [
  { value: 'shipping', label: '배송 안내', content: <ShippingGuidePanel /> },
  { value: 'product-returns', label: '반품 안내', content: <ProductReturnsPanel /> },
  { value: 'return-cautions', label: '반품 주의사항', content: <ReturnCautionsPanel /> },
] as const;
