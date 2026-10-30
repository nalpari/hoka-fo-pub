'use client';

import Image from 'next/image';

import { faFilePdf, faImage } from '@fortawesome/free-solid-svg-icons';
import type { ReactNode } from 'react';
import { useId, useState } from 'react';
import { type InquiryView } from '@/context/InquiryDataContext';

import { css } from 'styled-system/css';
import { Box, HStack, Square, Stack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';

import { ModalDialog } from '@/components/common/layouts/ModalDialog';

/** 등록된 문의가 없는 상태를 표시합니다. (Displays the empty inquiry state.) */
export function InquiryEmptyState() {
  return (
    <Stack
      align="center"
      justify="center"
      textAlign="center"
      minH={{ base: '430px', _mobile: '146px' }}
    >
      <Typography web="body3" mo="body4" tone="subtle">
        등록된 문의사항이 없습니다.
      </Typography>
    </Stack>
  );
}

type Props = { item: { title: string; answered: boolean; body?: ReactNode } };

const styles = {
  answeredQuestion: css({ color: 'black.100', _mobile: { color: 'black.50' } }),
  pendingHeader: css({
    display: 'flex',
    flexDirection: { base: 'row', _mobile: 'column' },
    gap: '2',
    alignItems: { base: 'center', _mobile: 'flex-start' },
  }),
  answeredHeader: css({
    display: 'flex',
    flexDirection: 'column',
    gap: { base: '4', _mobile: '2' },
    alignItems: 'flex-start',
  }),
};

/** 문의 상태와 질문 내용을 함께 표시합니다. (Displays an inquiry's status and question.) */
function InquiryQuestion({ item }: Props) {
  return (
    <HStack
      as="span"
      w="100%"
      gap="3"
      alignItems="flex-start"
      className={item.answered ? styles.answeredQuestion : undefined}
    >
      <Typography variant="body2" weight="medium" tone={item.answered ? 'inherit' : 'primary'}>
        Q
      </Typography>
      <Stack as="span" gap="3" flex="1" minW="0">
        <Box as="span" className={item.answered ? styles.answeredHeader : styles.pendingHeader}>
          <Badge
            shape="round"
            variant={item.answered ? 'filled' : 'line'}
            tone={item.answered ? 'tertiary' : 'primary'}
          >
            {item.answered ? '답변완료' : '접수완료'}
          </Badge>
          <Typography variant="headingKr9" tone="primary">
            {item.title}
          </Typography>
        </Box>
        <Typography as="span" variant="body4" tone="primary">
          {item.body === undefined
            ? '문의 내용 노출 영역 문의 내용 노출 영역 문의 내용 노출 영역'
            : item.body}
        </Typography>
      </Stack>
    </HStack>
  );
}

/** 답변 내용을 배경 패널 안에 표시합니다. (Displays the response in a shaded panel.) */
function InquiryAnswer({ content }: { content?: ReactNode }) {
  return (
    <HStack
      w="100%"
      gap="3"
      mt={{ base: '6', _mobile: '4' }}
      px="30px"
      py={{ base: '6', _mobile: '4' }}
      bg="black.10"
      alignItems="flex-start"
    >
      <Typography variant="body2" weight="medium" tone="primary">
        A
      </Typography>
      <Box
        flex="1"
        minW="0"
        pt="1"
        _mobile={{ pt: '0' }}
        className={css({ display: 'flex', flexDirection: 'column', gap: '3' })}
      >
        <Typography as="p" variant="body4" tone="primary">
          {content === undefined
            ? '문의 내용 노출 영역 문의 내용 노출 영역 문의 내용 노출 영역'
            : content}
        </Typography>
      </Box>
    </HStack>
  );
}

type InquiryAttachment = { name: string; kind: 'image' | 'document'; previewUrl?: string };

const previewDialog = css({
  '&&': {
    border: '1px solid token(colors.black.20)',
    boxShadow: 'none',
    _mobile: {
      w: '100vw!',
      maxH: '100dvh',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
    },
  },
  '& > header': { bg: 'white.0', borderBottom: '1px solid token(colors.black.20)' },
  '& > div:nth-child(2)': { p: '24px', _mobile: { p: '24px 16px 32px' } },
});

const paginationItem = css({
  w: '6px',
  h: '6px',
  flexShrink: 0,
  p: '0',
  border: '0',
  borderRadius: '4px',
  bg: 'black.40',
  cursor: 'pointer',
  '&[aria-pressed="true"]': { bg: 'black.100' },
});

type InquiryAttachmentPreviewProps = {
  attachments: readonly InquiryAttachment[];
  initialIndex: number;
  onClose: () => void;
};

/** 문의 첨부파일을 미리보기로 탐색합니다. (Lets users browse inquiry attachment previews.) */
function InquiryAttachmentPreview({
  attachments,
  initialIndex,
  onClose,
}: InquiryAttachmentPreviewProps) {
  return (
    <ModalDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title="첨부파일 미리보기"
      closeLabel="첨부파일 미리보기 닫기"
      size="md"
      mobilePresentation="bottomSheet"
      popupClassName={previewDialog}
    >
      <Carousel itemCount={attachments.length} initialIndex={initialIndex}>
        <CarouselViewport mode="mobile" mobileItemGutter={0} freeMode={false} showScrollbar={false}>
          {attachments.map((attachment) => (
            <Stack key={attachment.name} alignItems="center">
              <Square
                size="240px"
                maxW="100%"
                bg="black.10"
                border="1px solid token(colors.black.40)"
              >
                {attachment.previewUrl ? (
                  <Image
                    unoptimized
                    src={attachment.previewUrl}
                    width={240}
                    height={240}
                    alt={attachment.name}
                    className={css({ w: '100%', h: '100%', objectFit: 'contain' })}
                  />
                ) : (
                  <Icon
                    fontAwesomeIcon={attachment.kind === 'document' ? faFilePdf : faImage}
                    size="40px"
                    color="black.20"
                  />
                )}
              </Square>
            </Stack>
          ))}
        </CarouselViewport>
        <CarouselPagination
          className={css({ display: 'flex', justifyContent: 'center', gap: '2', pt: '6' })}
          label="첨부파일 선택"
          renderItem={(index, isActive, select) => (
            <button
              key={index}
              type="button"
              aria-label={`${index + 1}번 이미지`}
              aria-pressed={isActive}
              className={paginationItem}
              onClick={() => select(index)}
            />
          )}
        />
      </Carousel>
    </ModalDialog>
  );
}

/** 문의 첨부파일 목록과 파일 미리보기를 관리합니다. (Lists inquiry attachments and manages their preview.) */
function InquiryReadAttachments({ attachments }: { attachments: readonly InquiryAttachment[] }) {
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

export type InquiryListItemProps = {
  item: Pick<InquiryView, 'id' | 'title' | 'answered'> &
    Partial<Pick<InquiryView, 'body' | 'answer' | 'attachments'>>;
  attachments?: readonly InquiryAttachment[];
};

/** 문의 한 건의 질문과 답변 및 첨부파일을 표시합니다. (Displays one inquiry with its answer and attachments.) */
export function InquiryListItem({ item, attachments = [] }: InquiryListItemProps) {
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
          <InquiryAnswer content={item.answer} />
        </div>
      )}
    </>
  );
}

export const desktopPreviewAttachments: readonly InquiryAttachment[] = [
  { name: 'IMG_7899.JPG', kind: 'image' },
  { name: 'IMG_ekkefei003.JPG', kind: 'image' },
  { name: 'IMG_55559KKKKK.PDF', kind: 'document' },
  { name: 'IMG_55559KKKKK.JPG', kind: 'image' },
];

export const mobilePreviewAttachments: readonly InquiryAttachment[] = [
  { name: 'IMG_78901.JPG', kind: 'image' },
  { name: 'IMG_78902.JPG', kind: 'image' },
  { name: 'IMG_78903.JPG', kind: 'image' },
  { name: 'IMG_78904.JPG', kind: 'image' },
  { name: 'IMG_78905.JPG', kind: 'image' },
  { name: 'IMG_78906.JPG', kind: 'image' },
  { name: 'IMG_78907.JPG', kind: 'image' },
  { name: 'IMG_78908.JPG', kind: 'image' },
];
