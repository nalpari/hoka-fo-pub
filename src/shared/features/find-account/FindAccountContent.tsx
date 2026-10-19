import { Box, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export type FindAccountNotice = { tone: 'error' | 'info'; message: string };

type FindAccountContentProps = {
  name: string;
  phone: string;
  code: string;
  requested: boolean;
  secondsLeft: number;
  nameError: string;
  phoneError: string;
  notice: FindAccountNotice | null;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  onConfirmCode: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function FindAccountContent({
  name,
  phone,
  code,
  requested,
  secondsLeft,
  nameError,
  phoneError,
  notice,
  onNameChange,
  onPhoneChange,
  onCodeChange,
  onConfirmCode,
  onSubmit,
}: FindAccountContentProps) {
  return (
    <Box as="main" pt="10" px="4" pb="8" minH="calc(100svh - var(--layout-site-header-height))">
      <Stack as="section" maxW="420px" mx="auto" gap="0" aria-labelledby="find-account-title">
        <Stack gap="3" mb="6">
          <Typography as="h1" variant="headingKr6" id="find-account-title">
            아이디 / 비밀번호 찾기
          </Typography>
          <Typography as="p" variant="body3" tone="tertiary">
            회원 가입 시 사용하신 휴대폰 번호를 통해 아이디 / 비밀번호를 찾으실 수 있습니다.
          </Typography>
        </Stack>

        <form noValidate onSubmit={onSubmit} aria-labelledby="find-account-title">
          <Stack gap="2">
            <FormField
              variant="boxed"
              htmlFor="find-account-name"
              label="이름"
              error={nameError}
              required
            >
              <TextInput
                id="find-account-name"
                name="name"
                autoComplete="name"
                placeholder="이름을 입력해 주세요"
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
              />
            </FormField>
            <FormField
              variant="boxed"
              htmlFor="find-account-phone"
              label="휴대폰번호"
              error={phoneError}
              required
            >
              <TextInput
                id="find-account-phone"
                name="tel"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="휴대폰번호를 입력해 주세요"
                value={phone}
                onChange={(event) => onPhoneChange(event.target.value)}
              />
            </FormField>
          </Stack>
          <Box mt="6">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={requested && secondsLeft > 0}
            >
              {requested ? '인증번호 재요청' : '인증번호 요청'}
            </Button>
          </Box>
          {requested ? (
            <>
              <Box mt="6">
                <FormField variant="boxed" htmlFor="find-account-code" label="인증번호">
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
              </Box>
              <Stack gap="2" mt="2">
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
              <Box mt="6">
                <Button type="button" variant="primary" fullWidth onClick={onConfirmCode}>
                  인증번호 확인
                </Button>
              </Box>
            </>
          ) : null}
          {notice ? (
            <Box mt="4">
              <StatusMessage tone={notice.tone}>{notice.message}</StatusMessage>
            </Box>
          ) : null}
        </form>
      </Stack>
    </Box>
  );
}
