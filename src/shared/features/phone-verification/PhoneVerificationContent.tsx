import { Box } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { AccountFormLayout } from '@/shared/components/layouts/AccountFormLayout/AccountFormLayout';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import { PhoneVerificationDetailDialog } from './PhoneVerificationDetailDialog';
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
      dialogs={
        props.detail === '알뜰폰 사업자' ? (
          <PhoneVerificationDetailDialog
            open
            onOpenChange={(open) => {
              if (!open) props.onDetail(null);
            }}
          />
        ) : (
          <ModalDialog
            open={props.detail !== null}
            onOpenChange={(open) => {
              if (!open) props.onDetail(null);
            }}
            title={props.detail ?? ''}
            closeLabel="안내 닫기"
            size="md"
            mobilePresentation="fullscreen"
          >
            {null}
          </ModalDialog>
        )
      }
    >
      <PhoneVerificationAgreements
        agreements={props.agreements}
        showAgreementErrors={props.showAgreementErrors}
        onAllAgree={props.onAllAgree}
        onAgreementChange={props.onAgreementChange}
        onDetail={props.onDetail}
      />
      <Box my="6">
        <Typography as="h2" variant="headingKr9">
          인증 정보
        </Typography>
      </Box>
      <PhoneVerificationForm {...props} />
      <Box mt="4">
        <Typography as="p" variant="body4" tone="tertiary">
          * 인증문의 (주)KCB고객센터 02-708-1000
        </Typography>
      </Box>
    </AccountFormLayout>
  );
}
