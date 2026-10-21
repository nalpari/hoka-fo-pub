export type Preference = '수신' | '수신안함';

export type MaritalStatus = '기혼' | '미혼';

export type ProfileValues = {
  email: string;
  phone: string;
  password: string;
  emailPreference: Preference;
  couponBookPreference: Preference;
  messagePreference: Preference;
  maritalStatus: MaritalStatus;
};

export type ProfileEditProps = ProfileValues & {
  fieldErrors: { email?: string; phone?: string };
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onEmailPreferenceChange: (value: Preference) => void;
  onCouponBookPreferenceChange: (value: Preference) => void;
  onMessagePreferenceChange: (value: Preference) => void;
  onMaritalStatusChange: (value: MaritalStatus) => void;
  onSubmit: (event: import('react').FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  onWithdraw: () => void;
};
