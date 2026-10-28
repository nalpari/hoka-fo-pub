import { Divider } from '@/components/common/atoms/Divider/Divider';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { HStack, Stack } from 'styled-system/jsx';
import type { ProfileValues } from './mypage-profile.types';
import { ProfileField } from './ProfileField';

/** 회원정보와 수신 동의의 현재 값을 표시합니다. (Displays current profile details and communication preferences.) */
export function ProfileReadView({
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
