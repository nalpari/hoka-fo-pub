import type { Meta, StoryObj } from '@storybook/react';
import { ContactCard } from '@/shared/components/molecules/ContactCard/ContactCard';

const meta = {
  title: 'Molecules/ContactCard',
  component: ContactCard,
  tags: ['autodocs'],
  args: {
    title: '호카 고객상담실',
    description: 'A/S 및 오프라인 매장 관련 문의',
    details: [
      { term: '전화', description: '080-999-0456' },
      { term: '운영시간', description: '평일 09:00 ~ 18:00' },
    ],
    notice: '토, 일, 공휴일은 휴무입니다.',
  },
} satisfies Meta<typeof ContactCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
