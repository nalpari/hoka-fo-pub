import { css } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { MarketingPreferences } from './registration.types';

const styles = {
  smsLabel: css({ whiteSpace: 'pre-line' }),
  radio: css({ display: 'flex!', gap: '6', flexShrink: '0' }),
};

type Props = {
  preferenceKey: keyof MarketingPreferences;
  label: string;
  yes?: string;
  no?: string;
  value: string;
  onValueChange: (value: string) => void;
};

export function RegistrationPreferenceRow({
  preferenceKey: key,
  label,
  yes = '수신',
  no = '수신안함',
  value,
  onValueChange,
}: Props) {
  return (
    <HStack justify="space-between" gap="3" alignItems="start">
      <Box w={key === 'sms' ? '176px' : undefined} flexShrink={key === 'sms' ? '0' : undefined}>
        <Typography variant="body4" className={key === 'sms' ? styles.smsLabel : undefined}>
          {label}
        </Typography>
      </Box>
      <Radio
        className={styles.radio}
        ariaLabel={label}
        value={value}
        onValueChange={onValueChange}
        options={[
          { value: 'yes', label: <Typography variant="body4">{yes}</Typography> },
          { value: 'no', label: <Typography variant="body4">{no}</Typography> },
        ]}
      />
    </HStack>
  );
}
