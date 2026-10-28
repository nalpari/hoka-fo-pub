import { Typography } from '@/components/common/atoms/Typography/Typography';
import { Stack } from 'styled-system/jsx';

export function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <Stack gap="2">
      <Typography variant="heading7">{label}</Typography>
      <Typography variant="body3" tone="subtle">
        {value}
      </Typography>
    </Stack>
  );
}
