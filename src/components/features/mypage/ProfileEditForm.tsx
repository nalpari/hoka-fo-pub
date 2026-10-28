import { Button } from '@/components/common/atoms/Button/Button';
import { Divider } from '@/components/common/atoms/Divider/Divider';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { FormActionGroup } from '@/components/common/molecules/FormActionGroup/FormActionGroup';
import { AddressFields } from '@/components/common/organisms/Address/AddressFields';
import { EmailAddressFields } from '@/components/common/organisms/EmailAddressFields/EmailAddressFields';
import { ProfilePhoneVerification } from './ProfilePhoneVerification';
import { PreferenceField } from '@/components/common/molecules/FormFields/PreferenceField';
import { Stack } from 'styled-system/jsx';
import type { ProfileEditProps } from './mypage-profile.types';

const domainOptions = [
  { value: 'direct', label: '직접입력' },
  { value: 'naver.com', label: 'naver.com' },
  { value: 'gmail.com', label: 'gmail.com' },
  { value: 'daum.net', label: 'daum.net' },
];

/** 회원정보 편집과 독립된 비밀번호 설정 진입을 제공합니다. (Provides profile editing and entry to independent password settings.) */
export function ProfileEditForm({
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
  onPhoneVerifiedChange,
  onPasswordSettings,
  onEmailPreferenceChange,
  onSmsPreferenceChange,
  onKakaoPreferenceChange,
  onSubmit,
  onCancel,
  onWithdraw,
}: ProfileEditProps) {
  return (
    <form noValidate onSubmit={onSubmit}>
      <Stack gap="3">
        <Stack gap="2">
          <Button type="button" fullWidth variant="primary" onClick={onPasswordSettings}>
            비밀번호 설정
          </Button>
          {passwordChanged ? (
            <Typography variant="body4" role="status">
              비밀번호 변경을 완료하였습니다.
            </Typography>
          ) : null}
        </Stack>
        <ProfilePhoneVerification
          phone={phone}
          verified={phoneVerified}
          error={fieldErrors.phone}
          onPhoneChange={onPhoneChange}
          onVerifiedChange={onPhoneVerifiedChange}
        />
        <AddressFields
          variant="boxed"
          idPrefix="profile"
          searchLabel="우편번호 찾기"
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
        <Stack gap="4">
          <Divider />
          <ContentSection
            gap="5"
            title="마케팅 정보 수신 동의"
            headerProps={{ titleAs: 'h2', titleProps: { mo: 'heading7' } }}
          >
            <PreferenceField
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
            <PreferenceField
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
            <PreferenceField
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
          </ContentSection>
        </Stack>
        <FormActionGroup pt="3" onCancel={onCancel} submitLabel="변경사항 저장" />
        <Stack gap="4" pt="7">
          <Typography variant="body4">탈퇴를 원하실 경우 회원탈퇴를 눌러주세요.</Typography>
          <Button size="sm" variant="link" type="button" onClick={onWithdraw}>
            회원탈퇴
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
