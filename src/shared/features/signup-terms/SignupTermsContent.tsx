import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Terms } from '@/shared/components/molecules/Terms/Terms';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { SignupTermsDetail } from '@/shared/features/signup-terms/SignupTermsDetail';

export const signupTerms = [
  { label: 'HOKA Korea 이용약관 동의', required: true },
  { label: '개인정보 수집 동의', required: true },
  { label: '개인정보 수집 동의', required: false },
  { label: '개인정보 제3자 (제휴사) 제공 동의', required: true },
] as const;

const styles = {
  detail: css({ flexShrink: '0', '--button-padding-x': '0px' }),
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
        <Box pb="4" mb="4" borderBottom="1px solid var(--color-black-20)">
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
        {props.notice ? <StatusMessage tone="error">{props.notice}</StatusMessage> : null}
        <Grid gridTemplateColumns="1fr 1fr" gap="2" mt="8">
          <Button variant="secondary" fullWidth onClick={props.onCancel}>
            취소
          </Button>
          <Button variant="primary" fullWidth onClick={props.onNext}>
            확인
          </Button>
        </Grid>
      </Box>
      <SignupTermsDetail
        selected={selected ?? null}
        previous={props.previous}
        onClose={() => props.onDetail(null)}
        onPrevious={props.onPrevious}
      />
    </Box>
  );
}
