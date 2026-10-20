import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { Box } from 'styled-system/jsx';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { TermsDialog } from '@/shared/components/organisms/Terms/TermsDialog';

type Props = {
  selected: { label: string; required: boolean } | null;
  previous: boolean;
  onClose: () => void;
  onPrevious: () => void;
};

export function SignupTermsDetail({ selected, previous, onClose, onPrevious }: Props) {
  return (
    <TermsDialog
      open={selected !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="HOKA Korea 이용약관"
      label={`(${selected?.required ? '필수' : '선택'}) ${selected?.label ?? ''}`}
      version={{ previous, onChange: onPrevious }}
      dates="공고일자 : 2025년 08월 25일 / 시행일자 : 2025년 09월 01일"
    >
      {previous ? (
        <Box mb="4">
          <Typography as="p" variant="body5">
            이전 약관은 등록 준비 중입니다.
          </Typography>
        </Box>
      ) : (
        [1, 2].map((number) => (
          <ContentHeader
            key={number}
            gap="4"
            mb="4"
            titleAs="h2"
            title={<>약관 타이틀{number}</>}
            titleProps={{ variant: 'body4' }}
            description={<>{'약관내용'.repeat(155)}</>}
            descriptionProps={{ variant: 'body4' }}
          />
        ))
      )}
    </TermsDialog>
  );
}
