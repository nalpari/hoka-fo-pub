import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { css } from 'styled-system/css';

import { SingleActionDialog } from '@/components/common/molecules/SingleActionDialog/SingleActionDialog';

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
    >
      <ContentHeader
        gap="4"
        titleAs="h2"
        title="마케팅 정보 수신 내역"
        titleProps={{ variant: 'body2', className: css({ m: '0' }) }}
        description={<>{items.map(({ label, value }) => `${label} : ${value}`).join('\n')}</>}
        descriptionProps={{ variant: 'body4', className: summaryStyle }}
      />
    </SingleActionDialog>
  );
}
