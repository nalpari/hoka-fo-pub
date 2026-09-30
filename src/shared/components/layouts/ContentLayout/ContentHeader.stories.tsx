import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '@/shared/components/atoms/Button/Button';
import { ContentHeader } from '@/shared/components/layouts/ContentLayout/ContentHeader';

const meta = {
  title: 'Layouts/Content Header',
  component: ContentHeader,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ContentHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithIntro: Story = {
  args: {
    breadcrumbItems: [{ label: 'HOME', href: '/' }, { label: '상품' }],
    title: '상품 목록',
    description: '조건에 맞는 상품을 찾아보세요.',
    eyebrow: 'CATALOG',
    headerAction: <Button size="sm">필터 초기화</Button>,
  },
};

export const DescriptionOnly: Story = {
  args: { description: '선택한 테마의 상품과 이야기를 만나보세요.' },
};

export const Empty: Story = {};
