import type { ComponentProps } from 'react';
import { LoginLayout } from '@/components/features/login/LoginLayout';
import { LoginForm } from '@/components/features/login/LoginForm';
import { LoginMembership } from '@/components/features/login/LoginMembership';

export type { LoginNotice } from '@/components/features/login/LoginForm';

export function LoginContent(props: ComponentProps<typeof LoginForm>) {
  return (
    <LoginLayout>
      <LoginForm {...props} />
      <LoginMembership />
    </LoginLayout>
  );
}
