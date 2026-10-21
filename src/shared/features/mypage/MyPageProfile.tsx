'use client';

import { ProfileEditForm } from './ProfileEditForm';
import { ProfileField } from './ProfileField';
import { ProfileReadView } from './ProfileReadView';
import type { MaritalStatus, Preference } from './mypage-profile.types';

import { Button } from '@/shared/components/atoms/Button/Button';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { useState } from 'react';

import { MyPageWithdrawalCompleteDialog } from '@/shared/features/mypage/MyPageWithdrawalCompleteDialog';
import { MyPageWithdrawalDialog } from '@/shared/features/mypage/MyPageWithdrawalDialog';
import { MyPageFrame } from './MyPageFrame';

const profileDetails = [
  ['회원 아이디', 'hon******'],
  ['이름', '손*민'],
  ['생년월일', '1993.05.22'],
  ['주소', '서울시 성북구 테헤란로 27길 54 테헤란 아파트 701호'],
  ['이메일', 'dww******@gmail.com'],
  ['휴대폰 번호', '010-****-0522'],
] as const;

export function MyPageProfile() {
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState('dww******@gmail.com');
  const [phone, setPhone] = useState('010-****-0522');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string }>({});
  const [emailPreference, setEmailPreference] = useState<Preference>('수신안함');
  const [couponBookPreference, setCouponBookPreference] = useState<Preference>('수신안함');
  const [messagePreference, setMessagePreference] = useState<Preference>('수신안함');
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>('기혼');
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  function submitProfile(event: import('react').FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailInput = event.currentTarget.querySelector<HTMLInputElement>('#profile-email');
    const errors = {
      email:
        email.trim() && !emailInput?.validity.typeMismatch ? '' : '올바른 이메일을 입력해 주세요.',
      phone: phone.trim() ? '' : '휴대폰 번호를 입력해 주세요.',
    };
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;
    setEditing(false);
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
        {profileDetails.slice(0, 4).map(([label, value]) => (
          <ProfileField key={label} label={label} value={value} />
        ))}
        {editing ? (
          <ProfileEditForm
            email={email}
            phone={phone}
            password={password}
            emailPreference={emailPreference}
            couponBookPreference={couponBookPreference}
            messagePreference={messagePreference}
            maritalStatus={maritalStatus}
            fieldErrors={fieldErrors}
            onEmailChange={(value) => {
              setEmail(value);
              setFieldErrors((previous) => ({ ...previous, email: undefined }));
            }}
            onPhoneChange={(value) => {
              setPhone(value);
              setFieldErrors((previous) => ({ ...previous, phone: undefined }));
            }}
            onPasswordChange={setPassword}
            onEmailPreferenceChange={setEmailPreference}
            onCouponBookPreferenceChange={setCouponBookPreference}
            onMessagePreferenceChange={setMessagePreference}
            onMaritalStatusChange={setMaritalStatus}
            onSubmit={submitProfile}
            onCancel={() => {
              setFieldErrors({});
              setEditing(false);
            }}
            onWithdraw={() => setWithdrawOpen(true)}
          />
        ) : (
          <ProfileReadView
            email={email}
            phone={phone}
            emailPreference={emailPreference}
            couponBookPreference={couponBookPreference}
            messagePreference={messagePreference}
            maritalStatus={maritalStatus}
          />
        )}
      </ContentSection>
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
