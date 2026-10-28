import type { Meta, StoryObj } from '@storybook/react';

import { css } from 'styled-system/css';

import { Button } from '@/components/common/atoms/Button/Button';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

const meta = {
  title: 'Molecules/ContentHeader/Section heading',
  component: ContentHeader,
  tags: ['autodocs'],
  args: {
    as: 'header',
    title: '회원 혜택',
    titleProps: { variant: 'body3', className: css({ m: '0' }) },
    orientation: 'horizontal',
    alignItems: 'end',
    gap: '4',
    textGroupProps: { css: css.raw({ display: 'block' }) },
  },
} satisfies Meta<typeof ContentHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContent: Story = {
  args: {
    eyebrow: 'MEMBERSHIP',
    eyebrowAs: 'small',
    eyebrowProps: {
      className: css({ display: 'block', color: 'var(--hoka-brand)', letterSpacing: 'mono' }),
    },
    description: '이번 달 이용 가능한 혜택입니다.',
    descriptionProps: {
      variant: 'body5',
      tone: 'subtle',
      className: css({ m: '8px 0 0' }),
    },
    action: (
      <div>
        <Button size="short">전체 보기</Button>
      </div>
    ),
    pb: '4',
    borderBottom: '2px solid var(--color-black-100)',
    titleProps: { variant: 'heading7', className: css({ m: '0' }) },
  },
};
