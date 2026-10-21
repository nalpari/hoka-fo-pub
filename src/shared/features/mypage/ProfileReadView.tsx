import { Divider } from '@/shared/components/atoms/Divider/Divider';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { HStack, Stack } from 'styled-system/jsx';
import type { ProfileValues } from './mypage-profile.types';
import { ProfileField } from './ProfileField';

export function ProfileReadView({
  email,
  phone,
  emailPreference,
  couponBookPreference,
  messagePreference,
  maritalStatus,
}: Omit<ProfileValues, 'password'>) {
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
                {messagePreference}
              </Typography>
            </HStack>
          </Stack>
        </ContentSection>
      </Stack>
      <Stack gap="5">
        <Divider />
        <ProfileField label="결혼유무" value={maritalStatus} />
      </Stack>
      <Divider />
      <Typography as="p" variant="body5" tone="tertiary">
        *가려진 회원 정보 조회 및 회원정보 변경, 회원 탈퇴는 회원정보 수정 페이지에서 가능합니다.
      </Typography>
    </>
  );
}
