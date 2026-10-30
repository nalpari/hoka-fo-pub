import type { Metadata } from 'next';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { type SupportTab, SupportTabs } from '@/components/common/molecules/SupportTabs';

import { ButtonGuide } from './_components/ButtonGuide';
import { FormGuide } from './_components/FormGuide';
import { HelpTipsGuide } from './_components/HelpTipsGuide';
import { TypographyGuide } from './_components/TypographyGuide';

const guideTabs: readonly SupportTab[] = [
  { value: 'typography', label: '타이포그래피', content: <TypographyGuide /> },
  { value: 'button', label: '버튼', content: <ButtonGuide /> },
  { value: 'form', label: '폼', content: <FormGuide /> },
  { value: 'help-tips', label: '툴팁·토글팁', content: <HelpTipsGuide /> },
  {
    value: 'modal',
    label: '모달',
    content: (
      <Box py="8">
        <Typography as="p" variant="body4" tone="subtle">
          모달 예시는 준비 중입니다.
        </Typography>
      </Box>
    ),
  },
];

const pageStyle = css({ bg: 'white.0', color: 'black.100' });

export const metadata: Metadata = {
  title: '퍼블리싱 가이드 | HOKA',
  description: 'HOKA 공통 컴포넌트의 스타일·상태·사용 코드를 확인합니다.',
  robots: { index: false, follow: false },
};

/** 컴포넌트별 퍼블리싱 가이드와 사용 코드를 보여줍니다. (Shows publishing guides and usage snippets for shared components.) */
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
          공통 컴포넌트의 스타일·상태를 확인하고 사용 코드를 복사합니다.
        </Typography>
      </Stack>
      <SupportTabs
        ariaLabel="퍼블리싱 가이드 컴포넌트 분류"
        tabs={guideTabs}
        defaultValue="typography"
        variant="guide"
      />
      <HStack justifyContent="flex-end" pt="4">
        <ButtonLink href="#top" variant="secondary" size="short">
          맨 위로
        </ButtonLink>
      </HStack>
    </Stack>
  );
}
