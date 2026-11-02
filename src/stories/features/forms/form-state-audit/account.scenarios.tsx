import { expect, userEvent, within } from 'storybook/test';

import { FindAccountStatePreview } from '@/app/login/find-account/_components/FindAccountStatePreview';
import { RegistrationStatePreview } from '@/app/signup/information/_components/RegistrationStatePreview';
import { SignupTermsStatePreview } from '@/app/signup/terms/_components/SignupTermsStatePreview';
import { PhoneVerificationStatePreview } from '@/components/phone-verification/PhoneVerificationStatePreview';

import type { AuditStory as Story } from './shared';
export const FindAccount: Story = {
  render: () => <FindAccountStatePreview state="error" />,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText(/이름/);
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(input, '테스트');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};
export const Phone: Story = {
  render: () => <PhoneVerificationStatePreview state="error" />,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByLabelText(/이름/);
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(input, '테스트');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};
export const PhoneExpired: Story = {
  render: () => <PhoneVerificationStatePreview state="expired" />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('alert')).toHaveTextContent('만료');
  },
};
export const PhoneUnlock: Story = {
  render: () => <PhoneVerificationStatePreview state="error" unlock />,
  play: Phone.play,
};
export const Registration: Story = {
  render: () => <RegistrationStatePreview />,
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('#registration-name') as HTMLInputElement;
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await userEvent.type(input, '테스트');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};
export const SignupTerms: Story = {
  render: () => <SignupTermsStatePreview />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const required = c.getAllByRole('checkbox', { name: /필수/ });
    await expect(required[0]).toHaveAttribute('aria-invalid', 'true');
    await userEvent.click(required[0]);
    await expect(required[0]).toHaveAttribute('aria-invalid', 'true');
  },
};
