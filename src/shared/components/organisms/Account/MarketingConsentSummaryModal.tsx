import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { SingleActionDialog } from '@/shared/components/molecules/SingleActionDialog/SingleActionDialog';

export type MarketingConsentItem = { label: string; value: string };

export type MarketingConsentSummaryModalProps = {
  open: boolean;
  items: readonly MarketingConsentItem[];
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

const summaryStyle = css({ m: '0', whiteSpace: 'pre-line' });

export function MarketingConsentSummaryModal({
  open,
  items,
  onOpenChange,
  onConfirm,
}: MarketingConsentSummaryModalProps) {
  return (
    <SingleActionDialog
      open={open}
      onOpenChange={onOpenChange}
      title="마케팅 정보 수신내역 안내"
      closeLabel="마케팅 정보 수신내역 안내 닫기"
      size="md"
      onConfirm={onConfirm}
      confirmButtonProps={{ fullWidth: true }}
    >
      <Stack gap="4">
        <Typography as="h2" variant="body2" className={css({ m: '0' })}>
          마케팅 정보 수신 내역
        </Typography>
        <Typography as="p" variant="body4" className={summaryStyle}>
          {items.map(({ label, value }) => `${label} : ${value}`).join('\n')}
        </Typography>
      </Stack>
    </SingleActionDialog>
  );
}
