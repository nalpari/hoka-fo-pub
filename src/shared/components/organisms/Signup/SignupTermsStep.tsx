import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';

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
    '& label': {
      display: 'flex',
      alignItems: 'center',
      gap: '9px',
      p: '4 0.5',
      borderTop: '1px solid var(--color-border-subtle)',
      fontSize: '14' /* 기존 13px */,
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
    minH: '50px',
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
      <Checkbox
        className={styles.allTerms}
        label={<span>필수 약관 전체 동의</span>}
        checked={allRequiredTerms}
        onCheckedChange={onToggleAll}
      />
      <VStack className={styles.termList}>
        <Checkbox
          label={
            <>
              <span>
                <b>[필수]</b> 이용약관 동의
              </span>
              <Button size="sm" variant="ghost">
                보기
              </Button>
            </>
          }
          checked={serviceTerms}
          onCheckedChange={onServiceTermsChange}
        />
        <Checkbox
          label={
            <>
              <span>
                <b>[필수]</b> 개인정보 수집 및 이용 동의
              </span>
              <Button size="sm" variant="ghost">
                보기
              </Button>
            </>
          }
          checked={privacyTerms}
          onCheckedChange={onPrivacyTermsChange}
        />
        <Checkbox
          label={
            <span>
              <b>[필수]</b> 만 14세 이상입니다.
            </span>
          }
          checked={ageTerms}
          onCheckedChange={onAgeTermsChange}
        />
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
