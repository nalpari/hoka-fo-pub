'use client';

import Image from 'next/image';

import { faFilePdf, faImage } from '@fortawesome/free-solid-svg-icons';
import { useContext, useId, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, HStack, Square, Stack } from 'styled-system/jsx';

import { Badge } from '@/components/common/atoms/Badge/Badge';
import { Divider } from '@/components/common/atoms/Divider/Divider';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { Typography } from '@/components/common/atoms/Typography/Typography';

import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';
import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { ModalDialog } from '@/components/common/molecules/ModalDialog/ModalDialog';
import { PageActionButton } from '@/components/common/molecules/PageActionButton/PageActionButton';

import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout';

import { InquiryCautions } from '@/components/support/InquiryCautions';
import { InquiryPreviewContext } from '@/components/support/InquiryPreviewContext';
import { supportNavigation } from '@/components/support/support.navigation';

function InquiryEmptyState() {
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

type Props = { item: { title: string; answered: boolean } };

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
          문의 내용 노출 영역 문의 내용 노출 영역 문의 내용 노출 영역
        </Typography>
      </Stack>
    </HStack>
  );
}

/** 답변 내용을 배경 패널 안에 표시합니다. (Displays the response in a shaded panel.) */
function InquiryAnswer() {
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
          문의 내용 노출 영역 문의 내용 노출 영역 문의 내용 노출 영역
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

type InquiryListItemProps = {
  item: { id: string; title: string; answered: boolean };
  attachments?: readonly InquiryAttachment[];
};

/** 문의 한 건의 질문과 답변 및 첨부파일을 표시합니다. (Displays one inquiry with its answer and attachments.) */
function InquiryListItem({ item, attachments = [] }: InquiryListItemProps) {
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

const desktopPreviewAttachments: readonly InquiryAttachment[] = [
  { name: 'IMG_7899.JPG', kind: 'image' },
  { name: 'IMG_ekkefei003.JPG', kind: 'image' },
  { name: 'IMG_55559KKKKK.PDF', kind: 'document' },
  { name: 'IMG_55559KKKKK.JPG', kind: 'image' },
];

const mobilePreviewAttachments: readonly InquiryAttachment[] = [
  { name: 'IMG_78901.JPG', kind: 'image' },
  { name: 'IMG_78902.JPG', kind: 'image' },
  { name: 'IMG_78903.JPG', kind: 'image' },
  { name: 'IMG_78904.JPG', kind: 'image' },
  { name: 'IMG_78905.JPG', kind: 'image' },
  { name: 'IMG_78906.JPG', kind: 'image' },
  { name: 'IMG_78907.JPG', kind: 'image' },
  { name: 'IMG_78908.JPG', kind: 'image' },
];

/** 1:1 문의 목록과 빈 상태를 구성하고 문의 등록으로 연결합니다. (Composes the inquiry list and empty state, with a link to submit an inquiry.) */
export default function Page() {
  const preview = useContext(InquiryPreviewContext);
  const platform = usePlatform();
  const inquiries =
    preview === 'empty'
      ? []
      : [
          {
            id: '1',
            title: '문의하기 타이틀 노출 영역',
            answered: preview === 'answered' || preview === 'attachmentPreview',
          },
        ];

  return (
    <CustomerCenterLayout
      header={
        <ContentHeader
          gap={{ base: '3', _mobile: '4' }}
          title="1:1 문의"
          titleAs="h1"
          titleProps={{ web: 'heading6', mo: 'heading5' }}
          description="궁금하신 점이나 불편한 사항을 알려주시면 정성껏 답변해 드리겠습니다."
          descriptionProps={{
            variant: 'body3',
            className: css({ color: 'black.100', _mobile: { color: 'black.60' } }),
          }}
        />
      }
      activePath="/support/inquiries"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '1:1 문의' },
      ]}
      groups={supportNavigation}
      footer={
        <Box pb={{ base: '0', _mobile: '16' }}>
          <PageActionButton
            href="/support/inquiries/new"
            variant="primary"
            size="tall"
            width="compact"
            containerProps={{ pt: '6' }}
          >
            1:1 문의하기
          </PageActionButton>
        </Box>
      }
    >
      <Stack gap="0" mt={{ base: '10', _mobile: '4' }}>
        <Divider variant="heading" mo="subtle" />
        <Stack gap="0" pt="6" pb={{ base: '48px', _mobile: '8' }}>
          {inquiries.length === 0 ? (
            <InquiryEmptyState />
          ) : (
            inquiries.map((item) => (
              <InquiryListItem
                key={item.id}
                item={item}
                attachments={
                  preview === 'attachmentPreview'
                    ? platform === 'mobile'
                      ? mobilePreviewAttachments
                      : desktopPreviewAttachments
                    : []
                }
              />
            ))
          )}
        </Stack>

        {/* 문의 유의사항 영역 (Inquiry cautions section). */}
        <InquiryCautions />
      </Stack>
    </CustomerCenterLayout>
  );
}
