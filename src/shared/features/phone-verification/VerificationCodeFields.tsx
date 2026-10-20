import { VerificationCountdown } from '@/shared/components/molecules/FormFields/VerificationCountdown';
import { Box } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { PhoneVerificationContentProps } from './phone-verification.types';
import { VerificationCodeField } from '@/shared/components/molecules/FormFields/VerificationCodeField';

type Props = Pick<
  PhoneVerificationContentProps,
  'code' | 'codeError' | 'secondsLeft' | 'onCodeChange'
>;

export function VerificationCodeFields(props: Props) {
  const { code, secondsLeft } = props;
  return (
    <>
      <Box mt="2">
        <VerificationCodeField
          variant="boxed"
          id="phone-code"
          label="인증번호"
          required
          error={props.codeError}
          inputProps={{
            inputMode: 'numeric',
            autoComplete: 'one-time-code',
            maxLength: 6,
            placeholder: '인증번호 6자리를 입력해 주세요',
            value: code,
            onChange: (event) => props.onCodeChange(event.target.value),
          }}
        />
      </Box>
      <Box mt="-2">
        <VerificationCountdown secondsLeft={secondsLeft} />
      </Box>
      <Box mb="2">
        <Typography as="p" variant="body5">
          입력하신 휴대폰번호로 전송된 인증번호를 입력해주세요. 3분 이내에 인증번호 6자리를
          입력하셔야 하며, 인증번호가 오지 않을 경우 3분 후 재요청을 눌러주세요.
        </Typography>
      </Box>
      <Button variant="primary" type="submit" fullWidth>
        인증번호 확인
      </Button>
    </>
  );
}
