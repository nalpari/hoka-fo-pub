'use client';

import { type ChangeEvent, type Ref, useRef } from 'react';

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
            <Icon name="hoka-action-xmark-regular" size="16px" />
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
          web: 'heading8',
          mo: 'heading7',
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

const inquiryDetailOptions = [
  { value: '신청/취소 문의', label: '신청/취소 문의' },
  { value: '진행 상황 문의', label: '진행 상황 문의' },
  { value: '기타 문의', label: '기타 문의' },
] as const;

/** 문의 분류 선택 필드를 표시합니다. (Displays inquiry category fields.) */
export function InquiryCategoryFields({
  category,
  detailCategory,
  invalid,
  fixedErrors = false,
  onCategoryChange,
  onDetailCategoryChange,
}: InquiryCategoryFieldsProps) {
  // [ 개발팀 바인딩 ] 문의/상세 유형 값과 옵션은 이 필드 소유자와 기존 콜백을 사용합니다. 모바일은 문의 유형 선택 즉시 onCategoryChange(value)를 전달하고 같은 시트에서 상세 유형을 이어 선택합니다. 상세 선택 시 onDetailCategoryChange(value)를 전달하고 닫으며, 상세 선택 전 닫아도 이미 선택한 문의 유형은 유지합니다. PC는 두 필드를 각각 선택하며 제출·요청 계약은 변경하지 않습니다.
  return (
    <Stack gap="4">
      <Grid columns={2} gap="2" _mobile={{ gridTemplateColumns: '1fr', gap: '4' }}>
        <Dropdown
          ariaLabel="문의 유형"
          className={css({ '&&': { h: '63px', pb: '8px' } })}
          label="문의 유형"
          required
          name="inquiry-category"
          placeholder="문의 분류를 선택해주세요"
          value={category}
          onValueChange={onCategoryChange}
          mobileNextSelection={{
            ariaLabel: '상세 유형',
            options: inquiryDetailOptions,
            value: detailCategory,
            onValueChange: onDetailCategoryChange,
          }}
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
          className={css({ '&&': { h: '63px', pb: '8px' } })}
          label="상세 유형"
          required
          name="inquiry-detail-category"
          placeholder="상세 유형을 선택해주세요"
          value={detailCategory}
          onValueChange={onDetailCategoryChange}
          error={
            invalid && (fixedErrors || !detailCategory) ? '상세 유형을 선택해주세요.' : undefined
          }
          options={inquiryDetailOptions}
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
            <Box textAlign="right" lineHeight="0">
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
      maxW="368px"
      w="100%"
      mx="auto"
      css={{ _mobile: { '& button': { '--button-height': '44px' } } }}
      _mobile={{ maxW: 'none' }}
    />
  );
}
type InquiryOrderProductsProps = {
  invalid: boolean;
  fixedErrors?: boolean;
  lookupButtonRef?: Ref<HTMLButtonElement>;
  onLookup: () => void;
  onSelectionChange: (selection: InquiryOrderSelection) => void;
  selection: InquiryOrderSelection;
};
/** 문의 대상 주문을 선택하거나 현재 선택 내용을 표시합니다. (Starts order lookup or displays the selected order.) */
export function InquiryOrderProducts({
  invalid,
  lookupButtonRef,
  onLookup,
  onSelectionChange,
  selection,
}: InquiryOrderProductsProps) {
  return selection ? (
    <Stack gap="16px" pt={{ base: '24px', _mobile: '8px' }} pb={{ base: '24px', _mobile: '8px' }}>
      <Typography web="heading8" mo="heading7">
        상품 정보
      </Typography>
      <Box border="1px solid token(colors.black.20)" p="4" pb="5">
        <HStack justifyContent="space-between" mb="4" _mobile={{ alignItems: 'flex-start' }}>
          <Typography web="heading9" mo="heading7">
            {selection.order.date}
          </Typography>
          <Button
            aria-label="선택한 주문 삭제"
            variant="icon"
            size={24}
            onClick={() => onSelectionChange(null)}
          >
            <Icon name="hoka-action-xmark-regular" size="24px" />
          </Button>
        </HStack>
        <Stack gap="4">
          <Stack gap="2">
            <Typography web="heading9" mo="body4">
              주문번호
            </Typography>
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
            <Typography web="heading9" mo="body4">
              상품코드
            </Typography>
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
          size="tall"
          variant="secondary"
          ref={lookupButtonRef}
          aria-haspopup="dialog"
          onClick={onLookup}
        >
          상품변경
        </Button>
      </Flex>
    </Stack>
  ) : (
    <Stack
      gap={{ base: '16px', _mobile: '12px' }}
      alignItems="flex-start"
      w="100%"
      pt={{ base: '24px', _mobile: '8px' }}
      pb={{ base: '24px', _mobile: '8px' }}
    >
      <Typography web="heading8" mo="heading7">
        상품 정보
      </Typography>
      <Stack
        w="100%"
        gap="24px"
        alignItems="center"
        border="1px solid token(colors.black.20)"
        px="16px"
        py={{ base: '32px', _mobile: '24px' }}
      >
        <Typography
          as="p"
          variant="body4"
          tone={invalid ? 'error' : 'subtle'}
          className={css({ lineHeight: '1.5' })}
        >
          {invalid
            ? '문의하실 주문 상품을 선택해주세요.'
            : '주문 상품조회 버튼을 눌러 문의하실 주문 상품을 선택해 주세요.'}
        </Typography>
        <Button
          size="short"
          variant="secondary"
          fullWidth
          className={css({ w: { base: '110px', _mobile: '100%' } })}
          ref={lookupButtonRef}
          aria-haspopup="dialog"
          onClick={onLookup}
        >
          주문 상품 조회
        </Button>
      </Stack>
    </Stack>
  );
}
