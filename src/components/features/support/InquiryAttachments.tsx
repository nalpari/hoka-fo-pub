'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import { Button } from '@/components/common/atoms/Button/Button';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { Stack } from 'styled-system/jsx';
import { InquiryAttachmentList } from './InquiryAttachmentList';
import { InquiryAttachmentHelp } from './InquiryAttachmentHelp';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { css } from 'styled-system/css';

type Props = {
  files: File[];
  onFilesChange: (files: File[]) => void;
};

type AttachmentError = 'size' | 'type' | 'count';

const attachmentErrorMessage: Record<AttachmentError, string> = {
  size: '첨부파일은 10MB 이하로 첨부해주세요.',
  type: '첨부할 수 없는 파일 형식입니다.',
  count: '파일은 최대 5개까지 첨부할 수 있습니다.',
};

export function InquiryAttachments({ files, onFilesChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<AttachmentError | null>(null);

  const addFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (!next.length) return;
    if (files.length + next.length > 5) {
      setError('count');
      return;
    }
    if (next.some((file) => !/\.(jpe?g|png)$/i.test(file.name))) {
      setError('type');
      return;
    }
    if (next.some((file) => file.size > 10 * 1024 * 1024)) {
      setError('size');
      return;
    }
    setError(null);
    onFilesChange([...files, ...next]);
  };

  return (
    <ContentSection
      gap="4"
      title="파일 첨부"
      headerProps={{
        orientation: 'horizontal',
        gap: '8px',
        titleProps: {
          variant: 'heading8',
          className: css({ _mobile: { fontWeight: 'semibold' } }),
        },
        action: (
          <Button
            variant="link"
            size="md"
            onClick={() => inputRef.current?.click()}
            aria-describedby="inquiry-files-help"
          >
            파일찾기
          </Button>
        ),
      }}
    >
      <input
        ref={inputRef}
        id="inquiry-files"
        aria-label="파일 첨부"
        type="file"
        multiple
        accept=".jpg,.jpeg,.png"
        onChange={addFiles}
        hidden
      />
      <Stack gap="2">
        {error ? (
          <Typography as="p" variant="body5" tone="error" role="alert" className={css({ m: '0' })}>
            {attachmentErrorMessage[error]}
          </Typography>
        ) : null}
        <InquiryAttachmentHelp />
      </Stack>
      <InquiryAttachmentList
        files={files}
        onRemove={(index) => {
          onFilesChange(files.filter((_, fileIndex) => fileIndex !== index));
          setError(null);
        }}
      />
    </ContentSection>
  );
}
