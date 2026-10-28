import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/components/common/atoms/Button/Button';
import { Terms } from '@/components/common/molecules/Terms/Terms';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { StatusMessage } from '@/components/common/atoms/StatusMessage/StatusMessage';
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
  const agreementRows = verificationTerms.map((term, index) => (
    <HStack key={term} justify="space-between" gap="4" alignItems="center">
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
  ));
  const errorMessage = showAgreementErrors ? (
    <StatusMessage id="phone-terms-error" tone="error">
      필수 약관에 모두 동의해 주세요.
    </StatusMessage>
  ) : null;
  return (
    <ContentSection
      as="section"
      gap="6"
      pb="6"
      borderBottom="1px solid var(--color-black-20)"
      aria-labelledby="phone-terms-title"
      aria-describedby={showAgreementErrors ? 'phone-terms-error' : undefined}
      title="휴대폰 인증약관"
      headerProps={{
        orientation: 'horizontal',
        gap: '8px',
        css: css.raw({ pb: '4', borderBottom: '1px solid var(--color-black-100)' }),
        titleProps: { id: 'phone-terms-title', web: 'heading9', mo: 'heading7' },
        action: (
          <Terms checked={agreements.every(Boolean)} onCheckedChange={props.onAllAgree}>
            <Typography variant="body4">모두동의</Typography>
          </Terms>
        ),
      }}
    >
      <Stack gap="4">
        {agreementRows}
        {errorMessage}
      </Stack>
    </ContentSection>
  );
}
