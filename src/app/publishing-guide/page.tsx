import type { Metadata } from 'next';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { ButtonGuide } from './_components/ButtonGuide';

const pageStyle = css({ bg: 'white.0', color: 'black.100' });

export const metadata: Metadata = {
  title: '퍼블리싱 가이드 | HOKA',
  robots: { index: false, follow: false },
};

/** 기본 버튼 예시와 복사 가능한 사용 코드를 보여줍니다. (Shows basic button examples and copyable usage code.) */
export default function PublishingGuidePage() {
  return (
    <Stack
      as="main"
      id="top"
      className={pageStyle}
      gap={{ base: '8', _mobile: '6' }}
      minH="100vh"
      mx="auto"
      px={{ base: '6', _mobile: '4' }}
      pt={{ base: '6', _mobile: '4' }}
      pb={{ base: '10', _mobile: '6' }}
    >
      <Stack gap="1">
        <Typography as="p" variant="body5" tone="subtle">
          PUBLISHING GUIDE / COMPONENTS
        </Typography>
        <Typography as="h1" variant="heading8">
          퍼블리싱 가이드
        </Typography>
        <Typography as="p" variant="body5" tone="subtle">
          기본 버튼의 스타일·상태·크기를 비교하고 사용 코드를 복사합니다.
        </Typography>
      </Stack>
      <ButtonGuide />
      <HStack justifyContent="flex-end" pt="4">
        <ButtonLink href="#top" variant="secondary" size="short">
          맨 위로
        </ButtonLink>
      </HStack>
    </Stack>
  );
}
