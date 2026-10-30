// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type ReactNode } from 'react';
type FindAccountNotice = {
  tone: 'error' | 'info';
  message: string;
};
type FindAccountContentProps = {
  name: string;
  phone: string;
  code: string;
  requested: boolean;
  secondsLeft: number;
  nameError: string;
  phoneError: string;
  codeError?: string;
  notice: FindAccountNotice | null;
  result?: ReactNode;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  onConfirmCode: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
declare function FindAccountContent({
  name,
  phone,
  code,
  requested,
  secondsLeft,
  nameError,
  phoneError,
  codeError,
  notice,
  result,
  onNameChange,
  onPhoneChange,
  onCodeChange,
  onConfirmCode,
  onSubmit,
}: FindAccountContentProps): import('react').JSX.Element;
type IdConfirmationModalProps = {
  userName?: string;
  onOpenChange: (open: boolean) => void;
  onPasswordReset: () => void;
  onConfirm: () => void;
};
/** 아이디 확인 안내를 재사용 가능한 반응형 모달로 표시합니다. (Displays account lookup guidance in a reusable responsive modal.) */
declare function IdConfirmationModal({
  userName,
  onOpenChange,
  onPasswordReset,
  onConfirm,
}: IdConfirmationModalProps): import('react').JSX.Element;
/** 계정 찾기 입력과 인증 예시 흐름을 관리합니다. (Manages account recovery inputs and the example verification flow.) */
export default function Page(): import('react').JSX.Element;
export { FindAccountContent, type FindAccountNotice, IdConfirmationModal };
