'use client';

import Image from 'next/image';
import { faFilePdf, faImage } from '@fortawesome/free-solid-svg-icons';
import { css } from 'styled-system/css';
import { Stack, Square } from 'styled-system/jsx';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { ModalDialog } from '@/components/common/molecules/ModalDialog/ModalDialog';
import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';

export type InquiryAttachment = { name: string; kind: 'image' | 'document'; previewUrl?: string };

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

type Props = {
  attachments: readonly InquiryAttachment[];
  initialIndex: number;
  onClose: () => void;
};

/** 문의 첨부파일을 미리보기로 탐색합니다. (Lets users browse inquiry attachment previews.) */
export function InquiryAttachmentPreview({ attachments, initialIndex, onClose }: Props) {
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
