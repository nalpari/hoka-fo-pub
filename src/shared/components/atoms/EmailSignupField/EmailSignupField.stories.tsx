import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { EmailSignupField } from '@/shared/components/atoms/EmailSignupField/EmailSignupField';

function InteractiveEmailSignupField() {
  const [submittedEmail, setSubmittedEmail] = useState('');

  return (
    <>
      <EmailSignupField onSubmit={setSubmittedEmail} />
      {submittedEmail ? <p>{submittedEmail}로 구독을 신청했습니다.</p> : null}
    </>
  );
}

const meta = {
  title: 'Atoms/EmailSignupField',
  component: EmailSignupField,
  args: { label: '이메일 주소', buttonLabel: '구독 신청' },
} satisfies Meta<typeof EmailSignupField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactive: Story = { render: () => <InteractiveEmailSignupField /> };
