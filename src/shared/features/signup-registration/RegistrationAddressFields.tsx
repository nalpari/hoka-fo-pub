import { css } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';

import type { RegistrationContentProps } from './registration.types';
import { RegistrationField } from './RegistrationField';

const styles = {
  disabledInput: css({
    bg: 'var(--color-black-10)',
    color: 'var(--color-text-subtle)',
    cursor: 'not-allowed',
    _disabled: { opacity: '1' },
  }),
};

type Props = Pick<
  RegistrationContentProps,
  'information' | 'fieldErrors' | 'onChange' | 'onAddressOpen'
>;

export function RegistrationAddressFields(props: Props) {
  return (
    <>
      <HStack gap="6" alignItems="center">
        <Box flex="1" minW="0">
          <FormField
            variant="boxed"
            htmlFor="registration-postalCode"
            error={props.fieldErrors.postalCode}
            label="우편번호"
            required
            disabled
          >
            <TextInput
              id="registration-postalCode"
              disabled
              value={props.information.postalCode}
              placeholder="우편번호 찾기 버튼을 눌러주세요"
            />
          </FormField>
        </Box>
        <Box flexShrink="0">
          <Button variant="link" aria-haspopup="dialog" onClick={() => props.onAddressOpen(true)}>
            우편번호 찾기
          </Button>
        </Box>
      </HStack>
      <FormField
        variant="boxed"
        htmlFor="registration-address"
        error={props.fieldErrors.address}
        label="주소"
        required
        disabled
      >
        <TextInput
          id="registration-address"
          disabled
          className={styles.disabledInput}
          value={props.information.address}
          placeholder="주소를 입력해주세요"
        />
      </FormField>
      <RegistrationField
        information={props.information}
        fieldErrors={props.fieldErrors}
        onChange={props.onChange}
        fieldKey="addressDetail"
        label="상세주소"
        placeholder="상세주소를 입력해주세요"
      />
    </>
  );
}
