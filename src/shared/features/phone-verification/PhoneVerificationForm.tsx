import { Box, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { PhoneInformationFields } from './PhoneInformationFields';
import { VerificationCodeFields } from './VerificationCodeFields';
import type { PhoneVerificationContentProps } from './phone-verification.types';

type Props = Pick<
  PhoneVerificationContentProps,
  | 'information'
  | 'fieldErrors'
  | 'onInformationChange'
  | 'onDetail'
  | 'onConfirm'
  | 'onRequest'
  | 'requested'
  | 'resendWait'
  | 'code'
  | 'codeError'
  | 'secondsLeft'
  | 'onCodeChange'
  | 'notice'
  | 'noticeTone'
>;

export function PhoneVerificationForm(props: Props) {
  return (
    <form noValidate onSubmit={props.onConfirm}>
      <Stack gap="4">
        <PhoneInformationFields
          information={props.information}
          fieldErrors={props.fieldErrors}
          onInformationChange={props.onInformationChange}
          onDetail={props.onDetail}
        />
        <Box pt="2">
          <Button
            variant="primary"
            fullWidth
            disabled={props.requested && props.resendWait > 0}
            onClick={props.onRequest}
          >
            {props.requested ? '인증번호 재요청' : '인증번호 요청'}
          </Button>
        </Box>
        {props.requested ? (
          <VerificationCodeFields
            code={props.code}
            codeError={props.codeError}
            secondsLeft={props.secondsLeft}
            onCodeChange={props.onCodeChange}
          />
        ) : null}
        {props.notice ? (
          <StatusMessage tone={props.noticeTone ?? 'info'}>{props.notice}</StatusMessage>
        ) : null}
      </Stack>
    </form>
  );
}
