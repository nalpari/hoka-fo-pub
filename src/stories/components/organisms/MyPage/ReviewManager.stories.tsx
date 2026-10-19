import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { ReviewManager } from '@/shared/components/organisms/MyPage/ReviewManager';
import { PlatformProvider } from '@/shared/context/platform';

const meta = { title: 'Organisms/MyPage/ReviewManager', component: ReviewManager } satisfies Meta<
  typeof ReviewManager
>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WriteReview: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByRole('button', { name: '리뷰 작성' })[0]);
    await userEvent.click(canvas.getByRole('button', { name: '확인' }));
    await expect(canvas.getByText('별점을 선택해 주세요.')).toBeVisible();
    await expect(canvas.getByText('리뷰 내용을 입력해 주세요.')).toBeVisible();
    await userEvent.click(canvas.getByRole('radio', { name: '4점' }));
    await userEvent.type(canvas.getByRole('textbox', { name: '리뷰내용' }), '편안한 착용감입니다.');
    await userEvent.click(canvas.getByRole('button', { name: '확인' }));
    await expect(canvas.queryByRole('region', { name: '리뷰 작성' })).not.toBeInTheDocument();
  },
};

export const MobileWriteReview: Story = {
  ...WriteReview,
  globals: { viewport: 'hoka375' },
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile">
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
};
