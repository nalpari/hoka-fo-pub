import { useState, type ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { IconButton, type IconButtonProps } from '@/shared/components/atoms/IconButton/IconButton';
import * as fontAwesome from '@/shared/icons/fontAwesome';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Box, Grid } from 'styled-system/jsx';

export const fontAwesomeNames = Object.keys(fontAwesome).sort() as (keyof typeof fontAwesome)[];

// Keep in sync with public/images/icon, including nested folders.
export const svgPaths = [
  'action/fa-arrow-up-from-bracket.svg',
  'action/fa-clock-nine.svg',
  'action/fa-minus.svg',
  'action/fa-plus.svg',
  'action/fa-ruler-horizontal.svg',
  'action/fa-xmark.svg',
  'brand/all-terrain.svg',
  'brand/breathable.svg',
  'brand/carbon-fiber-plate.svg',
  'brand/circularity.svg',
  'brand/cold-weather-rated.svg',
  'brand/downfill.svg',
  'brand/ethically-sourced.svg',
  'brand/insulated-fill.svg',
  'brand/natural-materials.svg',
  'brand/odor-resistant.svg',
  'brand/organic.svg',
  'brand/pfc-free.svg',
  'brand/pockets.svg',
  'brand/propulsive-plate.svg',
  'brand/recycled-materials.svg',
  'brand/resoleable.svg',
  'brand/slip-resistant.svg',
  'brand/snow.svg',
  'brand/sun-protection.svg',
  'brand/suspension-plate.svg',
  'brand/track.svg',
  'brand/trail-traction.svg',
  'brand/vegan.svg',
  'brand/warming.svg',
  'brand/water-resistant.svg',
  'brand/waterproof.svg',
  'brand/wickable.svg',
  'brand/wind-proof.svg',
  'brand/wind-resistant.svg',
  'breadcrumb.svg',
  'chevron-down-small.svg',
  'chevron-right.svg',
  'close.svg',
  'filter-collapsed.svg',
  'filter-expanded.svg',
  'filter.svg',
  'form/checkbox-checked.svg',
  'form/checkbox-disabled-checked.svg',
  'form/checkbox-disabled.svg',
  'form/checkbox-unchecked.svg',
  'form/radio-checked.svg',
  'form/radio-disabled-checked.svg',
  'form/radio-disabled.svg',
  'form/radio-unchecked.svg',
  'form/sort-down.svg',
  'gift.svg',
  'ipin-verification.svg',
  'join-check.svg',
  'medal.svg',
  'navigation/chevron-right.svg',
  'notification/notification-bag.svg',
  'notification/notification-basket.svg',
  'party-horn.svg',
  'phone-verification.svg',
  'rating/rating-star-half.svg',
  'social/facebook.svg',
  'social/instagram.svg',
  'social/kakao.svg',
  'social/level-access.svg',
  'social/naver.svg',
  'social/pinterest.svg',
  'social/strava.svg',
  'social/tiktok.svg',
  'social/truefit.svg',
  'social/x.svg',
  'social/youtube.svg',
  'tag-delete.svg',
] as const;

export type IconButtonStoryArgs = Omit<IconButtonProps, 'children'> & {
  children?: never;
  iconSource: 'fontAwesome' | 'svg';
  fontAwesomeName: string;
  svgPath: string;
  iconSize: number;
};

const surface = css({
  p: '16px',
  color: '#111',
  bg: '#fff',
  overflow: 'hidden',
  '& h2': { fontSize: '20px', fontWeight: '700', mb: '12px' },
  '& p': { mb: '12px', lineHeight: '1.6' },
});

const inverseSurface = css({ p: '16px', bg: '#111', color: '#fff' });

const table = css({
  w: 'full',
  minW: '480px',
  borderCollapse: 'collapse',
  fontSize: '14px',
  '& th, & td': {
    p: '12px',
    border: '1px solid #d8d8d8',
    textAlign: 'left',
    verticalAlign: 'middle',
    minW: '100px',
  },
  '& th': { bg: '#f3f3f3', fontWeight: '700' },
  '& caption': { textAlign: 'left', fontWeight: '700', py: '12px' },
});

const copyButton = css({
  position: 'absolute',
  inset: '0',
  w: 'full',
  h: 'full',
  border: '0',
  bg: 'transparent',
  cursor: 'copy',
  borderRadius: '4px',
  _hover: { outline: '1px solid #009DFF' },
  _focusVisible: { outline: '2px solid #009DFF', outlineOffset: '2px' },
});

const copyStatus = css({ minH: '20px', fontSize: '12px', lineHeight: '20px' });

const catalogDefaults: IconButtonStoryArgs = {
  iconSource: 'fontAwesome',
  fontAwesomeName: 'faXmark',
  svgPath: 'close.svg',
  size: 36,
  iconSize: 20,
  shape: 'square',
  tone: 'default',
  color: 'currentColor',
};

function CopyPreview({ args, label }: { args: IconButtonStoryArgs; label: string }) {
  const [message, setMessage] = useState('');

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(iconButtonSource(args));
      setMessage(`${label} 코드가 복사되었습니다.`);
    } catch {
      setMessage('복사하지 못했습니다. 브라우저의 클립보드 권한을 확인하고 다시 클릭하세요.');
    }
  }

  return (
    <div>
      <Box pos="relative" display="inline-block">
        <div aria-hidden="true">
          <IconButtonPreview {...args} tabIndex={-1} />
        </div>
        <button
          type="button"
          className={copyButton}
          onClick={copyCode}
          aria-label={`${label} 사용 코드 복사`}
          title="클릭하여 사용 코드 복사"
        />
      </Box>
      <div role="status" className={copyStatus}>
        {message}
      </div>
    </div>
  );
}

function resolveFontAwesome(name: string) {
  return Object.prototype.hasOwnProperty.call(fontAwesome, name)
    ? fontAwesome[name as keyof typeof fontAwesome]
    : undefined;
}

function iconError(args: IconButtonStoryArgs) {
  if (args.iconSource === 'fontAwesome' && !resolveFontAwesome(args.fontAwesomeName)) {
    return '등록된 Font Awesome export 이름을 입력하세요. 예: faHeartSolid, faXmark';
  }

  if (args.iconSource === 'svg' && !svgPaths.some((path) => path === args.svgPath)) {
    return '목록에서 프로젝트 SVG를 선택하세요.';
  }

  return undefined;
}

export function iconButtonSource(args: IconButtonStoryArgs) {
  const error = iconError(args);

  if (error) return `// ${error}`;

  const icon =
    args.iconSource === 'fontAwesome'
      ? `fontAwesomeIcon={${args.fontAwesomeName}}`
      : `src=${JSON.stringify(`/images/icon/${args.svgPath}`)}`;
  const imports = [
    "import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';",
    "import { Icon } from '@/shared/components/atoms/Icon/Icon';",
    ...(args.iconSource === 'fontAwesome'
      ? [`import { ${args.fontAwesomeName} } from '@/shared/icons/fontAwesome';`]
      : []),
  ];

  return `${imports.join('\n')}\n\n<IconButton aria-label={${JSON.stringify(args['aria-label'] ?? '')}} size={${JSON.stringify(args.size ?? 36)}} shape=${JSON.stringify(args.shape ?? 'square')} tone=${JSON.stringify(args.tone ?? 'default')} color={${JSON.stringify(args.color ?? 'currentColor')}}${args.disabled ? ' disabled' : ''}>\n  <Icon ${icon} size={${args.iconSize}} />\n</IconButton>`;
}

export function IconButtonPreview(args: IconButtonStoryArgs) {
  const { iconSource, fontAwesomeName, svgPath, iconSize, ...buttonProps } = args;
  const error = iconError(args);
  const definition = resolveFontAwesome(fontAwesomeName);

  return (
    <div className={args.tone === 'inverse' ? inverseSurface : surface}>
      {error ? (
        <Typography as="p" role="alert">
          {error}
        </Typography>
      ) : (
        <IconButton {...buttonProps}>
          {iconSource === 'fontAwesome' && definition ? (
            <Icon fontAwesomeIcon={definition} size={iconSize} />
          ) : (
            <Icon src={`/images/icon/${svgPath}`} size={iconSize} />
          )}
        </IconButton>
      )}
    </div>
  );
}

function ExampleTable({
  caption,
  headers,
  children,
}: {
  caption: string;
  headers: string[];
  children: ReactNode;
}) {
  return (
    <Box
      overflowX="auto"
      maxW="100%"
      w="full"
      tabIndex={0}
      role="region"
      aria-label={`${caption} · 가로 스크롤`}
    >
      <table className={table}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope="col" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </Box>
  );
}

const catalogCell = css({
  display: 'grid',
  placeItems: 'center',
  minW: '48px',
  h: '48px',
  p: '0',
  border: '1px solid #E9EAEB',
  borderRadius: '4px',
  bg: 'transparent',
  color: 'inherit',
  cursor: 'copy',
  _hover: { bg: '#F7F7F9', borderColor: '#009DFF' },
  _focusVisible: { outline: '2px solid #009DFF', outlineOffset: '-2px' },
  // Only these light-colored SVGs need a contrasting preview background.
  '&[data-light-icon="true"]': {
    bg: '#777777',
    borderColor: '#666666',
    _hover: { bg: '#666666', borderColor: '#009DFF' },
  },
});

const lightSvgPaths = new Set<string>(['chevron-right.svg', 'social/naver.svg']);

const catalogItems = [
  ...fontAwesomeNames.map((name) => ({
    label: `Font Awesome · ${name}`,
    args: {
      ...catalogDefaults,
      fontAwesomeName: name,
      iconSize: 24,
      'aria-label': `${fontAwesome[name].iconName} 실행`,
    },
  })),
  ...[...svgPaths].sort().map((path) => ({
    label: `프로젝트 SVG · ${path}`,
    args: {
      ...catalogDefaults,
      iconSource: 'svg' as const,
      svgPath: path,
      iconSize: 24,
      'aria-label': `${path.replace('.svg', '')} 실행`,
    },
  })),
];

export function IconCatalog() {
  const [message, setMessage] = useState('');

  async function copyCode(args: IconButtonStoryArgs, label: string) {
    try {
      await navigator.clipboard.writeText(iconButtonSource(args));
      setMessage(`${label} 코드가 복사되었습니다.`);
    } catch {
      setMessage('복사하지 못했습니다. 브라우저의 클립보드 권한을 확인하고 다시 클릭하세요.');
    }
  }

  return (
    <div className={surface}>
      <Typography as="h2">미리보기 · 클릭하여 복사</Typography>
      <Typography as="p">
        전체 {catalogItems.length}개 · 클릭 또는 Enter·Space로 import와 JSX 코드를 복사합니다.
        아이콘 이름은 마우스를 올려 확인하세요. SVG는 원본 색상을 유지합니다.
      </Typography>
      <div role="status" className={copyStatus}>
        {message}
      </div>
      <Grid
        gridTemplateColumns="repeat(auto-fill, minmax(48px, 1fr))"
        gap="4px"
        w="full"
        role="group"
        aria-label="전체 아이콘 미리보기"
      >
        {catalogItems.map(({ label, args }) => (
          <button
            key={label}
            type="button"
            className={catalogCell}
            data-light-icon={
              args.iconSource === 'svg' && lightSvgPaths.has(args.svgPath) ? true : undefined
            }
            title={`${label} · 클릭하여 사용 코드 복사`}
            aria-label={`${label} 사용 코드 복사`}
            onClick={() => copyCode(args, label)}
          >
            {args.iconSource === 'fontAwesome' ? (
              <Icon
                fontAwesomeIcon={fontAwesome[args.fontAwesomeName as keyof typeof fontAwesome]}
                size={24}
              />
            ) : (
              <Icon src={`/images/icon/${args.svgPath}`} size={24} />
            )}
          </button>
        ))}
      </Grid>
    </div>
  );
}

const examples: { label: string; props: Partial<IconButtonStoryArgs>; note: string }[] = [
  { label: '작은 버튼', props: { size: 24, iconSize: 16 }, note: '24px 버튼 / 16px 아이콘' },
  {
    label: '기본 버튼',
    props: { size: 36, iconSize: 20 },
    note: '36px 버튼 / 20px 아이콘 / square',
  },
  { label: '큰 버튼', props: { size: 48, iconSize: 24 }, note: '48px 버튼 / 24px 아이콘' },
  { label: '원형 버튼', props: { shape: 'circle' }, note: 'circle · 마우스를 올려 배경 모양 확인' },
  { label: '반전 색상', props: { tone: 'inverse' }, note: '어두운 배경 / 흰색 아이콘' },
  {
    label: '비활성 색상',
    props: { tone: 'disabled' },
    note: '회색 표시만 적용 · 클릭 및 포커스 가능',
  },
  {
    label: '실제 비활성',
    props: { disabled: true },
    note: '클릭 및 Tab 포커스 차단 · 색상은 별도 설정',
  },
  {
    label: '비활성 색상 + 동작',
    props: { disabled: true, tone: 'disabled' },
    note: '회색 표시 / 클릭 및 Tab 포커스 차단',
  },
  {
    label: '사용자 색상',
    props: { color: '#009DFF' },
    note: 'Font Awesome 아이콘에 버튼 색상 상속',
  },
];

export function PropertyComparison({ defaults }: { defaults: IconButtonStoryArgs }) {
  return (
    <div className={surface}>
      <Typography as="h2">속성별 비교</Typography>
      <Typography as="p">
        tone="disabled"는 색상만 변경합니다. 상호작용을 막으려면 disabled를 지정하세요. 버튼마다
        실제 용도를 나타내는 aria-label이 필요하며 자식 아이콘은 장식 요소로 처리합니다.
      </Typography>
      <Typography as="p">
        미리보기를 클릭하면 해당 속성의 사용 코드를 복사합니다. 비활성 예시 위의 복사 버튼은 문서
        전용이며, 복사되는 코드는 disabled 상태를 유지합니다.
      </Typography>
      <ExampleTable
        caption="크기 · 모양 · 색상 · 비활성 상태"
        headers={['예시', '미리보기 · 클릭하여 복사', '설명']}
      >
        {examples.map(({ label, props, note }) => {
          const args = { ...defaults, ...props };

          return (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>
                <CopyPreview args={args} label={label} />
              </td>
              <td>{note}</td>
            </tr>
          );
        })}
      </ExampleTable>
    </div>
  );
}
