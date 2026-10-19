import { Box, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { AccountFormLayout } from '@/shared/components/layouts/AccountFormLayout/AccountFormLayout';
import { PhoneVerificationDetailDialog } from './PhoneVerificationDetailDialog';
import { PhoneVerificationAgreements } from './PhoneVerificationAgreements';
import { PhoneInformationFields } from './PhoneInformationFields';
import { VerificationCodeFields } from './VerificationCodeFields';
import type { PhoneVerificationContentProps } from './phone-verification.types';

export type { PhoneInformation, PhoneVerificationErrors } from './phone-verification.types';

export { verificationTerms } from './PhoneVerificationAgreements';

export function PhoneVerificationContent(props: PhoneVerificationContentProps) {
  const { requested, resendWait, notice } = props;

  return (
    <AccountFormLayout
      title={props.title ?? '휴대폰 인증'}
      description={props.description}
      contentWidth="568px"
      dialogs={
        <PhoneVerificationDetailDialog detail={props.detail} onDetailChange={props.onDetail} />
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
      <form noValidate onSubmit={props.onConfirm}>
        <Stack gap="4">
          <PhoneInformationFields
            information={props.information}
            fieldErrors={props.fieldErrors}
            onInformationChange={props.onInformationChange}
            onDetail={props.onDetail}
          />
          <Button
            variant="primary"
            fullWidth
            disabled={requested && resendWait > 0}
            onClick={props.onRequest}
          >
            {requested ? '인증번호 재요청' : '인증번호 요청'}
          </Button>
          {requested ? (
            <VerificationCodeFields
              code={props.code}
              codeError={props.codeError}
              secondsLeft={props.secondsLeft}
              onCodeChange={props.onCodeChange}
            />
          ) : null}
          {notice ? (
            <StatusMessage tone={props.noticeTone ?? 'info'}>{notice}</StatusMessage>
          ) : null}
        </Stack>
      </form>
      <Box mt="4">
        <Typography as="p" variant="body4" tone="tertiary">
          * 인증문의 (주)KCB고객센터 02-708-1000
        </Typography>
      </Box>
    </AccountFormLayout>
  );
}
