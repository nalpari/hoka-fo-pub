'use client';

import { useRouter } from 'next/navigation';

import { useContext, useRef } from 'react';
import { type FormEvent, type ReactNode, useState } from 'react';
import { AccountServicesContext, useAccountFlow } from '@/context/AccountFlowContext';
import { usePlatform } from '@/context/platform';
import { useRequestAction } from '@/hooks/useRequestAction';
import { useVerificationCountdown } from '@/lib/useVerificationCountdown';

import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { StatusMessage } from '@/components/common/atoms/StatusMessage';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { VerificationCountdown } from '@/components/common/molecules/FormFields/VerificationCountdown';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { IdConfirmationMessage } from '@/components/find-account/IdConfirmationMessage';
import { getPhoneDigits, isValidPhone } from '@/lib/phoneNumber';
import { isValidName } from '@/lib/validation';

type Props = {
  name: string;
  phone: string;
  nameError: string;
  phoneError: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
};

function FindAccountIdentityFields({
  name,
  phone,
  nameError,
  phoneError,
  onNameChange,
  onPhoneChange,
}: Props) {
  return (
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
  );
}

type FindAccountCodeFieldsProps = {
  code: string;
  codeError?: string;
  secondsLeft: number;
  onCodeChange: (value: string) => void;
};

function FindAccountCodeFields({
  code,
  codeError,
  secondsLeft,
  onCodeChange,
}: FindAccountCodeFieldsProps) {
  return (
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
  );
}

type FindAccountNotice = { tone: 'error' | 'info'; message: string };

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
  onConfirmCode: () => void;
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
      pageCss={css.raw({
        px: '4',
        minH: '600px',
        _mobile: { minH: 'calc(100svh - var(--layout-site-header-height))' },
      })}
      contentCss={css.raw({ display: 'flex', flexDirection: 'column', gap: '0' })}
      outsideContent={result}
    >
      <ContentSection
        gap={{ base: '10', _mobile: '8' }}
        header={
          <ContentHeader
            titleAs="h1"
            titleProps={{ web: 'heading7', mo: 'heading5', id: 'find-account-title' }}
            descriptionProps={{ variant: 'body3', tone: 'tertiary' }}
            title="아이디 / 비밀번호 찾기"
            description="회원 가입 시 사용하신 휴대폰 번호를 통해 아이디 / 비밀번호를 찾으실 수 있습니다."
            css={css.raw({
              gap: { base: '10px', _mobile: '3' },
            })}
          />
        }
      >
        <form noValidate onSubmit={onSubmit} aria-labelledby="find-account-title">
          <Stack gap="6">
            <FindAccountIdentityFields
              name={name}
              phone={phone}
              nameError={nameError}
              phoneError={phoneError}
              onNameChange={onNameChange}
              onPhoneChange={onPhoneChange}
            />
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
                <FindAccountCodeFields
                  code={code}
                  codeError={codeError}
                  secondsLeft={secondsLeft}
                  onCodeChange={onCodeChange}
                />
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

const demoVerificationCode = '900668';

/** 계정 찾기 입력과 인증 예시 흐름을 관리합니다. (Manages account recovery inputs and the example verification flow.) */
export function RouteContent() {
  const services = useContext(AccountServicesContext);
  const flow = useAccountFlow();
  const request = useRequestAction();
  const [requestId, setRequestId] = useState('');
  const generation = useRef(0);
  const router = useRouter();
  const [resultOpen, setResultOpen] = useState(false);
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const { deadline, secondsLeft, start, reset } = useVerificationCountdown();
  const [notice, setNotice] = useState<FindAccountNotice | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextNameError = isValidName(name) ? '' : '이름을 올바르게 입력해주세요';
    const nextPhoneError = isValidPhone(phone) ? '' : '휴대폰 번호를 올바르게 입력해주세요';

    setNameTouched(true);
    setNameError(nextNameError);
    setPhoneError(nextPhoneError);
    setNotice(null);
    setCodeError('');

    if (nextNameError || nextPhoneError) {
      return;
    }

    if (services) {
      const version = generation.current;
      void request.run(async () => {
        const result = await services.recovery.request({ name, phone });
        if (version !== generation.current) return;
        setRequestId(result.requestId);
        start(result.expiresInSeconds);
        setCode('');
        setNotice({ tone: 'info', message: '인증번호를 발송했습니다.' });
      });
      return;
    }
    setCode('');
    start();
    setNotice({
      tone: 'info',
      message: `데모 인증번호는 ${demoVerificationCode}입니다. 실제 문자는 발송되지 않으며 예시 아이디가 표시됩니다.`,
    });
  };

  return (
    <FindAccountContent
      name={name}
      phone={phone}
      code={code}
      requested={deadline !== null}
      secondsLeft={secondsLeft}
      nameError={nameTouched ? nameError : ''}
      phoneError={phoneError}
      codeError={codeError}
      notice={
        request.error
          ? { tone: 'error', message: request.error }
          : request.pending
            ? { tone: 'info', message: '요청을 처리하고 있습니다.' }
            : notice
      }
      result={
        resultOpen ? (
          <IdConfirmationModal
            userName={name}
            accountId={services ? (flow?.recovery?.maskedAccountId ?? '') : undefined}
            onOpenChange={setResultOpen}
            onConfirm={() => router.push('/login')}
            onPasswordReset={() => router.push('/login/find-account/password-reset')}
          />
        ) : null
      }
      onNameChange={(value) => {
        generation.current += 1;
        flow?.setRecovery(null);
        setRequestId('');
        setName(value);
        setNameTouched(true);
        setNameError(!value.trim() || isValidName(value) ? '' : '이름을 올바르게 입력해주세요');
        reset();
        setCode('');
        setCodeError('');
        setNotice(null);
      }}
      onPhoneChange={(value) => {
        generation.current += 1;
        flow?.setRecovery(null);
        setRequestId('');
        const formattedValue = getPhoneDigits(value);
        setPhone(formattedValue);
        setPhoneError(
          !formattedValue || isValidPhone(formattedValue)
            ? ''
            : '휴대폰 번호를 올바르게 입력해주세요',
        );
        reset();
        setCode('');
        setCodeError('');
        setNotice(null);
      }}
      onCodeChange={(value) => {
        setCode(value.replace(/\D/g, '').slice(0, 6));
        setCodeError('');
        setNotice(null);
      }}
      onConfirmCode={() => {
        if (deadline === null) return;
        if (secondsLeft === 0) {
          setCodeError('');
          setNotice({
            tone: 'error',
            message: '인증 시간이 만료되었습니다. 인증번호를 재요청해 주세요.',
          });
          return;
        }
        if (!/^\d{6}$/.test(code)) {
          setCodeError('인증번호 6자리를 입력해 주세요.');
          setNotice(null);
          return;
        }
        if (services) {
          const version = generation.current;
          void request.run(async () => {
            if (!flow || !requestId) throw new Error('인증번호를 다시 요청해 주세요.');
            const result = await services.recovery.verify({ requestId, name, phone, code });
            if (version !== generation.current) return;
            if (result.accountLocked) {
              router.push('/login/account-locked');
              return;
            }
            flow.setRecovery({ ...result, displayName: name });
            setResultOpen(true);
          });
          return;
        }
        if (code !== demoVerificationCode) {
          setCodeError('인증번호가 일치하지 않습니다.');
          setNotice(null);
          return;
        }
        setCodeError('');
        setNotice(null);
        setResultOpen(true);
      }}
      onSubmit={handleSubmit}
    />
  );
}

export const routePreviewComponents = { IdConfirmationModal } satisfies Pick<
  typeof import('@/types/component-contracts/app-login-find-account-page'),
  'IdConfirmationModal'
>;
