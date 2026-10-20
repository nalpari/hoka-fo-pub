import type { Meta, StoryObj } from '@storybook/react';
import { products } from '@/mocks/products';
import { ProductCardPreview } from '@/shared/components/molecules/ProductCard/ProductCardPreview';
import { PlatformProvider } from '@/shared/context/platform';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';

const meta = {
  title: 'Molecules/Product Card',
  component: ProductCard,
  decorators: [
    (Story) => (
      <>
        <div style={{ maxWidth: 280 }}>
          <Story />
        </div>
      </>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      id: 'shoe-25',
      name: 'HOKA Clifton Ultra Long Distance Everyday Running All Weather Limited Edition Special Collection',

      colorThumbnails: [
        {
          id: 'red',
          label: 'red',
          image: '/images/products/bondi-9/lrmt.png',

          galleryImages: [
            '/images/products/bondi-9/lrmt.png',
            '/images/products/bondi-9/lrmt-2.png',
            '/images/products/bondi-9/lrmt-3.png',
            '/images/products/bondi-9/lrmt-4.png',
            '/images/products/bondi-9/lrmt-5.png',
          ],
        },
        {
          id: 'blue',
          label: 'blue',
          image: '/images/products/bondi-9/bwht.png',

          galleryImages: [
            '/images/products/bondi-9/bwht.png',
            '/images/products/bondi-9/bwht-2.png',
            '/images/products/bondi-9/bwht-3.png',
            '/images/products/bondi-9/bwht-4.png',
            '/images/products/bondi-9/bwht-5.png',
          ],
        },
        {
          id: 'green',
          label: 'green',
          image: '/images/products/bondi-9/vch.png',

          galleryImages: [
            '/images/products/bondi-9/vch.png',
            '/images/products/bondi-9/vch-2.png',
            '/images/products/bondi-9/vch-3.png',
            '/images/products/bondi-9/vch-4.png',
            '/images/products/bondi-9/vch-5.png',
          ],
        },
        {
          id: 'orange',
          label: 'orange',
          image: '/images/products/bondi-9/ftcl.png',

          galleryImages: [
            '/images/products/bondi-9/ftcl.png',
            '/images/products/bondi-9/ftcl-2.png',
            '/images/products/bondi-9/ftcl-3.png',
            '/images/products/bondi-9/ftcl-4.png',
            '/images/products/bondi-9/ftcl-5.png',
          ],
        },
        {
          id: 'gray',
          label: 'gray',
          image: '/images/products/bondi-9/snnr.png',

          galleryImages: [
            '/images/products/bondi-9/snnr.png',
            '/images/products/bondi-9/snnr-2.png',
            '/images/products/bondi-9/snnr-3.png',
            '/images/products/bondi-9/snnr-4.png',
            '/images/products/bondi-9/snnr-5.png',
          ],
        },
        {
          id: 'black',
          label: 'black',
          image: '/images/products/bondi-9/mllw.png',

          galleryImages: [
            '/images/products/bondi-9/mllw.png',
            '/images/products/bondi-9/mllw-2.png',
            '/images/products/bondi-9/mllw-3.png',
            '/images/products/bondi-9/mllw-4.png',
            '/images/products/bondi-9/mllw-5.png',
          ],
        },
        {
          id: 'white',
          label: 'white',
          image: '/images/products/bondi-9/lrmt.png',

          galleryImages: [
            '/images/products/bondi-9/lrmt.png',
            '/images/products/bondi-9/lrmt-2.png',
            '/images/products/bondi-9/lrmt-3.png',
            '/images/products/bondi-9/lrmt-4.png',
            '/images/products/bondi-9/lrmt-5.png',
          ],
        },
        {
          id: 'pink',
          label: 'pink',
          image: '/images/products/bondi-9/bwht.png',

          galleryImages: [
            '/images/products/bondi-9/bwht.png',
            '/images/products/bondi-9/bwht-2.png',
            '/images/products/bondi-9/bwht-3.png',
            '/images/products/bondi-9/bwht-4.png',
            '/images/products/bondi-9/bwht-5.png',
          ],
        },
        {
          id: 'brown',
          label: 'brown',
          image: '/images/products/bondi-9/vch.png',

          galleryImages: [
            '/images/products/bondi-9/vch.png',
            '/images/products/bondi-9/vch-2.png',
            '/images/products/bondi-9/vch-3.png',
            '/images/products/bondi-9/vch-4.png',
            '/images/products/bondi-9/vch-5.png',
          ],
        },
        {
          id: 'yellow',
          label: 'yellow',
          image: '/images/products/bondi-9/ftcl.png',

          galleryImages: [
            '/images/products/bondi-9/ftcl.png',
            '/images/products/bondi-9/ftcl-2.png',
            '/images/products/bondi-9/ftcl-3.png',
            '/images/products/bondi-9/ftcl-4.png',
            '/images/products/bondi-9/ftcl-5.png',
          ],
        },
        {
          id: 'purple',
          label: 'purple',
          image: '/images/products/bondi-9/snnr.png',

          galleryImages: [
            '/images/products/bondi-9/snnr.png',
            '/images/products/bondi-9/snnr-2.png',
            '/images/products/bondi-9/snnr-3.png',
            '/images/products/bondi-9/snnr-4.png',
            '/images/products/bondi-9/snnr-5.png',
          ],
        },
        {
          id: 'cream',
          label: 'cream',
          image: '/images/products/bondi-9/mllw.png',

          galleryImages: [
            '/images/products/bondi-9/mllw.png',
            '/images/products/bondi-9/mllw-2.png',
            '/images/products/bondi-9/mllw-3.png',
            '/images/products/bondi-9/mllw-4.png',
            '/images/products/bondi-9/mllw-5.png',
          ],
        },
      ],

      category: '러닝',
      gender: "Women's",
      price: 144000,

      colors: [
        'red',
        'blue',
        'green',
        'orange',
        'gray',
        'black',
        'white',
        'pink',
        'brown',
        'yellow',
        'purple',
        'cream',
      ],

      sizes: ['230', '240', '250', '260', '270', '280'],
      soldOut: [],
      rating: 4.3,
      reviewCount: 19,

      colorOptions: [
        {
          color: 'red',

          widths: [
            {
              label: 'Regular',
              sizes: ['230', '240', '250', '260', '270', '280'],
              soldOut: [],
            },
          ],
        },
        {
          color: 'blue',

          widths: [
            {
              label: 'Regular',
              sizes: ['230', '240', '250', '260', '270', '280'],
              soldOut: [],
            },
          ],
        },
        {
          color: 'green',

          widths: [
            {
              label: 'Regular',
              sizes: ['230', '240', '250', '260', '270', '280'],
              soldOut: [],
            },
          ],
        },
        {
          color: 'orange',

          widths: [
            {
              label: 'Regular',
              sizes: ['230', '240', '250', '260', '270', '280'],
              soldOut: [],
            },
          ],
        },
        {
          color: 'gray',

          widths: [
            {
              label: 'Regular',
              sizes: ['230', '240', '250', '260', '270', '280'],
              soldOut: [],
            },
          ],
        },
        {
          color: 'black',

          widths: [
            {
              label: 'Regular',
              sizes: ['230', '240', '250', '260', '270', '280'],
              soldOut: [],
            },
          ],
        },
        {
          color: 'white',

          widths: [
            {
              label: 'Regular',
              sizes: ['230', '240', '250', '260', '270', '280'],
              soldOut: [],
            },
          ],
        },
        {
          color: 'pink',

          widths: [
            {
              label: 'Regular',
              sizes: ['230', '240', '250', '260', '270', '280'],
              soldOut: [],
            },
          ],
        },
        {
          color: 'brown',

          widths: [
            {
              label: 'Regular',
              sizes: ['230', '240', '250', '260', '270', '280'],
              soldOut: [],
            },
          ],
        },
        {
          color: 'yellow',

          widths: [
            {
              label: 'Regular',
              sizes: ['230', '240', '250', '260', '270', '280'],
              soldOut: [],
            },
          ],
        },
        {
          color: 'purple',

          widths: [
            {
              label: 'Regular',
              sizes: ['230', '240', '250', '260', '270', '280'],
              soldOut: [],
            },
          ],
        },
        {
          color: 'cream',

          widths: [
            {
              label: 'Regular',
              sizes: ['230', '240', '250', '260', '270', '280'],
              soldOut: [],
            },
          ],
        },
      ],

      promotion: 'New',
      launchStatus: 'IN_STOCK',
      cushioning: 'Plush',
      collection: '아라히',
      runningType: '레이스 데이',
      stability: 'Neutral',
      width: 'Regular',
      use: 'Trail Running',
      primaryImage:
        'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1787757160/1162011-SYSQ_1.png?bgcolor=F3F3F3',
      hoverImage:
        'https://dms.deckers.com/hoka/image/upload/f_auto/q_auto/dpr_auto/b_rgb:F7F7F9/w_800/v1787757160/1162011-SYSQ_4.png?bgcolor=F3F3F3',
    },
  },
};

export const ComingSoon: Story = { args: { product: products[0] } };

export const Discounted: Story = {
  args: { product: products.find((product) => product.id === 'shoe-3')! },
};

export const MultiplePromotions: Story = {
  args: {
    options: ['promotion'],
    product: { ...products[1], promotion: ['Best', 'Exclusive'] },
  },
};

export const HoverPreview: Story = {
  args: { product: products[0] },
  render: ({ product }) => (
    <div style={{ position: 'relative', minHeight: 850, margin: 16 }}>
      <ProductCardPreview product={product} />
    </div>
  ),
};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  args: { product: products[0] },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <Story />
      </PlatformProvider>
    ),
  ],
};
