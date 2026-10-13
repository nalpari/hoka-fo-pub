import type { Meta, StoryObj } from '@storybook/react';
import { InquiryBoard } from './InquiryBoard';

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

export const Empty: Story = { args: { items: [] } };

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
