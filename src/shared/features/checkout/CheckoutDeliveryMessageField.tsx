import { Stack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { TextareaField } from '@/shared/components/molecules/FormFields/TextareaField';
import { CharacterCount } from '@/shared/components/molecules/FormFields/CharacterCount';

/** 배송 요청 직접 입력과 글자 수 안내를 표시합니다. (Displays custom delivery instructions with a character count.) */
export function CheckoutDeliveryMessageField({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <TextareaField
      id="delivery-message"
      label="요청사항"
      variant="boxed"
      inputProps={{
        multiline: true,
        name: 'deliveryMessage',
        value,
        onChange: (event) => onValueChange(event.target.value),
        maxLength: 250,
        rows: 5,
        placeholder: '내용을 입력해주세요.',
      }}
      renderControl={(control) => (
        <Stack gap="2" w="100%">
          {control}
          <CharacterCount
            length={value.length}
            limit={250}
            tone="subtle"
            className={css({ textAlign: 'right' })}
          />
        </Stack>
      )}
    />
  );
}
