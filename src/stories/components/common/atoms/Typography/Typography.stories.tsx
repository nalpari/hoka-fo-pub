import type { Meta as StorybookMeta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/context/platform';

import { Box, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

type TypographyStorySpec = {
  readonly name: string;
  readonly desktopFontSize: string;
  readonly mobileFontSize: string;
  readonly fontWeight: string;
  readonly lineHeight: string;
};

const typographyStorySpecs = {
  heading1: {
    name: 'Heading1',
    desktopFontSize: '84px',
    mobileFontSize: '50px',
    fontWeight: '900',
    lineHeight: 'HOKA',
  },
  heading7: {
    name: 'Heading7',
    desktopFontSize: '28px',
    mobileFontSize: '16px',
    fontWeight: '900 (mobile 500)',
    lineHeight: '1.2',
  },
  heading5: {
    name: 'Heading5 / Mobile Heading4',
    desktopFontSize: '42px',
    mobileFontSize: '28px',
    fontWeight: '900',
    lineHeight: '1.2',
  },
  heading8: {
    name: 'Heading8 / Mobile Heading6',
    desktopFontSize: '22px',
    mobileFontSize: '20px',
    fontWeight: '900',
    lineHeight: 'HOKA',
  },
  body: {
    name: 'Body',
    desktopFontSize: '16px',
    mobileFontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.3',
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
  args: { children: typographyLabel(typographyStorySpecs.heading7), variant: 'heading7' },
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
  args: { as: 'h1', children: typographyLabel(typographyStorySpecs.heading1), variant: 'heading1' },
};

export const Heading: Story = {
  args: { as: 'h2', children: typographyLabel(typographyStorySpecs.heading7), variant: 'heading7' },
};

export const NotificationCount: Story = {
  args: { as: 'span', variant: 'body5', children: '12' },
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
  args: {
    as: 'h1',
    variant: 'heading7',
    mo: 'heading4',
    weight: 'bold',
    children: '나의 러닝 프로필',
  },
};

export const SessionTitle: Story = {
  args: {
    as: 'h1',
    variant: 'heading6',
    mo: 'heading4',
    weight: 'black',
    children: '러닝 세션 제목',
  },
};

export const SessionOverlay: Story = {
  args: { as: 'span', variant: 'heading6', mo: 'heading4', children: '27.2.12 19:00' },
};

export const SessionPosterTitle: Story = {
  args: {
    as: 'h2',
    variant: 'heading1',
    mo: 'heading2',
    children: 'Bugaksan Uphill Interval Session',
  },
};

export const SessionFactBody: Story = {
  args: { as: 'dd', variant: 'body3', mo: 'body4', children: '10월 30일 (금) 19:30 - 21:30' },
  render: (args) => (
    <dl>
      <dt>일시</dt>
      <Typography {...args} />
    </dl>
  ),
};

export const SessionGuideBody: Story = {
  args: { as: 'p', variant: 'body4', children: '그룹 러닝의 즐거움을 느껴보세요!' },
};

export const SessionNote: Story = {
  args: { as: 'p', variant: 'body4', mo: 'body5', children: '신청은 선착순으로 진행됩니다.' },
};

export const SessionImagePlaceholder: Story = {
  args: { as: 'span', variant: 'heading7', mo: 'body2', weight: 'black', children: '이미지 영역' },
};

export const MobileSessionTypography: Story = {
  parameters: { layout: 'fullscreen' },
  globals: { viewport: 'hoka375' },
  render: () => (
    <PlatformProvider platform="mobile">
      <div className="platform-mobile">
        <Typography as="span" variant="heading6" mo="heading4">
          27.2.12 19:00
        </Typography>
        <Typography as="h2" variant="heading1" mo="heading2">
          Bugaksan Uphill Interval Session
        </Typography>
        <Typography as="p" variant="body3" mo="body4">
          10월 30일 (금) 19:30 - 21:30
        </Typography>
        <Typography as="p" variant="body4">
          그룹 러닝의 즐거움을 느껴보세요!
        </Typography>
        <Typography as="p" variant="body4" mo="body5">
          신청은 선착순으로 진행됩니다.
        </Typography>
        <Typography as="span" variant="heading7" mo="body2" weight="black">
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
        <Typography as="h1" variant="heading7" mo="heading4" weight="bold">
          나의 러닝 프로필
        </Typography>
        <Typography as="h2" variant="heading6" mo="heading4" weight="black">
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
    children: typographyLabel(typographyStorySpecs.heading5),
    web: 'heading5',
    mo: 'heading4',
  },
};

export const CardTitle: Story = {
  args: {
    as: 'h4',
    children: typographyLabel(typographyStorySpecs.heading8),
    web: 'heading8',
    mo: 'heading6',
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

export const Body4: Story = {
  args: {
    as: 'span',
    children: 'Body4 / 14px / 400 / 1.3 / 가나다라마바사',
    variant: 'body4',
  },
};

export const ProductReviewTitle: Story = {
  args: { as: 'h2', variant: 'heading8', children: '리뷰' },
};

export const ProductReviewCount: Story = {
  args: { variant: 'body1', weight: 'medium', children: '(472)' },
};

export const ProductInformationBody: Story = {
  args: { variant: 'body3', children: '어떤 날씨에도 쿠션감 있는 편안한 주행' },
};

export const ProductSelectorAction: Story = {
  args: {
    as: 'button',
    children: 'Body5 / 12px / 400 / 1.3 / 가나다라마바사',
    variant: 'body5',
  },
};

export const ProductTitle: Story = {
  args: {
    as: 'h1',
    children: typographyLabel(typographyStorySpecs.heading7),
    variant: 'heading7',
    mo: 'heading4',
  },
};

export const ProductPrice: Story = {
  args: {
    as: 'p',
    children: 'Body3 / 16px / 400 / 1.3 / 가나다라마바사',
    variant: 'body3',
  },
};

export const Meta: Story = {
  args: { children: 'Body5 / 12px / 400 / 1.3 / 가나다라마바사', variant: 'body5' },
};

export const Price: Story = {
  args: { children: typographyLabel(typographyStorySpecs.body), variant: 'body3', mo: 'body4' },
};

export const PriceEmphasis: Story = {
  args: { children: '원', variant: 'body3', weight: 'bold' },
};

export const Action: Story = {
  args: {
    children: 'Body3 / Body4 / Semibold / 가나다라마바사',
    variant: 'body3',
    mo: 'body4',
    weight: 'semibold',
  },
};

export const FilterLegend: Story = {
  args: {
    children: typographyLabel(typographyStorySpecs.body),
    variant: 'body3',
    weight: 'semibold',
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
  args: {
    as: 'h1',
    web: 'body2',
    mo: 'body3',
    weight: 'bold',
    children: 'Choose your shipping country',
  },
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
  args: {
    as: 'h1',
    web: 'body2',
    mo: 'body3',
    weight: 'bold',
    children: 'Choose your shipping country',
  },
  render: (args) => (
    <PlatformProvider platform="mobile">
      <div className="platform-mobile">
        <Typography {...args} />
      </div>
    </PlatformProvider>
  ),
};

export const InheritedTone: Story = {
  args: {
    as: 'p',
    variant: 'body3',
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
  args: { as: 'h2', variant: 'heading8', children: 'Featured' },
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
