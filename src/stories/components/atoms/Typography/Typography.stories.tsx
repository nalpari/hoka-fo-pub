import type { Meta as StorybookMeta, StoryObj } from '@storybook/react';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { PlatformProvider } from '@/shared/context/platform';
import { Box, Stack } from 'styled-system/jsx';

type TypographyStorySpec = {
  readonly name: string;
  readonly desktopFontSize: string;
  readonly mobileFontSize: string;
  readonly fontWeight: string;
  readonly lineHeight: string;
};

const typographyStorySpecs = {
  display: {
    name: 'Display',
    desktopFontSize: 'clamp(44px, 4vw, 80px)',
    mobileFontSize: '40px',
    fontWeight: '900',
    lineHeight: '0.9625',
  },
  heading: {
    name: 'Heading',
    desktopFontSize: '28px',
    mobileFontSize: '16px',
    fontWeight: '900 (mobile 600)',
    lineHeight: '1.2',
  },
  sectionHeading: {
    name: 'SectionHeading',
    desktopFontSize: '40px',
    mobileFontSize: '30px',
    fontWeight: '900',
    lineHeight: '38px',
  },
  cardTitle: {
    name: 'CardTitle',
    desktopFontSize: '24px',
    mobileFontSize: '20px',
    fontWeight: '900',
    lineHeight: '23px',
  },
  body: {
    name: 'Body',
    desktopFontSize: '16px',
    mobileFontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.3',
  },
  formLabel: {
    name: 'FormLabel',
    desktopFontSize: '16px',
    mobileFontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.3',
  },
  productAudience: {
    name: 'ProductAudience',
    desktopFontSize: '16px',
    mobileFontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.3',
  },
  productSelectorLabel: {
    name: 'ProductSelectorLabel',
    desktopFontSize: '13px',
    mobileFontSize: '13px',
    fontWeight: '700',
    lineHeight: '1.3',
  },
  productSelectorAction: {
    name: 'ProductSelectorAction',
    desktopFontSize: '12px',
    mobileFontSize: '12px',
    fontWeight: '400',
    lineHeight: '1.3',
  },
  productTitle: {
    name: 'ProductTitle',
    desktopFontSize: '34px',
    mobileFontSize: '34px',
    fontWeight: '900',
    lineHeight: '1',
  },
  productPrice: {
    name: 'ProductPrice',
    desktopFontSize: '20px',
    mobileFontSize: '20px',
    fontWeight: '700',
    lineHeight: '1.3',
  },
  meta: {
    name: 'Meta',
    desktopFontSize: '13px',
    mobileFontSize: '13px',
    fontWeight: '400',
    lineHeight: '1.4',
  },
  price: {
    name: 'Price',
    desktopFontSize: '16px',
    mobileFontSize: '13px',
    fontWeight: '400',
    lineHeight: '1.3',
  },
  priceEmphasis: {
    name: 'PriceEmphasis',
    desktopFontSize: 'inherited',
    mobileFontSize: 'inherited',
    fontWeight: '700',
    lineHeight: 'inherited',
  },
  action: {
    name: 'Action',
    desktopFontSize: '16px',
    mobileFontSize: '14px',
    fontWeight: '600',
    lineHeight: '1.3',
  },
  filterLegend: {
    name: 'FilterLegend',
    desktopFontSize: '16px',
    mobileFontSize: '16px',
    fontWeight: '600',
    lineHeight: '130%',
  },
  bottomSheetTitle: {
    name: 'BottomSheetTitle',
    desktopFontSize: '20px',
    mobileFontSize: '20px',
    fontWeight: '700',
    lineHeight: '130%',
  },
} as const satisfies Record<string, TypographyStorySpec>;

function typographyLabel({
  name,
  desktopFontSize,
  mobileFontSize,
  fontWeight,
  lineHeight,
}: TypographyStorySpec) {
  return `${name} / ${desktopFontSize} / ${mobileFontSize} / ${fontWeight} / ${lineHeight} / 가나다라마바사`;
}

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  tags: ['autodocs'],
  args: { children: typographyLabel(typographyStorySpecs.heading), variant: 'heading' },
  parameters: {
    docs: {
      description: {
        component:
          'Typography 토큰입니다. 각 예시는 `이름 / PC font-size / Mobile font-size / font-weight / line-height` 순서로 표시합니다.',
      },
    },
  },
} satisfies StorybookMeta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Display: Story = {
  args: { as: 'h1', children: typographyLabel(typographyStorySpecs.display), variant: 'display' },
};

export const Heading: Story = {
  args: { as: 'h2', children: typographyLabel(typographyStorySpecs.heading), variant: 'heading' },
};

export const NotificationCount: Story = {
  args: { as: 'span', variant: 'notificationCount', children: '12' },
  render: (args) => (
    <Stack gap="4">
      <PlatformProvider platform="web">
        <Typography {...args} />
      </PlatformProvider>
      <PlatformProvider platform="mobile">
        <Box className="platform-mobile">
          <Typography {...args} />
        </Box>
      </PlatformProvider>
    </Stack>
  ),
};

export const PageTitle: Story = {
  args: { as: 'h1', variant: 'pageTitle', children: '주문/결제' },
};

export const LoginTitle: Story = {
  args: { as: 'h1', variant: 'loginTitle', children: 'HOKA Korea에 오신것을 환영합니다' },
};

export const ProfileTitle: Story = {
  args: { as: 'h1', variant: 'profileTitle', children: '나의 러닝 프로필' },
};

export const SessionTitle: Story = {
  args: { as: 'h1', variant: 'sessionTitle', children: '러닝 세션 제목' },
};

export const SessionOverlay: Story = {
  args: { as: 'span', variant: 'sessionOverlay', children: '27.2.12 19:00' },
};

export const SessionPosterTitle: Story = {
  args: { as: 'h2', variant: 'sessionPosterTitle', children: 'Bugaksan Uphill Interval Session' },
};

export const SessionFactBody: Story = {
  args: { as: 'dd', variant: 'sessionFactBody', children: '10월 30일 (금) 19:30 - 21:30' },
  render: (args) => (
    <dl>
      <dt>일시</dt>
      <Typography {...args} />
    </dl>
  ),
};

export const SessionGuideBody: Story = {
  args: { as: 'p', variant: 'sessionGuideBody', children: '그룹 러닝의 즐거움을 느껴보세요!' },
};

export const SessionNote: Story = {
  args: { as: 'p', variant: 'sessionNote', children: '신청은 선착순으로 진행됩니다.' },
};

export const SessionImagePlaceholder: Story = {
  args: { as: 'span', variant: 'sessionImagePlaceholder', children: '이미지 영역' },
};

export const MobileSessionTypography: Story = {
  parameters: { layout: 'fullscreen' },
  globals: { viewport: 'hoka375' },
  render: () => (
    <PlatformProvider platform="mobile">
      <div className="platform-mobile">
        <Typography as="span" variant="sessionOverlay">
          27.2.12 19:00
        </Typography>
        <Typography as="h2" variant="sessionPosterTitle">
          Bugaksan Uphill Interval Session
        </Typography>
        <Typography as="p" variant="sessionFactBody">
          10월 30일 (금) 19:30 - 21:30
        </Typography>
        <Typography as="p" variant="sessionGuideBody">
          그룹 러닝의 즐거움을 느껴보세요!
        </Typography>
        <Typography as="p" variant="sessionNote">
          신청은 선착순으로 진행됩니다.
        </Typography>
        <Typography as="span" variant="sessionImagePlaceholder">
          이미지 영역
        </Typography>
      </div>
    </PlatformProvider>
  ),
};

export const MobileContextTitles: Story = {
  parameters: { layout: 'fullscreen' },
  globals: { viewport: 'hoka375' },
  render: () => (
    <PlatformProvider platform="mobile">
      <div className="platform-mobile">
        <Typography as="h1" variant="profileTitle">
          나의 러닝 프로필
        </Typography>
        <Typography as="h2" variant="sessionTitle">
          러닝 세션 제목
        </Typography>
      </div>
    </PlatformProvider>
  ),
};

export const MobileLoginTitle: Story = {
  parameters: { layout: 'fullscreen' },
  ...LoginTitle,
  globals: { viewport: 'hoka375' },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile">
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
};

export const MobilePageTitle: Story = {
  parameters: { layout: 'fullscreen' },
  ...PageTitle,
  globals: { viewport: 'hoka375' },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile">
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
};

export const SectionHeading: Story = {
  args: {
    as: 'h3',
    children: typographyLabel(typographyStorySpecs.sectionHeading),
    variant: 'sectionHeading',
  },
};

export const CardTitle: Story = {
  args: {
    as: 'h4',
    children: typographyLabel(typographyStorySpecs.cardTitle),
    variant: 'cardTitle',
  },
};

export const Body: Story = {
  args: { children: typographyLabel(typographyStorySpecs.body), variant: 'body' },
};

export const ErrorTone: Story = {
  args: { as: 'p', variant: 'body5', tone: 'error', children: '필수 항목을 확인해주세요.' },
};

export const InheritedToneAndWeight: Story = {
  render: () => (
    <Box style={{ color: 'var(--colors-blue-100)', fontWeight: 700 }}>
      <Typography variant="body4" weight="inherit">
        부모의 색상과 굵기를 유지하는 텍스트
      </Typography>
    </Box>
  ),
};

export const EmphasisWeights: Story = {
  render: () => (
    <Stack>
      <Typography variant="body4" weight="semibold">
        Semibold 강조
      </Typography>
      <Typography as="strong" variant="body4" weight="bold">
        Bold 강조
      </Typography>
      <Typography as="h3" variant="body3" weight="black">
        Black emphasis
      </Typography>
    </Stack>
  ),
};

export const InverseBody: Story = {
  args: { children: typographyLabel(typographyStorySpecs.body), tone: 'inverse', variant: 'body' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export const TertiaryBody: Story = {
  args: { children: typographyLabel(typographyStorySpecs.body), tone: 'tertiary', variant: 'body' },
};

export const Black40Body: Story = {
  args: { children: typographyLabel(typographyStorySpecs.body), tone: 'black40', variant: 'body' },
};

export const Black20Body: Story = {
  args: { children: typographyLabel(typographyStorySpecs.body), tone: 'black20', variant: 'body' },
};

export const Black10Body: Story = {
  args: { children: typographyLabel(typographyStorySpecs.body), tone: 'black10', variant: 'body' },
};

export const FormLabel: Story = {
  args: {
    as: 'span',
    children: typographyLabel(typographyStorySpecs.formLabel),
    variant: 'formLabel',
  },
};

export const ProductAudience: Story = {
  args: {
    as: 'span',
    children: typographyLabel(typographyStorySpecs.productAudience),
    variant: 'productAudience',
  },
};

export const ProductSelectorLabel: Story = {
  args: {
    as: 'h2',
    children: typographyLabel(typographyStorySpecs.productSelectorLabel),
    variant: 'productSelectorLabel',
  },
};

export const ProductSupportTitle: Story = {
  args: { variant: 'productSupportTitle', children: '상품 고시 정보' },
};

export const ProductSelectorAction: Story = {
  args: {
    as: 'button',
    children: typographyLabel(typographyStorySpecs.productSelectorAction),
    variant: 'productSelectorAction',
  },
};

export const ProductTitle: Story = {
  args: {
    as: 'h1',
    children: typographyLabel(typographyStorySpecs.productTitle),
    variant: 'productTitle',
  },
};

export const ProductPrice: Story = {
  args: {
    as: 'p',
    children: typographyLabel(typographyStorySpecs.productPrice),
    variant: 'productPrice',
  },
};

export const Meta: Story = {
  args: { children: typographyLabel(typographyStorySpecs.meta), variant: 'meta' },
};

export const Price: Story = {
  args: { children: typographyLabel(typographyStorySpecs.price), variant: 'price' },
};

export const PriceEmphasis: Story = {
  args: { children: typographyLabel(typographyStorySpecs.priceEmphasis), variant: 'priceEmphasis' },
};

export const Action: Story = {
  args: { children: typographyLabel(typographyStorySpecs.action), variant: 'action' },
};

export const FilterLegend: Story = {
  args: { children: typographyLabel(typographyStorySpecs.filterLegend), variant: 'filterLegend' },
};

export const BottomSheetTitle: Story = {
  args: {
    children: typographyLabel(typographyStorySpecs.bottomSheetTitle),
    variant: 'bottomSheetTitle',
  },
};

export const AuthTitle: Story = {
  args: { as: 'h1', variant: 'authTitle', children: 'HOKA Korea에 오신것을 환영합니다' },
};

export const AuthCaption: Story = {
  args: { as: 'p', variant: 'authCaption', children: 'HOKA Korea에 오신것을 환영합니다' },
};

export const AuthBody: Story = {
  args: { as: 'p', variant: 'authBody', children: 'HOKA Korea에 오신것을 환영합니다' },
};

export const AuthSmall: Story = {
  args: { as: 'p', variant: 'authSmall', children: 'HOKA Korea에 오신것을 환영합니다' },
};

export const FigmaTypeScale: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Typography as="h1" variant="heading4">
        The Future HOKA Heading 4
      </Typography>
      <Typography as="h2" variant="headingKr5">
        프리텐다드 한글 헤딩 5
      </Typography>
      <Typography variant="body3">The Future HOKA Body 3</Typography>
      <Typography variant="body3">프리텐다드 한글 본문 3</Typography>
      <Typography variant="mono4">Mono label</Typography>
      <Typography as="a" href="#type-scale" variant="textLink2">
        Text Link 2
      </Typography>
    </div>
  ),
};

export const AutomaticLanguage: Story = {
  render: () => (
    <Stack gap="6">
      {[false, true].map((mobile) => (
        <PlatformProvider key={String(mobile)} platform={mobile ? 'mobile' : 'web'}>
          <Stack gap="2" className={mobile ? 'platform-mobile' : undefined}>
            <Typography as="h2" variant="heading8">
              No results
            </Typography>
            <Typography as="h2" variant="heading8">
              검색 결과가 없습니다
            </Typography>
            <Typography as="p" variant="body3">
              HOKA <strong>검색 결과</strong> 0
            </Typography>
            <Typography variant="body3" language="ko">
              HOKA 123
            </Typography>
            <Box color="var(--color-text-tertiary)">
              <Typography variant="body3">부모 색상 상속</Typography>
              <Typography variant="body3" tone="primary">
                명시적인 primary 색상
              </Typography>
            </Box>
          </Stack>
        </PlatformProvider>
      ))}
    </Stack>
  ),
};

export const ApprovedScale: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 32 }}>
      {[false, true].map((mobile) => (
        <PlatformProvider key={String(mobile)} platform={mobile ? 'mobile' : 'web'}>
          <div className={mobile ? 'platform-mobile' : undefined}>
            <h2>{mobile ? 'Compact' : 'Wide'}</h2>
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <Typography variant={`heading${i + 1}` as 'heading1'}>H{i + 1} HOKA</Typography>
                <br />
                <Typography variant={`headingKr${i + 1}` as 'headingKr1'}>H{i + 1} 호카</Typography>
              </div>
            ))}
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i}>
                <Typography variant={`body${i + 1}` as 'body1'}>Body {i + 1}</Typography> /{' '}
                <Typography variant={`bodyKr${i + 1}` as 'bodyKr1'}>본문 {i + 1}</Typography> /{' '}
                <Typography variant={`bodyKr${i + 1}` as 'bodyKr1'} weight="medium">
                  Medium
                </Typography>
              </div>
            ))}
            {(
              [
                'cta1',
                'cta2',
                'ctaKr1',
                'ctaKr2',
                'textLink1',
                'textLink2',
                'textLink3',
                'textLinkKr1',
                'textLinkKr2',
                'textLinkKr3',
              ] as const
            ).map((variant) => (
              <div key={variant}>
                <Typography variant={variant}>{variant} 버튼과 링크</Typography>
              </div>
            ))}
          </div>
        </PlatformProvider>
      ))}
    </div>
  ),
};

export const WebMoVariant: Story = {
  args: {
    as: 'h1',
    web: 'heading6',
    mo: 'heading4',
    children: '회원가입 완료',
  },
  render: (args) => (
    <div>
      <PlatformProvider platform="web">
        <p>Desktop: 36px</p>
        <Typography {...args} />
      </PlatformProvider>
      <div className="platform-mobile">
        <PlatformProvider platform="mobile">
          <p>Mobile: 28px</p>
          <Typography {...args} />
          <Typography {...args} weight="regular">
            명시한 weight 유지
          </Typography>
        </PlatformProvider>
      </div>
    </div>
  ),
};

export const LocaleHeading: Story = {
  args: { as: 'h1', variant: 'localeHeading', children: 'Choose your shipping country' },
};

export const ScreenReaderOnly: Story = {
  args: { as: 'h1', srOnly: true, children: '상품 이미지' },
  render: (args) => (
    <Box>
      <Typography {...args} />
      <Typography as="p">
        제목은 스크린 리더로 읽을 수 있습니다. Controls에서 srOnly를 꺼 확인하세요.
      </Typography>
    </Box>
  ),
};

export const LocaleHeadingMobile: Story = {
  parameters: { layout: 'fullscreen' },
  args: { as: 'h1', variant: 'localeHeading', children: 'Choose your shipping country' },
  render: (args) => (
    <PlatformProvider platform="mobile">
      <div className="platform-mobile">
        <Typography {...args} />
      </div>
    </PlatformProvider>
  ),
};

export const UnstyledTone: Story = {
  args: {
    as: 'p',
    variant: 'unstyled',
    tone: 'tertiary',
    children: '글꼴과 크기를 유지하고 색상만 적용합니다.',
  },
  render: (args) => (
    <Box fontFamily="serif" fontSize="24px" fontWeight="bold" color="var(--color-text-brand)">
      <Typography {...args} />
      <Typography {...args} tone={undefined}>
        tone을 생략하면 상위 색상을 유지합니다.
      </Typography>
    </Box>
  ),
};

export const NavigationHeading: Story = {
  args: { as: 'h2', variant: 'navigationHeading', children: 'Featured' },
  render: (args) => (
    <Stack gap="6">
      <PlatformProvider platform="web">
        <Typography {...args} />
      </PlatformProvider>
      <PlatformProvider platform="mobile">
        <Stack className="platform-mobile" gap="4">
          <Typography {...args} />
          <Typography {...args} as="span">
            액티비티
          </Typography>
        </Stack>
      </PlatformProvider>
    </Stack>
  ),
};
