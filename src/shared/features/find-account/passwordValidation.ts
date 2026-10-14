export type FieldName = 'password' | 'confirmation';

export type Errors = Partial<Record<FieldName, string>>;

const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])\S{12,}$/;

export function validatePasswordReset(nextPassword: string, nextConfirmation: string): Errors {
  const nextErrors: Errors = {};
  if (!nextPassword) {
    nextErrors.password = 'required';
  } else if (!passwordPattern.test(nextPassword)) {
    nextErrors.password = '비밀번호는 영문, 숫자, 특수문자 포함 12자 이상 입력되어야 합니다.';
  }
  if (!nextConfirmation) {
    nextErrors.confirmation = 'required';
  } else if (nextPassword !== nextConfirmation) {
    nextErrors.confirmation = '동일한 비밀번호가 입력되었는지 확인해주세요.';
  }
  return nextErrors;
}
