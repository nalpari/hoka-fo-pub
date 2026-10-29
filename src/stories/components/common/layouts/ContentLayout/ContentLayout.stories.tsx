import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/common/atoms/Button';

import { ContentLayout } from '@/components/common/layouts/ContentLayout';

const meta = {
  title: 'Layouts/Content Layout',
  component: ContentLayout,
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

const headerDefaults = { args: { children: null } } satisfies Meta<typeof ContentLayout>;

type HeaderStory = StoryObj<typeof headerDefaults>;

export const HeaderWithIntro: HeaderStory = {
  ...headerDefaults,
  args: {
    ...headerDefaults.args,
    breadcrumbItems: [{ label: 'HOME', href: '/' }, { label: '상품' }],
    title: '상품 목록',
    description: '조건에 맞는 상품을 찾아보세요.',
    eyebrow: 'CATALOG',
    headerAction: <Button size="short">필터 초기화</Button>,
  },
};

export const HeaderDescriptionOnly: HeaderStory = {
  ...headerDefaults,
  args: { ...headerDefaults.args, description: '선택한 테마의 상품과 이야기를 만나보세요.' },
};

export const HeaderEmpty: HeaderStory = { ...headerDefaults, args: { ...headerDefaults.args } };
