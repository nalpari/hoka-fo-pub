import type { ReactNode } from 'react';
export type InquiryView = {
  id: string;
  title: string;
  answered: boolean;
  date: string;
  category: string;
  body: ReactNode;
  answer?: ReactNode;
  attachments?: readonly {
    name: string;
    kind: 'image' | 'document';
    previewUrl?: string;
  }[];
};
