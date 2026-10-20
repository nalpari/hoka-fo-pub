import type { Meta, StoryObj } from '@storybook/react';
import { PlatformProvider } from '@/shared/context/platform';
import { SignupLayout } from '@/shared/features/signup/SignupLayout';
import { SignupTermsStep } from '@/shared/Mockup/signup/SignupTermsStep';
import { SignupDetailsStep } from '@/shared/Mockup/signup/SignupDetailsStep';
import { SignupCompleteStep } from '@/shared/Mockup/signup/SignupCompleteStep';

function TermsMockup() {
  return (
    <SignupLayout step={1} method="kakao">
      <SignupTermsStep
        method={{ label: '카카오로 가입' }}
        serviceTerms={false}
        privacyTerms={false}
        ageTerms={false}
        message=""
        onToggleAll={() => {}}
        onServiceTermsChange={() => {}}
        onPrivacyTermsChange={() => {}}
        onAgeTermsChange={() => {}}
        onContinue={() => {}}
      />
    </SignupLayout>
  );
}

function DetailsMockup() {
  return (
    <SignupLayout step={2} method="kakao">
      <SignupDetailsStep
        method="kakao"
        methodOption={{ label: '카카오로 가입' }}
        name=""
        email=""
        id=""
        password=""
        message=""
        onNameChange={() => {}}
        onEmailChange={() => {}}
        onIdChange={() => {}}
        onPasswordChange={() => {}}
        onSubmit={(event) => event.preventDefault()}
      />
    </SignupLayout>
  );
}

function CompleteMockup() {
  return (
    <SignupLayout step={3} method="kakao">
      <SignupCompleteStep name="박박" />
    </SignupLayout>
  );
}

const meta = {
  title: 'Mockup/Signup',
  decorators: [
    (Story, context) => {
      const platform = context.parameters.platform === 'mobile' ? 'mobile' : 'web';

      return (
        <PlatformProvider platform={platform}>
          <div className={`platform-${platform}`}>
            <Story />
          </div>
        </PlatformProvider>
      );
    },
  ],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Terms: Story = { render: () => <TermsMockup /> };

export const Details: Story = { render: () => <DetailsMockup /> };

export const Complete: Story = { render: () => <CompleteMockup /> };

export const MobileTerms: Story = {
  ...Terms,
  parameters: { layout: 'fullscreen', platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const MobileDetails: Story = {
  ...Details,
  parameters: { layout: 'fullscreen', platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};

export const MobileComplete: Story = {
  ...Complete,
  parameters: { layout: 'fullscreen', platform: 'mobile' },
  globals: { viewport: 'hoka375' },
};
