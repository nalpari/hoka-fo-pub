'use client';

import { useId, useState } from 'react';
import { css } from 'styled-system/css';
import { InquiryQuestion } from './InquiryQuestion';
import { InquiryAnswer } from './InquiryAnswer';
import { InquiryReadAttachments } from './InquiryReadAttachments';
import type { InquiryAttachment } from './InquiryAttachmentPreview';

type Props = {
  item: { id: string; title: string; answered: boolean };
  attachments?: readonly InquiryAttachment[];
};

/** 문의 한 건의 질문과 답변 및 첨부파일을 표시합니다. (Displays one inquiry with its answer and attachments.) */
export function InquiryListItem({ item, attachments = [] }: Props) {
  const [answerOpen, setAnswerOpen] = useState(item.answered);
  const answerId = useId();
  const question = <InquiryQuestion item={item} />;

  return (
    <>
      {item.answered ? (
        <button
          type="button"
          aria-label={`${item.title} 문의 답변 ${answerOpen ? '접기' : '펼치기'}`}
          aria-expanded={answerOpen}
          aria-controls={answerId}
          onClick={() => setAnswerOpen((open) => !open)}
          className={css({
            display: 'block',
            w: '100%',
            p: '0',
            border: '0',
            bg: 'transparent',
            textAlign: 'left',
            cursor: 'pointer',
            _focusVisible: {
              outline: '2px solid var(--color-focus-ring)',
              outlineOffset: '2px',
            },
          })}
        >
          {question}
        </button>
      ) : (
        question
      )}
      {/* 문의 첨부파일 목록은 답변을 접어도 계속 표시합니다. (Keep attachments visible when the answer is collapsed.) */}
      <InquiryReadAttachments attachments={attachments} />
      {item.answered && (
        <div id={answerId} role="region" aria-label="문의 답변" hidden={!answerOpen}>
          {/* 문의 답변 내용 (Inquiry answer content). */}
          <InquiryAnswer />
        </div>
      )}
    </>
  );
}
