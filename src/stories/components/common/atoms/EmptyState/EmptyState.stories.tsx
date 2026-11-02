import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/common/atoms/Button';
import { EmptyState } from '@/components/common/atoms/EmptyState';

const meta = {
  title: 'Atoms/Empty State',
  component: EmptyState,
  tags: ['autodocs'],
  args: { title: '표시할 내용이 없습니다.', description: '조건을 변경하거나 다시 시도해 주세요.' },
  parameters: {
    docs: {
      description: { component: '검색 결과나 목록이 비어 있을 때 사용하는 안내 상태입니다.' },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAction: Story = { args: { action: <Button>다시 시도</Button> } };

export const Minimal: Story = {
  args: { title: '등록된 문의글이 없습니다.', variant: 'minimal' },
};

export const PlainResponsive: Story = {
  args: {
    title: '표시할 상품이 없습니다.',
    description: undefined,
    variant: 'plain',
    role: 'status',
    titleProps: { as: 'p', web: 'body3', mo: 'body4', tone: 'subtle' },
    layoutProps: { py: '240px', _mobile: { py: '24', px: '4' } },
  },
};

export const PlainMultiline: Story = {
  args: {
    ...PlainResponsive.args,
    title: (
      <>
        표시할 배송지가 없습니다.
        <br />
        배송지를 추가해 주세요.
      </>
    ),
    layoutProps: {
      py: '120px',
      borderBottom: '1px solid var(--colors-black-20)',
      _mobile: { py: '24', borderBottom: '0' },
    },
  },
};

export const CenteredMessage: Story = {
  args: {
    title: '검색된 결과가 없습니다.',
    description: '검색어를 다시 확인해 주세요.',
    variant: 'plain',
    as: 'section',
    titleProps: { variant: 'body3', mo: 'body4', weight: 'regular', tone: 'subtle' },
    descriptionProps: { variant: 'body3', mo: 'body4', tone: 'subtle' },
    layoutProps: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0',
      minH: '200px',
    },
  },
};
