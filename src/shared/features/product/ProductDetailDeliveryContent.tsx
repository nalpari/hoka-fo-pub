'use client';

import Link from 'next/link';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const root = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '12',
  py: '6',
  wordBreak: 'keep-all',
  overflowWrap: 'anywhere',
  _mobile: { gap: '8', py: '4' },
});

const section = css({ display: 'flex', flexDirection: 'column', gap: '5' });

const numberedList = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
  listStyleType: 'decimal',
  pl: '4',
});

const bulletList = css({ listStyleType: 'disc', pl: '4', mt: '3' });

const textLink = css({
  color: 'text.primary',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  _focusVisible: { outline: '2px solid', outlineOffset: '4px' },
});

const supportCard = css({
  border: '1px solid token(colors.border.default)',
  p: '8',
  display: 'flex',
  flexDirection: 'column',
  gap: '6',
  _mobile: { p: '5' },
});

const contactRow = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
  gap: '6',
  pb: '6',
  borderBottom: '1px solid token(colors.border.default)',
  _mobile: { gridTemplateColumns: '1fr', gap: '3' },
});

const contactDetails = css({ display: 'flex', flexDirection: 'column', gap: '2' });

const supportRow = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) 160px',
  alignItems: 'center',
  gap: '5',
  _mobile: { gridTemplateColumns: '1fr', gap: '3' },
});

const supportLink = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '44px',
  px: '4',
  bg: 'surface.subtle',
  color: 'text.primary',
  _hover: { bg: 'black.20' },
  _focusVisible: { outline: '2px solid', outlineOffset: '4px' },
});

const returnProcess = css({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 3fr)',
  gap: '8',
  borderTop: '2px solid token(colors.border.strong)',
  borderBottom: '1px solid token(colors.border.default)',
  py: '10',
  _mobile: { gridTemplateColumns: '1fr', gap: '6', py: '6' },
});

const processTitle = css({
  borderRight: '1px solid token(colors.border.default)',
  pr: '6',
  _mobile: { borderRight: 'none', pr: '0' },
});

const stepsList = css({ display: 'flex', flexDirection: 'column', gap: '6' });

const stepRow = css({ display: 'flex', alignItems: 'center', gap: '5' });

const stepNumber = css({ flexShrink: '0', width: '8' });

const supportLinks = [
  {
    title: '배송 및 반품 관련 1:1 문의',
    description: '궁금하신 내용을 1:1 문의에 남겨 주시면 확인하여 답변드리겠습니다.',
    label: '1:1 문의',
    to: '/support/inquiries',
  },
  {
    title: 'FAQs',
    description: '자주 묻는 질문의 답변을 찾아보세요.',
    label: 'FAQs',
    to: '/support/faq',
  },
  {
    title: '주문/배송 조회',
    description: '구매하신 상품의 주문 및 배송 내역을 확인하실 수 있습니다.',
    label: '주문/배송 조회',
    to: '/mypage/orders',
  },
];

const returnSteps = [
  '마이페이지 > 주문/배송 조회 > 주문 상세 내역 확인',
  '반품할 상품을 선택하여 반품 신청 후 수거 일정 확인',
  '최초 수령 상태와 동일하게 이중 포장하여 방문 기사님께 전달',
  '호카 물류센터에 상품 도착',
  '반품 요청 내용 및 상품 상태 확인',
  '반품 완료 및 결제수단별 환불 진행',
];

export function ProductDetailDeliveryContent() {
  return (
    <div className={root}>
      <section className={section} aria-label="배송 안내">
        <Typography as="h3" variant="heading8">
          배송 안내
        </Typography>
        <Typography as="ol" variant="body5" className={numberedList}>
          <li>구매 금액에 관계없이 전 상품 무료배송입니다.</li>
          <li>결제일로부터 1~5일 이내에 상품이 출고됩니다. (토·일요일 및 공휴일 제외)</li>
          <li>상품은 호카 물류센터 또는 매장에서 발송됩니다.</li>
          <li>
            <Link href="/mypage/orders" className={textLink}>
              마이페이지 &gt; 주문/배송 조회
            </Link>
            에서 구매하신 상품의 배송 상태를 확인하실 수 있습니다.
          </li>
        </Typography>
      </section>

      <section className={section} aria-label="반품 유의사항">
        <Typography as="h3" variant="heading8">
          반품 유의사항
        </Typography>
        <Typography as="ol" variant="body5" className={numberedList}>
          <li>상품 수령일로부터 7일 이내에 반품을 신청해 주세요.</li>
          <li>
            호카 온라인 스토어에서 구매하신 상품은 온라인으로 반품을 신청해 주세요. 교환을 원하시는
            경우 고객센터의 안내를 확인해 주세요. 온라인 구매 상품의 오프라인 매장 반품은
            불가합니다.
          </li>
          <li>
            다음과 같은 경우 반품 처리가 불가합니다.
            <ul className={bulletList}>
              <li>상품을 이미 착용하거나 사용한 경우</li>
              <li>단순 변심으로 상품 수령일로부터 7일이 경과한 경우</li>
              <li>
                상품 또는 구성품(신발 박스, 가격 택, 라벨, 폴리백 등)을 분실하거나 훼손한 경우 (신발
                박스에 테이프를 붙이거나 운송장을 부착한 경우 포함)
              </li>
              <li>사은품을 사용하거나 분실 또는 훼손한 경우</li>
              <li>소비자의 책임으로 상품 가치가 감소한 경우</li>
            </ul>
          </li>
          <li>
            반품 배송비 안내
            <ul className={bulletList}>
              <li>상품 불량 또는 오배송으로 인한 반품 배송비는 호카가 부담합니다.</li>
              <li>고객님의 단순 변심으로 인한 반품 배송비는 고객님 부담입니다.</li>
              <li>제주도 및 도서 산간 지역은 추가 배송비가 발생할 수 있습니다.</li>
              <li>정확한 반품 배송비와 결제 방법은 반품 접수 시 안내를 확인해 주세요.</li>
              <li>타 택배사를 이용하실 경우 발송 전 고객센터에 문의해 주세요.</li>
            </ul>
          </li>
        </Typography>
      </section>

      <section className={supportCard} aria-label="배송 및 반품 고객센터">
        <div className={contactRow}>
          <Typography as="h4" variant="body5" weight="bold">
            호카 온라인 스토어 고객센터
          </Typography>
          <div className={contactDetails}>
            <Typography as="p" variant="body5">
              TEL.{' '}
              <a href="tel:15660086" className={textLink}>
                1566-0086
              </a>
            </Typography>
            <Typography as="p" variant="body5" tone="tertiary">
              1:1 문의를 이용하시면 조금 더 빠르게 답변 받으실 수 있습니다.
            </Typography>
            <Typography as="p" variant="body5" weight="bold">
              운영시간
            </Typography>
            <Typography as="p" variant="body5" tone="tertiary">
              평일 10:00~17:00 (점심시간 12:00~13:00) / 토·일요일 및 공휴일 휴무
            </Typography>
          </div>
        </div>
        {supportLinks.map(({ title, description, label, to }) => (
          <div key={to} className={supportRow}>
            <div className={contactDetails}>
              <Typography as="h4" variant="body5" weight="bold">
                {title}
              </Typography>
              <Typography as="p" variant="body5" tone="tertiary">
                {description}
              </Typography>
            </div>
            <Link href={to} className={supportLink}>
              <Typography variant="body5" weight="medium">
                {label}
              </Typography>
            </Link>
          </div>
        ))}
      </section>

      <section className={section} aria-label="호카 반품 안내">
        <Typography as="h3" variant="heading8">
          호카 반품 안내
        </Typography>
        <Typography as="ol" variant="body5" className={numberedList}>
          <li>온라인 스토어에서 구매하신 상품은 온라인으로 반품을 신청하실 수 있습니다.</li>
          <li>고객님 변심으로 발생하는 반품 배송비는 환불 금액에서 차감될 수 있습니다.</li>
          <li>상품과 구성품을 수령 당시 상태로 포장하여 지정 택배사의 수거를 기다려 주세요.</li>
        </Typography>
        <div className={returnProcess}>
          <Typography as="h4" variant="body2" tone="tertiary" className={processTitle}>
            상품 반품
            <br />
            STEP
          </Typography>
          <ol className={stepsList}>
            {returnSteps.map((step, index) => (
              <li key={step} className={stepRow}>
                <Typography variant="body1" className={stepNumber} aria-hidden="true">
                  {index + 1}
                </Typography>
                <Typography variant="body5">{step}</Typography>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
