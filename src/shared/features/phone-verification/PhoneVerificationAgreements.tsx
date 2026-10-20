import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Terms } from '@/shared/components/molecules/Terms/Terms';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { StatusMessage } from '@/shared/components/atoms/StatusMessage/StatusMessage';
import type { PhoneVerificationContentProps } from './phone-verification.types';

const styles = {
  detail: css({ '--button-padding-x': '0px', flexShrink: '0' }),
};

export const verificationTerms = [
  '개인정보 이용약관 동의',
  '고유식별 정보 처리동의',
  '통신사 이용약관 동의',
  '휴대폰 본인확인 이용약관 동의',
] as const;

type Props = Pick<
  PhoneVerificationContentProps,
  'agreements' | 'showAgreementErrors' | 'onAllAgree' | 'onAgreementChange' | 'onDetail'
>;

export function PhoneVerificationAgreements(props: Props) {
  const { agreements, showAgreementErrors = false } = props;
  return (
    <ContentSection
      as="section"
      gap="4"
      pb="6"
      borderBottom="1px solid var(--color-black-20)"
      aria-labelledby="phone-terms-title"
      aria-describedby={showAgreementErrors ? 'phone-terms-error' : undefined}
      title="휴대폰 인증약관"
      headerProps={{
        orientation: 'horizontal',
        gap: '8px',
        css: css.raw({ mb: '2' }),
        titleProps: { id: 'phone-terms-title', web: 'heading9', mo: 'heading7' },
        action: (
          <Terms checked={agreements.every(Boolean)} onCheckedChange={props.onAllAgree}>
            <Typography variant="body4">모두동의</Typography>
          </Terms>
        ),
      }}
    >
      {verificationTerms.map((term, index) => (
        <HStack key={term} justify="space-between" gap="2" alignItems="center">
          <Terms
            checked={agreements[index]}
            onCheckedChange={(checked) => props.onAgreementChange(index, checked)}
            required
            invalid={showAgreementErrors && !agreements[index]}
          >
            <Typography variant="body4">(필수) {term}</Typography>
          </Terms>
          <Button
            variant="link"
            size="md"
            className={styles.detail}
            onClick={() => props.onDetail(term)}
          >
            자세히 보기
          </Button>
        </HStack>
      ))}
      {showAgreementErrors ? (
        <StatusMessage id="phone-terms-error" tone="error">
          필수 약관에 모두 동의해 주세요.
        </StatusMessage>
      ) : null}
    </ContentSection>
  );
}
