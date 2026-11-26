export type Preference = '수신' | '수신안함';

export type ProfileValues = {
  email: string;
  phone: string;
  emailPreference: Preference;
  smsPreference: Preference;
  kakaoPreference: Preference;
};

export type ProfileAddress = { postalCode: string; address: string; addressDetail: string };

export type ProfilePhonePreview = 'idle' | 'code-entry' | 'expired' | 'mismatch';

export type ProfileEditProps = ProfileValues & {
  pending?: boolean;
  details?: readonly (readonly [string, string])[];
  previewPhone?: ProfilePhonePreview;
  address: ProfileAddress;
  addressOpen: boolean;
  passwordChanged: boolean;
  phoneVerified: boolean;
  fieldErrors: { email?: string; phone?: string } & Partial<Record<keyof ProfileAddress, string>>;
  onEmailChange: (value: string) => void;
  onAddressChange: (field: keyof ProfileAddress, value: string) => void;
  onAddressOpenChange: (open: boolean) => void;
  onPhoneChange: (value: string) => void;
  onEmailPreferenceChange: (value: Preference) => void;
  onSmsPreferenceChange: (value: Preference) => void;
  onKakaoPreferenceChange: (value: Preference) => void;
  onSubmit: (event: import('react').FormEvent<HTMLFormElement>, password?: string) => void;
  onCancel?: () => void;
  onWithdraw?: () => void;
};
