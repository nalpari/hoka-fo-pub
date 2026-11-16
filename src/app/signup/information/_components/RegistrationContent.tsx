'use client';
import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Radio } from '@/components/common/atoms/Radio';
import { StatusMessage } from '@/components/common/atoms/StatusMessage';
import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';

import { AddressFields } from '@/components/common/organisms/Address/AddressFields';
import { EmailAddressFields } from '@/components/common/organisms/EmailAddressFields';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import {
  type RegistrationContentProps,
  type RegistrationInformation,
} from '@/app/signup/information/registration.types';
import { type MarketingPreferences } from '@/app/signup/information/registration.types';
type Props = Pick<RegistrationContentProps, 'information' | 'fieldErrors' | 'onChange'> & {
  fieldKey: keyof RegistrationInformation;
  label: string;
  placeholder: string;
  type?: string;
  fieldId?: string;
  disabled?: boolean;
};
function RegistrationField({
  fieldKey: key,
  label,
  placeholder,
  type = 'text',
  fieldId = `registration-${key}`,
  disabled = false,
  information,
  fieldErrors,
  onChange,
}: Props) {
  const error = fieldErrors[key] ?? '';
  return (
    <TextFormField
      variant="boxed"
      id={fieldId}
      disabled={disabled}
      invalid={Boolean(error)}
      error={error}
      label={<Typography variant="body5">* {label}</Typography>}
      inputProps={{
        type: type,
        disabled: disabled,
        disabledAppearance: disabled ? 'muted' : 'default',
        value: information[key],
        placeholder: placeholder,
        autoComplete:
          key === 'password' || key === 'confirmation'
            ? 'new-password'
            : key === 'name'
              ? 'name'
              : key === 'id'
                ? 'username'
                : key === 'phone'
                  ? 'tel'
                  : 'off',
        onChange: (event) => onChange(key, event.target.value),
      }}
    />
  );
}
type RegistrationIdFieldsProps = Pick<
  RegistrationContentProps,
  'information' | 'fieldErrors' | 'onChange' | 'onDuplicateCheck' | 'duplicateNotice'
>;
/** 회원 아이디를 입력하고 중복확인 동작을 제공합니다. (Collects the member ID and exposes its duplicate-check action.) */
function RegistrationIdFields(props: RegistrationIdFieldsProps) {
  return (
    <Stack gap="6">
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="id"
        label="아이디"
        placeholder="아이디를 입력해주세요"
      />
      <Button variant="primary" fullWidth onClick={props.onDuplicateCheck}>
        아이디 중복확인
      </Button>
      {props.duplicateNotice ? <StatusMessage>{props.duplicateNotice}</StatusMessage> : null}
    </Stack>
  );
}
type RegistrationEmailFieldsProps = Pick<
  RegistrationContentProps,
  'information' | 'fieldErrors' | 'onChange' | 'domainChoice' | 'onDomainChoice'
>;
const options = [
  { value: 'direct', label: '직접입력' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'daum.net', label: 'daum.net' },
];
function RegistrationEmailFields(props: RegistrationEmailFieldsProps) {
  return (
    <EmailAddressFields
      idPrefix="registration"
      local={props.information.email}
      domain={props.information.domain}
      domainChoice={props.domainChoice}
      errors={{ local: props.fieldErrors.email, domain: props.fieldErrors.domain }}
      options={options}
      onLocalChange={(value) => props.onChange('email', value)}
      onDomainChange={(value) => props.onChange('domain', value)}
      onDomainChoice={props.onDomainChoice}
    />
  );
}
type RegistrationPersonalFieldsProps = Pick<
  RegistrationContentProps,
  'information' | 'fieldErrors' | 'onChange'
>;
function RegistrationPersonalFields(props: RegistrationPersonalFieldsProps) {
  return (
    <>
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="name"
        label="이름"
        placeholder="이름을 입력해주세요."
      />
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        type="password"
      />
      <Box mt="-2">
        <Typography as="p" variant="body5">
          연속적인 숫자나 생일, 전화번호 등 추측하기 쉬운 개인정보 및 아이디와 비슷한 전화번호
          사용을 피하시기 바랍니다. 비밀번호는 특수기호를 포함한 3가지 이상을 조합하여 입력해주세요.
        </Typography>
      </Box>
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="confirmation"
        label="비밀번호 재확인"
        placeholder="비밀번호를 다시 입력해주세요"
        type="password"
      />
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="birthDate"
        label="생년월일"
        placeholder="생년월일 8자리를 입력해주세요"
        type="text"
        disabled
      />
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="phone"
        label="휴대폰번호"
        placeholder="휴대폰번호를 입력해주세요"
        type="text"
        disabled
      />
    </>
  );
}
type RegistrationAddressFieldsProps = Pick<
  RegistrationContentProps,
  'information' | 'fieldErrors' | 'onChange' | 'addressOpen' | 'onAddressOpen'
>;
function RegistrationAddressFields(props: RegistrationAddressFieldsProps) {
  return (
    <AddressFields
      variant="boxed"
      idPrefix="registration"
      value={props.information}
      errors={props.fieldErrors}
      onValueChange={props.onChange}
      searchOpen={props.addressOpen}
      onSearchOpenChange={props.onAddressOpen}
    />
  );
}
type RegistrationPreferenceRowProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
};
function RegistrationPreferenceRow({
  label,
  value,
  onValueChange,
}: RegistrationPreferenceRowProps) {
  return (
    <Radio
      label={label}
      ariaLabel={label}
      value={value}
      onValueChange={onValueChange}
      options={[
        { value: 'yes', label: <Typography variant="body4">수신</Typography> },
        { value: 'no', label: <Typography variant="body4">수신안함</Typography> },
      ]}
    />
  );
}
type RegistrationAdditionalFieldsProps = Pick<
  RegistrationContentProps,
  'preferences' | 'onPreferenceChange'
>;
function RegistrationAdditionalFields(props: RegistrationAdditionalFieldsProps) {
  return (
    <Stack gap="6">
      <ContentSection
        as="section"
        gap="6"
        pb="6"
        borderBottom="1px solid var(--color-black-20)"
        title="마케팅 정보 수신 동의"
        headerProps={{
          titleAs: 'h2',
          titleProps: { variant: 'body3', weight: 'bold' },
          pb: '4',
          borderBottom: '1px solid var(--color-black-100)',
        }}
      >
        <Stack gap="6" _mobile={{ gap: '4' }}>
          <RegistrationPreferenceRow
            label="이메일 수신"
            value={props.preferences.email}
            onValueChange={(value) => props.onPreferenceChange('email', value)}
          />
          <RegistrationPreferenceRow
            label="문자수신(LMS, SMS)"
            value={props.preferences.sms}
            onValueChange={(value) => props.onPreferenceChange('sms', value)}
          />
          <RegistrationPreferenceRow
            label="카카오톡 알림톡 수신"
            value={props.preferences.kakao}
            onValueChange={(value) => props.onPreferenceChange('kakao', value)}
          />
        </Stack>
      </ContentSection>
    </Stack>
  );
}
/** 고정 상태와 기본 화면이 공유하는 표시 UI입니다. (Shares presentation between fixed states and the default screen.) */
export function RegistrationContent(props: RegistrationContentProps) {
  return (
    <AccountPageLayout
      title={props.stage === 'information' ? '회원 정보' : '부가 정보'}
      actionsSpacing="compact"
      actions={
        <>
          <Button variant="secondary" fullWidth onClick={props.onCancel}>
            취소
          </Button>
          <Button variant="primary" type="submit" form="registration-form" fullWidth>
            다음
          </Button>
        </>
      }
    >
      <form id="registration-form" noValidate onSubmit={props.onSubmit}>
        <Stack gap="6">
          {props.stage === 'information' ? (
            <>
              <RegistrationIdFields
                information={props.information}
                fieldErrors={props.fieldErrors}
                onChange={props.onChange}
                onDuplicateCheck={props.onDuplicateCheck}
                duplicateNotice={props.duplicateNotice}
              />
              <Stack gap="4">
                <RegistrationPersonalFields
                  information={props.information}
                  fieldErrors={props.fieldErrors}
                  onChange={props.onChange}
                />
                <RegistrationAddressFields
                  information={props.information}
                  fieldErrors={props.fieldErrors}
                  onChange={props.onChange}
                  addressOpen={props.addressOpen}
                  onAddressOpen={props.onAddressOpen}
                />
                <RegistrationEmailFields
                  information={props.information}
                  fieldErrors={props.fieldErrors}
                  onChange={props.onChange}
                  domainChoice={props.domainChoice}
                  onDomainChoice={props.onDomainChoice}
                />
              </Stack>
            </>
          ) : (
            <RegistrationAdditionalFields
              preferences={props.preferences}
              onPreferenceChange={props.onPreferenceChange}
            />
          )}
          {props.notice ? <StatusMessage tone="error">{props.notice}</StatusMessage> : null}
        </Stack>
      </form>
    </AccountPageLayout>
  );
}
type MarketingConsentItem = {
  label: string;
  value: string;
};
type MarketingConsentSummaryModalProps = {
  open: boolean;
  items: readonly MarketingConsentItem[];
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  pending?: boolean;
  error?: string;
};
const summaryStyle = css({ m: '0', whiteSpace: 'pre-line' });
function MarketingConsentSummaryModal({
  open,
  items,
  onOpenChange,
  onConfirm,
  pending,
  error,
}: MarketingConsentSummaryModalProps) {
  return (
    <ModalDialog
      open={open}
      onOpenChange={onOpenChange}
      title="마케팅 정보 수신내역 안내"
      closeLabel="마케팅 정보 수신내역 안내 닫기"
      size="sm"
      actions={{ kind: 'single', onConfirm: onConfirm, buttonProps: { disabled: pending } }}
    >
      <BindingFeedback pending={pending} error={error} />
      <ContentHeader
        gap="4"
        titleAs="h2"
        title="마케팅 정보 수신 내역"
        titleProps={{ variant: 'body2', className: css({ m: '0' }) }}
        description={<>{items.map(({ label, value }) => `${label} : ${value}`).join('\n')}</>}
        descriptionProps={{ variant: 'body4', className: summaryStyle }}
      />
    </ModalDialog>
  );
}
type RegistrationMarketingConsentSummaryModalProps = {
  preferences: MarketingPreferences;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  pending?: boolean;
  error?: string;
};
const preferenceLabel = (value: string) => (value === 'yes' ? '수신' : '수신안함');
/** 고정 상태와 기본 화면이 공유하는 표시 UI입니다. (Shares presentation between fixed states and the default screen.) */
export function RegistrationMarketingConsentSummaryModal({
  preferences,
  onOpenChange,
  onConfirm,
  pending,
  error,
}: RegistrationMarketingConsentSummaryModalProps) {
  return (
    <MarketingConsentSummaryModal
      open
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      pending={pending}
      error={error}
      items={[
        { label: '이메일 수신', value: preferenceLabel(preferences.email) },
        { label: '문자수신(LMS, SMS)', value: preferenceLabel(preferences.sms) },
        { label: '카카오톡 알림톡 수신', value: preferenceLabel(preferences.kakao) },
      ]}
    />
  );
}
