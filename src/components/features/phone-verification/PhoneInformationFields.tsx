import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button/Button';
import { Dropdown } from '@/components/common/atoms/Dropdown/Dropdown';

import type { PhoneInformation, PhoneVerificationContentProps } from './phone-verification.types';
import { NameField } from '@/components/common/molecules/FormFields/NameField';
import { PhoneNumberField } from '@/components/common/molecules/FormFields/PhoneNumberField';
import { BirthDateField } from '@/components/common/molecules/FormFields/BirthDateField';

const styles = {
  detail: css({ '--button-padding-x': '0px', flexShrink: '0' }),
};

type Props = Pick<
  PhoneVerificationContentProps,
  'information' | 'fieldErrors' | 'onInformationChange' | 'onDetail'
>;

export function PhoneInformationFields(props: Props) {
  const { information } = props;
  const textField = (
    key: keyof PhoneInformation,
    label: string,
    placeholder: string,
    maxLength?: number,
  ) => {
    const Field = key === 'name' ? NameField : key === 'phone' ? PhoneNumberField : BirthDateField;
    return (
      <Field
        variant="boxed"
        id={`phone-${key}`}
        label={label}
        required
        error={props.fieldErrors?.[key]}
        inputProps={{
          value: information[key],
          placeholder: placeholder,
          maxLength: maxLength,
          type: key === 'phone' ? 'tel' : 'text',
          inputMode: key === 'name' ? 'text' : 'numeric',
          autoComplete: key === 'name' ? 'name' : key === 'phone' ? 'tel-national' : 'off',
          onChange: (event) => props.onInformationChange(key, event.target.value),
        }}
      />
    );
  };

  const selectField = (key: keyof PhoneInformation, label: string, options: string[]) => (
    <Dropdown
      ariaLabel={label}
      label={label}
      required
      error={props.fieldErrors?.[key]}
      name={`phone-${key}`}
      value={information[key]}
      options={options.map((option) => ({ value: option, label: option }))}
      onValueChange={(value) => props.onInformationChange(key, value)}
    />
  );

  return (
    <>
      {textField('name', '이름', '이름을 입력해 주세요')}
      {textField('birthDate', '생년월일', '생년월일 8자리를 입력해 주세요', 8)}
      <Grid columns={2} gap="2">
        {selectField('nationality', '국적', ['내국인', '외국인'])}
        {selectField('gender', '성별', ['남자', '여자'])}
      </Grid>
      <Grid gridTemplateColumns="minmax(0, 2fr) minmax(0, 1fr)" gap="3" alignItems="center">
        {selectField('carrier', '통신사', [
          'SKT',
          'KT',
          'LG U+',
          'SKT 알뜰폰',
          'KT 알뜰폰',
          'LG U+ 알뜰폰',
        ])}
        <Button
          variant="link"
          size="md"
          className={[styles.detail, css({ justifySelf: 'end' })].join(' ')}
          onClick={() => props.onDetail('알뜰폰 사업자')}
        >
          알뜰폰 사업자 보기
        </Button>
      </Grid>
      {textField('phone', '휴대폰 번호', '휴대폰 번호를 입력해 주세요', 13)}
    </>
  );
}
