import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/context/platform';

import { RunningSessionEntriesContent } from '@/app/mypage/event-entries/_components/RunningSessionEntriesContent';

const meta = {
  title: 'Integration/Design binding',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story, { parameters }) => {
      const platform = parameters.platform === 'mobile' ? 'mobile' : 'web';
      return (
        <PlatformProvider platform={platform}>
          <div className={`platform-${platform}`}>
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const EntryCancelRetry: Story = {
  name: '신청 취소 고정 확인',
  render: () => <RunningSessionEntriesContent preview="cancel" />,
};

export const MobileEntryCancelRetry: Story = {
  ...EntryCancelRetry,
  parameters: { platform: 'mobile' },
};
