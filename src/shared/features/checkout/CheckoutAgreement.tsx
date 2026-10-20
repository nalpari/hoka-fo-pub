import { css } from 'styled-system/css';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type CheckoutAgreementProps = {
  agreed: boolean;
  error: boolean;
  onAgreedChange: (agreed: boolean) => void;
};

export function CheckoutAgreement({ agreed, error, onAgreedChange }: CheckoutAgreementProps) {
  return (
    <>
      <Checkbox
        checked={agreed}
        onCheckedChange={onAgreedChange}
        label={<Typography variant="body4">주문 내용을 확인하였으며 결제에 동의합니다.</Typography>}
      />
      {error ? (
        <Typography
          as="p"
          variant="body5"

          className={css({ color: 'red.100' })}
          role="alert"
        >
          주문 내용 확인 및 결제 동의가 필요합니다.
        </Typography>
      ) : null}
    </>
  );
}
