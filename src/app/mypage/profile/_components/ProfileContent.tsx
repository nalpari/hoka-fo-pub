'use client';
import { type FormEvent, useRef, useState } from 'react';

import { css } from 'styled-system/css';
import { Grid, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { DescriptionList } from '@/components/common/atoms/DescriptionList';
import { Radio } from '@/components/common/atoms/Radio';
import { StatusMessage } from '@/components/common/atoms/StatusMessage';
import { Typography } from '@/components/common/atoms/Typography';

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
import { type Errors, type FieldName } from '@/lib/passwordValidation';
import { getPhoneDigits } from '@/lib/phoneNumber';
type Props = {
  phone: string;
  error?: string;
  verified: boolean;
  previewState?: 'idle' | 'code-entry' | 'expired';
  onPhoneChange: (value: string) => void;
};
/** 회원정보의 휴대폰 입력과 고정 인증 상태를 표시합니다. (Displays profile phone input and fixed verification states.) */
function ProfilePhoneVerification({ phone, error, verified, previewState, onPhoneChange }: Props) {
  const [code, setCode] = useState('');
  const codeInput = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState<'mismatch' | 'expired' | null>(
    previewState === 'expired' ? 'expired' : null,
  );
  const requested = previewState === 'code-entry' || previewState === 'expired';
  const expired = previewState === 'expired';
  const phoneError = '';
  const codeError = '';
  const dismissNotice = () => setNotice(null);
  return (
    <Stack gap="24px" alignItems="stretch">
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
          onChange: (event) => onPhoneChange(getPhoneDigits(event.target.value)),
        }}
      />
      <Button
        type="button"
        fullWidth
        variant="primary"
        size="tall"
        className={css({ alignSelf: 'flex-end', w: 'auto', _mobile: { w: '100%' } })}
        disabled={verified || (requested && !expired)}
      >
        {requested ? '인증번호 재요청' : '인증번호 요청'}
      </Button>
      {requested ? (
        <Stack gap="12px">
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
              },
            }}
          />
          <VerificationCountdown secondsLeft={expired ? 0 : 125} />
          <StatusMessage>{'인증번호 입력 화면의 고정 예시입니다.'}</StatusMessage>
          <Button type="button" fullWidth variant="primary" disabled={expired}>
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
/** 회원정보 수정 마크업을 표시합니다. (Displays profile editing markup.) */
export function ProfileEditForm({
  previewPhone,
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
  onEmailPreferenceChange,
  onSmsPreferenceChange,
  onKakaoPreferenceChange,
  onCancel,
  onWithdraw,
  details,
  pending,
}: ProfileEditProps) {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [passwordErrors] = useState<Errors>({});
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  return (
    <form noValidate onSubmit={submit}>
      <ContentSection
        gap={{ base: '40px', _mobile: '24px' }}
        title="회원정보 수정"
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading6', mo: 'heading5' } }}
      >
        <Grid
          gridTemplateColumns="minmax(0, 286px) minmax(0, 500px)"
          gap="58px"
          borderTop="2px solid"
          borderColor="black.100"
          pt="32px"
          _mobile={{
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: '24px',
            borderTop: '0',
            pt: '0',
          }}
        >
          <Stack gap="0" _mobile={{ gap: '24px' }}>
            <DescriptionList
              items={(details ?? profileDetails.slice(0, 4)).map(([term, description]) => ({
                term,
                description,
              }))}
              termProps={{ variant: 'body3', weight: 'semibold' }}
              descriptionProps={{ variant: 'body3', tone: 'subtle' }}
              slotStyles={{
                root: css.raw({
                  gridTemplateColumns: 'none',
                  gap: '0',
                  _mobile: { gap: '24px' },
                }),
                row: css.raw({
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  py: '24px',
                  pr: '16px',
                  borderBottom: '1px solid var(--colors-black-20)',
                  _first: { pt: '0' },
                  _mobile: { gap: '12px', p: '0', borderBottom: '0' },
                }),
                description: css.raw({ m: '0' }),
              }}
            />
            <Stack gap="24px" py="32px" pr="16px" className={css({ _mobile: { display: 'none' } })}>
              <Typography variant="body4">탈퇴를 원하실 경우 회원탈퇴를 눌러주세요.</Typography>
              <Button
                size="short"
                variant="secondary"
                type="button"
                onClick={onWithdraw}
                className={css({ alignSelf: 'flex-start' })}
              >
                회원탈퇴
              </Button>
            </Stack>
          </Stack>
          <Stack gap="16px">
            <TextFormField
              id="profile-inline-password"
              label="비밀번호"
              required
              variant="boxed"
              error={passwordErrors.password}
              hint="연속적인 숫자나 생일, 전화번호등 추측하기 쉬운 개인정보 및 아이디와 비슷한 전화번호 사용을 피하시기 바랍니다. 비밀번호는 특수기호를 포함한 3가지 이상을 혼합하여 입력하세요."
              hintProps={{ variant: 'body5' }}
              inputProps={{
                type: 'password',
                autoComplete: 'new-password',
                placeholder: '비밀번호를 입력해 주세요',
                value: password,
                onChange: (event) => setPassword(event.target.value),
              }}
            />
            <TextFormField
              id="profile-inline-confirmation"
              label="비밀번호 재입력"
              required
              variant="boxed"
              error={passwordErrors.confirmation}
              inputProps={{
                type: 'password',
                autoComplete: 'new-password',
                placeholder: '비밀번호를 재입력해 주세요',
                value: confirmation,
                onChange: (event) => setConfirmation(event.target.value),
              }}
            />
            {passwordChanged ? (
              <StatusMessage
                tone="success"
                textProps={{ as: 'span', variant: 'body4', tone: 'inherit' }}
              >
                비밀번호 변경을 완료하였습니다.
              </StatusMessage>
            ) : null}
            <ProfilePhoneVerification
              previewState={previewPhone}
              phone={phone}
              verified={phoneVerified}
              error={fieldErrors.phone}
              onPhoneChange={onPhoneChange}
            />
            <AddressFields
              variant="boxed"
              idPrefix="profile"
              searchLabel="주소 찾기"
              detailLayout="columns"
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
            <Stack gap="32px" pt="16px" pb="32px" borderBottom="1px solid" borderColor="black.10">
              <ContentSection
                gap={{ base: '32px', _mobile: '24px' }}
                title="마케팅 정보 수신 동의"
                headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading7' } }}
              >
                <Stack gap={{ base: '24px', _mobile: '16px' }}>
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
                </Stack>
              </ContentSection>
            </Stack>
            <FormActionGroup
              size="tall"
              disabled={pending}
              pt="24px"
              onCancel={onCancel}
              submitLabel="변경사항 저장"
              w="368px"
              maxW="100%"
              alignSelf="center"
              _mobile={{ w: '100%', pt: '0' }}
            />
            <Stack
              gap="16px"
              pt="16px"
              className={css({ display: 'none', _mobile: { display: 'flex' } })}
            >
              <Typography variant="body4">탈퇴를 원하실 경우 회원탈퇴를 눌러주세요.</Typography>
              <Button size="sm" variant="link" type="button" onClick={onWithdraw}>
                회원탈퇴
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </ContentSection>
    </form>
  );
}
/** 회원정보와 수신 동의의 현재 값을 표시합니다. (Displays current profile details and communication preferences.) */
function ProfileReadView({ emailPreference, smsPreference, kakaoPreference }: ProfileValues) {
  return (
    <Stack gap="16px">
      <ContentSection
        gap={{ base: '32px', _mobile: '24px' }}
        title="마케팅 정보 수신 동의"
        borderBottom="1px solid var(--colors-black-20)"
        pb="32px"
        _mobile={{ pb: '24px' }}
        headerProps={{ titleAs: 'h2', titleProps: { web: 'heading8', mo: 'heading7' } }}
      >
        <DescriptionList
          items={[
            { term: '이메일 수신', description: emailPreference },
            { term: '문자수신(LMS, SMS)', description: smsPreference },
            { term: '카카오톡 알림톡 수신', description: kakaoPreference },
          ]}
          termProps={{ variant: 'body3', mo: 'body4' }}
          descriptionProps={{ variant: 'body3', mo: 'body4', tone: 'subtle' }}
          slotStyles={{
            root: css.raw({ gridTemplateColumns: 'none', gap: '24px', _mobile: { gap: '16px' } }),
            row: css.raw({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '0',
              _mobile: { justifyContent: 'space-between' },
            }),
            term: css.raw({ w: '178px', _mobile: { w: 'auto' } }),
            description: css.raw({ m: '0' }),
          }}
        />
      </ContentSection>
      <Typography as="p" variant="body5" tone="tertiary">
        *가려진 회원 정보 조회 및 회원정보 변경, 회원 탈퇴는 회원정보 수정 페이지에서 가능합니다.
      </Typography>
    </Stack>
  );
}
type ProfilePasswordDialogProps = {
  previewComplete?: boolean;
  previewState?: 'input' | 'confirm' | 'complete';
  onClose: () => void;
};
const titles = {
  input: '비밀번호 설정',
  confirm: '비밀번호 변경 확인',
  complete: '비밀번호 변경 완료',
};
/** 비밀번호 변경 입력과 완료 상태를 표시합니다. (Displays password editing and completion states.) */
export function ProfilePasswordDialog({
  previewComplete = false,
  previewState,
  onClose,
}: ProfilePasswordDialogProps) {
  const step = previewState ?? (previewComplete ? 'complete' : 'input');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const errors: Errors = {};
  const changeField = (field: FieldName, value: string) =>
    field === 'password' ? setPassword(value) : setConfirmation(value);
  return (
    <ModalDialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={titles[step]}
      closeLabel="비밀번호 설정 닫기"
      size="sm"
      actions={{
        kind: 'single',
        label: step === 'input' ? '비밀번호 설정' : '확인',
        onConfirm: step === 'input' ? undefined : onClose,
        buttonProps: {
          type: step === 'input' ? 'submit' : 'button',
          form: step === 'input' ? 'profile-password-form' : undefined,
          size: 'tall',
          disabled: false,
        },
      }}
    >
      {step === 'input' ? (
        <form id="profile-password-form" noValidate onSubmit={(event) => event.preventDefault()}>
          <Stack gap="16px">
            <TextFormField
              id="profile-new-password"
              label="비밀번호"
              required
              variant="boxed"
              error={errors.password}
              hint="연속적인 숫자나 생일, 전화번호등 추측하기 쉬운 개인정보 및 아이디와 비슷한 전화번호 사용을 피하시기 바랍니다. 비밀번호는 특수기호를 포함한 3가지 이상을 혼합하여 입력하세요."
              hintProps={{ variant: 'body4', className: css({ pt: '8px' }) }}
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
function ProfileEditDialogs({ notice, onDismiss, onConfirm, pending }: ProfileEditDialogsProps) {
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
      <ContentHeader
        gap="16px"
        titleAs="h2"
        title="회원탈퇴를 진행 하시겠습니까?"
        titleProps={{ variant: 'heading10' }}
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
export function ProfileContent({
  preview,
}: {
  preview?: 'save' | 'complete' | 'unverified' | 'withdraw' | 'withdraw-complete' | 'cancel';
} = {}) {
  const [editing, setEditing] = useState(Boolean(preview && !preview.startsWith('withdraw')));
  const [email] = useState('dww******@gmail.com');
  const [emailLocal, setEmailLocal] = useState('dww******');
  const [emailDomain, setEmailDomain] = useState('gmail.com');
  const [domainChoice, setDomainChoice] = useState('gmail.com');
  const [address, setAddress] = useState(initialAddress);
  const [savedAddress] = useState(initialAddress);
  const [addressOpen, setAddressOpen] = useState(false);
  const [phone, setPhone] = useState('010-****-0522');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [passwordChanged] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<ProfileEditProps['fieldErrors']>({});
  const [emailPreference, setEmailPreference] = useState<Preference>('수신안함');
  const [smsPreference, setSmsPreference] = useState<Preference>('수신안함');
  const [kakaoPreference, setKakaoPreference] = useState<Preference>('수신안함');
  const [notice, setNotice] = useState<ProfileEditNotice | null>(
    preview === 'save' || preview === 'complete' || preview === 'unverified' || preview === 'cancel'
      ? preview
      : null,
  );
  const [withdrawOpen, setWithdrawOpen] = useState(preview === 'withdraw');
  const [withdrawn, setWithdrawn] = useState(preview === 'withdraw-complete');
  const submitProfile = (event: import('react').FormEvent<HTMLFormElement>) =>
    event.preventDefault();
  const cancelProfile = () => {
    setNotice(null);
    setEditing(false);
  };
  const dismissNotice = () => setNotice(null);
  const saveProfile = () => setNotice(null);
  return (
    <MyPageFrame activePath="/mypage/profile" breadcrumbs={[{ label: '회원정보 확인 및 수정' }]}>
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
            setPhoneVerified(false);
            setFieldErrors((previous) => ({ ...previous, phone: undefined }));
          }}
          onEmailPreferenceChange={setEmailPreference}
          onSmsPreferenceChange={setSmsPreference}
          onKakaoPreferenceChange={setKakaoPreference}
          pending={false}
          onSubmit={submitProfile}
          onCancel={() => setNotice('cancel')}
          onWithdraw={() => setWithdrawOpen(true)}
        />
      ) : (
        <ContentSection
          gap={{ base: '32px', _mobile: '24px' }}
          title="회원정보 확인"
          headerProps={{
            titleAs: 'h1',
            pb: { base: '40px', _mobile: '0' },
            borderBottom: { base: '2px solid var(--colors-black-100)', _mobile: '0' },
            titleProps: { web: 'heading6', mo: 'heading5' },
          }}
        >
          <Stack gap={{ base: '40px', _mobile: '24px' }}>
            <DescriptionList
              items={[
                ...profileDetails.slice(0, 3).map(([term, description]) => ({ term, description })),
                {
                  term: '주소',
                  description: `${savedAddress.address} ${savedAddress.addressDetail}`,
                },
                { term: '이메일', description: email },
                { term: '휴대폰 번호', description: phone },
              ]}
              termProps={{ variant: 'body3', weight: 'semibold' }}
              descriptionProps={{ variant: 'body3', tone: 'subtle' }}
              slotStyles={{
                root: css.raw({
                  gridTemplateColumns: 'none',
                  gap: '48px',
                  pb: '32px',
                  borderBottom: '1px solid var(--colors-black-20)',
                  _mobile: { gap: '24px', pb: '24px' },
                }),
                row: css.raw({
                  display: 'flex',
                  gap: '0',
                  _mobile: { flexDirection: 'column', gap: '12px' },
                }),
                term: css.raw({ w: '178px', flexShrink: '0', _mobile: { w: 'auto' } }),
                description: css.raw({ m: '0' }),
              }}
            />
            <ProfileReadView
              email={email}
              phone={phone}
              emailPreference={emailPreference}
              smsPreference={smsPreference}
              kakaoPreference={kakaoPreference}
            />
          </Stack>
          <Button
            size="tall"
            variant="primary"
            className={css({
              w: '180px',
              alignSelf: 'center',
              mt: '16px',
              _mobile: { w: '100%', mt: '0' },
            })}
            onClick={() => {
              cancelProfile();
              setEditing(true);
            }}
          >
            회원정보 수정
          </Button>
        </ContentSection>
      )}
      {notice ? (
        <ProfileEditDialogs
          notice={notice}
          pending={false}
          onDismiss={dismissNotice}
          onConfirm={
            notice === 'cancel' ? cancelProfile : notice === 'save' ? saveProfile : dismissNotice
          }
        />
      ) : null}
      <MyPageWithdrawalDialog
        open={withdrawOpen}
        pending={false}
        onOpenChange={(next) => {
          setWithdrawOpen(next);
        }}
        onConfirm={() => setWithdrawOpen(false)}
      />
      <MyPageWithdrawalCompleteDialog open={withdrawn} onOpenChange={setWithdrawn} />
    </MyPageFrame>
  );
}
