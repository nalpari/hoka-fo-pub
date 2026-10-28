export const isValidName = (value: string) =>
  /^[가-힣a-zA-Z]+(?:\s[가-힣a-zA-Z]+)*$/.test(value.trim());

export const isValidRegistrationId = (value: string) => /^[a-z][a-z0-9_]{4,19}$/.test(value);
