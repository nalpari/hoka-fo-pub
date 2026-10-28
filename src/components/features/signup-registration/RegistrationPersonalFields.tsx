import { Box } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import type { RegistrationContentProps } from './registration.types';
import { RegistrationField } from './RegistrationField';

type Props = Pick<RegistrationContentProps, 'information' | 'fieldErrors' | 'onChange'>;

export function RegistrationPersonalFields(props: Props) {
  return (
    <>
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="name"
        label="이름"
        placeholder="이름을 입력해주세요."
      />
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요"
        type="password"
      />
      <Box mt="-2">
        <Typography as="p" variant="body5">
          연속적인 숫자나 생일, 전화번호 등 추측하기 쉬운 개인정보 및 아이디와 비슷한 전화번호
          사용을 피하시기 바랍니다. 비밀번호는 특수기호를 포함한 3가지 이상을 조합하여 입력해주세요.
        </Typography>
      </Box>
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="confirmation"
        label="비밀번호 재확인"
        placeholder="비밀번호를 다시 입력해주세요"
        type="password"
      />
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="birthDate"
        label="생년월일"
        placeholder="생년월일 8자리를 입력해주세요"
        type="text"
        disabled
      />
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="phone"
        label="휴대폰번호"
        placeholder="휴대폰번호를 입력해주세요"
        type="text"
        disabled
      />
    </>
  );
}
