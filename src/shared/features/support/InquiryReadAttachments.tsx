'use client';

import { useState } from 'react';
import { css } from 'styled-system/css';
import { Stack, Square } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { InquiryAttachmentPreview, type InquiryAttachment } from './InquiryAttachmentPreview';

export function InquiryReadAttachments({
  attachments,
}: {
  attachments: readonly InquiryAttachment[];
}) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  if (!attachments.length) return null;

  return (
    <>
      <Stack
        as="ul"
        gap="2"
        m="0"
        ml={{ base: '9', _mobile: '8' }}
        mt="4"
        p="4"
        listStyleType="none"
        border="1px solid token(colors.black.20)"
      >
        {attachments.map((attachment, index) => (
          <li key={attachment.name}>
            <button
              type="button"
              onClick={() => setPreviewIndex(index)}
              aria-label={`${attachment.name} 미리보기`}
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '3',
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
              <Square
                as="span"
                size="10"
                bg="black.10"
                border="1px solid token(colors.black.20)"
                aria-hidden="true"
              />
              <Typography
                variant="body5"
                tone="tertiary"
                className={css({ overflowWrap: 'anywhere' })}
              >
                {attachment.name}
              </Typography>
            </button>
          </li>
        ))}
      </Stack>
      {previewIndex !== null && (
        <InquiryAttachmentPreview
          attachments={attachments}
          initialIndex={previewIndex}
          onClose={() => setPreviewIndex(null)}
        />
      )}
    </>
  );
}
