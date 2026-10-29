import Link from 'next/link';

import { css } from 'styled-system/css';
import { Box, Flex, Grid } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

// Next Link는 Panda 스타일 props를 처리하지 않으므로 링크 스타일은 className으로 연결합니다.
const linkClassName = css({
  display: 'inline-flex',
  alignItems: 'center',
  minH: '44px',
  px: '4',
  border: '1px solid var(--color-border-default)',
  borderRadius: '8px',
  color: 'var(--color-text-primary)',
  textDecoration: 'none',
  _hover: { bg: 'var(--color-surface-subtle)' },
  _focusVisible: { outline: '2px solid var(--color-text-primary)', outlineOffset: '4px' },
  '&[aria-current="page"]': { bg: 'var(--color-text-primary)', color: 'white' },
});

const tips = [
  {
    number: '01',
    title: '가볍게 시작하기',
    description: '편안한 속도로 몸을 풀고 오늘의 컨디션을 확인하세요.',
  },
  {
    number: '02',
    title: '나만의 리듬 찾기',
    description: '거리보다 호흡에 집중하며 일정한 페이스를 유지하세요.',
  },
  {
    number: '03',
    title: '충분히 회복하기',
    description: '러닝을 마친 뒤 스트레칭과 수분 보충으로 마무리하세요.',
  },
];

/** 기존 Panda JSX 스타일 props 방식의 비교 예시를 표시합니다. (Shows a comparison example using the existing Panda JSX style props.) */
export default function JsxPropsExamplePage() {
  return (
    <Flex
      as="main"
      direction="column"
      maxW="1120px"
      mx="auto"
      px={{ base: '10', _mobile: '5' }}
      py={{ base: '16', _mobile: '8' }}
      gap={{ base: '10', _mobile: '6' }}
    >
      <Flex as="header" direction="column" gap="4">
        <Typography as="p" variant="body3">
          스타일 작성 방식 비교 · 03
        </Typography>
        <Typography as="h1" variant="heading4">
          기존 Panda JSX props 유지
        </Typography>
        <Typography as="p" variant="body2">
          Flex·Grid를 그대로 사용하고, 간격·여백·배경 등은 JSX 스타일 props로 작성합니다.
        </Typography>
        <Flex as="nav" wrap="wrap" gap="3" aria-label="스타일 예시 비교">
          <Link className={linkClassName} href="/examples/styles/classnames">
            상단 className
          </Link>
          <Link className={linkClassName} href="/examples/styles/scss-module">
            SCSS Module
          </Link>
          <Link className={linkClassName} href="/examples/styles/jsx-props" aria-current="page">
            기존 JSX props
          </Link>
        </Flex>
      </Flex>

      {/* 정적 스타일 비교용 콘텐츠이며 실제 상품·서비스 데이터와 연결하지 않습니다. */}
      <Grid
        as="section"
        gridTemplateColumns={{ base: 'repeat(3, minmax(0, 1fr))', _mobile: '1fr' }}
        gap="5"
        aria-label="러닝 준비 가이드"
      >
        {tips.map((tip) => (
          <Flex
            as="article"
            key={tip.number}
            direction="column"
            gap="5"
            p="6"
            border="1px solid var(--color-border-default)"
            borderRadius="12px"
            bg="var(--color-surface-default)"
          >
            <Typography as="p" variant="body3" tone="subtle">
              {tip.number}
            </Typography>
            <Typography as="h2" variant="heading7">
              {tip.title}
            </Typography>
            <Typography as="p" variant="body3">
              {tip.description}
            </Typography>
          </Flex>
        ))}
      </Grid>

      <details
        open
        className={css({
          p: '6',
          borderRadius: '12px',
          bg: 'var(--color-surface-subtle)',
          '&[open]': { outline: '1px solid var(--color-border-default)' },
        })}
      >
        <Box
          as="summary"
          cursor="pointer"
          _focusVisible={{ outline: '2px solid var(--color-text-primary)', outlineOffset: '4px' }}
        >
          작성 코드 보기
        </Box>
        <Box
          as="pre"
          mt="5"
          p="5"
          overflowX="auto"
          borderRadius="8px"
          bg="var(--color-surface-default)"
          fontSize="14px"
          lineHeight="1.7"
          whiteSpace="pre"
        >
          <code>{`import { Flex } from 'styled-system/jsx';

<Flex
  as="article"
  direction="column"
  gap="5"
  p="6"
  border="1px solid var(--color-border-default)"
  borderRadius="12px"
  bg="var(--color-surface-default)"
>
  ...
</Flex>`}</code>
        </Box>
      </details>
    </Flex>
  );
}
