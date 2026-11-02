'use client';
import { type FormEventHandler, type ReactNode } from 'react';

import { css } from 'styled-system/css';

import { Button } from '@/components/common/atoms/Button';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { type Errors, type FieldName } from '@/lib/passwordValidation';
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
export const routePreviewComponents = { PasswordResetCompleteModal } satisfies Pick<
  typeof import('@/types/component-contracts/app-login-find-account-password-reset-page'),
  'PasswordResetCompleteModal'
>;
