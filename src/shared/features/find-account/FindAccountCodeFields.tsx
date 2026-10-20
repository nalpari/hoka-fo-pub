import { VerificationCountdown } from '@/shared/components/molecules/FormFields/VerificationCountdown';
import { Stack } from 'styled-system/jsx';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { VerificationCodeField } from '@/shared/components/molecules/FormFields/VerificationCodeField';

type Props = {
  code: string;
  codeError?: string;
  secondsLeft: number;
  onCodeChange: (value: string) => void;
};

export function FindAccountCodeFields({ code, codeError, secondsLeft, onCodeChange }: Props) {
  return (
    <Stack gap="2">
      <VerificationCodeField
        variant="boxed"
        id="find-account-code"
        label="인증번호"
        required
        error={codeError}
        inputProps={{
          name: 'code',
          inputMode: 'numeric',
          autoComplete: 'one-time-code',
          maxLength: 6,
          placeholder: '인증번호 6자리를 입력해 주세요',
          value: code,
          onChange: (event) => onCodeChange(event.target.value),
        }}
      />
      <Stack gap="2">
        <VerificationCountdown secondsLeft={secondsLeft} />
        <Typography as="p" variant="body5" tone="tertiary">
          입력하신 휴대폰으로 전송된 인증번호를 입력해주세요.
          <br />
          인증번호가 도착하지 않은 경우 3분 뒤 재요청을 눌러주세요
        </Typography>
      </Stack>
    </Stack>
  );
}
