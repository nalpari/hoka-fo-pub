import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { Grid, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Terms } from '@/shared/components/molecules/Terms/Terms';

type SignupMethodOption = {
  label: string;
};

const styles = {
  allTerms: css({
    display: 'flex',
    alignItems: 'center',
    gap: '2.5',
    mt: '7',
    p: '17px',
    bg: 'var(--color-black-10)',
  }),

  error: css({
    mt: '18px',
    color: 'var(--color-red-100)',
  }),
  primary: css({
    display: 'grid',
    w: '100%',
    mt: '7',
    placeItems: 'center',
    bg: 'var(--color-black-100)',
    color: 'var(--color-text-inverse)',
  }),
};

type SignupTermsStepProps = {
  method: SignupMethodOption;
  serviceTerms: boolean;
  privacyTerms: boolean;
  ageTerms: boolean;
  message: string;
  onToggleAll: (checked: boolean) => void;
  onServiceTermsChange: (checked: boolean) => void;
  onPrivacyTermsChange: (checked: boolean) => void;
  onAgeTermsChange: (checked: boolean) => void;
  onContinue: () => void;
};

export function SignupTermsStep({
  method,
  serviceTerms,
  privacyTerms,
  ageTerms,
  message,
  onToggleAll,
  onServiceTermsChange,
  onPrivacyTermsChange,
  onAgeTermsChange,
  onContinue,
}: SignupTermsStepProps) {
  const allRequiredTerms = serviceTerms && privacyTerms && ageTerms;

  return (
    <Grid as="section" gap="normal" aria-labelledby="terms-title">
      <ContentHeader
        gap="9px"
        titleAs="h2"
        title="약관 동의"
        titleProps={{ variant: 'heading7', id: 'terms-title' }}
        description={<>{method.label}을 선택하셨습니다. 가입을 위해 약관에 동의해 주세요.</>}
        descriptionProps={{ variant: 'body4', tone: 'tertiary' }}
      />
      <Terms className={styles.allTerms} checked={allRequiredTerms} onCheckedChange={onToggleAll}>
        <Typography as="span" variant="body4" weight="medium">
          필수 약관 전체 동의
        </Typography>
      </Terms>
      <VStack
        borderBottom="1px solid var(--color-border-subtle)"
        css={{
          '& > div': {
            w: '100%',
            p: '4 0.5',
            borderTop: '1px solid var(--color-border-subtle)',
          },
          '& [data-checkbox-label] > span:last-child': {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: '1',
          },
          '& button': {
            ml: 'auto',
            p: 0,
            border: 0,
            color: 'var(--color-text-tertiary)',
            textDecoration: 'underline',
          },
        }}
      >
        <Terms
          checked={serviceTerms}
          onCheckedChange={onServiceTermsChange}
          required
          error={message && !serviceTerms ? message : undefined}
        >
          <>
            <Typography variant="body5">
              <b>[필수]</b> 이용약관 동의
            </Typography>
            <Button size="short" variant="ghost">
              보기
            </Button>
          </>
        </Terms>
        <Terms
          checked={privacyTerms}
          onCheckedChange={onPrivacyTermsChange}
          required
          error={message && !privacyTerms ? message : undefined}
        >
          <>
            <Typography variant="body5">
              <b>[필수]</b> 개인정보 수집 및 이용 동의
            </Typography>
            <Button size="short" variant="ghost">
              보기
            </Button>
          </>
        </Terms>
        <Terms
          checked={ageTerms}
          onCheckedChange={onAgeTermsChange}
          required
          error={message && !ageTerms ? message : undefined}
        >
          <Typography variant="body5">
            <b>[필수]</b> 만 14세 이상입니다.
          </Typography>
        </Terms>
      </VStack>
      {message ? (
        <StatusMessage className={styles.error} tone="error">
          <Typography variant="body4" tone="error">
            {message}
          </Typography>
        </StatusMessage>
      ) : null}
      <Button className={styles.primary} onClick={onContinue} variant="primary">
        다음
      </Button>
    </Grid>
  );
}
