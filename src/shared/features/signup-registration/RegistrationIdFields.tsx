import { Button } from '@/shared/components/atoms/Button/Button';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import type { RegistrationContentProps } from './registration.types';
import { RegistrationField } from './RegistrationField';
import { Stack } from 'styled-system/jsx';

type Props = Pick<
  RegistrationContentProps,
  'information' | 'fieldErrors' | 'onChange' | 'onDuplicateCheck' | 'duplicateNotice'
>;

/** 회원 아이디를 입력하고 중복확인 동작을 제공합니다. (Collects the member ID and exposes its duplicate-check action.) */
export function RegistrationIdFields(props: Props) {
  return (
    <Stack gap="6">
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="id"
        label="아이디"
        placeholder="아이디를 입력해주세요"
      />
      <Button variant="primary" fullWidth onClick={props.onDuplicateCheck}>
        아이디 중복확인
      </Button>
      {props.duplicateNotice ? <StatusMessage>{props.duplicateNotice}</StatusMessage> : null}
    </Stack>
  );
}
