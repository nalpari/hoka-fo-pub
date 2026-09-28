import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/shared/components/atoms/Button/Button';
import { SectionHeader } from '@/shared/components/atoms/SectionHeader/SectionHeader';

const meta = {
  title: 'Atoms/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
  args: { title: '회원 혜택' },
} satisfies Meta<typeof SectionHeader>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const WithContent: Story = {
  args: {
    eyebrow: 'MEMBERSHIP',
    description: '이번 달 이용 가능한 혜택입니다.',
    action: <Button size="sm">전체 보기</Button>,
    divider: 'strong',
    titleSize: 'lg',
  },
};
