'use client';
import { type ReactNode } from 'react';
import { usePlatform } from '@/context/platform';

import { Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { StatusMessage } from '@/components/common/atoms/StatusMessage';
import { Typography } from '@/components/common/atoms/Typography';

import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { VerificationCountdown } from '@/components/common/molecules/FormFields/VerificationCountdown';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { IdConfirmationMessage } from '@/components/find-account/IdConfirmationMessage';
type FindAccountNotice = {
  tone: 'error' | 'info';
  message: string;
};
type FindAccountContentProps = {
  name: string;
  phone: string;
  code: string;
  requested: boolean;
  secondsLeft: number;
  nameError: string;
  phoneError: string;
  codeError?: string;
  notice: FindAccountNotice | null;
  result?: ReactNode;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  onConfirmCode?: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
/** 고정 상태와 기본 화면이 공유하는 표시 UI입니다. (Shares presentation between fixed states and the default screen.) */
export function FindAccountContent({
  name,
  phone,
  code,
  requested,
  secondsLeft,
  nameError,
  phoneError,
  codeError,
  notice,
  result,
  onNameChange,
  onPhoneChange,
  onCodeChange,
  onConfirmCode,
  onSubmit,
}: FindAccountContentProps) {
  return (
    <AccountPageLayout
      contentAs="section"
      contentLabelledBy="find-account-title"
      outsideContent={result}
    >
      <ContentSection
        gap={{ base: '10', _mobile: '8' }}
        title="아이디 / 비밀번호 찾기"
        headerProps={{
          titleAs: 'h1',
          titleProps: { web: 'heading7', mo: 'heading5', id: 'find-account-title' },
          description:
            '회원 가입 시 사용하신 휴대폰 번호를 통해 아이디 / 비밀번호를 찾으실 수 있습니다.',
          descriptionProps: { variant: 'body3', tone: 'tertiary' },
          gap: { base: '10px', _mobile: '3' },
        }}
      >
        <form noValidate onSubmit={onSubmit} aria-labelledby="find-account-title">
          <Stack gap="6">
            <Stack gap="4">
              <TextFormField
                variant="boxed"
                id="find-account-name"
                label="이름"
                error={nameError}
                required
                inputProps={{
                  name: 'name',
                  autoComplete: 'name',
                  placeholder: '이름을 입력해 주세요',
                  value: name,
                  onChange: (event) => onNameChange(event.target.value),
                }}
              />
              <TextFormField
                variant="boxed"
                id="find-account-phone"
                label="휴대폰 번호"
                error={phoneError}
                required
                inputProps={{
                  name: 'tel',
                  type: 'tel',
                  inputMode: 'numeric',
                  autoComplete: 'tel-national',
                  placeholder: '휴대폰번호를 입력해 주세요',
                  value: phone,
                  onChange: (event) => onPhoneChange(event.target.value),
                }}
              />
            </Stack>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={requested && secondsLeft > 0}
            >
              {requested ? '인증번호 재요청' : '인증번호 요청'}
            </Button>
            {requested ? (
              <>
                <Stack gap="2">
                  <TextFormField
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
                <Button type="button" variant="primary" fullWidth onClick={onConfirmCode}>
                  인증번호 확인
                </Button>
              </>
            ) : null}
            {notice ? <StatusMessage tone={notice.tone}>{notice.message}</StatusMessage> : null}
          </Stack>
        </form>
      </ContentSection>
    </AccountPageLayout>
  );
}
type IdConfirmationModalProps = {
  accountId?: string;
  userName?: string;
  onOpenChange: (open: boolean) => void;
  onPasswordReset: () => void;
  onConfirm: () => void;
};
/** 아이디 확인 안내를 재사용 가능한 반응형 모달로 표시합니다. (Displays account lookup guidance in a reusable responsive modal.) */
function IdConfirmationModal({
  accountId,
  userName,
  onOpenChange,
  onPasswordReset,
  onConfirm,
}: IdConfirmationModalProps) {
  const platform = usePlatform();
  return (
    <ModalDialog
      open
      size="md"
      onOpenChange={onOpenChange}
      title={platform === 'mobile' ? 'HOKA Korea 회원 안내' : '아이디 / 비밀번호 찾기'}
      closeLabel="안내 닫기"
      mobilePresentation="fullscreen"
      actions={{
        kind: 'confirm',
        fullWidth: false,
        direction: platform === 'mobile' ? 'vertical' : 'horizontal',
        cancelLabel: '비밀번호 재설정',
        onCancel: onPasswordReset,
        onConfirm: onConfirm,
      }}
    >
      <IdConfirmationMessage userName={userName} accountId={accountId} />
    </ModalDialog>
  );
}
export const routePreviewComponents = { IdConfirmationModal } satisfies Pick<
  typeof import('@/types/component-contracts/app-login-find-account-page'),
  'IdConfirmationModal'
>;
