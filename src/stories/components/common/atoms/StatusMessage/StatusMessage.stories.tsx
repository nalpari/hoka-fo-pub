import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { StatusMessage } from '@/components/common/atoms/StatusMessage/StatusMessage';

const meta = {
  title: 'Atoms/StatusMessage',
  component: StatusMessage,
  args: { children: '요청이 완료되었습니다.' },
  play: async ({ canvasElement, args }) => {
    const tone = args.tone ?? 'info';
    const message = within(canvasElement).getByRole(tone === 'error' ? 'alert' : 'status');
    const colors = {
      error: 'rgb(166, 0, 0)',
      success: 'rgb(22, 121, 75)',
      info: 'rgb(77, 77, 77)',
    };
    await expect(message).toHaveAttribute('data-tone', tone);
    await expect(message).toHaveStyle({ color: colors[tone] });
    await expect(message).toHaveAttribute('aria-live', tone === 'error' ? 'assertive' : 'polite');
  },
} satisfies Meta<typeof StatusMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = { args: { tone: 'success' } };

export const Error: Story = { args: { children: '입력한 값을 확인해 주세요.', tone: 'error' } };
