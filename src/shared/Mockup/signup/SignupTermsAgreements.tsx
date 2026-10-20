import { VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Terms } from '@/shared/components/molecules/Terms/Terms';

const allTerms = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2.5',
  mt: '7',
  p: '17px',
  bg: 'var(--color-black-10)',
});

type SignupTermsAgreementsProps = {
  allRequiredTerms: boolean;
  serviceTerms: boolean;
  privacyTerms: boolean;
  ageTerms: boolean;
  message: string;
  onToggleAll: (checked: boolean) => void;
  onServiceTermsChange: (checked: boolean) => void;
  onPrivacyTermsChange: (checked: boolean) => void;
  onAgeTermsChange: (checked: boolean) => void;
};

/** Agreement presentation for the legacy signup mockup; state stays with the caller. */
export function SignupTermsAgreements({
  allRequiredTerms,
  serviceTerms,
  privacyTerms,
  ageTerms,
  message,
  onToggleAll,
  onServiceTermsChange,
  onPrivacyTermsChange,
  onAgeTermsChange,
}: SignupTermsAgreementsProps) {
  const items = [
    {
      id: 'service',
      label: '이용약관 동의',
      checked: serviceTerms,
      onCheckedChange: onServiceTermsChange,
      showDetails: true,
    },
    {
      id: 'privacy',
      label: '개인정보 수집 및 이용 동의',
      checked: privacyTerms,
      onCheckedChange: onPrivacyTermsChange,
      showDetails: true,
    },
    {
      id: 'age',
      label: '만 14세 이상입니다.',
      checked: ageTerms,
      onCheckedChange: onAgeTermsChange,
      showDetails: false,
    },
  ];

  return (
    <>
      <Terms className={allTerms} checked={allRequiredTerms} onCheckedChange={onToggleAll}>
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
        {items.map((item) => (
          <Terms
            key={item.id}
            checked={item.checked}
            onCheckedChange={item.onCheckedChange}
            required
            error={message && !item.checked ? message : undefined}
          >
            <Typography variant="body5">
              <b>[필수]</b> {item.label}
            </Typography>
            {item.showDetails && (
              <Button size="short" variant="ghost">
                보기
              </Button>
            )}
          </Terms>
        ))}
      </VStack>
    </>
  );
}
