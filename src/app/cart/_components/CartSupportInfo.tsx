'use client';

import Link from 'next/link';

import { css } from 'styled-system/css';
import { Grid, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { ContentSection } from '@/components/common/layouts/ContentSection';

const textAction = css({
  p: '0',
  border: '0',
  borderRadius: '0',
});

/** 장바구니 고객센터 연락처와 운영시간을 안내합니다. (Displays cart customer support information.) */
export function CartSupportInfo() {
  return (
    <ContentSection
      as="section"
      gap={{ base: '4' }}
      title="고객센터 안내"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading6' } }}
    >
      <Grid gridTemplateColumns={{ base: '1fr 1fr', _mobile: '1fr' }} gap="6">
        <Stack gap="3" bg="black.10" p="4">
          <Typography variant="heading7">HOKA 고객센터</Typography>
          <Typography variant="body4">TEL. 080-665-5552</Typography>
          <Typography variant="body5" tone="tertiary">
            *아래 1:1문의를 이용하시면 조금 더 빠르게 답변 받으실수 있습니다.
          </Typography>
          <Link href="/support/inquiries/new" className={textAction}>
            <Typography variant="textLink3">1:1 문의하기</Typography>
          </Link>
        </Stack>
        <Stack gap="3" bg="black.10" p="4">
          <ContentHeader titleAs="h3" title={<>운영시간</>} titleProps={{ variant: 'heading7' }} />
          <Typography variant="body5">평일 09:00 ~ 18:00</Typography>
          <Typography variant="body5" tone="tertiary">
            *점심시간은 12:00~13:00이며 토,일, 공휴일은 휴무입니다.
          </Typography>
        </Stack>
      </Grid>
    </ContentSection>
  );
}
