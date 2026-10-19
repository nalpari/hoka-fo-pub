export const emailFormatErrorMessage = '올바른 이메일 형식으로 입력해 주세요';

export const emailDomainErrorMessage = '올바른 도메인 형식으로 입력해 주세요';

const localPartPattern =
  /^(?=.{1,64}$)[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;

const domainPattern =
  /^(?=.{1,253}$)(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

export function isValidEmailLocalPart(value: string): boolean {
  return localPartPattern.test(value);
}

export function isValidEmailDomain(value: string): boolean {
  return domainPattern.test(value);
}

export function isValidEmail(value: string): boolean {
  const parts = value.trim().split('@');
  return parts.length === 2 && isValidEmailLocalPart(parts[0]) && isValidEmailDomain(parts[1]);
}
