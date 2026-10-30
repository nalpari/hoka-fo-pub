'use client';

import { useRouter } from 'next/navigation';

import { useContext } from 'react';
import { type FormEvent, type FormEventHandler, type ReactNode, useState } from 'react';
import { AccountServicesContext, useAccountFlow } from '@/context/AccountFlowContext';
import { useRequestAction } from '@/hooks/useRequestAction';

import { css } from 'styled-system/css';

import { Button } from '@/components/common/atoms/Button';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import {
  type Errors,
  type FieldName,
  validatePasswordReset as validate,
} from '@/lib/passwordValidation';

const styles = {
  input: css({ minW: '0' }),
};

type Props = {
  name: FieldName;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

function PasswordResetField({ name, label, placeholder, value, error, onChange }: Props) {
  return (
    <TextFormField
      variant="boxed"
      error={error}
      id={`password-reset-${name}`}
      label={label}
      required
      inputProps={{
        className: styles.input,
        name: name,
        type: 'password',
        autoComplete: 'new-password',
        placeholder: placeholder,
        value: value,
        onChange: (event) => onChange(event.target.value),
        required: true,
      }}
    />
  );
}

const PasswordResetContentStyles = {
  form: css({ display: 'flex', flexDirection: 'column', gap: '4' }),
  button: css({
    mt: '2',
  }),
};

type PasswordResetContentProps = {
  password: string;
  confirmation: string;
  errors: Errors;
  completion: ReactNode;
  onFieldChange: (field: FieldName, value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

/** 고정 상태와 기본 화면이 공유하는 표시 UI입니다. (Shares presentation between fixed states and the default screen.) */
export function PasswordResetContent({
  password,
  confirmation,
  errors,
  completion,
  onFieldChange,
  onSubmit,
}: PasswordResetContentProps) {
  return (
    <AccountPageLayout
      contentAs="section"
      contentLabelledBy="password-reset-title"
      pageCss={css.raw({
        px: '4',
        _mobile: { minH: 'calc(100svh - var(--layout-site-header-height))' },
      })}
      contentCss={css.raw({ display: 'flex', flexDirection: 'column', gap: '0' })}
      outsideContent={completion}
    >
      <ContentSection
        gap={{ base: '10', _mobile: '8' }}
        header={
          <ContentHeader
            titleAs="h1"
            titleProps={{ web: 'heading7', mo: 'heading5', id: 'password-reset-title' }}
            descriptionProps={{ variant: 'body3', tone: 'tertiary' }}
            title="비밀번호 재설정"
            description="새로운 비밀번호를 사용하여 로그인을 진행합니다. 새로운 비밀번호를 설정해주세요."
            css={css.raw({ gap: '10px' })}
          />
        }
      >
        <form
          noValidate
          className={PasswordResetContentStyles.form}
          onSubmit={onSubmit}
          aria-labelledby="password-reset-title"
        >
          <PasswordResetField
            name="password"
            label="새로운 비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            error={errors.password}
            onChange={(value) => onFieldChange('password', value)}
          />
          <PasswordResetField
            name="confirmation"
            label="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력해 주세요"
            value={confirmation}
            error={errors.confirmation}
            onChange={(value) => onFieldChange('confirmation', value)}
          />
          <Button
            type="submit"
            variant="primary"
            fullWidth
            className={PasswordResetContentStyles.button}
          >
            비밀번호 변경
          </Button>
        </form>
      </ContentSection>
    </AccountPageLayout>
  );
}

type PasswordResetCompleteModalProps = {
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

/** 고정 상태와 기본 화면이 공유하는 표시 UI입니다. (Shares presentation between fixed states and the default screen.) */
export function PasswordResetCompleteModal({
  onOpenChange,
  onConfirm,
}: PasswordResetCompleteModalProps) {
  return (
    <ModalDialog
      open
      onOpenChange={onOpenChange}
      title="비밀번호 재설정"
      closeLabel="비밀번호 변경 완료 안내 닫기"
      size="md"
      actions={{ kind: 'single', onConfirm: onConfirm }}
    >
      <ContentHeader
        gap="4"
        titleAs="h2"
        title="비밀번호 변경완료"
        titleProps={{ variant: 'body2' }}
        description="비밀번호 변경이 완료되었습니다."
        descriptionProps={{ variant: 'body4' }}
      />
    </ModalDialog>
  );
}

/** 새 비밀번호 입력 검증과 재설정 예시 흐름을 관리합니다. (Manages new-password validation and the example reset flow.) */
export function RouteContent() {
  const services = useContext(AccountServicesContext);
  const flow = useAccountFlow();
  const request = useRequestAction();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = validate(password, confirmation);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    void request.run(async () => {
      if (services) {
        if (!flow?.recovery?.resetProof)
          throw new Error('본인인증이 만료되었습니다. 계정 찾기에서 다시 인증해 주세요.');
        await services.recovery.resetPassword({ resetProof: flow.recovery.resetProof, password });
        flow.setRecovery(null);
      }
      setCompleteOpen(true);
    });
  };

  const updateField = (field: FieldName, value: string) => {
    const nextPassword = field === 'password' ? value : password;
    const nextConfirmation = field === 'confirmation' ? value : confirmation;
    if (field === 'password') {
      setPassword(value);
    } else {
      setConfirmation(value);
    }
    setTouched((previous) => ({ ...previous, [field]: true }));
    const nextErrors = validate(nextPassword, nextConfirmation);
    if (field === 'password' && !touched.confirmation && !submitted) {
      delete nextErrors.confirmation;
    }
    setErrors(nextErrors);
  };

  return (
    <>
      <BindingFeedback pending={request.pending} error={request.error} />
      <fieldset disabled={request.pending} className={css({ border: 0, p: 0, m: 0, minW: 0 })}>
        <PasswordResetContent
          password={password}
          confirmation={confirmation}
          errors={errors}
          onFieldChange={updateField}
          onSubmit={submit}
          completion={
            completeOpen ? (
              <PasswordResetCompleteModal
                onOpenChange={(open) => {
                  setCompleteOpen(open);
                  if (!open) router.push('/login');
                }}
                onConfirm={() => router.push('/login')}
              />
            ) : null
          }
        />
      </fieldset>
    </>
  );
}

export const routePreviewComponents = { PasswordResetCompleteModal } satisfies Pick<
  typeof import('@/types/component-contracts/app-login-find-account-password-reset-page'),
  'PasswordResetCompleteModal'
>;
