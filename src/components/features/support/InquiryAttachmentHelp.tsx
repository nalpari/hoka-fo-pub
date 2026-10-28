import { Typography } from '@/components/common/atoms/Typography/Typography';

export function InquiryAttachmentHelp() {
  return (
    <Typography as="p" id="inquiry-files-help" variant="body5" tone="tertiary">
      - JPG, JPEG, PNG 파일만 첨부할 수 있습니다.
      <br />- 최대 5개까지 첨부 가능하며, 파일당 용량은 10MB 이하입니다.
    </Typography>
  );
}
