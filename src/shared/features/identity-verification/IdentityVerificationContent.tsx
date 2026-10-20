import { AccountFormHeader } from '@/shared/components/molecules/AccountFormHeader/AccountFormHeader';
import { css } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';
import { AccountPageLayout } from '@/shared/components/layouts/AccountPageLayout/AccountPageLayout';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { VerificationMethodCard } from './VerificationMethodCard';

export type VerificationMethod = 'phone' | 'ipin';

type IdentityVerificationContentProps = {
  onSelect: (method: VerificationMethod) => void;
};

export function IdentityVerificationContent({ onSelect }: IdentityVerificationContentProps) {
  return (
    <AccountPageLayout
      contentWidth="500px"
      contentAs="section"
      contentLabelledBy="verification-title"
      fillMobileViewport
      contentCss={css.raw({ display: 'flex', flexDirection: 'column', gap: '0' })}
    >
      <AccountFormHeader
        title="본인인증"
        titleId="verification-title"
        description="HOKA 온라인 회원가입 여부 확인을 위해 본인 인증이 필요합니다"
        descriptionTone="subtle"
        spacingCss={css.raw({ mb: '8' })}
      />
      <Grid columns={2} gap="2">
        {(
          [
            { id: 'phone', label: '휴대폰 인증', iconName: 'phoneVerification' },
            { id: 'ipin', label: '아이핀 인증', iconName: 'ipinVerification' },
          ] as const
        ).map((method) => (
          <VerificationMethodCard key={method.id} method={method} onSelect={onSelect} />
        ))}
      </Grid>
      <Box mt="4">
        <Typography as="p" variant="body4" tone="tertiary">
          ※ 본인 인증 시 입력하신 정보는 본인 확인 용도 외에는 사용되지 않으며 별도 저장하지
          않습니다.
        </Typography>
      </Box>
    </AccountPageLayout>
  );
}
