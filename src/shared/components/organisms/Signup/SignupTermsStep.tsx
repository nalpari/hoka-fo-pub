import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Terms } from '@/shared/components/molecules/Terms/Terms';

type SignupMethodOption = {
  label: string;
};

const styles = {
  formSection: css({
    display: 'grid',
    '& > p': {
      mt: '9px',
      mb: 0,
      color: 'var(--color-text-muted)',
      fontSize: '14',
    },
  }),
  allTerms: css({
    display: 'flex',
    alignItems: 'center',
    gap: '2.5',
    mt: '7',
    p: '17px',
    bg: 'var(--color-black-10)',
    fontWeight: 'var(--font-weights-bold)',
  }),
  termList: css({
    borderBottom: '1px solid var(--color-border-subtle)',
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
      color: 'var(--color-text-muted)',
      fontSize: '12',
      textDecoration: 'underline',
    },
  }),
  error: css({
    mt: '18px',
    color: 'var(--color-red-100)',
    fontSize: '14' /* 기존 13px */,
  }),
  primary: css({
    display: 'grid',
    w: '100%',
    mt: '7',
    placeItems: 'center',
    bg: 'var(--color-black-100)',
    color: 'var(--color-white-000)',
    fontWeight: 'var(--font-weights-bold)',
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
    <section className={styles.formSection} aria-labelledby="terms-title">
      <h2 id="terms-title">약관 동의</h2>
      <p>{method.label}을 선택하셨습니다. 가입을 위해 약관에 동의해 주세요.</p>
      <Terms className={styles.allTerms} checked={allRequiredTerms} onCheckedChange={onToggleAll}>
        <span>필수 약관 전체 동의</span>
      </Terms>
      <VStack className={styles.termList}>
        <Terms
          checked={serviceTerms}
          onCheckedChange={onServiceTermsChange}
          required
          error={message && !serviceTerms ? message : undefined}
        >
          <>
            <span>
              <b>[필수]</b> 이용약관 동의
            </span>
            <Button size="sm" variant="ghost">
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
            <span>
              <b>[필수]</b> 개인정보 수집 및 이용 동의
            </span>
            <Button size="sm" variant="ghost">
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
          <span>
            <b>[필수]</b> 만 14세 이상입니다.
          </span>
        </Terms>
      </VStack>
      {message ? (
        <StatusMessage className={styles.error} tone="error">
          {message}
        </StatusMessage>
      ) : null}
      <Button className={styles.primary} onClick={onContinue} variant="primary">
        다음
      </Button>
    </section>
  );
}
