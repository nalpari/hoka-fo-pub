'use client';

import { useState } from 'react';
import { css } from 'styled-system/css';
import { Box, Stack, Square } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { InquiryAttachmentPreview, type InquiryAttachment } from './InquiryAttachmentPreview';

/** 문의 첨부파일 목록과 파일 미리보기를 관리합니다. (Lists inquiry attachments and manages their preview.) */
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
        as="section"
        aria-label="첨부파일"
        gap={{ base: '2', _mobile: '3' }}
        m="0"
        ml={{ base: '9', _mobile: '0' }}
        mt={{ base: '4', _mobile: '0' }}
        p={{ base: '4', _mobile: '16px 16px 24px 29px' }}
        border={{ base: '1px solid token(colors.black.20)', _mobile: '0' }}
      >
        <Typography
          variant="body4"
          className={css({ display: 'none', _mobile: { display: 'block' } })}
        >
          첨부파일
        </Typography>
        <Box
          as="ul"
          display="flex"
          flexDirection={{ base: 'column', _mobile: 'row' }}
          flexWrap={{ base: 'nowrap', _mobile: 'wrap' }}
          gap="2"
          m="0"
          p="0"
          listStyleType="none"
        >
          {attachments.map((attachment, index) => (
            <li key={`${attachment.name}-${index}`}>
              <button
                type="button"
                onClick={() => setPreviewIndex(index)}
                aria-label={`${attachment.name} 미리보기`}
                className={css({
                  display: 'flex',
                  flexDirection: { base: 'row', _mobile: 'column' },
                  alignItems: { base: 'center', _mobile: 'flex-start' },
                  gap: { base: '3', _mobile: '1' },
                  w: { base: '100%', _mobile: '52px' },
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
                  size={{ base: '10', _mobile: '12' }}
                  bg="black.10"
                  border="1px solid token(colors.black.40)"
                  aria-hidden="true"
                />
                <Typography
                  variant="body5"
                  tone="tertiary"
                  className={css({
                    overflowWrap: 'anywhere',
                    _mobile: {
                      w: '12',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    },
                  })}
                >
                  {attachment.name}
                </Typography>
              </button>
            </li>
          ))}
        </Box>
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
