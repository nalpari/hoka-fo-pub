import { Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { RegistrationPreferenceRow } from './RegistrationPreferenceRow';
import type { RegistrationContentProps } from './registration.types';

type Props = Pick<RegistrationContentProps, 'preferences' | 'onPreferenceChange'>;

export function RegistrationAdditionalFields(props: Props) {
  return (
    <Stack gap="6">
      <Stack as="section" gap="6" pb="6" borderBottom="1px solid var(--color-black-20)">
        <Typography as="h2" variant="body3" weight="bold">
          마케팅 정보 수신 동의
        </Typography>
        <Stack gap="4">
          <RegistrationPreferenceRow
            preferenceKey="email"
            label="이메일 수신"
            value={props.preferences.email}
            onValueChange={(value) => props.onPreferenceChange('email', value)}
          />
          <RegistrationPreferenceRow
            preferenceKey="coupon"
            label="모바일 쿠폰북 수신"
            value={props.preferences.coupon}
            onValueChange={(value) => props.onPreferenceChange('coupon', value)}
          />
          <RegistrationPreferenceRow
            preferenceKey="sms"
            label={'문자수신(LMS, SMS),\n카카오톡 등 전자적 전송매체'}
            value={props.preferences.sms}
            onValueChange={(value) => props.onPreferenceChange('sms', value)}
          />
        </Stack>
      </Stack>
      <Stack as="section" gap="6">
        <Typography as="h2" variant="body3" weight="bold">
          부가정보
        </Typography>
        <RegistrationPreferenceRow
          preferenceKey="married"
          label="결혼유무"
          yes="기혼"
          no="미혼"
          value={props.preferences.married}
          onValueChange={(value) => props.onPreferenceChange('married', value)}
        />
      </Stack>
    </Stack>
  );
}
