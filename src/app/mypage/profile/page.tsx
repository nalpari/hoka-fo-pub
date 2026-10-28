'use client';

import { ProfileEditForm } from '@/components/features/mypage/ProfileEditForm';
import { ProfileField } from '@/components/features/mypage/ProfileField';
import { ProfileReadView } from '@/components/features/mypage/ProfileReadView';
import { ProfilePasswordDialog } from '@/components/features/mypage/ProfilePasswordDialog';
import {
  ProfileEditDialogs,
  type ProfileEditNotice,
} from '@/components/features/mypage/ProfileEditDialogs';
import type {
  Preference,
  ProfileAddress,
  ProfileEditProps,
} from '@/components/features/mypage/mypage-profile.types';
import { isValidEmailLocalPart, isValidEmailDomain } from '@/lib/emailValidation';

import { Button } from '@/components/common/atoms/Button/Button';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { useState } from 'react';

import { MyPageWithdrawalCompleteDialog } from '@/components/features/mypage/MyPageWithdrawalCompleteDialog';
import { MyPageWithdrawalDialog } from '@/components/features/mypage/MyPageWithdrawalDialog';
import { MyPageFrame } from '@/components/features/mypage/MyPageFrame';

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
export default function Page() {
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState('dww******@gmail.com');
  const [emailLocal, setEmailLocal] = useState('dww******');
  const [emailDomain, setEmailDomain] = useState('gmail.com');
  const [domainChoice, setDomainChoice] = useState('gmail.com');
  const [address, setAddress] = useState(initialAddress);
  const [savedAddress, setSavedAddress] = useState(initialAddress);
  const [addressOpen, setAddressOpen] = useState(false);
  const [phone, setPhone] = useState('010-****-0522');
  const [savedPhone, setSavedPhone] = useState(phone);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<ProfileEditProps['fieldErrors']>({});
  const [emailPreference, setEmailPreference] = useState<Preference>('수신안함');
  const [smsPreference, setSmsPreference] = useState<Preference>('수신안함');
  const [kakaoPreference, setKakaoPreference] = useState<Preference>('수신안함');
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
        : phone !== savedPhone && !phoneVerified
          ? '휴대폰 인증 후 변경사항을 저장해주세요.'
          : '',
    };
    setFieldErrors(errors);
    if (phone !== savedPhone && !phoneVerified) {
      setNotice('unverified');
      return;
    }
    if (Object.values(errors).some(Boolean)) return;
    setNotice('save');
  }

  function saveProfile() {
    setEmail(`${emailLocal.trim()}@${emailDomain.trim()}`);
    setSavedAddress(address);
    setSavedPhone(phone);
    setSavedPreferences({ emailPreference, smsPreference, kakaoPreference });
    setNotice('complete');
  }

  function cancelProfile() {
    const [local, domain] = email.split('@');
    setEmailLocal(local);
    setEmailDomain(domain);
    setDomainChoice(['naver.com', 'gmail.com', 'daum.net'].includes(domain) ? domain : 'direct');
    setAddress(savedAddress);
    setPhone(savedPhone);
    setEmailPreference(savedPreferences.emailPreference);
    setSmsPreference(savedPreferences.smsPreference);
    setKakaoPreference(savedPreferences.kakaoPreference);
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
      <ContentSection
        gap="6"
        px="4"
        pt="6"
        pb="16"
        title={<>{editing ? '회원정보 수정' : '회원정보'}</>}
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading8', mo: 'heading5' } }}
        footer={
          !editing ? (
            <Button fullWidth size="tall" variant="primary" onClick={() => setEditing(true)}>
              회원정보 수정
            </Button>
          ) : null
        }
      >
        {profileDetails.slice(0, 3).map(([label, value]) => (
          <ProfileField key={label} label={label} value={value} />
        ))}
        <ProfileField
          label="주소"
          value={`${savedAddress.address} ${savedAddress.addressDetail}`}
        />
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
            onPhoneVerifiedChange={(verified) => {
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
            email={email}
            phone={phone}
            emailPreference={emailPreference}
            smsPreference={smsPreference}
            kakaoPreference={kakaoPreference}
          />
        )}
      </ContentSection>
      {notice ? (
        <ProfileEditDialogs
          notice={notice}
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
        onOpenChange={setWithdrawOpen}
        onConfirm={() => {
          setWithdrawOpen(false);
          setWithdrawn(true);
        }}
      />
      <MyPageWithdrawalCompleteDialog open={withdrawn} onOpenChange={setWithdrawn} />
    </MyPageFrame>
  );
}
