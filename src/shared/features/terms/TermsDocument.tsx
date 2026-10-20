'use client';

import { useState } from 'react';
import { Grid, Stack } from 'styled-system/jsx';
import { TermsDateSelect } from './TermsDateSelect';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const dates = [
  { value: '2026.05.22', label: '2026.05.22' },
  { value: '2026.02.01', label: '2026.02.01' },
  { value: '2025.06.02', label: '2025.06.02' },
] as const;

export function TermsDocument({ privacy }: { privacy: boolean }) {
  const [date, setDate] = useState<string>(dates[0].value);

  return (
    <Stack gap="4" pt="4" px={{ base: '4', _mobile: '0' }}>
      <TermsDateSelect
        name={privacy ? 'privacy-date' : 'terms-date'}
        options={dates}
        value={date}
        onValueChange={setDate}
      />
      <Grid
        gap="normal"
        placeItems="center"
        w="100%"
        h={{ base: '407px', _mobile: '404px' }}
        bg="rgba(0, 0, 0, 0.5)"
        aria-label={privacy ? '개인정보 처리방침 내용' : '이용 약관 내용'}
      >
        <Typography variant="body5" tone="inverse">
          약관내용
        </Typography>
      </Grid>
      {privacy && (
        <Stack gap="0">
          <Typography variant="body5" tone="tertiary">
            - 개인정보 처리방침 버전번호 : v.1.79
          </Typography>
          <Typography variant="body5" tone="tertiary">
            - 개인정보 처리방침 시행일자 : 2026.09.02
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
