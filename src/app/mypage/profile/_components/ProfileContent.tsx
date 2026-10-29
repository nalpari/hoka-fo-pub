'use client';

import { useContext } from 'react';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { MyPageDataContext } from '@/context/MyPageDataContext';
import { useRequestAction } from '@/hooks/useRequestAction';
import { useVerificationCountdown } from '@/lib/useVerificationCountdown';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Divider } from '@/components/common/atoms/Divider';
import { Radio } from '@/components/common/atoms/Radio';
import { StatusMessage } from '@/components/common/atoms/StatusMessage';
import { Typography } from '@/components/common/atoms/Typography';

import { BindingFeedback } from '@/components/common/molecules/BindingFeedback';
import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { FormActionGroup } from '@/components/common/molecules/FormActionGroup';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { VerificationCountdown } from '@/components/common/molecules/FormFields/VerificationCountdown';

import { AddressFields } from '@/components/common/organisms/Address/AddressFields';
import { EmailAddressFields } from '@/components/common/organisms/EmailAddressFields';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import {
  type Preference,
  type ProfileAddress,
  type ProfileEditProps,
  type ProfileValues,
} from '@/app/mypage/profile/mypage-profile.types';
import { MyPageFrame } from '@/components/mypage/MyPageFrame';
import { isValidEmailDomain, isValidEmailLocalPart } from '@/lib/emailValidation';
import { type Errors, type FieldName, validatePasswordReset } from '@/lib/passwordValidation';
import { getPhoneDigits, isValidPhone } from '@/lib/phoneNumber';

type Props = {
  phone: string;
  error?: string;
  verified: boolean;
  onPhoneChange: (value: string) => void;
  onVerifiedChange: (verified: boolean, proof?: string) => void;
};

const demoCode = '900668';

/** 공통 필드와 타이머로 회원정보의 휴대폰 인증 데모를 제공합니다. (Provides profile phone verification using shared fields and a countdown.) */
function ProfilePhoneVerification({
  phone,
  error,
  verified,
  onPhoneChange,
  onVerifiedChange,
}: Props) {
  const binding = useContext(MyPageDataContext).profile;
  const request = useRequestAction();
  const [requestId, setRequestId] = useState('');
  const phoneVersion = useRef(0);
  const [phoneError, setPhoneError] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [notice, setNotice] = useState<'mismatch' | 'expired' | null>(null);
  const codeInput = useRef<HTMLInputElement>(null);
  const { deadline, secondsLeft, start, reset } = useVerificationCountdown();
  const requested = deadline !== null;
  const expired = requested && secondsLeft === 0;

  useEffect(() => {
    if (deadline === null) return;
    const timeout = window.setTimeout(
      () => setNotice('expired'),
      Math.max(0, deadline - Date.now()),
    );
    return () => window.clearTimeout(timeout);
  }, [deadline]);

  function dismissNotice() {
    setNotice(null);
    setCode('');
    setCodeError('');
    if (deadline !== null && Date.now() < deadline) {
      window.requestAnimationFrame(() => codeInput.current?.focus());
    }
  }

  function requestCode() {
    if (!isValidPhone(phone)) {
      setPhoneError('휴대폰 번호를 올바르게 입력해주세요.');
      return;
    }
    setPhoneError('');
    setCode('');
    setCodeError('');
    setNotice(null);
    onVerifiedChange(false);
    if (binding) {
      const version = phoneVersion.current;
      void request.run(async () => {
        const response = await binding.requestPhone(phone);
        if (version !== phoneVersion.current) return;
        setRequestId(response.requestId);
        start(response.expiresInSeconds);
      });
    } else start();
  }

  function confirmCode() {
    if (deadline === null) return;
    if (Date.now() >= deadline) {
      setNotice('expired');
      return;
    }
    if (!/^\d{6}$/.test(code)) {
      setCodeError('인증번호 6자리를 입력해 주세요.');
      return;
    }
    if (binding) {
      const version = phoneVersion.current;
      void request.run(async () => {
        const proof = await binding.verifyPhone({ requestId, phone, code });
        if (version !== phoneVersion.current) return;
        reset();
        setCode('');
        onVerifiedChange(true, proof);
      });
      return;
    }
    if (code !== demoCode) {
      setNotice('mismatch');
      return;
    }
    setCode('');
    setCodeError('');
    reset();
    onVerifiedChange(true);
  }

  return (
    <Stack gap="6">
      <BindingFeedback pending={request.pending} error={request.error} />
      <TextFormField
        id="profile-phone"
        label="휴대폰 번호"
        required
        variant="boxed"
        error={phoneError || error}
        inputProps={{
          placeholder: '휴대폰 번호를 입력해 주세요',
          name: 'tel',
          type: 'tel',
          inputMode: 'numeric',
          autoComplete: 'tel-national',
          value: phone,
          onChange: (event) => {
            phoneVersion.current += 1;
            setRequestId('');
            onPhoneChange(getPhoneDigits(event.target.value));
            onVerifiedChange(false);
            setPhoneError('');
            setCode('');
            setCodeError('');
            setNotice(null);
            reset();
          },
        }}
      />
      <Button
        type="button"
        fullWidth
        variant="primary"
        disabled={request.pending || verified || (requested && !expired)}
        onClick={requestCode}
      >
        {requested ? '인증번호 재요청' : '인증번호 요청'}
      </Button>
      {requested ? (
        <Stack gap="3">
          <TextFormField
            label="인증번호"
            id="profile-verification-code"
            variant="boxed"
            required
            error={expired ? '인증 시간이 만료되었습니다. 인증번호를 재요청해 주세요.' : codeError}
            inputProps={{
              placeholder: '인증번호 6자리를 입력해 주세요',
              inputMode: 'numeric',
              autoComplete: 'one-time-code',
              maxLength: 6,
              ref: codeInput,
              value: code,
              disabled: expired,
              onChange: (event) => {
                setCode(event.target.value.replace(/\D/g, '').slice(0, 6));
                setCodeError('');
              },
            }}
          />
          <VerificationCountdown secondsLeft={secondsLeft} />
          <StatusMessage>
            {binding
              ? '전송된 인증번호를 입력해 주세요.'
              : `데모 인증번호는 ${demoCode}입니다. 실제 문자는 발송되지 않습니다.`}
          </StatusMessage>
          <Button
            type="button"
            fullWidth
            variant="primary"
            disabled={request.pending || expired}
            onClick={confirmCode}
          >
            인증번호 확인
          </Button>
        </Stack>
      ) : null}
      {verified ? (
        <StatusMessage tone="success">휴대폰 인증이 완료되었습니다.</StatusMessage>
      ) : null}
      {notice ? (
        <ModalDialog
          open
          size="sm"
          title={notice === 'mismatch' ? '인증번호 불일치' : '인증번호 입력시간 초과'}
          closeLabel="인증번호 안내 닫기"
          onOpenChange={(open) => {
            if (!open) dismissNotice();
          }}
          actions={{ kind: 'single', onConfirm: dismissNotice }}
        >
          <Typography as="p" variant="body3">
            {notice === 'mismatch'
              ? '인증번호가 일치하지 않습니다. 다시 입력해주세요.'
              : '인증번호 입력 시간이 초과하였습니다. 인증번호 재전송 후 이용해주세요.'}
          </Typography>
        </ModalDialog>
      ) : null}
    </Stack>
  );
}

const domainOptions = [
  { value: 'direct', label: '직접입력' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'daum.net', label: 'daum.net' },
];

/** 회원정보 편집과 독립된 비밀번호 설정 진입을 제공합니다. (Provides profile editing and entry to independent password settings.) */
function ProfileEditForm({
  emailLocal,
  emailDomain,
  domainChoice,
  address,
  addressOpen,
  phone,
  phoneVerified,
  passwordChanged,
  emailPreference,
  smsPreference,
  kakaoPreference,
  fieldErrors,
  onEmailLocalChange,
  onEmailDomainChange,
  onDomainChoice,
  onAddressChange,
  onAddressOpenChange,
  onPhoneChange,
  onPhoneVerifiedChange,
  onPasswordSettings,
  onEmailPreferenceChange,
  onSmsPreferenceChange,
  onKakaoPreferenceChange,
  onSubmit,
  onCancel,
  onWithdraw,
}: ProfileEditProps) {
  return (
    <form noValidate onSubmit={onSubmit}>
      <Stack gap="3">
        <Stack gap="2">
          <Button type="button" fullWidth variant="primary" onClick={onPasswordSettings}>
            비밀번호 설정
          </Button>
          {passwordChanged ? (
            <Typography variant="body4" role="status">
              비밀번호 변경을 완료하였습니다.
            </Typography>
          ) : null}
        </Stack>
        <ProfilePhoneVerification
          phone={phone}
          verified={phoneVerified}
          error={fieldErrors.phone}
          onPhoneChange={onPhoneChange}
          onVerifiedChange={onPhoneVerifiedChange}
        />
        <AddressFields
          variant="boxed"
          idPrefix="profile"
          searchLabel="우편번호 찾기"
          value={address}
          errors={fieldErrors}
          fieldOptions={{ addressDetail: { required: true } }}
          onValueChange={onAddressChange}
          searchOpen={addressOpen}
          onSearchOpenChange={onAddressOpenChange}
        />
        <EmailAddressFields
          idPrefix="profile"
          local={emailLocal}
          domain={emailDomain}
          domainChoice={domainChoice}
          options={domainOptions}
          errors={{ local: fieldErrors.email, domain: fieldErrors.domain }}
          onLocalChange={onEmailLocalChange}
          onDomainChange={onEmailDomainChange}
          onDomainChoice={onDomainChoice}
        />
        <Stack gap="4">
          <Divider />
          <ContentSection
            gap="5"
            title="마케팅 정보 수신 동의"
            headerProps={{ titleAs: 'h2', titleProps: { mo: 'heading7' } }}
          >
            <Radio
              ariaLabel="이메일 수신"
              name="email-preference"
              value={emailPreference}
              onValueChange={onEmailPreferenceChange}
              label="이메일 수신"
              options={[
                { value: '수신', label: '수신' },
                { value: '수신안함', label: '수신안함' },
              ]}
            />
            <Radio
              ariaLabel="문자수신(LMS, SMS)"
              name="sms-preference"
              value={smsPreference}
              onValueChange={onSmsPreferenceChange}
              label="문자수신(LMS, SMS)"
              options={[
                { value: '수신', label: '수신' },
                { value: '수신안함', label: '수신안함' },
              ]}
            />
            <Radio
              ariaLabel="카카오톡 알림톡 수신"
              name="kakao-preference"
              value={kakaoPreference}
              onValueChange={onKakaoPreferenceChange}
              label="카카오톡 알림톡 수신"
              options={[
                { value: '수신', label: '수신' },
                { value: '수신안함', label: '수신안함' },
              ]}
            />
          </ContentSection>
        </Stack>
        <FormActionGroup pt="3" onCancel={onCancel} submitLabel="변경사항 저장" />
        <Stack gap="4" pt="7">
          <Typography variant="body4">탈퇴를 원하실 경우 회원탈퇴를 눌러주세요.</Typography>
          <Button size="sm" variant="link" type="button" onClick={onWithdraw}>
            회원탈퇴
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <Stack gap="2">
      <Typography variant="heading7">{label}</Typography>
      <Typography variant="body3" tone="subtle">
        {value}
      </Typography>
    </Stack>
  );
}

/** 회원정보와 수신 동의의 현재 값을 표시합니다. (Displays current profile details and communication preferences.) */
function ProfileReadView({
  email,
  phone,
  emailPreference,
  smsPreference,
  kakaoPreference,
}: ProfileValues) {
  return (
    <>
      <ProfileField label="이메일" value={email} />
      <ProfileField label="휴대폰 번호" value={phone} />
      <Stack gap="6">
        <Divider />
        <ContentSection
          gap="6"
          title="마케팅 정보 수신 동의"
          headerProps={{ titleAs: 'h2', titleProps: { mo: 'heading7' } }}
        >
          <Stack gap="4">
            <HStack alignItems="flex-start" justifyContent="space-between">
              <Typography as="span" mo="body4">
                이메일 수신
              </Typography>
              <Typography as="span" mo="body4" tone="subtle">
                {emailPreference}
              </Typography>
            </HStack>
            <HStack alignItems="flex-start" justifyContent="space-between">
              <Typography as="span" mo="body4">
                문자수신(LMS, SMS)
              </Typography>
              <Typography as="span" mo="body4" tone="subtle">
                {smsPreference}
              </Typography>
            </HStack>
            <HStack alignItems="flex-start" justifyContent="space-between">
              <Typography as="span" mo="body4">
                카카오톡 알림톡 수신
              </Typography>
              <Typography as="span" mo="body4" tone="subtle">
                {kakaoPreference}
              </Typography>
            </HStack>
          </Stack>
        </ContentSection>
      </Stack>
      <Divider />
      <Typography as="p" variant="body5" tone="tertiary">
        *가려진 회원 정보 조회 및 회원정보 변경, 회원 탈퇴는 회원정보 수정 페이지에서 가능합니다.
      </Typography>
    </>
  );
}

type ProfilePasswordDialogProps = {
  onClose: () => void;
  onComplete: () => void;
};

const titles = {
  input: '비밀번호 설정',
  confirm: '비밀번호 변경 확인',
  complete: '비밀번호 변경 완료',
};

/** 비밀번호 입력·검증과 변경 확인·완료의 데모 흐름을 관리합니다. (Manages the demo flow for password validation, confirmation, and completion.) */
function ProfilePasswordDialog({ onClose, onComplete }: ProfilePasswordDialogProps) {
  const binding = useContext(MyPageDataContext).profile;
  const request = useRequestAction();
  const [step, setStep] = useState<'input' | 'confirm' | 'complete'>('input');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  function changeField(field: FieldName, value: string) {
    if (field === 'password') setPassword(value);
    else setConfirmation(value);
    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
      ...(field === 'password' ? { confirmation: undefined } : {}),
    }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const nextErrors = validatePasswordReset(password, confirmation);
    if (nextErrors.password) {
      nextErrors.password = '올바른 비밀번호를 입력해주세요.';
    }
    if (confirmation && password !== confirmation) {
      nextErrors.confirmation = '비밀번호가 일치하지 않습니다. 다시 확인해주세요.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStep('confirm');
  }

  function confirm() {
    if (step === 'confirm') {
      void request.run(async () => {
        if (binding) await binding.changePassword(password);
        setPassword('');
        setConfirmation('');
        onComplete();
        setStep('complete');
      });
    } else {
      onClose();
    }
  }

  return (
    <ModalDialog
      open
      onOpenChange={(open) => {
        if (!open && !request.pending) onClose();
      }}
      title={titles[step]}
      closeLabel="비밀번호 설정 닫기"
      size="sm"
      actions={{
        kind: 'single',
        label: step === 'input' ? '비밀번호 설정' : '확인',
        onConfirm: step === 'input' ? undefined : confirm,
        buttonProps: {
          type: step === 'input' ? 'submit' : 'button',
          form: step === 'input' ? 'profile-password-form' : undefined,
          size: 'tall',
          disabled: request.pending,
        },
      }}
    >
      <BindingFeedback pending={request.pending} error={request.error} />
      {step === 'input' ? (
        <form id="profile-password-form" noValidate onSubmit={submit}>
          <Stack gap="4">
            <TextFormField
              id="profile-new-password"
              label="비밀번호"
              required
              variant="boxed"
              error={errors.password}
              hint="연속적인 숫자나 생일, 전화번호등 추측하기 쉬운 개인정보 및 아이디와 비슷한 전화번호 사용을 피하시기 바랍니다. 비밀번호는 특수기호를 포함한 3가지 이상을 혼합하여 입력하세요."
              hintProps={{ variant: 'body4', className: css({ pt: '2' }) }}
              inputProps={{
                placeholder: '비밀번호를 입력해 주세요',
                type: 'password',
                autoComplete: 'new-password',
                value: password,
                onChange: (event) => changeField('password', event.target.value),
              }}
            />
            <TextFormField
              id="profile-password-confirmation"
              label="비밀번호 재입력"
              required
              variant="boxed"
              error={errors.confirmation}
              inputProps={{
                type: 'password',
                autoComplete: 'new-password',
                placeholder: '비밀번호를 다시 입력해 주세요',
                value: confirmation,
                onChange: (event) => changeField('confirmation', event.target.value),
              }}
            />
          </Stack>
        </form>
      ) : (
        <Typography variant="body3" role="status">
          {step === 'confirm' ? '비밀번호를 변경하시겠습니까?' : '비밀번호가 변경되었습니다.'}
        </Typography>
      )}
    </ModalDialog>
  );
}

type ProfileEditNotice = 'cancel' | 'save' | 'complete' | 'unverified';

const notices = {
  cancel: { title: '회원정보 수정 취소 확인', message: '입력한 변경사항을 취소하시겠습니까?' },
  save: { title: '회원정보 수정 확인', message: '변경사항을 저장하시겠습니까?' },
  complete: { title: '회원정보 수정 완료', message: '회원정보가 변경되었습니다.' },
  unverified: {
    title: '휴대폰 본인인증 확인',
    message: '휴대폰 본인인증 후 변경사항을 저장해주세요.',
  },
};

type ProfileEditDialogsProps = {
  pending?: boolean;
  error?: string;
  notice: ProfileEditNotice;
  onDismiss: () => void;
  onConfirm: () => void;
};

/** 회원정보 편집의 확인·완료·본인인증 안내를 공통 모달로 표시합니다. (Displays profile editing confirmations and notices using shared dialogs.) */
function ProfileEditDialogs({
  notice,
  onDismiss,
  onConfirm,
  pending,
  error,
}: ProfileEditDialogsProps) {
  const { title, message } = notices[notice];
  const props = {
    open: true,
    title,
    closeLabel: `${title} 닫기`,
    onOpenChange: (open: boolean) => {
      if (!open && !pending) onDismiss();
    },
    children: (
      <>
        <BindingFeedback pending={pending} error={error} />
        <Typography as="p" variant="body3">
          {message}
        </Typography>
      </>
    ),
  };

  return (
    <ModalDialog
      {...props}
      size="sm"
      actions={
        notice === 'cancel' || notice === 'save'
          ? { kind: 'confirm', onConfirm, confirmDisabled: pending }
          : { kind: 'single', onConfirm }
      }
    />
  );
}

type MyPageWithdrawalCompleteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function MyPageWithdrawalCompleteDialog({
  open,
  onOpenChange,
}: MyPageWithdrawalCompleteDialogProps) {
  return (
    <ModalDialog
      closeLabel="회원탈퇴 안내 닫기"
      onOpenChange={onOpenChange}
      open={open}
      size="sm"
      title="회원탈퇴"
    >
      <Typography as="p" variant="body3">
        회원탈퇴 요청을 확인했습니다.
      </Typography>
    </ModalDialog>
  );
}

type MyPageWithdrawalDialogProps = {
  pending?: boolean;
  error?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

function MyPageWithdrawalDialog({
  open,
  onOpenChange,
  onConfirm,
  pending,
  error,
}: MyPageWithdrawalDialogProps) {
  return (
    <ModalDialog
      closeLabel="회원탈퇴 확인창 닫기"
      onOpenChange={onOpenChange}
      open={open}
      size="sm"
      title="회원탈퇴"
      actions={{
        kind: 'confirm',
        onConfirm: onConfirm,
        fullWidth: false,
        confirmDisabled: pending,
      }}
    >
      <BindingFeedback pending={pending} error={error} />
      <ContentHeader
        gap="4"
        titleAs="h2"
        title="회원탈퇴를 진행 하시겠습니까?"
        titleProps={{ variant: 'heading9' }}
        description="탈퇴 후에는 회원정보 및 이용내역을 복구할 수 없으며, 탈퇴 후 6개월간 재가입이 불가합니다."
        descriptionProps={{ variant: 'body3' }}
      />
    </ModalDialog>
  );
}

const profileDetails = [
  ['회원 아이디', 'hon******'],
  ['이름', '손*민'],
  ['생년월일', '1993.05.22'],
  ['주소', '서울시 성북구 테헤란로 27길 54 테헤란 아파트 701호'],
  ['이메일', 'dww******@gmail.com'],
  ['휴대폰 번호', '010-****-0522'],
] as const;

const initialAddress: ProfileAddress = {
  postalCode: '02157',
  address: '서울시 성북구 테헤란로 27길 54',
  addressDetail: '테헤란 아파트 701호',
};

/** 회원정보 조회·편집과 비밀번호 설정 흐름을 연결합니다. (Coordinates profile viewing, editing, and password settings.) */
export function ProfileContent() {
  // 개발팀 적용: profile.item은 편집 가능한 원본 데이터이며 현재 조회값은 Provider에서 직접 읽습니다.
  const binding = useContext(MyPageDataContext).profile;
  const current = binding?.item;
  const request = useRequestAction();
  const [phoneProof, setPhoneProof] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState(current?.email ?? 'dww******@gmail.com');
  const [emailLocal, setEmailLocal] = useState(current?.email.split('@')[0] ?? 'dww******');
  const [emailDomain, setEmailDomain] = useState(current?.email.split('@')[1] ?? 'gmail.com');
  const [domainChoice, setDomainChoice] = useState('gmail.com');
  const [address, setAddress] = useState(current?.address ?? initialAddress);
  const [savedAddress, setSavedAddress] = useState(current?.address ?? initialAddress);
  const [addressOpen, setAddressOpen] = useState(false);
  const [phone, setPhone] = useState(current?.phone ?? '010-****-0522');
  const [savedPhone, setSavedPhone] = useState(phone);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<ProfileEditProps['fieldErrors']>({});
  const [emailPreference, setEmailPreference] = useState<Preference>(
    current?.emailPreference ?? '수신안함',
  );
  const [smsPreference, setSmsPreference] = useState<Preference>(
    current?.smsPreference ?? '수신안함',
  );
  const [kakaoPreference, setKakaoPreference] = useState<Preference>(
    current?.kakaoPreference ?? '수신안함',
  );
  const [savedPreferences, setSavedPreferences] = useState({
    emailPreference,
    smsPreference,
    kakaoPreference,
  });
  const [notice, setNotice] = useState<ProfileEditNotice | null>(null);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  function submitProfile(event: import('react').FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = {
      email: isValidEmailLocalPart(emailLocal.trim()) ? '' : '올바른 이메일 주소를 입력해주세요.',
      domain: isValidEmailDomain(emailDomain.trim()) ? '' : '올바른 도메인을 입력해주세요.',
      postalCode: /^\d{5}$/.test(address.postalCode.trim()) ? '' : '우편번호 5자리를 입력해주세요.',
      address: address.address.trim() ? '' : '주소를 입력해주세요.',
      addressDetail: address.addressDetail.trim() ? '' : '상세주소를 입력해주세요.',
      phone: !phone.trim()
        ? '휴대폰 번호를 입력해 주세요.'
        : phone !== (current?.phone ?? savedPhone) && !phoneVerified
          ? '휴대폰 인증 후 변경사항을 저장해주세요.'
          : '',
    };
    setFieldErrors(errors);
    if (phone !== (current?.phone ?? savedPhone) && !phoneVerified) {
      setNotice('unverified');
      return;
    }
    if (Object.values(errors).some(Boolean)) return;
    setNotice('save');
  }

  function saveProfile() {
    if (binding) {
      void request.run(async () => {
        await binding.save({
          email: `${emailLocal.trim()}@${emailDomain.trim()}`,
          phone,
          address,
          emailPreference,
          smsPreference,
          kakaoPreference,
          phoneProof,
        });
        setNotice('complete');
      });
      return;
    }
    setEmail(`${emailLocal.trim()}@${emailDomain.trim()}`);
    setSavedAddress(address);
    setSavedPhone(phone);
    setSavedPreferences({ emailPreference, smsPreference, kakaoPreference });
    setNotice('complete');
  }

  function cancelProfile() {
    const [local, domain] = (current?.email ?? email).split('@');
    setEmailLocal(local);
    setEmailDomain(domain);
    setDomainChoice(['naver.com', 'gmail.com', 'daum.net'].includes(domain) ? domain : 'direct');
    setAddress(current?.address ?? savedAddress);
    setPhone(current?.phone ?? savedPhone);
    setPhoneProof(null);
    setEmailPreference(current?.emailPreference ?? savedPreferences.emailPreference);
    setSmsPreference(current?.smsPreference ?? savedPreferences.smsPreference);
    setKakaoPreference(current?.kakaoPreference ?? savedPreferences.kakaoPreference);
    setAddressOpen(false);
    setFieldErrors({});
    setPhoneVerified(false);
    setNotice(null);
    setEditing(false);
  }

  function dismissNotice() {
    if (notice === 'complete') setEditing(false);
    setNotice(null);
  }

  return (
    <MyPageFrame
      activePath="/mypage/profile"
      breadcrumbs={[{ label: editing ? '회원정보 수정' : '회원정보' }]}
    >
      <BindingFeedback
        {...binding}
        pending={binding?.pending || request.pending}
        error={binding?.error || request.error}
      />
      <ContentSection
        gap="6"
        px="4"
        pt="6"
        pb="16"
        title={<>{editing ? '회원정보 수정' : '회원정보'}</>}
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
        footer={
          !editing ? (
            <Button
              fullWidth
              size="tall"
              variant="primary"
              onClick={() => {
                cancelProfile();
                setEditing(true);
              }}
            >
              회원정보 수정
            </Button>
          ) : null
        }
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: editing ? 'minmax(0, 1fr) minmax(0, 1fr)' : '1fr',
            gap: '10',
            alignItems: 'start',
            _mobile: { gridTemplateColumns: '1fr' },
          })}
        >
          <Stack gap="6">
            {(current
              ? [
                  ['회원 아이디', current.id],
                  ['이름', current.name],
                  ['생년월일', current.birthDate],
                ]
              : profileDetails.slice(0, 3)
            ).map(([label, value]) => (
              <ProfileField key={label} label={label} value={value} />
            ))}
            <ProfileField
              label="주소"
              value={`${current?.address.address ?? savedAddress.address} ${current?.address.addressDetail ?? savedAddress.addressDetail}`}
            />
          </Stack>
          {editing ? (
            <ProfileEditForm
              emailLocal={emailLocal}
              emailDomain={emailDomain}
              domainChoice={domainChoice}
              address={address}
              addressOpen={addressOpen}
              phone={phone}
              phoneVerified={phoneVerified}
              passwordChanged={passwordChanged}
              emailPreference={emailPreference}
              smsPreference={smsPreference}
              kakaoPreference={kakaoPreference}
              fieldErrors={fieldErrors}
              onEmailLocalChange={(value) => {
                setEmailLocal(value);
                setFieldErrors((previous) => ({ ...previous, email: undefined }));
              }}
              onEmailDomainChange={(value) => {
                setEmailDomain(value);
                setFieldErrors((previous) => ({ ...previous, domain: undefined }));
              }}
              onDomainChoice={(value) => {
                setDomainChoice(value);
                setEmailDomain(value === 'direct' ? '' : value);
                setFieldErrors((previous) => ({ ...previous, domain: undefined }));
              }}
              onAddressChange={(field, value) => {
                setAddress((previous) => ({ ...previous, [field]: value }));
                setFieldErrors((previous) => ({ ...previous, [field]: undefined }));
              }}
              onAddressOpenChange={setAddressOpen}
              onPhoneChange={(value) => {
                setPhone(value);
                setPhoneProof(null);
                setPhoneVerified(false);
                setFieldErrors((previous) => ({ ...previous, phone: undefined }));
              }}
              onPhoneVerifiedChange={(verified, proof) => {
                setPhoneProof(verified ? (proof ?? null) : null);
                setPhoneVerified(verified);
                setFieldErrors((previous) => ({ ...previous, phone: undefined }));
              }}
              onPasswordSettings={() => setPasswordOpen(true)}
              onEmailPreferenceChange={setEmailPreference}
              onSmsPreferenceChange={setSmsPreference}
              onKakaoPreferenceChange={setKakaoPreference}
              onSubmit={submitProfile}
              onCancel={() => setNotice('cancel')}
              onWithdraw={() => setWithdrawOpen(true)}
            />
          ) : (
            <ProfileReadView
              email={current?.email ?? email}
              phone={current?.phone ?? phone}
              emailPreference={current?.emailPreference ?? emailPreference}
              smsPreference={current?.smsPreference ?? smsPreference}
              kakaoPreference={current?.kakaoPreference ?? kakaoPreference}
            />
          )}
        </div>
      </ContentSection>
      {notice ? (
        <ProfileEditDialogs
          notice={notice}
          pending={request.pending}
          error={request.error}
          onDismiss={dismissNotice}
          onConfirm={
            notice === 'cancel' ? cancelProfile : notice === 'save' ? saveProfile : dismissNotice
          }
        />
      ) : null}
      {passwordOpen ? (
        <ProfilePasswordDialog
          onClose={() => setPasswordOpen(false)}
          onComplete={() => setPasswordChanged(true)}
        />
      ) : null}
      <MyPageWithdrawalDialog
        open={withdrawOpen}
        pending={request.pending}
        error={request.error}
        onOpenChange={(next) => {
          if (!request.pending) setWithdrawOpen(next);
        }}
        onConfirm={() => {
          void request.run(async () => {
            if (binding) await binding.withdraw();
            setWithdrawOpen(false);
            setWithdrawn(true);
          });
        }}
      />
      <MyPageWithdrawalCompleteDialog open={withdrawn} onOpenChange={setWithdrawn} />
    </MyPageFrame>
  );
}
