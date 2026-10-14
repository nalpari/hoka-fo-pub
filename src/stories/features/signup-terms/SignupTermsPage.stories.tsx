import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/shared/context/platform';
import { SignupTermsContent } from '@/shared/features/signup-terms/SignupTermsContent';
import { SignupTermsPage } from '@/shared/features/signup-terms/SignupTermsPage';

const meta = {
  title: 'Pages/AUTH/SignupTerms',
  component: SignupTermsContent,
  args: {
    agreements: [false, false, false, false],
    detail: null,
    previous: false,
    notice: '',
    onAllChange: () => {},
    onChange: () => {},
    onDetail: () => {},
    onPrevious: () => {},
    onCancel: () => {},
    onNext: () => {},
  },
} satisfies Meta<typeof SignupTermsContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Mobile: Story = {
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile" style={{ width: 375 }}>
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
};

export const RequiredNotice: Story = { args: { notice: '필수 약관에 모두 동의해 주세요.' } };

export const Detail: Story = { args: { detail: 0 } };

export const Interactive: Story = { render: () => <SignupTermsPage /> };

export const MobileDetail: Story = { ...Mobile, args: { detail: 0 } };

export const DetailInteraction: Story = {
  render: () => <SignupTermsPage />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: '필수 HOKA Korea 이용약관 동의 자세히 보기' }),
    );
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole('dialog');
    await expect(dialog).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: '이전 약관 보기' }));
    await expect(body.getByText('이전 약관은 등록 준비 중입니다.')).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: '약관 닫기' }));
    await expect(dialog).not.toBeVisible();
  },
};

export const MobileDetailInteraction: Story = {
  ...Mobile,
  render: DetailInteraction.render,
  play: DetailInteraction.play,
  globals: { viewport: 'hoka375' },
};
