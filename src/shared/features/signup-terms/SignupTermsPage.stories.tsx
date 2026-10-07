import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/shared/context/platform';
import { MemoryRouter } from 'react-router-dom';
import { SignupTermsContent } from './SignupTermsContent';
import { SignupTermsPage } from './SignupTermsPage';

const meta = {
  title: 'Pages/AUTH/SignupTerms',
  component: SignupTermsContent,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
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
