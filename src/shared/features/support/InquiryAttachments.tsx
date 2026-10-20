'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { faXmark } from '@/shared/icons/fontAwesome';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';

type Props = {
  files: File[];
  onFilesChange: (files: File[]) => void;
};

export function InquiryAttachments({ files, onFilesChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const addFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (!next.length) return;
    if (files.length + next.length > 5) {
      setError('파일은 최대 5개까지 첨부할 수 있습니다.');
      return;
    }
    if (next.some((file) => !/\.(jpe?g|png|pdf)$/i.test(file.name))) {
      setError('JPG, PNG, PDF 파일만 첨부할 수 있습니다.');
      return;
    }
    if (next.some((file) => file.size > 10 * 1024 * 1024)) {
      setError('파일당 최대 10MB까지 첨부할 수 있습니다.');
      return;
    }
    setError('');
    onFilesChange([...files, ...next]);
  };

  return (
    <ContentSection
      gap="4"
      title="파일 첨부"
      headerProps={{
        orientation: 'horizontal',
        gap: '8px',
        titleProps: { variant: 'heading9' },
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
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={addFiles}
        hidden
      />
      {files.length ? (
        <Stack
          as="ul"
          listStyleType="none"
          m="0"
          p="4"
          gap="2"
          border="1px solid"
          borderColor="black.20"
        >
          {files.map((file, index) => (
            <HStack as="li" key={`${file.name}-${index}`} justifyContent="space-between" gap="2">
              <Box minW="0" overflowWrap="anywhere">
                <Typography variant="body4">{file.name}</Typography>
              </Box>
              <Button
                variant="link"
                size="md"
                aria-label={`${file.name} 삭제`}
                onClick={() => {
                  onFilesChange(files.filter((_, fileIndex) => fileIndex !== index));
                  setError('');
                }}
              >
                <Icon fontAwesomeIcon={faXmark} size="16px" />
              </Button>
            </HStack>
          ))}
        </Stack>
      ) : null}
      {error ? (
        <Typography as="p" variant="body5" tone="error" role="alert">
          {error}
        </Typography>
      ) : null}
      <Typography as="p" id="inquiry-files-help" variant="body5" tone="tertiary">
        - 파일을 첨부해 주세요. 첨부 가능한 파일 형식 및 용량을 확인해 주세요.
        <br />
        - JPG, PNG, PDF 등 지원 가능한 파일을 첨부해 주세요.
        <br />
        - 파일은 최대 5개까지 첨부할 수 있습니다.
        <br />- 첨부파일은 파일당 최대 10MB까지 등록 가능합니다.
      </Typography>
    </ContentSection>
  );
}
