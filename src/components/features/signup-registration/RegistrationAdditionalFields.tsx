import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { Stack } from 'styled-system/jsx';

import { RegistrationPreferenceRow } from './RegistrationPreferenceRow';
import type { RegistrationContentProps } from './registration.types';

type Props = Pick<RegistrationContentProps, 'preferences' | 'onPreferenceChange'>;

export function RegistrationAdditionalFields(props: Props) {
  return (
    <Stack gap="6">
      <ContentSection
        as="section"
        gap="6"
        pb="6"
        borderBottom="1px solid var(--color-black-20)"
        title="마케팅 정보 수신 동의"
        headerProps={{
          titleAs: 'h2',
          titleProps: { variant: 'body3', weight: 'bold' },
          pb: '4',
          borderBottom: '1px solid var(--color-black-100)',
        }}
      >
        <Stack gap="6" _mobile={{ gap: '4'}}>
          <RegistrationPreferenceRow
            label="이메일 수신"
            value={props.preferences.email}
            onValueChange={(value) => props.onPreferenceChange('email', value)}
          />
          <RegistrationPreferenceRow
            label="문자수신(LMS, SMS)"
            value={props.preferences.sms}
            onValueChange={(value) => props.onPreferenceChange('sms', value)}
          />
          <RegistrationPreferenceRow
            label="카카오톡 알림톡 수신"
            value={props.preferences.kakao}
            onValueChange={(value) => props.onPreferenceChange('kakao', value)}
          />
        </Stack>
      </ContentSection>
    </Stack>
  );
}
