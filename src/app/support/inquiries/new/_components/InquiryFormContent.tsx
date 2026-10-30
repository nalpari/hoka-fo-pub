'use client';

import { faXmark as ImportedFaXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { type ChangeEvent, useRef, useState } from 'react';
import { InquiryDataContext } from '@/context/InquiryDataContext';

import { css } from 'styled-system/css';
import { Box, Flex, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { FormActionGroup } from '@/components/common/molecules/FormActionGroup';
import { CharacterCount } from '@/components/common/molecules/FormFields/CharacterCount';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { type InquiryOrderSelection } from '@/app/support/inquiries/new/inquiryOrderSelection.storage';
import { faXmark } from '@/icons/fontAwesome';

type InquiryAttachmentListProps = {
  files: File[];
  onRemove: (index: number) => void;
};

function InquiryAttachmentList({ files, onRemove }: InquiryAttachmentListProps) {
  if (!files.length) return null;

  return (
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
            onClick={() => onRemove(index)}
          >
            <Icon fontAwesomeIcon={faXmark} size="16px" />
          </Button>
        </HStack>
      ))}
    </Stack>
  );
}

function InquiryAttachmentHelp() {
  return (
    <Typography as="p" id="inquiry-files-help" variant="body5" tone="tertiary">
      - JPG, JPEG, PNG 파일만 첨부할 수 있습니다.
      <br />- 최대 5개까지 첨부 가능하며, 파일당 용량은 10MB 이하입니다.
    </Typography>
  );
}

type Props = {
  files: File[];
  onFilesChange: (files: File[]) => void;
  previewError?: AttachmentError;
};

type AttachmentError = 'size' | 'type' | 'count';

const attachmentErrorMessage: Record<AttachmentError, string> = {
  size: '첨부파일은 10MB 이하로 첨부해주세요.',
  type: '첨부할 수 없는 파일 형식입니다.',
  count: '파일은 최대 5개까지 첨부할 수 있습니다.',
};

/** 문의 첨부파일 입력과 상태를 관리합니다. (Manages inquiry attachment inputs and status.) */
export function InquiryAttachments({ files, onFilesChange, previewError }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localError, setError] = useState<AttachmentError | null>(null);
  const error = previewError ?? localError;

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

/** 문의 등록자의 이름과 연락처 정보를 표시합니다. (Displays the inquirer's name and contact information.) */
export function InquiryCustomerInfo() {
  const binding = useContext(InquiryDataContext).form;
  return (
    <Box px="8" py="6" bg="black.10" _mobile={{ px: '4', py: '5' }}>
      <Grid
        as="dl"
        gridTemplateColumns="max-content minmax(0, 1fr)"
        columnGap="22"
        rowGap="3"
        _mobile={{ gridTemplateColumns: '82px minmax(0, 1fr)', columnGap: '2' }}
      >
        <Typography as="dt" variant="body3" tone="subtle">
          이름
        </Typography>
        <Typography as="dd" variant="body3" mo="body4" weight="medium">
          {binding ? binding.customer.name : '홍길동'}
        </Typography>
        <Typography as="dt" variant="body3" tone="subtle">
          휴대폰 번호
        </Typography>
        <Typography as="dd" variant="body3" mo="body4" weight="medium">
          {binding ? binding.customer.phone : '010-1234-1234'}
        </Typography>
        <Typography as="dt" variant="body3" tone="subtle">
          E-mail
        </Typography>
        <Typography as="dd" variant="body3" mo="body4" weight="medium">
          {binding ? binding.customer.email : 'hong123@naver.com'}
        </Typography>
      </Grid>
    </Box>
  );
}

type InquiryCategoryFieldsProps = {
  category: string;
  detailCategory: string;
  invalid: boolean;
  fixedErrors?: boolean;
  onCategoryChange: (value: string) => void;
  onDetailCategoryChange: (value: string) => void;
};

/** 문의 분류 선택 필드를 표시합니다. (Displays inquiry category fields.) */
export function InquiryCategoryFields({
  category,
  detailCategory,
  invalid,
  fixedErrors = false,
  onCategoryChange,
  onDetailCategoryChange,
}: InquiryCategoryFieldsProps) {
  const binding = useContext(InquiryDataContext).form;
  return (
    <Stack gap="4">
      <Grid columns={2} gap="2" _mobile={{ gridTemplateColumns: '1fr', gap: '4' }}>
        <Dropdown
          ariaLabel="문의 유형"
          label="문의 유형"
          required
          name="inquiry-category"
          placeholder="문의 분류를 선택해주세요"
          value={category}
          onValueChange={onCategoryChange}
          error={invalid && (fixedErrors || !category) ? '문의 분류를 선택해주세요.' : undefined}
          options={
            binding
              ? binding.categories.map((item) => ({ value: item.value, label: item.value }))
              : [
                  { value: '주문/결제', label: '주문/결제' },
                  { value: '반품', label: '반품' },
                  { value: '주문/배송', label: '주문/배송' },
                  { value: '상품', label: '상품' },
                  { value: '회원', label: '회원' },
                ]
          }
        />
        <Dropdown
          ariaLabel="상세 유형"
          label="상세 유형"
          required
          name="inquiry-detail-category"
          placeholder="상세 유형을 선택해주세요"
          value={detailCategory}
          onValueChange={onDetailCategoryChange}
          error={
            invalid && (fixedErrors || !detailCategory) ? '상세 유형을 선택해주세요.' : undefined
          }
          options={
            binding
              ? (binding.categories.find((item) => item.value === category)?.details ?? []).map(
                  (value) => ({ value, label: value }),
                )
              : [
                  { value: '신청/취소 문의', label: '신청/취소 문의' },
                  { value: '진행 상황 문의', label: '진행 상황 문의' },
                  { value: '기타 문의', label: '기타 문의' },
                ]
          }
        />
      </Grid>
    </Stack>
  );
}

type InquiryMessageFieldsProps = {
  title: string;
  body: string;
  invalid: boolean;
  fixedErrors?: boolean;
  onTitleChange: (value: string) => void;
  onBodyChange: (value: string) => void;
};

/** 문의 제목과 내용 입력을 표시합니다. (Displays inquiry subject and message inputs.) */
export function InquiryMessageFields({
  title,
  body,
  invalid,
  fixedErrors = false,
  onTitleChange,
  onBodyChange,
}: InquiryMessageFieldsProps) {
  return (
    <>
      <TextFormField
        variant="boxed"
        label="제목"
        id="inquiry-title"
        required
        error={invalid && (fixedErrors || !title.trim()) ? '제목을 입력해 주세요.' : undefined}
        inputProps={{
          value: title,
          maxLength: 50,
          onChange: (event) => onTitleChange(event.target.value),
          placeholder: '제목을 입력해주세요. (50자 이하)',
        }}
      />
      <TextFormField
        variant="boxed"
        label="문의 내용"
        id="inquiry-body"
        required
        error={invalid && (fixedErrors || !body.trim()) ? '내용을 입력해 주세요.' : undefined}
        inputProps={{
          multiline: true,
          value: body,
          maxLength: 1000,
          onChange: (event) => onBodyChange(event.target.value),
          placeholder: '내용을 입력해주세요.',
          className: css({ minH: '120px' }),
        }}
        renderControl={(control) => (
          <Stack gap="2" w="100%">
            {control}
            <Box textAlign="right">
              <CharacterCount length={body.length} limit={1000} spaced tone="tertiary" />
            </Box>
          </Stack>
        )}
      />
    </>
  );
}

type InquiryFormActionsProps = { onCancel: () => void };

/** 문의 등록과 취소 액션을 표시합니다. (Displays inquiry submission and cancellation actions.) */
export function InquiryFormActions({ onCancel }: InquiryFormActionsProps) {
  return (
    <FormActionGroup
      onCancel={onCancel}
      submitLabel="문의 등록"
      size="short"
      justifyContent="center"
      pt="6"
      maxW="368px"
      w="100%"
      mx="auto"
      _mobile={{ pt: '0', maxW: 'none' }}
    />
  );
}

type InquiryOrderProductsProps = {
  invalid: boolean;
  fixedErrors?: boolean;
  onLookup: () => void;
  onSelectionChange: (selection: InquiryOrderSelection) => void;
  selection: InquiryOrderSelection;
};

/** 문의 대상 주문을 선택하거나 현재 선택 내용을 표시합니다. (Starts order lookup or displays the selected order.) */
export function InquiryOrderProducts({
  invalid,
  onLookup,
  onSelectionChange,
  selection,
}: InquiryOrderProductsProps) {
  return selection ? (
    <Box border="1px solid token(colors.black.20)">
      <HStack
        justifyContent="space-between"
        p={{ base: '4', _mobile: '3' }}
        borderBottom="1px solid token(colors.black.20)"
        _mobile={{ alignItems: 'flex-start' }}
      >
        <Typography variant="body5" weight="medium">
          {selection.order.date}
        </Typography>
        <Button
          aria-label="선택한 주문 삭제"
          variant="icon"
          size={24}
          onClick={() => onSelectionChange(null)}
        >
          <Icon fontAwesomeIcon={ImportedFaXmark} size="16px" />
        </Button>
      </HStack>
      <Box p={{ base: '4', _mobile: '3' }} borderBottom="1px solid token(colors.black.20)">
        <Typography variant="body5" tone="tertiary">
          주문번호 : {selection.order.id}
        </Typography>
      </Box>
      <Box
        p={{ base: '4', _mobile: '3' }}
        borderBottom="1px solid token(colors.black.20)"
        whiteSpace="pre-line"
      >
        <Typography variant="body5" tone="tertiary">
          상품코드 : {selection.products.map((item) => item.code).join('\n')}
        </Typography>
      </Box>
      <Flex justifyContent="center" gap="2" p={{ base: '4', _mobile: '3' }}>
        <Button size="short" variant="primary" onClick={onLookup}>
          상품변경
        </Button>
        <Button size="short" variant="secondary" onClick={() => onSelectionChange(null)}>
          선택 초기화
        </Button>
      </Flex>
    </Box>
  ) : (
    <Flex
      direction="column"
      alignItems={{ base: 'flex-end', _mobile: 'stretch' }}
      gap="3"
      flex="1"
      pb="3"
    >
      <Box w={{ base: '180px', _mobile: '100%' }}>
        <Button size="tall" variant="primary" fullWidth onClick={onLookup}>
          주문 상품 조회
        </Button>
      </Box>
      <Flex as="p" w="100%" justifyContent={{ base: 'flex-end', _mobile: 'flex-start' }} m="0">
        <Typography variant="body5" tone={invalid ? 'error' : 'tertiary'}>
          {invalid
            ? '문의하실 주문 상품을 선택해주세요.'
            : '*주문 상품조회 버튼을 눌러 문의하실 주문 상품을 선택해 주세요.'}
        </Typography>
      </Flex>
    </Flex>
  );
}
