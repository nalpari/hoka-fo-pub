'use client';

/**
 * [개발팀 바인딩]
 * 이 값은 문의 없음/답변/첨부 등 미리보기 시나리오 선택입니다. 실제 문의 목록은 InquiryDataContext.list로 연결합니다.
 */

import { createContext } from 'react';

export type InquiryPreview = 'empty' | 'pending' | 'answered' | 'attachmentPreview';

export const InquiryPreviewContext = createContext<InquiryPreview>('empty');
