import { Stack } from 'styled-system/jsx';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';

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
      <FormField
        variant="boxed"
        htmlFor="find-account-name"
        label="이름"
        error={nameError}
        required
      >
        <TextInput
          id="find-account-name"
          name="name"
          autoComplete="name"
          placeholder="이름을 입력해 주세요"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
        />
      </FormField>
      <FormField
        variant="boxed"
        htmlFor="find-account-phone"
        label="휴대폰 번호"
        error={phoneError}
        required
      >
        <TextInput
          id="find-account-phone"
          name="tel"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="휴대폰번호를 입력해 주세요"
          value={phone}
          onChange={(event) => onPhoneChange(event.target.value)}
        />
      </FormField>
    </Stack>
  );
}
