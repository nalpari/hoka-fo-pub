'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useContext, useRef } from 'react';
import { type FormEvent, useState } from 'react';
import { AccountServicesContext, useAccountFlow } from '@/context/AccountFlowContext';
import { useRequestAction } from '@/hooks/useRequestAction';

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
import {
  emailDomainErrorMessage,
  emailFormatErrorMessage,
  isValidEmailDomain,
  isValidEmailLocalPart,
} from '@/lib/emailValidation';
import { isValidPassword, passwordRequirementsMessage } from '@/lib/passwordValidation';
import { isValidName, isValidRegistrationId } from '@/lib/validation';

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
      error={error || undefined}
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

type MarketingConsentItem = { label: string; value: string };

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
      size="md"
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

const receivedVerificationInfo = {
  birthDate: '19830522',
  phone: '010-6698-5552',
};

const registrationIdErrorMessage =
  '아이디는 영어소문자로 시작해야 하며, 영어,숫자,_(언더바)를 사용하여 5~20자로 구성할 수 있습니다.';

/** 해당 경로의 화면과 상호작용을 구성합니다. (Composes the route screen and its interactions.) */
export function RouteContent() {
  const services = useContext(AccountServicesContext);
  const flow = useAccountFlow();
  const request = useRequestAction();
  const currentId = useRef('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stage, setStage] = useState<'information' | 'additional'>(
    searchParams.get('step') === 'additional' ? 'additional' : 'information',
  );
  const [information, setInformation] = useState<RegistrationInformation>({
    id: '',
    name: services ? (flow?.identity?.information.name ?? '') : '',
    password: '',
    confirmation: '',
    birthDate: services
      ? (flow?.identity?.information.birthDate ?? '')
      : receivedVerificationInfo.birthDate,
    phone: services ? (flow?.identity?.information.phone ?? '') : receivedVerificationInfo.phone,
    postalCode: '',
    address: '',
    addressDetail: '',
    email: '',
    domain: '',
    anniversary: '',
  });
  const [preferences, setPreferences] = useState<MarketingPreferences>({
    email: 'no',
    sms: 'no',
    kakao: 'no',
  });
  const [domainChoice, setDomainChoice] = useState('direct');
  const [notice, setNotice] = useState('');
  const [duplicateNotice, setDuplicateNotice] = useState('');
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof RegistrationInformation, string>> & {
      id: string;
      email: string;
      domain: string;
      name: string;
      password: string;
      confirmation: string;
    }
  >({
    id: '',
    email: '',
    domain: '',
    name: '',
    password: '',
    confirmation: '',
  });
  const [checkedId, setCheckedId] = useState('');
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);

  const change = (key: keyof RegistrationInformation, value: string) => {
    setInformation((previous) => ({ ...previous, [key]: value }));
    setNotice('');
    setFieldErrors((previous) => ({
      ...previous,
      [key]: '',
      ...(key === 'password' ? { confirmation: '' } : {}),
    }));
    if (key === 'id') {
      currentId.current = value;
      setCheckedId('');
      setDuplicateNotice('');
    }
  };

  const checkId = () => {
    const idError = isValidRegistrationId(information.id) ? '' : registrationIdErrorMessage;
    setFieldErrors((previous) => ({ ...previous, id: idError }));
    if (idError) {
      setCheckedId('');
      setDuplicateNotice('');
      return;
    }
    if (services) {
      const id = information.id;
      currentId.current = id;
      void request.run(async () => {
        const result = await services.checkId(id);
        if (currentId.current !== id) return;
        if (!result.available) throw new Error('이미 사용 중인 아이디입니다.');
        setCheckedId(id);
        setDuplicateNotice('사용 가능한 아이디입니다.');
      });
      return;
    }
    setCheckedId(information.id);
    setDuplicateNotice('아이디 형식을 확인했습니다. 실제 중복 여부는 서비스 연결 후 확인됩니다.');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stage === 'additional') {
      setSummaryOpen(true);
      return;
    }
    const idError = isValidRegistrationId(information.id) ? '' : registrationIdErrorMessage;
    const emailError = isValidEmailLocalPart(information.email.trim())
      ? ''
      : emailFormatErrorMessage;
    const domainError = isValidEmailDomain(information.domain.trim())
      ? ''
      : emailDomainErrorMessage;
    const errors = {
      id: idError,
      email: emailError,
      postalCode: information.postalCode.trim() ? '' : '우편번호 찾기로 우편번호를 입력해주세요.',
      address: information.address.trim() ? '' : '우편번호 찾기로 주소를 입력해주세요.',
      addressDetail: information.addressDetail.trim() ? '' : '상세주소를 입력해주세요.',
      domain: domainError,
      name: isValidName(information.name) ? '' : '올바른 이름을 입력해주세요',
      password: isValidPassword(information.password) ? '' : passwordRequirementsMessage,
      confirmation:
        information.confirmation && information.password === information.confirmation
          ? ''
          : '비밀번호가 일치하지 않습니다',
    };
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) {
      setNotice('');
      return;
    }
    if (checkedId !== information.id || !checkedId) {
      setNotice('아이디 중복확인을 해주세요.');
      return;
    }
    if (
      !information.postalCode.trim() ||
      !information.address.trim() ||
      !information.addressDetail.trim() ||
      !isValidRegistrationId(information.id) ||
      !isValidEmailLocalPart(information.email.trim()) ||
      !isValidEmailDomain(information.domain.trim())
    ) {
      setNotice('필수 회원정보와 올바른 아이디, 이메일 주소를 입력해주세요.');
      return;
    }
    setNotice('');
    setStage('additional');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <BindingFeedback pending={request.pending} error={request.error} />
      <fieldset disabled={request.pending} className={css({ border: 0, p: 0, m: 0, minW: 0 })}>
        <RegistrationContent
          stage={stage}
          information={information}
          preferences={preferences}
          domainChoice={domainChoice}
          notice={notice}
          duplicateNotice={duplicateNotice}
          addressOpen={addressOpen}
          fieldErrors={fieldErrors}
          onChange={change}
          onPreferenceChange={(key, value) =>
            setPreferences((previous) => ({ ...previous, [key]: value }))
          }
          onDomainChoice={(value) => {
            setDomainChoice(value);
            change('domain', value === 'direct' ? '' : value);
          }}
          onDuplicateCheck={checkId}
          onAddressOpen={setAddressOpen}
          onSubmit={submit}
          onCancel={() => {
            if (stage === 'additional') {
              setStage('information');
              setNotice('');
            } else router.push('/signup/terms');
          }}
        />
      </fieldset>
      {summaryOpen ? (
        <RegistrationMarketingConsentSummaryModal
          preferences={preferences}
          pending={request.pending}
          error={request.error}
          onOpenChange={(next) => {
            if (!request.pending) setSummaryOpen(next);
          }}
          onConfirm={() => {
            void request.run(async () => {
              if (services) {
                if (!flow?.identity)
                  throw new Error('본인인증이 만료되었습니다. 다시 인증해 주세요.');
                if (
                  !flow.consents.length ||
                  services.signupTerms.some(
                    (term) =>
                      term.required &&
                      !flow.consents.some(
                        (consent) =>
                          consent.id === term.id &&
                          consent.version === term.version &&
                          consent.accepted,
                      ),
                  )
                )
                  throw new Error('필수 약관 동의를 다시 확인해 주세요.');
                await services.register({
                  information,
                  preferences,
                  identity: flow.identity,
                  consents: flow.consents,
                });
                flow.setIdentity(null);
                flow.setConsents([]);
              }
              setSummaryOpen(false);
              router.push('/signup/complete');
            });
          }}
        />
      ) : null}
    </>
  );
}

export const routePreviewComponents = {
  MarketingConsentSummaryModal,
  RegistrationMarketingConsentSummaryModal,
  RegistrationContent,
} satisfies Pick<
  typeof import('@/types/component-contracts/app-signup-information-page'),
  | 'MarketingConsentSummaryModal'
  | 'RegistrationMarketingConsentSummaryModal'
  | 'RegistrationContent'
>;
