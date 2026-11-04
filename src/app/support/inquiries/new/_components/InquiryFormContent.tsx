'use client';

import { type ChangeEvent, useRef } from 'react';

import { css } from 'styled-system/css';
import { Box, Flex, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { DescriptionList } from '@/components/common/atoms/DescriptionList';
import { Dropdown } from '@/components/common/atoms/Dropdown';
import { Icon } from '@/components/common/atoms/Icon';
import { StatusMessage } from '@/components/common/atoms/StatusMessage';
import { Typography } from '@/components/common/atoms/Typography';

import { FormActionGroup } from '@/components/common/molecules/FormActionGroup';
import { CharacterCount } from '@/components/common/molecules/FormFields/CharacterCount';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { type InquiryOrderSelection } from '@/app/support/inquiries/new/inquiryOrders.data';

export const inquiryAlertPresentation = {
  size: 'md' as const,
  headerProps: {
    css: css.raw({ bg: 'white.0', borderBottom: '1px solid token(colors.black.20)' }),
  },
  popupClassName: css({ '& > div:nth-child(2)': { py: '6' } }),
};
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
          <Box
            w="10"
            h="10"
            flexShrink="0"
            bg="black.10"
            border="1px solid token(colors.black.40)"
            aria-hidden="true"
          />
          <Box minW="0" flex="1" overflowWrap="anywhere">
            <Typography variant="body5" tone="tertiary">
              {file.name}
            </Typography>
          </Box>
          <Button
            variant="link"
            size="md"
            aria-label={`${file.name} 삭제`}
            onClick={() => onRemove(index)}
          >
            <Icon name="xmark-solid" size="16px" />
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
  const error = previewError;
  const addFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Array.from(event.target.files ?? []);
    event.target.value = '';
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
          variant: 'heading9',
          className: css({ _mobile: { fontWeight: 'semibold' } }),
        },
        action: (
          <Button
            variant="link"
            size="md"
            className={css({ '& span': { fontWeight: 'normal' } })}
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
          <StatusMessage tone="error" textProps={{ tone: 'error' }} className={css({ m: '0' })}>
            {attachmentErrorMessage[error]}
          </StatusMessage>
        ) : null}
        <InquiryAttachmentHelp />
      </Stack>
      <InquiryAttachmentList
        files={files}
        onRemove={(index) => {
          onFilesChange(files.filter((_, fileIndex) => fileIndex !== index));
        }}
      />
    </ContentSection>
  );
}
/** 문의 등록자의 이름과 연락처 정보를 표시합니다. (Displays the inquirer's name and contact information.) */
export function InquiryCustomerInfo() {
  return (
    <Box px="8" py="6" bg="black.10" _mobile={{ px: '4', py: '5' }}>
      <DescriptionList
        items={[
          { term: '이름', description: '홍길동' },
          { term: '휴대폰 번호', description: '010-1234-1234' },
          { term: 'E-mail', description: 'hong123@naver.com' },
        ]}
        termProps={{ variant: 'body3', mo: 'body4', tone: 'subtle' }}
        descriptionProps={{ variant: 'body3', mo: 'body4', tone: undefined }}
        slotStyles={{
          root: css.raw({
            gridTemplateColumns: 'max-content minmax(0, 1fr)',
            gap: '12px 22px',
            _mobile: { gridTemplateColumns: '82px minmax(0, 1fr)', columnGap: '2' },
          }),
        }}
      />
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
          options={[
            { value: '주문/결제', label: '주문/결제' },
            { value: '반품', label: '반품' },
            { value: '주문/배송', label: '주문/배송' },
            { value: '상품', label: '상품' },
            { value: '회원', label: '회원' },
          ]}
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
          options={[
            { value: '신청/취소 문의', label: '신청/취소 문의' },
            { value: '진행 상황 문의', label: '진행 상황 문의' },
            { value: '기타 문의', label: '기타 문의' },
          ]}
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
        className={css({ '& > div:first-child': { py: '12px', gap: '8px' } })}
        id="inquiry-body"
        required
        error={invalid && (fixedErrors || !body.trim()) ? '내용을 입력해 주세요.' : undefined}
        inputProps={{
          multiline: true,
          value: body,
          maxLength: 1000,
          onChange: (event) => onBodyChange(event.target.value),
          placeholder: '내용을 입력해주세요.',
          className: css({ '&&&': { h: '100px', minH: '100px' } }),
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
type InquiryFormActionsProps = {
  onCancel: () => void;
};
/** 문의 등록과 취소 액션을 표시합니다. (Displays inquiry submission and cancellation actions.) */
export function InquiryFormActions({ onCancel }: InquiryFormActionsProps) {
  return (
    <FormActionGroup
      onCancel={onCancel}
      submitLabel="문의 등록"
      size="tall"
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
    <Stack gap="3">
      <Typography variant="headingKr10">상품 정보</Typography>
      <Box border="1px solid token(colors.black.20)" p="4" pb="5">
        <HStack justifyContent="space-between" mb="4" _mobile={{ alignItems: 'flex-start' }}>
          <Typography variant="body3" language="en" weight="bold">
            {selection.order.date}
          </Typography>
          <Button
            aria-label="선택한 주문 삭제"
            variant="icon"
            size={24}
            onClick={() => onSelectionChange(null)}
          >
            <Icon name="xmark-solid" size="16px" />
          </Button>
        </HStack>
        <Stack gap="4">
          <Stack gap="2">
            <Typography variant="body4">주문번호</Typography>
            <HStack gap="2" flexWrap="wrap">
              <Typography variant="body4" language="en" tone="subtle">
                {selection.order.id}
              </Typography>
              <Typography variant="body4" language="en" tone="subtle">
                {selection.order.date}
              </Typography>
            </HStack>
          </Stack>
          <Stack gap="2">
            <Typography variant="body4">상품코드</Typography>
            <Stack gap="1">
              {selection.products.map((item) => (
                <Typography key={item.id} variant="body4" language="en" tone="subtle">
                  {item.code}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Flex justifyContent="flex-start" gap="2">
        <Button
          size="short"
          variant="primary"
          onClick={onLookup}
          className={css({
            '& > span': {
              '--button-height': '36px',
              '--button-label-size': '12px',
              '--button-padding-x': '24px',
            },
          })}
        >
          상품변경
        </Button>
      </Flex>
    </Stack>
  ) : (
    <Flex
      direction="column"
      alignItems={{ base: 'flex-end', _mobile: 'flex-start' }}
      gap="3"
      flex="1"
      pb="3"
    >
      <Box w={{ base: '160px', _mobile: 'auto' }}>
        <Button
          size="tall"
          variant="secondary"
          fullWidth
          onClick={onLookup}
          className={css({
            _mobile: { '& > span': { '--button-height': '36px', '--button-label-size': '14px' } },
          })}
        >
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
