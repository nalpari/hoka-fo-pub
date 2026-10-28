export const getPhoneDigits = (value: string) => value.replace(/\D/g, '').slice(0, 11);

export const formatPhoneNumber = (value: string) => {
  const digits = getPhoneDigits(value);

  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

export const isValidPhone = (value: string) => /^01[016789]\d{7,8}$/.test(getPhoneDigits(value));
