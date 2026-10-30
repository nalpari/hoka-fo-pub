'use client';

import { useState } from 'react';

import type { Preference } from '@/app/mypage/profile/mypage-profile.types';
import { MyPageFrame } from '@/components/mypage/MyPageFrame';

import { ProfileEditForm, ProfilePasswordDialog } from './ProfileContent';

/** [ 개발팀 바인딩 ] 편집 오류의 고정 fixture이며 저장·탈퇴·비밀번호 변경은 실행하지 않습니다. 실제 원본 데이터·전화 proof·제출과 갱신은 MyPageDataContext.profile 소유자가 연결합니다. */
/** 회원정보 수정과 고정 필드 오류를 표시합니다. (Displays profile editing with optional fixed errors.) */
export function ProfileStatePreview({
  errors = false,
  phoneState = 'idle',
  passwordComplete = false,
}: {
  passwordComplete?: boolean;
  errors?: boolean;
  phoneState?: 'idle' | 'code-entry' | 'expired';
}) {
  const [passwordOpen, setPasswordOpen] = useState(passwordComplete);
  const [emailLocal, setEmailLocal] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [domainChoice, setDomainChoice] = useState('direct');
  const [address, setAddress] = useState({ postalCode: '', address: '', addressDetail: '' });
  const [addressOpen, setAddressOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailPreference, setEmailPreference] = useState<Preference>('수신안함');
  const [smsPreference, setSmsPreference] = useState<Preference>('수신안함');
  const [kakaoPreference, setKakaoPreference] = useState<Preference>('수신안함');
  return (
    <MyPageFrame activePath="/mypage/profile" breadcrumbs={[{ label: '회원정보 수정' }]}>
      <ProfileEditForm
        previewPhone={phoneState}
        emailLocal={emailLocal}
        emailDomain={emailDomain}
        domainChoice={domainChoice}
        address={address}
        addressOpen={addressOpen}
        phone={phone}
        phoneVerified={phoneVerified}
        passwordChanged={false}
        emailPreference={emailPreference}
        smsPreference={smsPreference}
        kakaoPreference={kakaoPreference}
        fieldErrors={
          errors
            ? {
                email: '이메일을 입력해 주세요.',
                domain: '이메일 도메인을 입력해 주세요.',
                phone: '휴대폰 번호를 올바르게 입력해주세요.',
                postalCode: '우편번호를 입력해 주세요.',
                address: '주소를 입력해 주세요.',
                addressDetail: '상세주소를 입력해 주세요.',
              }
            : {}
        }
        onEmailLocalChange={setEmailLocal}
        onEmailDomainChange={setEmailDomain}
        onDomainChoice={setDomainChoice}
        onAddressChange={(key, value) => setAddress((previous) => ({ ...previous, [key]: value }))}
        onAddressOpenChange={setAddressOpen}
        onPhoneChange={setPhone}
        onPhoneVerifiedChange={setPhoneVerified}
        onPasswordSettings={() => {}}
        onEmailPreferenceChange={setEmailPreference}
        onSmsPreferenceChange={setSmsPreference}
        onKakaoPreferenceChange={setKakaoPreference}
        onSubmit={(event) => event.preventDefault()}
        onCancel={() => {}}
        onWithdraw={() => {}}
      />
      {passwordOpen && (
        <ProfilePasswordDialog
          previewComplete
          onClose={() => setPasswordOpen(false)}
          onComplete={() => setPasswordOpen(false)}
        />
      )}
    </MyPageFrame>
  );
}
