import type { Meta as StorybookMeta, StoryObj } from '@storybook/react';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

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
      <Typography variant="bodyKr3">프리텐다드 한글 본문 3</Typography>
      <Typography variant="mono4">Mono label</Typography>
      <Typography as="a" href="#type-scale" variant="textLink2">
        Text Link 2
      </Typography>
    </div>
  ),
};
