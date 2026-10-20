import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function InquiryAttachmentHelp() {
  return (
    <Typography as="p" id="inquiry-files-help" variant="body5" tone="tertiary">
      - 파일을 첨부해 주세요. 첨부 가능한 파일 형식 및 용량을 확인해 주세요.
      <br />
      - JPG, PNG, PDF 등 지원 가능한 파일을 첨부해 주세요.
      <br />
      - 파일은 최대 5개까지 첨부할 수 있습니다.
      <br />- 첨부파일은 파일당 최대 10MB까지 등록 가능합니다.
    </Typography>
  );
}
