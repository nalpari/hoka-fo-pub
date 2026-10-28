import { type Meta, type StoryObj } from '@storybook/react';

import { Box } from 'styled-system/jsx';

import { getProductDetailPresentation } from '@/components/product/productDetailPresentation';
import { PlatformProvider } from '@/context/platform';
import { products } from '@/mocks/products';
import { ProductTechSpecs } from '@/stories/route-previews/products-idPreview';

const presentation = getProductDetailPresentation(products[0]);

const meta = {
  title: 'FEATURES/Product/Tech Specs',
  component: ProductTechSpecs,
  args: {
    specifications: presentation.specifications,
    attributes: presentation.attributes,
    scales: presentation.scales,
  },
  decorators: [
    (Story) => (
      <PlatformProvider platform="web">
        <Box style={{ maxWidth: '1016px' }} p="8">
          <Story />
        </Box>
      </PlatformProvider>
    ),
  ],
} satisfies Meta<typeof ProductTechSpecs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleWeight: Story = { name: '단일 무게' };

export const MensAndWomensWeight: Story = {
  name: '남성·여성 무게',
  parameters: { docs: { description: { story: '첨부 시안의 남성 312g·여성 280g 표기 예시.' } } },
  args: {
    specifications: presentation.specifications.map((item) =>
      item.label === '무게' ? { ...item, value: ['남성 312g', '여성 280g'] } : item,
    ),
  },
};
