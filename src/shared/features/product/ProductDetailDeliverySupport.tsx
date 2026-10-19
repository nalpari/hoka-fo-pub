import Link from 'next/link';
import { css } from 'styled-system/css';
import { Grid, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const textLink = css({
  color: 'text.primary',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  _focusVisible: { outline: '2px solid', outlineOffset: '4px' },
});

const contactDetails = css({ display: 'flex', flexDirection: 'column', gap: '2' });

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

export function ProductDetailDeliverySupport() {
  return (
    <Stack
      as="section"
      border="1px solid token(colors.border.default)"
      p="8"
      gap="6"
      _mobile={{ p: '5' }}
      aria-label="배송 및 반품 고객센터"
    >
      <Grid
        gridTemplateColumns="minmax(0, 1fr) minmax(0, 2fr)"
        gap="6"
        pb="6"
        borderBottom="1px solid token(colors.border.default)"
        _mobile={{ gridTemplateColumns: '1fr', gap: '3' }}
      >
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
      </Grid>
      {supportLinks.map(({ title, description, label, to }) => (
        <Grid
          key={to}
          gridTemplateColumns="minmax(0, 1fr) 160px"
          alignItems="center"
          gap="5"
          _mobile={{ gridTemplateColumns: '1fr', gap: '3' }}
        >
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
        </Grid>
      ))}
    </Stack>
  );
}
