import { MarketingConsentSummaryModal as ConsentSummary } from '@/shared/components/organisms/Account/MarketingConsentSummaryModal';
import type { MarketingPreferences } from './RegistrationContent';

type Props = {
  preferences: MarketingPreferences;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

const preferenceLabel = (value: string) => (value === 'yes' ? '수신' : '수신안함');

export function MarketingConsentSummaryModal({ preferences, onOpenChange, onConfirm }: Props) {
  return (
    <ConsentSummary
      open
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      items={[
        { label: '이메일 수신', value: preferenceLabel(preferences.email) },
        { label: '모바일 쿠폰북', value: preferenceLabel(preferences.coupon) },
        { label: '문자,카카오톡 수신', value: preferenceLabel(preferences.sms) },
      ]}
    />
  );
}
