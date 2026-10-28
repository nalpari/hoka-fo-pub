import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { SocialAuthButton } from '@/components/common/molecules/SocialAuthButton/SocialAuthButton';

const meta = {
  title: 'Molecules/SocialAuthButton',
  component: SocialAuthButton,
  tags: ['autodocs'],
  args: { provider: 'kakao', children: '카카오 로그인', onClick: fn() },
} satisfies Meta<typeof SocialAuthButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const KakaoLogin: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole('button'));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const NaverLogin: Story = { args: { provider: 'naver', children: '네이버 로그인' } };

export const KakaoSignup: Story = {
  args: { appearance: 'signup', size: 'tall', children: '카카오 계정으로 신규가입' },
};

export const NaverSignup: Story = {
  args: {
    appearance: 'signup',
    provider: 'naver',
    size: 'tall',
    children: '네이버 계정으로 신규가입',
  },
};

export const Disabled: Story = { args: { disabled: true } };
