import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Terms } from '@/shared/components/molecules/Terms/Terms';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

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
  notice: string;
  onAllChange: (checked: boolean) => void;
  onChange: (index: number, checked: boolean) => void;
  onDetail: (index: number | null) => void;
};

export function SignupTermsAgreementList(props: Props) {
  return (
    <>
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
    </>
  );
}
