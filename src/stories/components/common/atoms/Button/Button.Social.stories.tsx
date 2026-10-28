import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Button } from '@/components/common/atoms/Button';

const meta = {
  title: 'Atoms/Button/Social',
  component: Button,
  tags: ['autodocs'],
  args: { social: { provider: 'kakao' }, children: '카카오 로그인', onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const KakaoLogin: Story = {
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button).not.toHaveAttribute('social');
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const NaverLogin: Story = {
  args: { social: { provider: 'naver' }, children: '네이버 로그인' },
};

export const KakaoSignup: Story = {
  args: {
    social: { provider: 'kakao', appearance: 'signup' },
    size: 'tall',
    children: '카카오 계정으로 신규가입',
  },
};

export const NaverSignup: Story = {
  args: {
    social: { provider: 'naver', appearance: 'signup' },
    size: 'tall',
    children: '네이버 계정으로 신규가입',
  },
};

export const Disabled: Story = { args: { disabled: true } };

export const Loading: Story = {
  args: { loading: true },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button');
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-busy', 'true');
  },
};
