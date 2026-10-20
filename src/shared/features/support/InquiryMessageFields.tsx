import { Box, Stack } from 'styled-system/jsx';
import { FormField } from '@/shared/components/atoms/FormField/FormField';
import { TextInput } from '@/shared/components/atoms/TextInput/TextInput';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

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
      <FormField
        variant="boxed"
        label="제목"
        htmlFor="inquiry-title"
        required
        error={invalid && !title.trim() ? '제목을 입력해 주세요.' : undefined}
      >
        <TextInput
          id="inquiry-title"
          value={title}
          maxLength={50}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="제목을 입력해주세요. (50자 이하)"
        />
      </FormField>
      <FormField
        variant="boxed"
        label="문의 내용"
        htmlFor="inquiry-body"
        required
        error={invalid && !body.trim() ? '내용을 입력해 주세요.' : undefined}
      >
        <Stack gap="2" w="100%">
          <TextInput
            multiline
            id="inquiry-body"
            value={body}
            maxLength={1000}
            onChange={(event) => onBodyChange(event.target.value)}
            placeholder="내용을 입력해주세요."
            style={{ minHeight: '120px' }}
          />
          <Box textAlign="right">
            <Typography variant="body5" tone="tertiary">
              {body.length} / 1,000
            </Typography>
          </Box>
        </Stack>
      </FormField>
    </>
  );
}
