import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/context/platform';

import { Box } from 'styled-system/jsx';

import { ProductThumbnail } from '@/components/common/molecules/ProductThumbnail';

const meta = {
  title: 'Molecules/ProductThumbnail',
  component: ProductThumbnail,
  args: { alt: '상품 이미지', src: '/images/products/clifton-11-gtx/gallery-1.png' },
  decorators: [
    (Story) => (
      <Box w="96px" h="96px" _mobile={{ w: '64px', h: '64px' }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof ProductThumbnail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Summary: Story = {
  args: {
    variant: 'summary',
    sizes: '96px',
    imageProps: { width: 96, height: 96, loading: 'lazy' },
  },
};

export const MobileSummary: Story = {
  ...Summary,
  args: { ...Summary.args, sizes: '64px' },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <Box className="platform-mobile">
          <Story />
        </Box>
      </PlatformProvider>
    ),
  ],
};
