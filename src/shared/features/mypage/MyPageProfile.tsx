'use client';

import { useState } from 'react';
import { Divider, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { Radio } from '@/shared/components/atoms/Radio/Radio';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import { MyPageFrame } from './MyPageFrame';

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
      <Typography variant="body3" tone="tertiary">{value}</Typography>
    </Stack>
  );
}

export function MyPageProfile() {
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState('dww******@gmail.com');
  const [phone, setPhone] = useState('010-****-0522');
  const [password, setPassword] = useState('');
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
      <Stack gap="6" px="4" pt="6" pb="16">
        <Typography as="h1" web="heading8" mo="heading5">
          {editing ? '회원정보 수정' : '회원정보'}
        </Typography>
        <Stack gap="6">
          {profileDetails.slice(0, 4).map(([label, value]) => (
            <ProfileField key={label} label={label} value={value} />
          ))}
          {editing ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setEditing(false);
              }}
            >
              <Stack gap="3">
                <FormField htmlFor="profile-password" label="새 비밀번호" variant="boxed">
                  <TextInput
                    id="profile-password"
                    type="password"
                    placeholder="변경할 비밀번호를 입력해 주세요"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </FormField>
                <FormField htmlFor="profile-email" label="이메일" required variant="boxed">
                  <TextInput
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </FormField>
                <FormField htmlFor="profile-phone" label="휴대폰 번호" required variant="boxed">
                  <TextInput
                    id="profile-phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </FormField>
                <Stack gap="4">
                  <Divider aria-hidden="true" orientation="horizontal" h="1px" bg="black.20" />
                  <Stack gap="5">
                    <Typography as="h2" mo="heading7">
                      마케팅 정보 수신 동의
                    </Typography>
                    <Radio
                      ariaLabel="이메일 수신"
                      name="email-preference"
                      value={emailPreference}
                      onValueChange={setEmailPreference}
                      options={[
                        { value: '동의', label: '이메일 수신 동의' },
                        { value: '수신안함', label: '이메일 수신안함' },
                      ]}
                    />
                    <Radio
                      ariaLabel="모바일 쿠폰북 수신"
                      name="coupon-book-preference"
                      value={couponBookPreference}
                      onValueChange={setCouponBookPreference}
                      options={[
                        { value: '동의', label: '모바일 쿠폰북 수신 동의' },
                        { value: '수신안함', label: '모바일 쿠폰북 수신안함' },
                      ]}
                    />
                    <Radio
                      ariaLabel="문자 수신"
                      name="sms-preference"
                      value={smsPreference}
                      onValueChange={setSmsPreference}
                      options={[
                        { value: '동의', label: 'SMS 수신 동의' },
                        { value: '수신안함', label: 'SMS 수신안함' },
                      ]}
                    />
                    <Radio
                      ariaLabel="카카오톡 수신"
                      name="kakao-preference"
                      value={kakaoPreference}
                      onValueChange={setKakaoPreference}
                      options={[
                        { value: '동의', label: '카카오톡 수신 동의' },
                        { value: '수신안함', label: '카카오톡 수신안함' },
                      ]}
                    />
                  </Stack>
                </Stack>
                <HStack gap="2" pt="4">
                  <Button
                    fullWidth
                    size="short"
                    variant="secondary"
                    type="button"
                    onClick={() => setEditing(false)}
                  >
                    취소
                  </Button>
                  <Button fullWidth size="short" variant="primary" type="submit">
                    회원정보 저장
                  </Button>
                </HStack>
                <Button
                  size="sm"
                  variant="link"
                  type="button"
                  onClick={() => setWithdrawOpen(true)}
                >
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
                <Stack gap="6">
                  <Typography as="h2" mo="heading7">
                    마케팅 정보 수신 동의
                  </Typography>
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
                </Stack>
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
              <Button fullWidth size="tall" variant="primary" onClick={() => setEditing(true)}>
                회원정보 수정
              </Button>
            </>
          )}
        </Stack>
      </Stack>
      <ModalDialog
        closeLabel="회원탈퇴 확인창 닫기"
        onOpenChange={setWithdrawOpen}
        open={withdrawOpen}
        size="sm"
        title="회원탈퇴"
      >
        <Stack gap="6">
          <Stack gap="4">
            <Typography as="h2" variant="heading9">
              회원탈퇴를 진행 하시겠습니까?
            </Typography>
            <Typography as="p" variant="body3">
              탈퇴 후에는 회원정보 및 이용내역을 복구할 수 없으며, 탈퇴 후 6개월간 재가입이
              불가합니다.
            </Typography>
          </Stack>
          <HStack gap="2">
            <Button
              fullWidth
              size="short"
              variant="secondary"
              onClick={() => setWithdrawOpen(false)}
            >
              취소
            </Button>
            <Button
              fullWidth
              size="short"
              variant="primary"
              onClick={() => {
                setWithdrawOpen(false);
                setWithdrawn(true);
              }}
            >
              확인
            </Button>
          </HStack>
        </Stack>
      </ModalDialog>
      <ModalDialog
        closeLabel="회원탈퇴 안내 닫기"
        onOpenChange={setWithdrawn}
        open={withdrawn}
        size="sm"
        title="회원탈퇴"
      >
        <Typography as="p" variant="body3">
          회원탈퇴 요청을 확인했습니다.
        </Typography>
      </ModalDialog>
    </MyPageFrame>
  );
}
