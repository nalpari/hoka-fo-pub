import { Box } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Dropdown } from '@/shared/components/atoms/Dropdown/Dropdown';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import type { RegistrationContentProps } from './registration.types';
import { RegistrationField } from './RegistrationField';

type Props = Pick<
  RegistrationContentProps,
  | 'information'
  | 'fieldErrors'
  | 'onChange'
  | 'domainChoice'
  | 'onDomainChoice'
  | 'onDuplicateCheck'
  | 'duplicateNotice'
>;

export function RegistrationEmailFields(props: Props) {
  return (
    <>
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="email"
        label="이메일 주소"
        placeholder="이메일 주소를 입력해주세요."
      />
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="domain"
        label="도메인"
        placeholder="도메인을 입력해주세요"
        type="text"
        fieldId="registration-domain"
        disabled={props.domainChoice !== 'direct'}
      />
      <Dropdown
        ariaLabel="이메일 도메인 선택"
        label="직접입력"
        required
        value={props.domainChoice}
        onValueChange={props.onDomainChoice}
        options={[
          { value: 'direct', label: '직접입력' },
          { value: 'naver.com', label: 'naver.com' },
          { value: 'gmail.com', label: 'gmail.com' },
          { value: 'daum.net', label: 'daum.net' },
        ]}
      />
      <Box py="2">
        <Button variant="primary" fullWidth onClick={props.onDuplicateCheck}>
          이메일 중복확인
        </Button>
      </Box>
      {props.duplicateNotice ? <StatusMessage>{props.duplicateNotice}</StatusMessage> : null}
    </>
  );
}
