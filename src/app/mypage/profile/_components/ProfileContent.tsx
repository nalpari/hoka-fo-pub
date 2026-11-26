'use client';
import { type FormEvent, useRef, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Grid, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { DescriptionList } from '@/components/common/atoms/DescriptionList';
import { Radio } from '@/components/common/atoms/Radio';
import { StatusMessage } from '@/components/common/atoms/StatusMessage';
import { Typography } from '@/components/common/atoms/Typography';

import { FormActionGroup } from '@/components/common/molecules/FormActionGroup';
import { TextFormField } from '@/components/common/molecules/FormFields/TextFormField';
import { VerificationCountdown } from '@/components/common/molecules/FormFields/VerificationCountdown';

import { AddressFields } from '@/components/common/organisms/Address/AddressFields';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

import { MyPageFrame } from '@/app/mypage/_components/MyPageFrame';
import {
  type Preference,
  type ProfileAddress,
  type ProfileEditProps,
  type ProfilePhonePreview,
} from '@/app/mypage/profile/mypage-profile.types';
import { type Errors, type FieldName } from '@/lib/passwordValidation';
import { getPhoneDigits } from '@/lib/phoneNumber';

type Props = {
  phone: string;
  error?: string;
  verified: boolean;
  previewState?: ProfilePhonePreview;
  onPhoneChange: (value: string) => void;
};
/** 회원정보의 휴대폰 입력과 고정 인증 상태를 표시합니다. (Displays profile phone input and fixed verification states.) */
function ProfilePhoneVerification({ phone, error, verified, previewState, onPhoneChange }: Props) {
  const [code, setCode] = useState('');
  const codeInput = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState<'mismatch' | 'expired' | null>(
    previewState === 'expired' || previewState === 'mismatch' ? previewState : null,
  );
  const requested = previewState !== undefined && previewState !== 'idle';
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
        variant="primary"
        size="short"
        className={profileStyles.requestButton}
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
          variant="alert"
          open

          title={notice === 'mismatch' ? '인증번호 불일치' : '인증번호 입력시간 초과'}
          closeLabel="인증번호 안내 닫기"
          onOpenChange={(open) => {
            if (!open) dismissNotice();
          }}
          actions={{ kind: 'single', onConfirm: dismissNotice }}
          message={
            <>
              {notice === 'mismatch'
                ? '인증번호가 일치하지 않습니다. 다시 입력해주세요.'
                : '인증번호 입력 시간이 초과하였습니다. 인증번호 재전송 후 이용해주세요.'}
            </>
          }
        />
      ) : null}
    </Stack>
  );
}

const profileStyles = {
  requestButton: css({ alignSelf: 'center', w: '180px', _mobile: { w: 'full' } }),
  mobileActionLabel: { _mobile: { '& button > span > span': { fontSize: 'body.15' } } },
  mobileHeadingLineHeight: css({ _mobile: { lineHeight: 'koreanHeading' } }),
};

/** [ 개발팀 바인딩 ] 이메일 주소는 ProfileContent가 email 및 onEmailChange로 관리하는 단일 입력 초안이며 fieldErrors.email은 입력란 오류를 표시합니다. 현재 저장 요청은 연결되어 있지 않습니다. 회원정보 통합 소유자가 저장 시 이메일·주소·수신 동의를 제출 데이터로 전달하고, 요청 중 중복 제출 방지, 실패 시 입력 유지와 재시도, 성공 후 조회 정보 갱신을 담당합니다. */
/** 회원정보 수정 마크업을 표시합니다. (Displays profile editing markup.) */
export function ProfileEditForm({
  previewPhone,
  email,
  address,
  addressOpen,
  phone,
  savedPhone,
  phoneVerified,
  passwordChanged,
  emailPreference,
  smsPreference,
  kakaoPreference,
  fieldErrors,
  onEmailChange,
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
  const platform = usePlatform();
  const [passwordOpen, setPasswordOpen] = useState(false);
  const passwordTrigger = useRef<HTMLButtonElement>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  return (
    <>
      <form noValidate onSubmit={submit}>
        <ContentSection
          gap={{ base: '48px', _mobile: '32px' }}
          css={{ '--line-heights-body': '1.5' }}
          _mobile={{ pt: '24px' }}
          title="회원정보 수정"
          headerProps={{
            titleAs: 'h1',
            titleProps: { web: 'h6', mo: 'h7', tone: 'primary' },
            pb: { base: '40px', _mobile: '32px' },
          }}
        >
          <Grid
            gridTemplateColumns="minmax(0, 286px) minmax(0, 500px)"
            gap="58px"
            pt="0"
            _mobile={{
              gridTemplateColumns: 'minmax(0, 1fr)',
              gap: '24px',
              pt: '0',
            }}
          >
            <Stack gap="0" _mobile={{ gap: '24px' }}>
              <DescriptionList
                items={[
                  ...(details ?? profileDetails.slice(0, 3))
                    .slice(0, 2)
                    .map(([term, description]) => ({
                      term,
                      description,
                      descriptionProps: term === '이름' ? { variant: 'b4' as const } : undefined,
                    })),
                  { term: '성별', description: '남성', descriptionProps: { variant: 'b4' } },
                  { term: '생년월일', description: (details ?? profileDetails)[2][1] },
                  { term: '휴대폰 번호', description: savedPhone },
                ]}
                termProps={{
                  web: 'b4M',
                  mo: 'b4S',
                  tone: 'primary',
                }}
                descriptionProps={{ variant: 'b4', tone: 'subtle' }}
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
                  term: css.raw({ _mobile: { lineHeight: 'koreanHeading' } }),
                  description: css.raw({ m: '0' }),
                }}
              />
              <Stack
                alignItems="flex-start"
                gap="12px"
                py="24px"
                borderBottom="1px solid var(--colors-black-20)"
                _mobile={{ py: '0', borderBottom: '0', gap: '16px' }}
              >
                <Button
                  ref={passwordTrigger}
                  type="button"
                  variant={platform === 'mobile' ? 'primary' : 'secondary'}
                  size="short"
                  className={css({ _mobile: { w: 'full' } })}
                  onClick={() => setPasswordOpen(true)}
                >
                  비밀번호 설정
                </Button>
                {passwordChanged && (
                  <Typography variant="b7" language="ko" tone="tertiary" role="status">
                    비밀번호 설정을 완료하였습니다.
                  </Typography>
                )}
              </Stack>
              <Stack
                gap="24px"
                py="32px"
                pr="16px"
                className={css({ _mobile: { display: 'none' } })}
              >
                <Typography variant="b4M">탈퇴를 원하실 경우 회원탈퇴를 눌러주세요.</Typography>
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
                searchLabel="우편번호 찾기"
                detailLayout="columns"
                value={address}
                errors={fieldErrors}
                fieldOptions={{ addressDetail: { required: true } }}
                onValueChange={onAddressChange}
                searchOpen={addressOpen}
                onSearchOpenChange={onAddressOpenChange}
              />
              <TextFormField
                id="profile-email"
                variant="boxed"
                required
                error={fieldErrors.email}
                label="이메일 주소"
                inputProps={{
                  type: 'email',
                  value: email,
                  autoComplete: 'email',
                  onChange: (event) => onEmailChange(event.target.value),
                }}
              />
              <Stack gap="32px" pt="24px" pb="32px" _mobile={{ pt: '8px', pb: '24px' }}>
                <ContentSection
                  gap={{ base: '32px', _mobile: '24px' }}
                  title="마케팅 정보 수신 동의"
                  headerProps={{
                    titleAs: 'h2',
                    titleProps: {
                      web: 'h10B',
                      mo: 'b4S',
                      className: profileStyles.mobileHeadingLineHeight,
                    },
                  }}
                >
                  <Stack
                    gap={{ base: '24px', _mobile: '16px' }}
                    pb={{ base: '32px', _mobile: '24px' }}
                    borderBottom="1px solid var(--colors-black-20)"
                  >
                    <Radio
                      ariaLabel="이메일 수신"
                      name="email-preference"
                      value={emailPreference}
                      onValueChange={onEmailPreferenceChange}
                      label={
                        <Typography web="b4M" mo="b6">
                          이메일 수신
                        </Typography>
                      }
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
                      label={
                        <Typography web="b4M" mo="b6">
                          문자수신(LMS, SMS)
                        </Typography>
                      }
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
                      label={
                        <Typography web="b4M" mo="b6">
                          카카오톡 알림톡 수신
                        </Typography>
                      }
                      options={[
                        { value: '수신', label: '수신' },
                        { value: '수신안함', label: '수신안함' },
                      ]}
                    />
                  </Stack>
                  <FormActionGroup
                    size="tall"
                    disabled={pending}
                    onCancel={onCancel}
                    submitLabel="변경사항 저장"
                    w="368px"
                    maxW="100%"
                    alignSelf="center"
                    css={profileStyles.mobileActionLabel}
                  />
                  <Stack
                    gap="16px"
                    pt="24px"
                    className={css({ display: 'none', _mobile: { display: 'flex' } })}
                  >
                    <Typography variant="b6">탈퇴를 원하실 경우 회원탈퇴를 눌러주세요.</Typography>
                    <Button
                      size="md"
                      variant="link"
                      type="button"
                      onClick={onWithdraw}
                      className={css({ alignSelf: 'flex-start' })}
                    >
                      <Typography variant="b6M">회원탈퇴</Typography>
                    </Button>
                  </Stack>
                </ContentSection>
              </Stack>
            </Stack>
          </Grid>
        </ContentSection>
      </form>
      {passwordOpen && (
        <ProfilePasswordDialog
          onClose={() => setPasswordOpen(false)}
          finalFocus={passwordTrigger}
        />
      )}
    </>
  );
}
type ProfilePasswordDialogProps = {
  previewComplete?: boolean;
  previewState?: 'input' | 'input-error' | 'confirm' | 'complete';
  finalFocus?: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
};
const titles = {
  input: '비밀번호 설정',
  'input-error': '비밀번호 설정',
  confirm: '비밀번호 변경 확인',
  complete: '비밀번호 변경 완료',
};
/** [ 개발팀 바인딩 ] previewState='error'는 고정 오류 문구·테두리를 검수하는 표시 fixture입니다. 입력 초안은 로컬로 유지하며 submit은 요청·검증·저장·성공 전환을 실행하지 않습니다. 실제 비밀번호 변경 요청과 오류 응답 연결은 회원정보 통합 소유자가 담당합니다. */
/** 비밀번호 변경 입력·오류와 완료 상태를 표시합니다. (Displays password editing, fixed errors and completion states.) */
export function ProfilePasswordDialog({
  previewComplete = false,
  previewState,
  finalFocus,
  onClose,
}: ProfilePasswordDialogProps) {
  const step = previewState ?? (previewComplete ? 'complete' : 'input');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const input = step === 'input' || step === 'input-error';
  const errors: Errors =
    step === 'input-error'
      ? {
          password: '올바른 비밀번호를 입력해주세요.',
          confirmation: '비밀번호가 일치하지 않습니다. 다시 확인해주세요.',
        }
      : {};
  const changeField = (field: FieldName, value: string) =>
    field === 'password' ? setPassword(value) : setConfirmation(value);
  const content = input
    ? {
        variant: 'form' as const,
        children: (
          <form id="profile-password-form" noValidate onSubmit={(event) => event.preventDefault()}>
            <Stack gap="16px">
              <TextFormField
                id="profile-new-password"
                label="비밀번호"
                required
                variant="boxed"
                error={errors.password}
                hint="연속적인 숫자나 생일, 전화번호등 추측하기 쉬운 개인정보 및 아이디와 비슷한 전화번호 사용을 피하시기 바랍니다. 비밀번호는 특수기호를 포함한 3가지 이상을 혼합하여 입력하세요."
                hintProps={{ variant: 'b8', className: css({ color: 'black.100' }) }}
                inputProps={{
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
                  value: confirmation,
                  onChange: (event) => changeField('confirmation', event.target.value),
                }}
              />
            </Stack>
          </form>
        ),
      }
    : {
        variant: step === 'confirm' ? ('confirm' as const) : ('alert' as const),
        message: (
          <span role="status">
            {step === 'confirm' ? '비밀번호를 변경하시겠습니까?' : '비밀번호가 변경되었습니다.'}
          </span>
        ),
      };
  return (
    <ModalDialog
      {...content}
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title={titles[step]}
      closeLabel="비밀번호 설정 닫기"
      finalFocus={finalFocus}
      {...(input
        ? {
            mobilePresentation: 'bottomSheet' as const,
            blurBackdrop: false,
            headerProps: { css: { mb: '32px', _mobile: { mb: '16px' } } },
            contentClassName: css({
              '&&': { p: '0 32px', _mobile: { p: '0 16px 24px' } },
              '--line-heights-body': '1.5',
            }),
            footerProps: {
              className: css({
                '&&': {
                  mt: '32px',
                  _mobile: {
                    mt: '0',
                    pt: '15px',
                    pb: '32px',
                    borderTop: '1px solid var(--colors-black-20)',
                  },
                },
              }),
            },
            footer: (
              <Button
                type="submit"
                form="profile-password-form"
                size="tall"
                variant="primary"
                className={css({
                  '&&&': {
                    w: '238px',
                    maxW: '100%',
                    _mobile: { w: 'full', h: '44px', minH: '44px' },
                  },
                })}
              >
                확인
              </Button>
            ),
          }
        : { actions: { kind: 'single' as const, label: '확인', onConfirm: onClose } })}
    />
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
    message,
  };
  return (
    <ModalDialog
      variant={notice === 'cancel' || notice === 'save' ? 'confirm' : 'alert'}
      {...props}

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
      variant="alert"
      closeLabel="회원탈퇴 안내 닫기"
      onOpenChange={onOpenChange}
      open={open}

      title="회원탈퇴"
      message={<>회원탈퇴 요청을 확인했습니다.</>}
    />
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
      variant="confirm"
      closeLabel="회원탈퇴 확인창 닫기"
      onOpenChange={onOpenChange}
      open={open}

      title="회원탈퇴"
      actions={{
        kind: 'confirm',
        onConfirm: onConfirm,
        fullWidth: false,
        confirmDisabled: pending,
      }}
      message="회원탈퇴를 진행 하시겠습니까?"
      description="탈퇴 후에는 회원정보 및 이용내역을 복구할 수 없으며, 탈퇴 후 6개월간 재가입이 불가합니다."
    />
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
  const [emailDraft, setEmailDraft] = useState(email);
  const [address, setAddress] = useState(initialAddress);
  const [savedAddress] = useState(initialAddress);
  const [addressOpen, setAddressOpen] = useState(false);
  const savedPhone = '010-****-0522';
  const [phone, setPhone] = useState('');
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
    <MyPageFrame activePath="/mypage/profile" breadcrumbs={[{ label: '회원정보 관리' }]}>
      {editing ? (
        <ProfileEditForm
          email={emailDraft}
          address={address}
          addressOpen={addressOpen}
          phone={phone}
          savedPhone={savedPhone}
          phoneVerified={phoneVerified}
          passwordChanged={passwordChanged}
          emailPreference={emailPreference}
          smsPreference={smsPreference}
          kakaoPreference={kakaoPreference}
          fieldErrors={fieldErrors}
          onEmailChange={(value) => {
            setEmailDraft(value);
            setFieldErrors((previous) => ({ ...previous, email: undefined }));
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
          gap={{ base: '40px', _mobile: '32px' }}
          title="회원정보"
          css={{ '--line-heights-body': '1.5' }}
          _mobile={{ pt: '24px' }}
          headerProps={{
            titleAs: 'h1',
            titleProps: { web: 'h6', mo: 'h7', tone: 'primary' },
          }}
        >
          <Stack gap={{ base: '40px', _mobile: '24px' }}>
            <DescriptionList
              items={[
                ...profileDetails.slice(0, 2).map(([term, description]) => ({
                  term,
                  description,
                  descriptionProps: term === '이름' ? { variant: 'b4' as const } : undefined,
                })),
                { term: '성별', description: '남성', descriptionProps: { variant: 'b4' } },
                { term: profileDetails[2][0], description: profileDetails[2][1] },
                { term: '휴대폰 번호', description: savedPhone },
                {
                  term: '주소',
                  descriptionProps: { variant: 'b4' },
                  description: `${savedAddress.address} ${savedAddress.addressDetail}`,
                },
                { term: '이메일', description: email },
              ]}
              termProps={{
                web: 'b4M',
                mo: 'b4S',
                tone: 'primary',
              }}
              descriptionProps={{ variant: 'b4', tone: 'subtle' }}
              slotStyles={{
                root: css.raw({
                  gridTemplateColumns: 'none',
                  gap: '24px',
                  pb: '32px',
                  borderBottom: '1px solid var(--colors-black-20)',
                  _mobile: { pb: '24px' },
                }),
                row: css.raw({
                  display: 'flex',
                  columnGap: '24px',
                  _mobile: { flexDirection: 'column', gap: '12px' },
                }),
                term: css.raw({
                  w: '86px',
                  flexShrink: '0',
                  _mobile: { w: 'auto', lineHeight: 'koreanHeading' },
                }),
                description: css.raw({ m: '0', overflowWrap: 'anywhere' }),
              }}
            />
            <Stack gap="16px">
              <ContentSection
                gap={{ base: '32px', _mobile: '24px' }}
                title="마케팅 정보 수신 동의"
                borderBottom="1px solid var(--colors-black-20)"
                pb="32px"
                _mobile={{ pb: '24px' }}
                headerProps={{
                  titleAs: 'h2',
                  titleProps: {
                    web: 'h10',
                    mo: 'b4S',
                    tone: 'primary',
                    className: profileStyles.mobileHeadingLineHeight,
                  },
                }}
              >
                <DescriptionList
                  items={[
                    { term: '이메일 수신', description: emailPreference },
                    { term: '문자수신(LMS, SMS)', description: smsPreference },
                    { term: '카카오톡 알림톡 수신', description: kakaoPreference },
                  ]}
                  termProps={{ web: 'b4M', mo: 'b6', tone: 'primary' }}
                  descriptionProps={{ web: 'b4', mo: 'b6', tone: 'subtle' }}
                  slotStyles={{
                    root: css.raw({
                      gridTemplateColumns: 'none',
                      gap: '24px',
                      _mobile: { gap: '16px' },
                    }),
                    row: css.raw({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: '0',
                      _mobile: { justifyContent: 'space-between' },
                    }),
                    term: css.raw({ w: '178px', _mobile: { w: 'auto' } }),
                    description: css.raw({
                      m: '0',
                      _mobile: {
                        textAlign: 'right',
                        '--color-text-subtle': 'var(--color-text-tertiary)',
                      },
                    }),
                  }}
                />
              </ContentSection>
              <Typography as="p" web="b6" mo="b7" language="ko" tone="tertiary">
                *가려진 회원 정보 조회 및 회원정보 변경, 회원 탈퇴는 회원정보 수정 페이지에서
                가능합니다.
              </Typography>
            </Stack>
          </Stack>
          <Button
            size="tall"
            variant="primary"
            className={css({
              w: '180px',
              alignSelf: 'center',
              _mobile: { w: '100%', mt: '8px', '&&': { '--button-height': '44px' } },
            })}
            onClick={() => {
              cancelProfile();
              setEditing(true);
            }}
          >
            <Typography web="b4B" mo="b5B">
              회원정보 수정
            </Typography>
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
