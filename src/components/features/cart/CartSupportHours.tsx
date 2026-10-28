import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';
import { Typography } from '@/components/common/atoms/Typography/Typography';

/** 고객센터 운영시간과 휴무 안내를 표시합니다. (Displays support opening hours and closure information.) */
export function CartSupportHours() {
  return (
    <>
      <ContentHeader titleAs="h3" title={<>운영시간</>} titleProps={{ variant: 'heading7' }} />
      <Typography variant="body5">평일 09:00 ~ 18:00</Typography>
      <Typography variant="body5" tone="tertiary">
        *점심시간은 12:00~13:00이며 토,일, 공휴일은 휴무입니다.
      </Typography>
    </>
  );
}
