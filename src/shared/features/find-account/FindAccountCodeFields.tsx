import { Stack } from 'styled-system/jsx';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = {
  code: string;
  codeError?: string;
  secondsLeft: number;
  onCodeChange: (value: string) => void;
};

export function FindAccountCodeFields({ code, codeError, secondsLeft, onCodeChange }: Props) {
  return (
    <Stack gap="2">
      <FormField
        variant="boxed"
        htmlFor="find-account-code"
        label="인증번호"
        required
        error={codeError}
      >
        <TextInput
          id="find-account-code"
          name="code"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="인증번호 6자리를 입력해 주세요"
          value={code}
          onChange={(event) => onCodeChange(event.target.value)}
        />
      </FormField>
      <Stack gap="2">
        <Typography as="p" variant="body5" tone="error">
          남은 시간{' '}
          {Math.floor(secondsLeft / 60)
            .toString()
            .padStart(2, '0')}
          :{(secondsLeft % 60).toString().padStart(2, '0')}초
        </Typography>
        <Typography as="p" variant="body5" tone="tertiary">
          입력하신 휴대폰으로 전송된 인증번호를 입력해주세요.
          <br />
          인증번호가 도착하지 않은 경우 3분 뒤 재요청을 눌러주세요
        </Typography>
      </Stack>
    </Stack>
  );
}
