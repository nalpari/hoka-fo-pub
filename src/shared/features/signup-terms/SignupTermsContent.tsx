import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Terms } from '@/shared/components/molecules/Terms/Terms';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

export const signupTerms = [
  { label: 'HOKA Korea 이용약관 동의', required: true },
  { label: '개인정보 수집 동의', required: true },
  { label: '개인정보 수집 동의', required: false },
  { label: '개인정보 제3자 (제휴사) 제공 동의', required: true },
] as const;

const styles = {
  all: css({ borderBottom: '1px solid var(--color-black-20)' }),
  detail: css({ flexShrink: '0', '--button-padding-x': '0px' }),
  document: css({ border: '1px solid var(--color-black-20)' }),
};

type Props = {
  agreements: boolean[];
  detail: number | null;
  previous: boolean;
  notice: string;
  onAllChange: (checked: boolean) => void;
  onChange: (index: number, checked: boolean) => void;
  onDetail: (index: number | null) => void;
  onPrevious: () => void;
  onCancel: () => void;
  onNext: () => void;
};

export function SignupTermsContent(props: Props) {
  const selected = props.detail === null ? null : signupTerms[props.detail];

  return (
    <Box
      as="main"
      pt="24"
      px="5"
      pb="20"
      _mobile={{
        pt: '10',
        px: '4',
        pb: '8',
        minH: 'calc(100svh - var(--layout-site-header-height))',
      }}
    >
      <Box maxW="420px" mx="auto">
        <Box mb="8">
          <Typography as="h1" web="heading7" mo="heading5">
            약관동의
          </Typography>
        </Box>
        <Box pb="4" mb="4" className={styles.all}>
          <Terms checked={props.agreements.every(Boolean)} onCheckedChange={props.onAllChange}>
            <Typography variant="body4">모든 약관을 확인하고 전체동의 합니다</Typography>
          </Terms>
        </Box>
        <Stack gap="4">
          {signupTerms.map((term, index) => (
            <HStack key={index} gap="2" justify="space-between" alignItems="center">
              <Terms
                checked={props.agreements[index]}
                onCheckedChange={(checked) => props.onChange(index, checked)}
                required={term.required}
                invalid={Boolean(props.notice && term.required && !props.agreements[index])}
              >
                <Typography variant="body4">
                  ({term.required ? '필수' : '선택'}) {term.label}
                </Typography>
              </Terms>
              <Button
                variant="link"
                size="md"
                className={styles.detail}
                onClick={() => props.onDetail(index)}
                aria-label={`${term.required ? '필수' : '선택'} ${term.label} 자세히 보기`}
              >
                자세히 보기
              </Button>
            </HStack>
          ))}
        </Stack>
        <Grid gridTemplateColumns="1fr 1fr" gap="2" mt="8">
          <Button variant="secondary" size="tall" fullWidth onClick={props.onCancel}>
            취소
          </Button>
          <Button variant="primary" size="tall" fullWidth onClick={props.onNext}>
            확인
          </Button>
        </Grid>
      </Box>
      <ModalDialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) props.onDetail(null);
        }}
        title="HOKA Korea 이용약관"
        closeLabel="약관 닫기"
        mobilePresentation="fullscreen"
        scrollFade
        footer={
          <Button variant="primary" size="tall" fullWidth onClick={() => props.onDetail(null)}>
            확인
          </Button>
        }
      >
        <Stack gap="0" minH="0" flex="1" pb="20">
          <HStack justify="space-between" gap="2" mb="4">
            <Typography variant="body3">
              ({selected?.required ? '필수' : '선택'}) {selected?.label}
            </Typography>
            <Button variant="link" size="sm" className={styles.detail} onClick={props.onPrevious}>
              <Typography variant="body5">
                {props.previous ? '현재 약관 보기' : '이전 약관 보기'}
              </Typography>
            </Button>
          </HStack>
          <Box as="article" p="4" className={styles.document} tabIndex={0} aria-label="약관 내용">
            {props.previous ? (
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
    </Box>
  );
}
