import type { ComponentProps } from 'react';
import { LoginLayout } from '@/shared/features/login/LoginLayout';
import { LoginForm } from '@/shared/features/login/LoginForm';
import { LoginMembership } from '@/shared/features/login/LoginMembership';

export type { LoginNotice } from '@/shared/features/login/LoginForm';

export function LoginContent(props: ComponentProps<typeof LoginForm>) {
  return (
    <LoginLayout>
      <LoginForm {...props} />
      <LoginMembership />
    </LoginLayout>
  );
}
