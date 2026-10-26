import { PreferenceField } from '@/shared/components/molecules/FormFields/PreferenceField';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
};

export function RegistrationPreferenceRow({ label, value, onValueChange }: Props) {
  return (
    <PreferenceField
      label={label}
      ariaLabel={label}
      value={value}
      onValueChange={onValueChange}
      options={[
        { value: 'yes', label: <Typography variant="body4">수신</Typography> },
        { value: 'no', label: <Typography variant="body4">수신안함</Typography> },
      ]}
    />
  );
}
