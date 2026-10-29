'use client';

import { createContext } from 'react';

import type { PhoneInformation } from '@/components/phone-verification/PhoneVerificationContent';

export type PhoneVerificationService = {
  request: (
    information: PhoneInformation,
  ) => Promise<{ requestId: string; expiresInSeconds: number }>;
  verify: (input: {
    requestId: string;
    code: string;
    information: PhoneInformation;
  }) => Promise<void>;
};

export const PhoneVerificationContext = createContext<PhoneVerificationService | null>(null);
