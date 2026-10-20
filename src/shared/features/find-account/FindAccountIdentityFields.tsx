import { Stack } from 'styled-system/jsx';
import { NameField } from '@/shared/components/molecules/FormFields/NameField';
import { PhoneNumberField } from '@/shared/components/molecules/FormFields/PhoneNumberField';

type Props = {
  name: string;
  phone: string;
  nameError: string;
  phoneError: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
};

export function FindAccountIdentityFields({
  name,
  phone,
  nameError,
  phoneError,
  onNameChange,
  onPhoneChange,
}: Props) {
  return (
    <Stack gap="4">
      <NameField
        variant="boxed"
        id="find-account-name"
        label="이름"
        error={nameError}
        required
        inputProps={{
          name: 'name',
          autoComplete: 'name',
          placeholder: '이름을 입력해 주세요',
          value: name,
          onChange: (event) => onNameChange(event.target.value),
        }}
      />
      <PhoneNumberField
        variant="boxed"
        id="find-account-phone"
        label="휴대폰 번호"
        error={phoneError}
        required
        inputProps={{
          name: 'tel',
          type: 'tel',
          inputMode: 'numeric',
          autoComplete: 'tel-national',
          placeholder: '휴대폰번호를 입력해 주세요',
          value: phone,
          onChange: (event) => onPhoneChange(event.target.value),
        }}
      />
    </Stack>
  );
}
