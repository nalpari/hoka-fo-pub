import { css } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';

import { Radio, type RadioProps } from '@/components/common/atoms/Radio/Radio';
import { Typography } from '@/components/common/atoms/Typography/Typography';

type Props<T extends string> = RadioProps<T> & {
  label?: string;
  multilineLabel?: boolean;
};

const inlineRadio = css({ display: 'flex!', gap: '6', flexShrink: '0' });

const multiline = css({ whiteSpace: 'pre-line' });

export function PreferenceField<T extends string>({ label, multilineLabel, ...props }: Props<T>) {
  if (label === undefined) return <Radio {...props} />;

  return (
    <HStack justify="space-between" gap="3" alignItems="start">
      <Box flex="1" minW="0">
        <Typography variant="body4" className={multilineLabel ? multiline : undefined}>
          {label}
        </Typography>
      </Box>
      <Radio {...props} className={[inlineRadio, props.className].filter(Boolean).join(' ')} />
    </HStack>
  );
}
