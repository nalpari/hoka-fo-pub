import Link from 'next/link';
import { css } from 'styled-system/css';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const textAction = css({
  p: '0',
  border: '0',
  borderRadius: '0',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
});

export function CartSupportInfo() {
  return (
    <ContentSection
      as="section"
      gap="2"
      pt="4"
      borderTop="1px solid var(--colors-black-20)"
      title="고객센터 안내"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading7' } }}
    >
      <Typography variant="body4">HOKA/HOKA 고객센터 내용 미정</Typography>
      <Typography variant="body4">TEL. 080-665-5552</Typography>
      <Typography variant="body5" tone="subtle">
        *아래 1:1문의를 이용하시면 조금 더 빠르게 답변 받으실수 있습니다.
      </Typography>
      <Link href="/support/inquiries/new" className={textAction}>
        1:1 문의하기 &gt;
      </Link>
      <ContentHeader
        titleAs="h3"
        title={<>운영시간</>}
        titleProps={{ variant: 'body4', weight: 'semibold' }}
      />
      <Typography variant="body5">평일 09:00 ~ 18:00</Typography>
      <Typography variant="body5" tone="subtle">
        *점심시간은 12:00~13:00이며 토,일, 공휴일은 휴무입니다.
      </Typography>
    </ContentSection>
  );
}
