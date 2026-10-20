import { Box, Stack } from 'styled-system/jsx';

import { CharacterCount } from '@/shared/components/molecules/FormFields/CharacterCount';
import { TextFormField } from '@/shared/components/molecules/FormFields/TextFormField';
import { TextareaField } from '@/shared/components/molecules/FormFields/TextareaField';

type Props = {
  title: string;
  body: string;
  invalid: boolean;
  onTitleChange: (value: string) => void;
  onBodyChange: (value: string) => void;
};

export function InquiryMessageFields({ title, body, invalid, onTitleChange, onBodyChange }: Props) {
  return (
    <>
      <TextFormField
        variant="boxed"
        label="제목"
        id="inquiry-title"
        required
        error={invalid && !title.trim() ? '제목을 입력해 주세요.' : undefined}
        inputProps={{
          value: title,
          maxLength: 50,
          onChange: (event) => onTitleChange(event.target.value),
          placeholder: '제목을 입력해주세요. (50자 이하)',
        }}
      />
      <TextareaField
        variant="boxed"
        label="문의 내용"
        id="inquiry-body"
        required
        error={invalid && !body.trim() ? '내용을 입력해 주세요.' : undefined}
        inputProps={{
          multiline: true,
          value: body,
          maxLength: 1000,
          onChange: (event) => onBodyChange(event.target.value),
          placeholder: '내용을 입력해주세요.',
          style: { minHeight: '120px' },
        }}
        renderControl={(control) => (
          <Stack gap="2" w="100%">
            {control}
            <Box textAlign="right">
              <CharacterCount length={body.length} limit={1000} spaced tone="tertiary" />
            </Box>
          </Stack>
        )}
      />
    </>
  );
}
