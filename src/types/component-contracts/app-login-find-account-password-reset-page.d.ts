// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type FieldName, type Errors } from '@/components/find-account/passwordValidation';
import { type FormEventHandler, type ReactNode } from 'react';
type Props = {
  name: FieldName;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};
declare function PasswordResetField({
  name,
  label,
  placeholder,
  value,
  error,
  onChange,
}: Props): import('react').JSX.Element;
type PasswordResetContentProps = {
  password: string;
  confirmation: string;
  errors: Errors;
  completion: ReactNode;
  onFieldChange: (field: FieldName, value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};
declare function PasswordResetContent({
  password,
  confirmation,
  errors,
  completion,
  onFieldChange,
  onSubmit,
}: PasswordResetContentProps): import('react').JSX.Element;
type PasswordResetCompleteModalProps = {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};
declare function PasswordResetCompleteModal({
  onOpenChange,
  onConfirm,
}: PasswordResetCompleteModalProps): import('react').JSX.Element;
/** 새 비밀번호 입력 검증과 재설정 예시 흐름을 관리합니다. (Manages new-password validation and the example reset flow.) */
export default function Page(): import('react').JSX.Element;
export { PasswordResetField, PasswordResetContent, PasswordResetCompleteModal };
