import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import type { MarketingPreferences } from './RegistrationContent';

const styles = {
  heading: css({ m: '0' }),
  summary: css({ m: '0', whiteSpace: 'pre-line' }),
};

type MarketingConsentSummaryModalProps = {
  preferences: MarketingPreferences;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

const preferenceLabel = (value: string) => (value === 'yes' ? '수신' : '수신안함');

export function MarketingConsentSummaryModal({
  preferences,
  onOpenChange,
  onConfirm,
}: MarketingConsentSummaryModalProps) {
  const summary = [
    `이메일 수신 : ${preferenceLabel(preferences.email)}`,
    `모바일 쿠폰북 : ${preferenceLabel(preferences.coupon)}`,
    `문자,카카오톡 수신 : ${preferenceLabel(preferences.sms)}`,
  ].join('\n');

  return (
    <ModalDialog
      open
      onOpenChange={onOpenChange}
      title="마케팅 정보 수신내역 안내"
      closeLabel="마케팅 정보 수신내역 안내 닫기"
      size="md"
      footer={
        <Button variant="primary" fullWidth onClick={onConfirm}>
          확인
        </Button>
      }
    >
      <Stack gap="4">
        <Typography as="h2" variant="body2" className={styles.heading}>
          마케팅 정보 수신 내역
        </Typography>
        <Typography as="p" variant="body4" className={styles.summary}>
          {summary}
        </Typography>
      </Stack>
    </ModalDialog>
  );
}
