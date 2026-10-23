import type { Meta, StoryObj } from '@storybook/react';
import { InquiryBoard } from '@/shared/components/organisms/InquiryBoard/InquiryBoard';
import { productInquiries } from '@/shared/features/product/productInquiries';
import { ProductInquiryLink } from '@/shared/features/product/ProductInquiryLink';
import { PlatformProvider } from '@/shared/context/platform';

const meta = {
  title: 'Organisms/InquiryBoard',
  component: InquiryBoard,
  tags: ['autodocs'],
  args: {
    title: '상품문의',
    items: [
      {
        id: 'private',
        author: 'lej****',
        date: '2026-10-12',
        status: 'answered',
        visibility: 'restricted',
      },
      {
        id: 'public',
        author: 'cod*****',
        date: '2026-10-07',
        status: 'pending',
        visibility: 'public',
        title: '정사이즈로 주문하면 될까요?',
        content: '평소 250 사이즈를 착용합니다.',
      },
    ],
    defaultExpandedIds: ['private'],
  },
} satisfies Meta<typeof InquiryBoard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  globals: { viewport: 'hoka375' },
  render: (args) => (
    <PlatformProvider platform="mobile">
      <div className="platform-mobile">
        <InquiryBoard {...args} />
      </div>
    </PlatformProvider>
  ),
};

export const Empty: Story = { args: { items: [] } };

export const Product: Story = {
  args: {
    variant: 'product',
    items: productInquiries,
    pageSize: 5,
    loadMoreSize: 16,
    defaultExpandedIds: [],
    action: <ProductInquiryLink />,
  },
};

export const ProductExpanded: Story = {
  args: { ...Product.args, defaultExpandedIds: ['product-inquiry-2', 'product-inquiry-4'] },
};

export const ProductEmpty: Story = { args: { ...Product.args, items: [] } };

export const ProductRestrictedOnly: Story = {
  args: {
    ...Product.args,
    items: productInquiries.filter((item) => item.visibility === 'restricted'),
  },
};

export const MyInquiries: Story = {
  args: {
    title: '나의 상품문의',
    items: [
      {
        id: 'mine',
        author: 'lej****',
        date: '2026-10-12',
        status: 'answered',
        visibility: 'private',
        title: '배송 일정 문의',
        content: '언제 출고되나요?',
        answer: '영업일 기준 3일 이내에 출고됩니다.',
      },
    ],
    defaultExpandedIds: ['mine'],
  },
};
