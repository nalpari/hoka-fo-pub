import { PreferenceField } from '@/shared/components/molecules/FormFields/PreferenceField';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { MarketingPreferences } from './registration.types';

type Props = {
  preferenceKey: keyof MarketingPreferences;
  label: string;
  yes?: string;
  no?: string;
  value: string;
  onValueChange: (value: string) => void;
};

export function RegistrationPreferenceRow({
  preferenceKey,
  label,
  yes = '수신',
  no = '수신안함',
  value,
  onValueChange,
}: Props) {
  return (
    <PreferenceField
      label={label}
      ariaLabel={label}
      multilineLabel={preferenceKey === 'sms'}
      value={value}
      onValueChange={onValueChange}
      options={[
        { value: 'yes', label: <Typography variant="body4">{yes}</Typography> },
        { value: 'no', label: <Typography variant="body4">{no}</Typography> },
      ]}
    />
  );
}
