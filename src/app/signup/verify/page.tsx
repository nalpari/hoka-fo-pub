'use client';

import { useRouter } from 'next/navigation';

import { useRoutePreview } from '@/context/RoutePreview';

import { css } from 'styled-system/css';
import { Box, Center, Grid, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';

const styles = {
  illustration: css({
    border: '1px solid var(--color-black-20)',
    color: 'text.primary',
    '& > img': { w: '80px!', h: '80px!' },
  }),
};

type Props = {
  method: { id: VerificationMethod; label: string; iconName: string };
  onSelect: (method: VerificationMethod) => void;
};

function VerificationMethodCard({ method, onSelect }: Props) {
  return (
    <Stack gap="6" minW="0">
      <Center h="160px" position="relative" className={styles.illustration} aria-hidden="true">
        <Icon name={method.iconName} size="80px" />
      </Center>
      <Button variant="primary" fullWidth onClick={() => onSelect(method.id)}>
        {method.label}
      </Button>
    </Stack>
  );
}

type VerificationMethod = 'phone' | 'ipin';

type IdentityVerificationContentProps = {
  onSelect: (method: VerificationMethod) => void;
};

function IdentityVerificationContent({ onSelect }: IdentityVerificationContentProps) {
  return (
    <AccountPageLayout
      contentWidth="500px"
      contentAs="section"
      contentLabelledBy="verification-title"
      fillMobileViewport
      contentCss={css.raw({ display: 'flex', flexDirection: 'column', gap: '0' })}
    >
      <ContentSection
        gap="8"
        header={
          <ContentHeader
            titleAs="h1"
            titleProps={{ web: 'heading7', mo: 'heading5', id: 'verification-title' }}
            descriptionProps={{ variant: 'body3', tone: 'subtle' }}
            title="본인인증"
            description="HOKA 온라인 회원가입 여부 확인을 위해 본인 인증이 필요합니다"
          />
        }
      >
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
      </ContentSection>
      <Box mt="4">
        <Typography as="p" variant="body4" tone="tertiary">
          ※ 본인 인증 시 입력하신 정보는 본인 확인 용도 외에는 사용되지 않으며 별도 저장하지
          않습니다.
        </Typography>
      </Box>
    </AccountPageLayout>
  );
}

/** 회원가입 본인확인 방법을 선택하는 화면을 표시합니다. (Displays identity verification method selection for signup.) */
function RouteContent() {
  const router = useRouter();

  const selectMethod = (method: VerificationMethod) => {
    if (method === 'phone') {
      router.push('/signup/verify/phone');
      return;
    }
  };

  return <IdentityVerificationContent onSelect={selectMethod} />;
}

const routePreviewComponents = { IdentityVerificationContent } satisfies Pick<
  typeof import('@/types/component-contracts/app-signup-verify-page'),
  'IdentityVerificationContent'
>;

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
