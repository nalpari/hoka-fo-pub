import { assertAccountFormLayout } from '@/stories/utils/assertAccountFormLayout';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { PlatformProvider } from '@/shared/context/platform';
import { SignupTermsContent } from '@/shared/features/signup-terms/SignupTermsContent';
import { SignupTermsPage } from '@/shared/features/signup-terms/SignupTermsPage';

const meta = {
  title: 'Pages/Signup/Terms',
  component: SignupTermsContent,
  args: {
    agreements: [false, false, false, false],
    detail: null,
    previous: false,
    previousPickerOpen: false,
    notice: '',
    onAllChange: () => {},
    onChange: () => {},
    onDetail: () => {},
    onPrevious: () => {},
    onPreviousPickerClose: () => {},
    onPreviousVersionSelect: () => {},
    onCancel: () => {},
    onNext: () => {},
  },
} satisfies Meta<typeof SignupTermsContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => assertAccountFormLayout(canvasElement, 500, 32),
};

export const Mobile: Story = {
  parameters: { layout: 'fullscreen' },
  play: Default.play,
  decorators: [
    (Story) => (
      <PlatformProvider platform="mobile">
        <div className="platform-mobile" style={{ maxWidth: '100%', width: 375 }}>
          <Story />
        </div>
      </PlatformProvider>
    ),
  ],
};

export const RequiredNotice: Story = { args: { notice: '필수 약관에 모두 동의해 주세요.' } };

export const Detail: Story = { args: { detail: 0 } };

export const PreviousPicker: Story = {
  args: { detail: 0, previousPickerOpen: true },
};

export const Interactive: Story = { render: () => <SignupTermsPage /> };

export const MobileDetail: Story = {
  parameters: { layout: 'fullscreen' },
  ...Mobile,
  args: { detail: 0 },
};

export const MobilePreviousPicker: Story = {
  parameters: { layout: 'fullscreen' },
  ...Mobile,
  args: { detail: 0, previousPickerOpen: true },
  globals: { viewport: 'hoka375' },
};

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
    const picker = await body.findByRole('dialog', { name: '이전 약관 보기' });
    await userEvent.click(await within(picker).findByRole('radio', { name: '2025-07-01' }));
    await userEvent.click(within(picker).getByRole('button', { name: '확인' }));
    await expect(await body.findByText('이전 약관은 등록 준비 중입니다.')).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: '약관 닫기' }));
    await expect(dialog).not.toBeVisible();
  },
};

export const MobileDetailInteraction: Story = {
  parameters: { layout: 'fullscreen' },
  ...Mobile,
  render: DetailInteraction.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: '필수 HOKA Korea 이용약관 동의 자세히 보기' }),
    );
    const body = within(canvasElement.ownerDocument.body);
    const dialog = await body.findByRole('dialog');
    await expect(dialog).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: '이전 약관 보기' }));
    await userEvent.click(await body.findByRole('button', { name: '2022-03-16 이전 약관 선택' }));
    await expect(await body.findByText('이전 약관은 등록 준비 중입니다.')).toBeVisible();
    await userEvent.click(body.getByRole('button', { name: '약관 닫기' }));
    await expect(dialog).not.toBeVisible();
  },
  globals: { viewport: 'hoka375' },
};
