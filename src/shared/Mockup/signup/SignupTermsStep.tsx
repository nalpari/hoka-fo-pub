import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { Grid } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { SignupTermsAgreements } from './SignupTermsAgreements';

type SignupMethodOption = {
  label: string;
};

const styles = {
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
      <SignupTermsAgreements
        allRequiredTerms={allRequiredTerms}
        serviceTerms={serviceTerms}
        privacyTerms={privacyTerms}
        ageTerms={ageTerms}
        message={message}
        onToggleAll={onToggleAll}
        onServiceTermsChange={onServiceTermsChange}
        onPrivacyTermsChange={onPrivacyTermsChange}
        onAgeTermsChange={onAgeTermsChange}
      />
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
