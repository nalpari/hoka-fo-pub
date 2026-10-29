import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { css } from 'styled-system/css';

import { Button, ButtonLink } from '@/components/common/atoms/Button';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

const meta = {
  title: 'Molecules/ContentHeader',
  component: ContentHeader,
  args: {
    title: '쿠폰 등록',
    titleAs: 'h1',
    titleProps: { web: 'heading8', mo: 'heading5', id: 'coupon-heading' },
    description: '발급받은 쿠폰의 일련번호를 입력해 주세요.',
    descriptionProps: { variant: 'body3', tone: 'subtle' },
    gap: '4',
  },
} satisfies Meta<typeof ContentHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveAttribute('id', 'coupon-heading');
    await expect(canvas.getByText('발급받은 쿠폰의 일련번호를 입력해 주세요.')).toBeVisible();
  },
};

export const TitleOnly: Story = {
  args: { description: undefined },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('p')).toBeNull();
  },
};

export const Eyebrow: Story = {
  args: {
    eyebrow: 'JOIN HOKA',
    eyebrowProps: { variant: 'body5', tone: 'tertiary', weight: 'medium' },
    title: '회원가입',
    description: undefined,
    gap: '2',
  },
};

export const NestedHeading: Story = {
  args: {
    title: 'A/S 처리 절차',
    titleAs: 'h4',
    titleProps: { variant: 'heading9' },
    description: '온라인 신청 후 접수 안내에 따라 상품을 발송해 주세요.',
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('heading', { level: 4 })).toBeVisible();
  },
};

export const Horizontal: Story = {
  args: {
    title: '주문 배송 내역',
    titleAs: 'h2',
    titleProps: { web: 'heading8', mo: 'heading5' },
    description: undefined,
    orientation: 'horizontal',
    gap: '2',
    action: (
      <ButtonLink href="/mypage/orders" size="md" variant="link">
        전체 보기
      </ButtonLink>
    ),
  },
};

export const HorizontalWithDescription: Story = {
  args: {
    ...Horizontal.args,
    description: '최근 주문한 상품의 배송 상태를 확인하세요.',
    gap: '4',
  },
};

export const HorizontalWithoutAction: Story = {
  args: { ...Horizontal.args, action: undefined },
};

const sectionHeadingArgs = {
  titleAs: undefined,
  description: undefined,
  descriptionProps: undefined,
  as: 'header',
  title: '회원 혜택',
  titleProps: { variant: 'body3', className: css({ m: '0' }) },
  orientation: 'horizontal',
  alignItems: 'end',
  gap: '4',
  textGroupProps: { css: css.raw({ display: 'block' }) },
} satisfies NonNullable<Story['args']>;

export const SectionHeadingDefault: Story = {
  args: { ...sectionHeadingArgs },
};

export const SectionHeadingWithContent: Story = {
  args: {
    ...sectionHeadingArgs,
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
