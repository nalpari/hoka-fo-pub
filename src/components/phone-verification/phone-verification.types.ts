import type { FormEvent } from 'react';

export type PhoneInformation = {
  name: string;
  birthDate: string;
  nationality: string;
  gender: string;
  carrier: string;
  phone: string;
};

export type PhoneVerificationErrors = Partial<Record<keyof PhoneInformation, string>>;

export type PhoneVerificationContentProps = {
  pending?: boolean;
  title?: string;
  description?: string;
  information: PhoneInformation;
  agreements: boolean[];
  showAgreementErrors?: boolean;
  requested: boolean;
  code: string;
  secondsLeft: number;
  resendWait: number;
  notice: string;
  noticeTone?: 'error' | 'info';
  codeError?: string;
  fieldErrors?: PhoneVerificationErrors;
  detail: string | null;
  onInformationChange: (key: keyof PhoneInformation, value: string) => void;
  onAgreementChange: (index: number, checked: boolean) => void;
  onAllAgree: (checked: boolean) => void;
  onCodeChange: (value: string) => void;
  onRequest: () => void;
  onConfirm: (event: FormEvent<HTMLFormElement>) => void;
  onDetail: (title: string | null) => void;
};
