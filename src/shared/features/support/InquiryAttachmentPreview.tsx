'use client';

import Image from 'next/image';
import { faFilePdf, faImage } from '@fortawesome/free-solid-svg-icons';
import { css } from 'styled-system/css';
import { Stack, Square } from 'styled-system/jsx';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { SingleActionDialog } from '@/shared/components/molecules/SingleActionDialog/SingleActionDialog';
import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/shared/components/molecules/Carousel/Carousel';

export type InquiryAttachment = { name: string; kind: 'image' | 'document'; previewUrl?: string };

type Props = {
  attachments: readonly InquiryAttachment[];
  initialIndex: number;
  onClose: () => void;
};

/** Feature-owned preview using the shared focus-managed dialog and gallery controls. */
export function InquiryAttachmentPreview({ attachments, initialIndex, onClose }: Props) {
  return (
    <SingleActionDialog
      open
      onOpenChange={(open) => !open && onClose()}
      title="첨부파일 미리보기"
      closeLabel="첨부파일 미리보기 닫기"
      size="md"
      onConfirm={onClose}
      confirmButtonProps={{
        className: css({ '&&': { w: '40', _mobile: { w: '32' } } }),
      }}
    >
      <Carousel itemCount={attachments.length} initialIndex={initialIndex}>
        <CarouselViewport mode="mobile" mobileItemGutter={0} freeMode={false} showScrollbar={false}>
          {attachments.map((attachment) => (
            <Stack key={attachment.name} alignItems="center" gap="4">
              <Square
                size="240px"
                maxW="100%"
                bg="black.10"
                border="1px solid token(colors.black.20)"
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
              <Typography variant="body5" tone="tertiary">
                {attachment.name}
              </Typography>
            </Stack>
          ))}
        </CarouselViewport>
        <CarouselPagination
          className={css({ display: 'flex', justifyContent: 'center', gap: '2', pt: '6' })}
          label="첨부파일 선택"
        />
      </Carousel>
    </SingleActionDialog>
  );
}
