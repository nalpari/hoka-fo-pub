'use client';
import { useState } from 'react';

import type { Preference } from '@/app/mypage/profile/mypage-profile.types';
import { MyPageFrame } from '@/components/mypage/MyPageFrame';

import { ProfileEditForm, ProfilePasswordDialog } from './ProfileContent';
/** [ 개발팀 바인딩 ] 현재는 준비된 표시 데이터와 고정 상태의 마크업입니다. 입력·선택·열람·열기/닫기만 로컬로 처리하며 인증·조회·저장·삭제·결제·완료 전환은 실행하지 않습니다. 실제 마이페이지 연결 소유자가 표시 모델과 식별자·입력/선택 payload, 요청 중/실패/성공/재시도 및 응답 갱신을 별도로 구현해야 합니다. */
/** 회원정보 수정과 고정 필드 오류를 표시합니다. (Displays profile editing with optional fixed errors.) */
export function ProfileStatePreview({
  errors = false,
  phoneState = 'idle',
  passwordComplete = false,
  passwordState,
}: {
  passwordComplete?: boolean;
  passwordState?: 'input' | 'confirm';
  errors?: boolean;
  phoneState?: 'idle' | 'code-entry' | 'expired';
}) {
  const [passwordOpen, setPasswordOpen] = useState(passwordComplete || Boolean(passwordState));
  const [emailLocal, setEmailLocal] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [domainChoice, setDomainChoice] = useState('direct');
  const [address, setAddress] = useState({ postalCode: '', address: '', addressDetail: '' });
  const [addressOpen, setAddressOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneVerified] = useState(false);
  const [emailPreference, setEmailPreference] = useState<Preference>('수신안함');
  const [smsPreference, setSmsPreference] = useState<Preference>('수신안함');
  const [kakaoPreference, setKakaoPreference] = useState<Preference>('수신안함');
  return (
    <MyPageFrame activePath="/mypage/profile" breadcrumbs={[{ label: '회원정보 수정' }]}>
      <ProfileEditForm
        details={[
          ['회원 아이디', 'hon******@gmail.com'],
          ['이름', '손정민'],
          ['생년월일', '1993.05.22'],
          ['주소', '서울시 성북구 테헤란로 27길 54 테헤란 아파트 701호'],
        ]}
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
        onDomainChoice={(value) => {
          setDomainChoice(value);
          setEmailDomain(value === 'direct' ? '' : value);
        }}
        onAddressChange={(key, value) => setAddress((previous) => ({ ...previous, [key]: value }))}
        onAddressOpenChange={setAddressOpen}
        onPhoneChange={setPhone}
        onEmailPreferenceChange={setEmailPreference}
        onSmsPreferenceChange={setSmsPreference}
        onKakaoPreferenceChange={setKakaoPreference}
        onSubmit={(event) => event.preventDefault()}
      />
      {passwordOpen && (
        <ProfilePasswordDialog
          previewComplete={passwordComplete}
          previewState={passwordState}
          onClose={() => setPasswordOpen(false)}
        />
      )}
    </MyPageFrame>
  );
}
