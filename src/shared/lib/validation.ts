export const isValidName = (value: string) =>
  /^[가-힣a-zA-Z]+(?:\s[가-힣a-zA-Z]+)*$/.test(value.trim());
