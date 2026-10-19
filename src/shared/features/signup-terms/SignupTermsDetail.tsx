import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  detail: css({ flexShrink: '0', '--button-padding-x': '0px' }),
};

type Props = {
  selected: { label: string; required: boolean } | null;
  previous: boolean;
  onClose: () => void;
  onPrevious: () => void;
};

export function SignupTermsDetail({ selected, previous, onClose, onPrevious }: Props) {
  return (
    <ModalDialog
      open={selected !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      title="HOKA Korea 이용약관"
      closeLabel="약관 닫기"
      mobilePresentation="fullscreen"
      scrollFade
      footer={
        <Button variant="primary" fullWidth onClick={() => onClose()}>
          확인
        </Button>
      }
    >
      <Stack gap="0" minH="0" flex="1" pb="20">
        <HStack justify="space-between" gap="2" mb="4">
          <Typography variant="body3">
            ({selected?.required ? '필수' : '선택'}) {selected?.label}
          </Typography>
          <Button variant="link" size="sm" className={styles.detail} onClick={onPrevious}>
            <Typography variant="body5">
              {previous ? '현재 약관 보기' : '이전 약관 보기'}
            </Typography>
          </Button>
        </HStack>
        <Box
          as="article"
          p="4"
          border="1px solid var(--color-black-20)"
          tabIndex={0}
          aria-label="약관 내용"
        >
          {previous ? (
            <Box mb="4">
              <Typography as="p" variant="body5">
                이전 약관은 등록 준비 중입니다.
              </Typography>
            </Box>
          ) : (
            [1, 2].map((number) => (
              <Stack key={number} gap="4" mb="4">
                <Typography as="h2" variant="body4">
                  약관 타이틀{number}
                </Typography>
                <Typography as="p" variant="body4">
                  {'약관내용'.repeat(155)}
                </Typography>
              </Stack>
            ))
          )}
        </Box>
        <Box mt="2">
          <Typography as="p" variant="body5" tone="subtle">
            공고일자 : 2025년 08월 25일 / 시행일자 : 2025년 09월 01일
          </Typography>
        </Box>
      </Stack>
    </ModalDialog>
  );
}
