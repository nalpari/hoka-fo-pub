import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { PlatformProvider } from '@/context/platform';
import {
  RunningSessionDataContext,
  type RunningSessionEntry,
} from '@/context/RunningSessionDataContext';

import { Button } from '@/components/common/atoms/Button';

import EntryPage from '@/app/mypage/event-entries/page';
import { runningSessionSessions } from '@/components/running-session/runningSession.data';

const meta = {
  title: 'Integration/Design binding',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story, { parameters }) => (
      <PlatformProvider platform={parameters.platform === 'mobile' ? 'mobile' : 'web'}>
        <div className={parameters.platform === 'mobile' ? 'platform-mobile' : 'platform-web'}>
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const cancel = fn<(id: string) => void>();

/** 신청 응답과 취소 실패 후 재시도를 재현합니다. (Exercises entry response and cancellation failure/retry.) */
function EntryFixture() {
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState<readonly RunningSessionEntry[]>([
    { id: 'server-entry-781', session: runningSessionSessions[0], status: '신청완료' },
  ]);
  const [attempt, setAttempt] = useState(0);
  return (
    <>
      <Button onClick={() => setLoaded(true)}>신청내역 응답 도착</Button>
      <RunningSessionDataContext.Provider
        value={{
          entries: {
            items: loaded ? items : [],
            totalCount: loaded ? 1 : 0,
            hasMore: false,
            pending: !loaded,
            onQueryChange: () => {},
            onLoadMore: () => {},
          },
          cancelEntry: async (id) => {
            cancel(id);
            setAttempt((n) => n + 1);
            await new Promise((resolve) => setTimeout(resolve, 250));
            if (attempt === 0) throw new Error('신청 취소에 실패했습니다.');
            setItems((previous) =>
              previous.map((item) => (item.id === id ? { ...item, status: '취소' } : item)),
            );
          },
        }}
      >
        <EntryPage />
      </RunningSessionDataContext.Provider>
    </>
  );
}

export const EntryCancelRetry: Story = {
  beforeEach: () => {
    cancel.mockClear();
  },
  render: () => <EntryFixture />,
  play: async ({ canvasElement }) => {
    canvasElement.removeAttribute('data-design-play-result');
    const canvas = within(canvasElement),
      body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', { name: '신청내역 응답 도착' }));
    await userEvent.click(canvas.getByRole('button', { name: '신청 취소' }));
    const dialog = within(body.getByRole('dialog', { name: '신청 취소' }));
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await expect(dialog.getByRole('button', { name: '확인' })).toBeDisabled();
    await expect(await dialog.findByRole('alert')).toHaveTextContent('신청 취소에 실패했습니다.');
    await userEvent.click(dialog.getByRole('button', { name: '확인' }));
    await waitFor(() =>
      expect(body.queryByRole('dialog', { name: '신청 취소' })).not.toBeInTheDocument(),
    );
    await expect(cancel).toHaveBeenLastCalledWith('server-entry-781');
    await expect(canvas.queryByRole('button', { name: '신청 취소' })).not.toBeInTheDocument();
    canvasElement.setAttribute('data-design-play-result', 'passed');
  },
};

export const MobileEntryCancelRetry: Story = {
  ...EntryCancelRetry,
  parameters: { platform: 'mobile' },
};
