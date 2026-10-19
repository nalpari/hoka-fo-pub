import { css } from 'styled-system/css';
import { Box, Center, Grid, Stack } from 'styled-system/jsx';
import { AccountPageLayout } from '@/shared/components/layouts/AccountPageLayout/AccountPageLayout';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

const styles = {
  illustration: css({
    border: '1px solid var(--color-black-20)',
    color: 'text.primary',
    '& > img': { w: '80px!', h: '80px!' },
  }),
};

export type VerificationMethod = 'phone' | 'ipin';

type IdentityVerificationContentProps = {
  onSelect: (method: VerificationMethod) => void;
};

export function IdentityVerificationContent({ onSelect }: IdentityVerificationContentProps) {
  return (
    <AccountPageLayout
      contentWidth="420px"
      contentAs="section"
      contentLabelledBy="verification-title"
      fillMobileViewport
      contentCss={css.raw({ display: 'flex', flexDirection: 'column', gap: '0' })}
    >
      <Stack gap="3" mb="8">
        <Typography as="h1" web="heading7" mo="heading5" id="verification-title">
          본인인증
        </Typography>
        <Typography as="p" variant="body3" tone="subtle">
          HOKA 온라인 회원가입 여부 확인을 위해 본인 인증이 필요합니다
        </Typography>
      </Stack>
      <Grid columns={2} gap="2">
        {(
          [
            { id: 'phone', label: '휴대폰 인증', iconName: 'phoneVerification' },
            { id: 'ipin', label: '아이핀 인증', iconName: 'ipinVerification' },
          ] as const
        ).map((method) => (
          <Stack key={method.id} gap="6" minW="0">
            <Center
              h="160px"
              position="relative"
              className={styles.illustration}
              aria-hidden="true"
            >
              <Icon name={method.iconName} size="80px" />
            </Center>
            <Button variant="primary" fullWidth onClick={() => onSelect(method.id)}>
              {method.label}
            </Button>
          </Stack>
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
