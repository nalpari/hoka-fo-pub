'use client';

import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { useState } from 'react';
import { Divider, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

import { PreferenceField } from '@/shared/components/molecules/FormFields/PreferenceField';

import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { MyPageWithdrawalCompleteDialog } from '@/shared/features/mypage/MyPageWithdrawalCompleteDialog';
import { MyPageWithdrawalDialog } from '@/shared/features/mypage/MyPageWithdrawalDialog';
import { MyPageFrame } from './MyPageFrame';
import { PasswordField } from '@/shared/components/molecules/FormFields/PasswordField';
import { EmailField } from '@/shared/components/molecules/FormFields/EmailField';
import { PhoneNumberField } from '@/shared/components/molecules/FormFields/PhoneNumberField';

type Preference = '동의' | '수신안함';

const profileDetails = [
  ['회원 아이디', 'hon******'],
  ['이름', '손*민'],
  ['생년월일', '1993.05.22'],
  ['주소', '서울시 성북구 테헤란로 27길 54 테헤란 아파트 701호'],
  ['이메일', 'dww******@gmail.com'],
  ['휴대폰 번호', '010-****-0522'],
] as const;

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <Stack gap="2">
      <Typography variant="heading7">{label}</Typography>
      <Typography variant="body3" tone="tertiary">
        {value}
      </Typography>
    </Stack>
  );
}

export function MyPageProfile() {
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState('dww******@gmail.com');
  const [phone, setPhone] = useState('010-****-0522');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; phone?: string }>({});
  const [emailPreference, setEmailPreference] = useState<Preference>('수신안함');
  const [couponBookPreference, setCouponBookPreference] = useState<Preference>('수신안함');
  const [smsPreference, setSmsPreference] = useState<Preference>('수신안함');
  const [kakaoPreference, setKakaoPreference] = useState<Preference>('수신안함');
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

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
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              const emailInput =
                event.currentTarget.querySelector<HTMLInputElement>('#profile-email');
              const errors = {
                email:
                  email.trim() && !emailInput?.validity.typeMismatch
                    ? ''
                    : '올바른 이메일을 입력해 주세요.',
                phone: phone.trim() ? '' : '휴대폰 번호를 입력해 주세요.',
              };
              setFieldErrors(errors);
              if (Object.values(errors).some(Boolean)) return;
              setEditing(false);
            }}
          >
            <Stack gap="3">
              <PasswordField
                id="profile-password"
                label="새 비밀번호"
                variant="boxed"
                inputProps={{
                  type: 'password',
                  placeholder: '변경할 비밀번호를 입력해 주세요',
                  value: password,
                  onChange: (event) => setPassword(event.target.value),
                }}
              />
              <EmailField
                id="profile-email"
                label="이메일"
                required
                variant="boxed"
                error={fieldErrors.email}
                inputProps={{
                  type: 'email',
                  value: email,
                  onChange: (event) => {
                    setEmail(event.target.value);
                    setFieldErrors((previous) => ({ ...previous, email: undefined }));
                  },
                }}
              />
              <PhoneNumberField
                id="profile-phone"
                label="휴대폰 번호"
                required
                variant="boxed"
                error={fieldErrors.phone}
                inputProps={{
                  type: 'tel',
                  placeholder: undefined,
                  value: phone,
                  onChange: (event) => {
                    setPhone(event.target.value);
                    setFieldErrors((previous) => ({ ...previous, phone: undefined }));
                  },
                }}
              />
              <Stack gap="4">
                <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.20" />
                <ContentSection
                  gap="5"
                  title="마케팅 정보 수신 동의"
                  headerProps={{ titleAs: 'h2', titleProps: { mo: 'heading7' } }}
                >
                  <PreferenceField
                    ariaLabel="이메일 수신"
                    name="email-preference"
                    value={emailPreference}
                    onValueChange={setEmailPreference}
                    options={[
                      { value: '동의', label: '이메일 수신 동의' },
                      { value: '수신안함', label: '이메일 수신안함' },
                    ]}
                  />
                  <PreferenceField
                    ariaLabel="모바일 쿠폰북 수신"
                    name="coupon-book-preference"
                    value={couponBookPreference}
                    onValueChange={setCouponBookPreference}
                    options={[
                      { value: '동의', label: '모바일 쿠폰북 수신 동의' },
                      { value: '수신안함', label: '모바일 쿠폰북 수신안함' },
                    ]}
                  />
                  <PreferenceField
                    ariaLabel="문자 수신"
                    name="sms-preference"
                    value={smsPreference}
                    onValueChange={setSmsPreference}
                    options={[
                      { value: '동의', label: 'SMS 수신 동의' },
                      { value: '수신안함', label: 'SMS 수신안함' },
                    ]}
                  />
                  <PreferenceField
                    ariaLabel="카카오톡 수신"
                    name="kakao-preference"
                    value={kakaoPreference}
                    onValueChange={setKakaoPreference}
                    options={[
                      { value: '동의', label: '카카오톡 수신 동의' },
                      { value: '수신안함', label: '카카오톡 수신안함' },
                    ]}
                  />
                </ContentSection>
              </Stack>
              <HStack gap="2" pt="4">
                <Button
                  fullWidth
                  size="short"
                  variant="secondary"
                  type="button"
                  onClick={() => {
                    setFieldErrors({});
                    setEditing(false);
                  }}
                >
                  취소
                </Button>
                <Button fullWidth size="short" variant="primary" type="submit">
                  회원정보 저장
                </Button>
              </HStack>
              <Button size="sm" variant="link" type="button" onClick={() => setWithdrawOpen(true)}>
                회원탈퇴
              </Button>
            </Stack>
          </form>
        ) : (
          <>
            <ProfileField label="이메일" value={email} />
            <ProfileField label="휴대폰 번호" value={phone} />
            <Stack gap="6">
              <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.20" />
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
                      모바일 쿠폰북 수신
                    </Typography>
                    <Typography as="span" mo="body4" tone="subtle">
                      {couponBookPreference}
                    </Typography>
                  </HStack>
                  <HStack alignItems="flex-start" justifyContent="space-between">
                    <Typography as="span" mo="body4">
                      문자수신(LMS,SMS),
                      <br />
                      카카오톡 등 전자적 전송매체
                    </Typography>
                    <Typography as="span" mo="body4" tone="subtle">
                      {smsPreference === kakaoPreference ? smsPreference : '일부 동의'}
                    </Typography>
                  </HStack>
                </Stack>
              </ContentSection>
            </Stack>
            <Stack gap="5">
              <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.20" />
              <ProfileField label="결혼유무" value="기혼" />
            </Stack>
            <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.20" />
            <Typography as="p" variant="body5" tone="tertiary">
              *가려진 회원 정보 조회 및 회원정보 변경, 회원 탈퇴는 회원정보 수정 페이지에서
              가능합니다.
            </Typography>
          </>
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
