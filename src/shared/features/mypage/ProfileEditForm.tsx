import { Button } from '@/shared/components/atoms/Button/Button';
import { Divider } from '@/shared/components/atoms/Divider/Divider';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { FormActionGroup } from '@/shared/components/molecules/FormActionGroup/FormActionGroup';
import { EmailField } from '@/shared/components/molecules/FormFields/EmailField';
import { PasswordField } from '@/shared/components/molecules/FormFields/PasswordField';
import { PhoneNumberField } from '@/shared/components/molecules/FormFields/PhoneNumberField';
import { PreferenceField } from '@/shared/components/molecules/FormFields/PreferenceField';
import { Stack } from 'styled-system/jsx';
import type { ProfileEditProps } from './mypage-profile.types';

export function ProfileEditForm({
  email,
  phone,
  password,
  emailPreference,
  couponBookPreference,
  messagePreference,
  maritalStatus,
  fieldErrors,
  onEmailChange,
  onPhoneChange,
  onPasswordChange,
  onEmailPreferenceChange,
  onCouponBookPreferenceChange,
  onMessagePreferenceChange,
  onMaritalStatusChange,
  onSubmit,
  onCancel,
  onWithdraw,
}: ProfileEditProps) {
  return (
    <form noValidate onSubmit={onSubmit}>
      <Stack gap="3">
        <PasswordField
          id="profile-password"
          label="새 비밀번호"
          variant="boxed"
          inputProps={{
            type: 'password',
            placeholder: '변경할 비밀번호를 입력해 주세요',
            value: password,
            onChange: (event) => onPasswordChange(event.target.value),
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
            onChange: (event) => onEmailChange(event.target.value),
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
            onChange: (event) => onPhoneChange(event.target.value),
          }}
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
              ariaLabel="모바일 쿠폰북 수신"
              name="coupon-book-preference"
              value={couponBookPreference}
              onValueChange={onCouponBookPreferenceChange}
              label="모바일 쿠폰북 수신"
              options={[
                { value: '수신', label: '수신' },
                { value: '수신안함', label: '수신안함' },
              ]}
            />
            <PreferenceField
              ariaLabel="문자수신(LMS, SMS), 카카오톡 등 전자적 전송매체"
              name="message-preference"
              value={messagePreference}
              onValueChange={onMessagePreferenceChange}
              label={'문자수신(LMS, SMS),\n카카오톡 등 전자적 전송매체'}
              multilineLabel
              options={[
                { value: '수신', label: '수신' },
                { value: '수신안함', label: '수신안함' },
              ]}
            />
          </ContentSection>
        </Stack>
        <Stack gap="6">
          <Divider />
          <ContentSection
            gap="6"
            title="부가정보"
            headerProps={{ titleAs: 'h2', titleProps: { mo: 'heading7' } }}
          >
            <PreferenceField
              ariaLabel="결혼유무"
              name="marital-status"
              value={maritalStatus}
              onValueChange={onMaritalStatusChange}
              options={[
                { value: '기혼', label: '기혼' },
                { value: '미혼', label: '미혼' },
              ]}
              label="결혼유무"
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
