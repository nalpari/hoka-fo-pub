import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import type { MarketingPreferences } from './RegistrationContent';

const styles = {
  dialog: css({ maxW: '360px!' }),
  body: css({ gap: '4' }),
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
      size="sm"
      popupClassName={styles.dialog}
    >
      <Stack className={styles.body}>
        <Typography as="h2" variant="bodyKr3" className={styles.heading}>
          마케팅 정보 수신 내역
        </Typography>
        <Typography as="p" variant="bodyKr3" className={styles.summary}>
          {summary}
        </Typography>
        <Button variant="primary" fullWidth className={styles.button} onClick={onConfirm}>
          확인
        </Button>
      </Stack>
    </ModalDialog>
  );
}
