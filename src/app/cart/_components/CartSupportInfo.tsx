'use client';

import Link from 'next/link';

import { css } from 'styled-system/css';
import { Grid, HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

const textAction = css({
  p: '0',
  border: '0',
  borderRadius: '0',
});
//TODO - sally : 기획이 아직 안나왔지만, 문구는 동일할 예정 (재작업)
/** 장바구니 고객센터 연락처와 운영시간을 안내합니다. (Displays cart customer support information.) */
export function CartSupportInfo() {
  return (
    <ContentSection
      as="section"
      gap={{ base: '6', _mobile: '4' }}
      title="고객센터 안내"
      headerProps={{ titleAs: 'h2', titleProps: { web: 'heading7', mo: 'heading6' } }}
    >
      <Grid
        gridTemplateColumns={{ base: '1fr 1fr', _mobile: '1fr' }}
        gap={{ base: '4', _mobile: '6' }}
      >
        <Stack
          gap="3"
          bg="black.10"
          px={{ base: '34px', _mobile: '4' }}
          py={{ base: '10', _mobile: '4' }}
        >
          <Stack gap="3" display={{ base: 'flex', _mobile: 'none' }}>
<Typography variant="body3Medium">
              호카/호카 키즈
            </Typography>
            <Typography variant="body2" weight="medium">
              TEL. 080-665-5552
            </Typography>
          </Stack>
          <Stack gap="3" display={{ base: 'none', _mobile: 'flex' }}>
            <Typography variant="heading7">HOKA 고객센터</Typography>
            <Typography variant="body4">TEL. 080-665-5552</Typography>
            <Typography variant="body5" tone="tertiary">
              *아래 1:1문의를 이용하시면 조금 더 빠르게 답변 받으실수 있습니다.
            </Typography>
            <Link href="/support/inquiries/new" className={textAction}>
              <Typography variant="textLink3">1:1 문의하기</Typography>
            </Link>
          </Stack>
        </Stack>
        <Stack
          gap="3"
          bg="black.10"
          px={{ base: '34px', _mobile: '4' }}
          py={{ base: '10', _mobile: '4' }}
        >
          <Stack gap="3" display={{ base: 'flex', _mobile: 'none' }}>
            <HStack gap="2" alignItems="flex-start">
<Typography variant="body3Medium">
                평일 운영시간
              </Typography>
              <Typography variant="body4" tone="subtle">
                * 토,일,공휴일 휴무
              </Typography>
            </HStack>
            <HStack gap="1" alignItems="baseline" flexWrap="wrap">
              <Typography variant="body2" weight="medium">
                09:00~18:00
              </Typography>
              <Typography variant="body3">(점심시간 12:00~13:00)</Typography>
            </HStack>
          </Stack>
          <Stack gap="3" display={{ base: 'none', _mobile: 'flex' }}>
            <Typography variant="heading7">운영시간</Typography>
            <Typography variant="body5">평일 09:00 ~ 18:00</Typography>
            <Typography variant="body5" tone="tertiary">
              *점심시간은 12:00~13:00이며 토,일, 공휴일은 휴무입니다.
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </ContentSection>
  );
}
