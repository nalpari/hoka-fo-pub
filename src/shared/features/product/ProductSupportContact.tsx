import { css } from 'styled-system/css';
import { Grid, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const textLink = css({
  color: 'text.primary',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  _focusVisible: { outline: '2px solid', outlineOffset: '4px' },
});

export function ProductSupportContact() {
  return (
    <Grid
      gridTemplateColumns="minmax(0, 1fr) minmax(0, 2fr)"
      gap="6"
      pb="6"
      borderBottom="1px solid token(colors.border.default)"
      _mobile={{ gridTemplateColumns: '1fr', gap: '3' }}
    >
      <Typography as="h4" variant="body5" weight="bold">
        호카 온라인 스토어 고객센터
      </Typography>
      <Stack gap="2">
        <Typography as="p" variant="body5">
          TEL.{' '}
          <a href="tel:15660086" className={textLink}>
            1566-0086
          </a>
        </Typography>
        <Typography as="p" variant="body5" tone="tertiary">
          1:1 문의를 이용하시면 조금 더 빠르게 답변 받으실 수 있습니다.
        </Typography>
        <Typography as="p" variant="body5" weight="bold">
          운영시간
        </Typography>
        <Typography as="p" variant="body5" tone="tertiary">
          평일 10:00~17:00 (점심시간 12:00~13:00) / 토·일요일 및 공휴일 휴무
        </Typography>
      </Stack>
    </Grid>
  );
}
