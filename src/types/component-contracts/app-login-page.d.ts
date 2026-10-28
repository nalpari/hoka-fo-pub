// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type ComponentProps, type FormEvent, type ReactNode } from 'react';
declare function LoginLayout({ children }: { children: ReactNode }): import('react').JSX.Element;
declare function LoginActions({
  onUnavailable,
}: {
  onUnavailable: (feature: string) => void;
}): import('react').JSX.Element;
/** Login-only help; Base UI owns positioning, dismissal and keyboard focus. */
declare function RememberIdHelp(): import('react').JSX.Element;
type LoginNotice = {
  tone: 'error' | 'success';
  message: string;
};
type LoginFormProps = {
  id: string;
  password: string;
  rememberId: boolean;
  notice: LoginNotice | null;
  errors?: Partial<Record<'id' | 'password', string>>;
  onIdChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberChange: (value: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFindAccount: () => void;
  onUnavailable: (feature: string) => void;
};
declare function LoginForm({
  id,
  password,
  rememberId,
  notice,
  errors,
  onIdChange,
  onPasswordChange,
  onRememberChange,
  onSubmit,
  onFindAccount,
  onUnavailable,
}: LoginFormProps): import('react').JSX.Element;
declare function LoginMembership(): import('react').JSX.Element;
declare function LoginContent(props: ComponentProps<typeof LoginForm>): import('react').JSX.Element;
/** 로그인 입력을 검증하고 상점 로그인 상태를 연결합니다. (Validates login inputs and connects shop authentication state.) */
export default function Page(): import('react').JSX.Element;
export {
  LoginLayout,
  LoginActions,
  RememberIdHelp,
  LoginForm,
  type LoginNotice,
  type LoginFormProps,
  LoginMembership,
  LoginContent,
};
