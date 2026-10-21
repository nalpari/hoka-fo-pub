import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { PlatformProvider } from '@/shared/context/platform';

const meta = {
  title: 'Atoms/Typography/Choice Labels',
  args: { platform: 'web' as 'web' | 'mobile' },
  render: ({ platform }) => (
    <PlatformProvider platform={platform}>
      <Stack
        className={platform === 'mobile' ? 'platform-mobile' : undefined}
        gap="4"
        alignItems="start"
      >
        <Typography as="button" type="button" variant="choiceLabel">
          레귤러
        </Typography>
        <Typography as="button" type="button" variant="unitLabel">
          CM
        </Typography>
      </Stack>
    </PlatformProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const [label, size] of [
      ['레귤러', '14px'],
      ['CM', '12px'],
    ]) {
      const button = canvas.getByRole('button', { name: label });
      const style = canvasElement.ownerDocument.defaultView!.getComputedStyle(button);
      await expect(style.fontSize).toBe(size);
      await expect(style.fontWeight).toBe('400');
      await expect(style.lineHeight).toBe('normal');
    }
  },
} satisfies Meta<{ platform: 'web' | 'mobile' }>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};

export const Mobile: Story = { args: { platform: 'mobile' } };
