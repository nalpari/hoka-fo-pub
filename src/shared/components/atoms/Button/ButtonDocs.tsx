import { useEffect, useState, type PropsWithChildren } from 'react';
import { DocsContainer, Unstyled, type DocsContainerProps } from '@storybook/addon-docs/blocks';
import { css } from 'styled-system/css';
import {
  Button,
  ButtonLink,
  type ButtonProps,
  type ButtonSizingProps,
  type ButtonVariant,
} from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Stack, HStack, Box, Flex } from 'styled-system/jsx';

const variants = [
  { variant: 'primary', title: 'Primary', note: '배경이 채워진 기본 액션 버튼' },
  { variant: 'secondary', title: 'Secondary', note: '테두리로 구분하는 보조 액션 버튼' },
  { variant: 'ghost', title: 'Ghost', note: '배경과 테두리가 없는 버튼' },
  {
    variant: 'chip',
    title: 'Chip',
    note: '높이 36px · 패딩 9px 14px · body4 14px medium',
  },
  { variant: 'brand', title: 'Brand', note: '브랜드 블루 배경 · 기본 상태는 Black / White 동일' },
  {
    variant: 'link',
    title: 'Link',
    note: '밑줄 텍스트 링크 · 높이 auto, 좌우 패딩 0 · sm 글자 크기 12px',
  },
  {
    variant: 'plain',
    title: 'Plain',
    note: '밑줄 없는 텍스트 링크 · 높이 auto, 좌우 패딩 0 · sm 글자 크기 12px',
  },
  {
    variant: 'filterTrigger',
    title: 'Filter Trigger',
    note: 'compact(기본) 32.2px/14px · regular 40px/24px (높이/좌우 패딩)',
  },
  {
    variant: 'headerSearch',
    title: 'Header Search',
    note: '고정 높이 36px · 너비 178px · 좌우 패딩 15px',
  },
] as const satisfies readonly { variant: ButtonVariant; title: string; note: string }[];

const states = [
  { value: 'default', label: 'Default' },
  { value: 'disabled', label: 'Disabled' },
] as const;

const colorways = ['black', 'white'] as const;

const buttonSizes = ['tall', 'short'] as const;

const linkSizes = ['sm', 'md', 'lg'] as const;

const section = css({ pt: '24px', borderTop: '1px solid #E9EAEB' });

const muted = css({ color: '#595959', fontSize: '13px' });

const table = css({
  w: '100%',
  minW: '620px',
  tableLayout: 'fixed',
  borderCollapse: 'collapse',
  '& th, & td': { p: '16px', textAlign: 'left', verticalAlign: 'middle' },
  '& thead': { bg: '#F7F7F9', color: '#111' },
  '& col:nth-child(1)': { w: '110px' },
  '& col:nth-child(2)': { w: '80px' },
  '& tbody tr + tr': { borderTop: '1px solid #E9EAEB' },
  '& td[data-colorway="white"]': { bg: '#777777', color: 'white' },
  '& tbody + tbody': { borderTop: '1px solid #E9EAEB' },
});

const caption = css({ fontSize: '12px', lineHeight: '1.5' });

const copyTarget = css({ position: 'relative', display: 'inline-flex', maxW: '100%' });

const disabledCopy = css({
  position: 'absolute',
  inset: '0',
  w: '100%',
  h: '100%',
  border: '0',
  bg: 'transparent',
  cursor: 'copy',
  borderRadius: '52px',
  _focusVisible: { outline: '2px solid #009DFF', outlineOffset: '3px' },
});

type CopyCode = (code: string) => Promise<void>;

function buttonCode({
  variant,
  colorway,
  size,
  disabled,
}: ButtonSizingProps & Pick<ButtonProps, 'colorway' | 'disabled'>) {
  const attributes = [
    `variant="${variant}"`,
    `colorway="${colorway}"`,
    size ? `size="${size}"` : undefined,
    disabled ? 'disabled' : undefined,
    variant === 'headerSearch'
      ? 'icon={<Icon src="/images/header/search.svg" size="16px" mask />}'
      : undefined,
  ].filter(Boolean);

  const children =
    variant === 'chip'
      ? '버튼명 텍스트'
      : variant === 'headerSearch' || variant === 'filterTrigger'
        ? '<Typography variant="body4">버튼명 텍스트</Typography>'
        : '버튼명 텍스트';

  return `<Button ${attributes.join(' ')}>${children}</Button>`;
}

function dimensions({ variant, size }: ButtonSizingProps) {
  const wide = size === 'tall' || size === 'lg';
  let height = wide ? '48px' : '40px';
  let padding = wide ? '24px' : '16px';
  let font = wide ? '16px' : '14px';

  if (variant === 'filterTrigger') {
    height = '32.2px';
    padding = '14px';
  }
  if (variant === 'headerSearch') {
    height = '36px';
    padding = '15px';
  }
  if (variant === 'chip') {
    height = '36px';
    padding = '14px';
    font = '14px medium';
  }
  if (variant === 'link' || variant === 'plain') {
    height = size === 'sm' ? '16px min' : 'auto';
    padding = '0px';
    if (size === 'sm') font = '12px';
  }

  return `높이 ${height} · 글자 ${font} · 좌우 ${padding}`;
}

function Sample({
  colorway,
  state = 'default',
  onCopy,
  ...sizing
}: ButtonSizingProps & {
  colorway: 'black' | 'white';
  state?: (typeof states)[number]['value'];
  onCopy: CopyCode;
}) {
  const { variant, size } = sizing;
  const disabled = state === 'disabled';
  const code = buttonCode({ ...sizing, colorway, disabled });
  const copyLabel = `${variant} ${colorway} ${size ?? 'fixed'} ${state} 코드 복사`;

  return (
    <Stack flex="1" minW="0" alignItems="flex-start" gap="8px">
      <HStack gap="normal" w="100%" minH="56px">
        <div className={copyTarget} title={code}>
          <Button
            {...sizing}
            colorway={colorway}
            disabled={disabled}
            onClick={() => void onCopy(code)}
            aria-label={copyLabel}
            aria-hidden={disabled || undefined}
            icon={
              variant === 'headerSearch' ? (
                <Icon src="/images/header/search.svg" size="16px" mask />
              ) : undefined
            }
          >
            {variant === 'headerSearch' || variant === 'filterTrigger' || variant === 'chip' ? (
              variant === 'chip' ? (
                '버튼명 텍스트'
              ) : (
                <Typography variant="body4">버튼명 텍스트</Typography>
              )
            ) : (
              '버튼명 텍스트'
            )}
          </Button>
          {disabled && (
            <button
              type="button"
              className={disabledCopy}
              aria-label={copyLabel}
              onClick={() => void onCopy(code)}
            />
          )}
        </div>
      </HStack>
      <Typography as="span" className={caption}>
        {dimensions(sizing)}
      </Typography>
    </Stack>
  );
}

function MatrixHeader() {
  return (
    <>
      <colgroup>
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th colSpan={2} scope="colgroup">
            Colorway
          </th>
          <th scope="col">Black</th>
          <th scope="col">White</th>
        </tr>
      </thead>
    </>
  );
}

function VariantSection({
  variant,
  title,
  note,
  onCopy,
}: (typeof variants)[number] & { onCopy: CopyCode }) {
  const samples: ButtonSizingProps[] =
    variant === 'link' || variant === 'plain'
      ? linkSizes.map((size) => ({ variant, size }))
      : variant === 'filterTrigger' || variant === 'headerSearch' || variant === 'chip'
        ? [{ variant }]
        : buttonSizes.map((size) => ({ variant, size }));

  return (
    <section id={`button-${variant}`} className={section} aria-labelledby={`heading-${variant}`}>
      <Typography as="h2" id={`heading-${variant}`}>
        {title}
      </Typography>
      <Typography as="p" className={muted}>
        {note}
      </Typography>
      <Box
        overflowX="auto"
        mt="16px"
        border="1px solid #E9EAEB"
        borderRadius="8px"
        role="region"
        aria-label={`${title} 색상·상태·크기 비교`}
        tabIndex={0}
      >
        <table className={table}>
          <MatrixHeader />
          {states.map(({ value, label }) => (
            <tbody key={value}>
              {samples.map((sizing, index) => (
                <tr key={sizing.size ?? 'fixed'}>
                  {index === 0 && (
                    <th scope="rowgroup" rowSpan={samples.length}>
                      {label}
                    </th>
                  )}
                  <th scope="row">
                    {sizing.size === 'tall'
                      ? 'Tall'
                      : sizing.size === 'short'
                        ? 'Short'
                        : (sizing.size ?? 'Fixed')}
                  </th>
                  {colorways.map((colorway) => (
                    <td key={colorway} data-colorway={colorway}>
                      <Sample {...sizing} colorway={colorway} state={value} onCopy={onCopy} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </Box>
    </section>
  );
}

export function ButtonDocsContainer({ children, ...props }: PropsWithChildren<DocsContainerProps>) {
  return (
    <Box
      css={{
        '& .sbdocs-wrapper': { p: '0!' },
        '& .sbdocs-content': { maxW: 'none!', minW: '0', w: '100%' },
      }}
    >
      <DocsContainer {...props}>
        <Unstyled>{children}</Unstyled>
      </DocsContainer>
    </Box>
  );
}

export function ButtonDocs() {
  const [copyFeedback, setCopyFeedback] = useState('');

  useEffect(() => {
    if (!copyFeedback) return;
    const timeout = window.setTimeout(() => setCopyFeedback(''), 4000);

    return () => window.clearTimeout(timeout);
  }, [copyFeedback]);

  async function copyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopyFeedback(`복사됨: ${code}`);
    } catch {
      setCopyFeedback(
        '복사하지 못했습니다. 브라우저의 클립보드 권한을 확인하고 다시 클릭해 주세요.',
      );
    }
  }

  return (
    <Stack
      gap="10"
      w="100%"
      maxW="1800px"
      mx="auto"
      p="32px"
      color="#111"
      bg="white"
      fontFamily="korean"
      fontSize="14px"
      lineHeight="1.5"
      css={{
        '& h2': { fontSize: '22px', fontWeight: '600' },
        '& h3': { fontSize: '14px', fontWeight: '600', my: '16px' },
        '& p': { margin: '0' },
        '@media (max-width: 600px)': { p: '16px' },
      }}
    >
      <header>
        <Typography as="p" className={muted}>
          COMPONENTS / BUTTON
        </Typography>
        <Typography as="h1" className={css({ fontSize: '32px', fontWeight: '700', mb: '12px' })}>
          Buttons
        </Typography>
        <Typography as="p">
          variant별 색상과 상태, size를 비교합니다. 일반 버튼은 Tall·Short, Link는 sm·md·lg를
          사용합니다.
        </Typography>
        <Typography as="p" className={muted}>
          비교 표의 버튼을 클릭하면 해당 예시의 JSX 코드를 복사합니다. Disabled 예시도 복사할 수
          있습니다.
        </Typography>
        <Typography as="p" className={muted}>
          Default와 Disabled를 비교합니다. Hover·Focus·Active는 Default 버튼을 마우스와 키보드로
          직접 확인할 수 있습니다.
        </Typography>
        <Flex aria-label="Button variant" as="nav" flexWrap="wrap" gap="8px" my="20px">
          {variants.map(({ variant, title }) => (
            <a
              key={variant}
              href={`#button-${variant}`}
              className={css({
                px: '12px',
                py: '6px',
                border: '1px solid #D8D8D8',
                borderRadius: '999px',
                color: '#111',
                textDecoration: 'none',
                _hover: { bg: '#F7F7F9' },
                _focusVisible: { outline: '2px solid #009DFF', outlineOffset: '2px' },
              })}
            >
              {title}
            </a>
          ))}
        </Flex>
        <details
          className={css({
            p: '16px',
            bg: '#F7F7F9',
            borderRadius: '8px',

            '& p': { mt: '8px' },
          })}
        >
          <summary className={css({ cursor: 'pointer', fontWeight: '600' })}>
            크기 기준 및 속성 안내
          </summary>
          <Typography as="p">
            <strong>크기 기준</strong> Tall: 48px / 16px / 좌우 24px · Short: 40px / 14px / 좌우
            16px
          </Typography>
          <Typography as="p">
            <strong>size</strong> 일반 버튼은 tall → CTA1, short → CTA2를 사용합니다. Link는 sm 12px
            · md 14px · lg 16px입니다.
          </Typography>
          <Typography as="p">
            <strong>우선순위</strong> density → size → auto. auto는 기본 wide, .platform-mobile
            안에서는 compact입니다.
          </Typography>
          <Typography as="p">
            <strong>예외</strong> FilterTrigger·HeaderSearch는 size를 받지 않고 각각 32.2px·36px
            높이와 14px 글자를 사용합니다. 아이콘 전용 버튼은 24px입니다. 일반 버튼의 size는 라벨
            Typography도 선택하므로 density와 함께 쓰면 높이와 글자 크기가 다를 수 있습니다.
          </Typography>
          <Typography as="p">
            <strong>색상</strong> colorway는 Black / White 색상 조합입니다.
          </Typography>
        </details>
      </header>
      {variants.map((spec) => (
        <VariantSection key={spec.variant} {...spec} onCopy={copyCode} />
      ))}
      <section className={section} aria-labelledby="button-examples">
        <Typography as="h2" id="button-examples">
          사용 예시
        </Typography>
        <HStack
          flexWrap="wrap"
          gap="24px"
          mt="20px"
          css={{ '& > div': { display: 'grid', gap: '12px' } }}
        >
          <div>
            <Typography as="h3">Loading</Typography>
            <Button variant="primary" loading>
              처리 중
            </Button>
          </div>
          <div>
            <Typography as="h3">Icon</Typography>
            <Button icon={<Icon name="filter" />}>필터</Button>
          </div>
          <div>
            <Typography as="h3">English</Typography>
            <Button variant="primary" language="en">
              Shop Women’s
            </Button>
          </div>
          <>
            <div>
              <Typography as="h3">ButtonLink</Typography>
              <ButtonLink href="/products" variant="secondary">
                바로가기
              </ButtonLink>
            </div>
            <div>
              <Typography as="h3">Text Link · sm</Typography>
              <ButtonLink href="/products" variant="link" size="sm">
                바로가기
              </ButtonLink>
            </div>
            <div>
              <Typography as="h3">Plain Text Link</Typography>
              <ButtonLink href="/products" variant="plain" size="lg">
                밑줄 없는 링크
              </ButtonLink>
            </div>
          </>
        </HStack>
      </section>
      <Box
        role="status"
        aria-live="polite"
        aria-atomic="true"
        pos="fixed"
        bottom="20px"
        left="20px"
        right="20px"
        zIndex="10"
        maxW="900px"
        mx="auto"
        bg="#111"
        color="white"
        borderRadius="8px"
        fontSize="13px"
        overflowWrap="anywhere"
        boxShadow="0 4px 16px #0003"
        css={{ '&:not(:empty)': { p: '12px 16px' } }}
      >
        {copyFeedback}
      </Box>
    </Stack>
  );
}
