import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';

const meta = {
  title: 'Layouts/Content Layout',
  component: ContentLayout,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof ContentLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIntro: Story = {
  args: {
    breadcrumbItems: [{ label: 'HOME', href: '/' }, { label: '상품' }],
    title: '상품 목록',
    description: '조건에 맞는 상품을 찾아보세요.',
    children: <section style={{ minHeight: 180, paddingTop: 24 }}>페이지 콘텐츠</section>,
  },
};

export const ContentOnly: Story = {
  args: { children: <section style={{ minHeight: 180 }}>페이지 콘텐츠</section> },
};
