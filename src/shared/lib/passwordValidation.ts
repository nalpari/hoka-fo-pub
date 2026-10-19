export const passwordRequirementsMessage =
  '영문, 숫자, 특수문자를 모두 포함하여 10~12자로 입력해 주세요';

const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s])\S{10,12}$/;

export function isValidPassword(value: string): boolean {
  return passwordPattern.test(value);
}

export type FieldName = 'password' | 'confirmation';

export type Errors = Partial<Record<FieldName, string>>;

export function validatePasswordReset(password: string, confirmation: string): Errors {
  const errors: Errors = {};
  if (!isValidPassword(password)) errors.password = passwordRequirementsMessage;
  if (!confirmation) {
    errors.confirmation = '비밀번호를 다시 입력해 주세요.';
  } else if (password !== confirmation) {
    errors.confirmation = '동일한 비밀번호가 입력되었는지 확인해주세요.';
  }
  return errors;
}
