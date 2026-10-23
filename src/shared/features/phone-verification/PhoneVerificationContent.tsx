import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { Box, Stack } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { AccountFormLayout } from '@/shared/components/layouts/AccountFormLayout/AccountFormLayout';
import { PhoneVerificationDialogs } from './PhoneVerificationDialogs';
import { PhoneVerificationAgreements } from './PhoneVerificationAgreements';
import type { PhoneVerificationContentProps } from './phone-verification.types';
import { PhoneVerificationForm } from './PhoneVerificationForm';

export type { PhoneInformation, PhoneVerificationErrors } from './phone-verification.types';

export { verificationTerms } from './PhoneVerificationAgreements';

export function PhoneVerificationContent(props: PhoneVerificationContentProps) {
  return (
    <AccountFormLayout
      title={props.title ?? '휴대폰 인증'}
      description={props.description}
      contentWidth="500px"
      dialogs={<PhoneVerificationDialogs detail={props.detail} onDetail={props.onDetail} />}
    >
      <Stack gap="6">
        <PhoneVerificationAgreements
          agreements={props.agreements}
          showAgreementErrors={props.showAgreementErrors}
          onAllAgree={props.onAllAgree}
          onAgreementChange={props.onAgreementChange}
          onDetail={props.onDetail}
        />
        <ContentSection
          gap="6"
          title="인증 정보"
          headerProps={{ titleAs: 'h2', titleProps: { variant: 'headingKr9' } }}
        >
          <PhoneVerificationForm {...props} />
        </ContentSection>
      </Stack>
      <Box mt="4">
        <Typography as="p" variant="body4" tone="tertiary">
          * 인증문의 (주)KCB고객센터 02-708-1000
        </Typography>
      </Box>
    </AccountFormLayout>
  );
}
