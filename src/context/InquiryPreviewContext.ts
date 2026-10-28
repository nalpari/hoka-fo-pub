'use client';

import { createContext } from 'react';

export type InquiryPreview = 'empty' | 'pending' | 'answered' | 'attachmentPreview';

export const InquiryPreviewContext = createContext<InquiryPreview>('empty');
