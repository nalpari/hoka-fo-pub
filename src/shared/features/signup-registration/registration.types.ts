import type { FormEvent } from 'react';

export type RegistrationInformation = {
  id: string;
  name: string;
  password: string;
  confirmation: string;
  birthDate: string;
  phone: string;
  postalCode: string;
  address: string;
  addressDetail: string;
  email: string;
  domain: string;
  anniversary: string;
};

export type MarketingPreferences = { email: string; sms: string; kakao: string };

export type RegistrationContentProps = {
  stage: 'information' | 'additional';
  information: RegistrationInformation;
  preferences: MarketingPreferences;
  domainChoice: string;
  notice: string;
  duplicateNotice: string;
  fieldErrors: {
    id: string;
    email: string;
    domain: string;
    name: string;
    password: string;
    confirmation: string;
  } & Partial<Record<keyof RegistrationInformation, string>>;
  addressOpen: boolean;
  onChange: (key: keyof RegistrationInformation, value: string) => void;
  onPreferenceChange: (key: keyof MarketingPreferences, value: string) => void;
  onDomainChoice: (value: string) => void;
  onDuplicateCheck: () => void;
  onAddressOpen: (open: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};
