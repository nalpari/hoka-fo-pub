import type { Meta as StorybookMeta, StoryObj } from '@storybook/react';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const meta = {
  title: 'Atoms/Typography',
  component: Typography,
  args: { children: 'HOKA Typography', variant: 'heading' },
} satisfies StorybookMeta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Display: Story = { args: { as: 'h1', children: 'Display', variant: 'display' } };

export const Heading: Story = { args: { as: 'h2', variant: 'heading' } };

export const SectionHeading: Story = {
  args: { as: 'h3', children: 'Section heading', variant: 'sectionHeading' },
};

export const CardTitle: Story = {
  args: { as: 'h4', children: 'Card title', variant: 'cardTitle' },
};

export const Body: Story = { args: { children: 'Body text', variant: 'body' } };

export const InverseBody: Story = {
  args: { children: 'Inverse body text', tone: 'inverse', variant: 'body' },
  decorators: [
    (Story) => (
      <div style={{ background: '#000', padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export const FormLabel: Story = {
  args: { as: 'span', children: '상품 옵션', variant: 'formLabel' },
};

export const ProductAudience: Story = {
  args: { as: 'span', children: "Women's", variant: 'productAudience' },
};

export const Meta: Story = { args: { children: 'Meta text', variant: 'meta' } };

export const Price: Story = { args: { children: '$120', variant: 'price' } };

export const PriceEmphasis: Story = {
  args: { children: '$120', variant: 'priceEmphasis' },
};

export const Action: Story = { args: { children: 'Shop now', variant: 'action' } };

export const FilterLegend: Story = {
  args: { children: 'Filter by', variant: 'filterLegend' },
};

export const BottomSheetTitle: Story = {
  args: { children: 'Sort products', variant: 'bottomSheetTitle' },
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
