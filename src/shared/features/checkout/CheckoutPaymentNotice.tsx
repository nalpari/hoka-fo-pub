import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export function CheckoutPaymentNotice() {
  return (
    <Stack gap="2" pt="4" borderTop="1px solid var(--colors-black-20)">
      <Typography variant="body5" tone="subtle">
        아래 [결제하기] 버튼을 클릭하면 선택한 결제방법에 맞는 결제 창이 나타납니다.
      </Typography>
      <Typography variant="body5" tone="subtle">
        결제 창을 통해 입력되는 고객님의 정보는 안전하게 암호화되어 전송됩니다.
      </Typography>
      <Typography variant="body5" tone="subtle">
        결제 신청 시 승인 진행에 다소 시간이 소요될 수 있으므로 결과 화면이 나타날 때까지 기다려
        주십시오.
      </Typography>
    </Stack>
  );
}
