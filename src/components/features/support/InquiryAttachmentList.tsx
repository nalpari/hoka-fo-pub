import { Box, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button/Button';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { faXmark } from '@/icons/fontAwesome';

type InquiryAttachmentListProps = {
  files: File[];
  onRemove: (index: number) => void;
};

export function InquiryAttachmentList({ files, onRemove }: InquiryAttachmentListProps) {
  if (!files.length) return null;

  return (
    <Stack
      as="ul"
      listStyleType="none"
      m="0"
      p="4"
      gap="2"
      border="1px solid"
      borderColor="black.20"
    >
      {files.map((file, index) => (
        <HStack as="li" key={`${file.name}-${index}`} justifyContent="space-between" gap="2">
          <Box minW="0" overflowWrap="anywhere">
            <Typography variant="body4">{file.name}</Typography>
          </Box>
          <Button
            variant="link"
            size="md"
            aria-label={`${file.name} 삭제`}
            onClick={() => onRemove(index)}
          >
            <Icon fontAwesomeIcon={faXmark} size="16px" />
          </Button>
        </HStack>
      ))}
    </Stack>
  );
}
