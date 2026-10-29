'use client';

/**
 * [개발팀 바인딩]
 * local은 본인인증 경로로 이동하고 kakao/naver는 현재 미연동 안내입니다. startSignup의 제공자 선택 이벤트가 OAuth 연결 지점입니다.
 * 소셜 가입을 연결할 때도 가입 여부/인증 proof/동의·추가정보 정책은 서버 결과를 사용하고 임의로 가입 완료 경로로 이동시키지 않습니다.
 */

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { type ComponentProps, type CSSProperties, type ReactNode, useState } from 'react';

import { css, cx } from 'styled-system/css';
import { Box, Center, Grid, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';
import { ModalDialog } from '@/components/common/layouts/ModalDialog';

const benefit = css({
  border: '1px solid var(--color-black-20)',
  borderRadius: '8px',
  color: 'var(--color-text-primary)',
  textAlign: 'center',
  '& svg': { w: '20px', h: '20px' },
});

const mobileBreak = css({ display: 'none', _mobile: { display: 'inline' } });

type Props = {
  iconName: string;
  title: string;
  description: string;
};

function SignupBenefit({ iconName, title, description }: Props) {
  return (
    <Grid
      alignContent="center"
      justifyItems="center"
      gap="3"
      minH="108px"
      py="3"
      px="1"
      className={benefit}
    >
      <Icon name={iconName} size="18px" />
      <Typography as="span" variant="body4">
        {title} <br className={mobileBreak} />
        {description}
      </Typography>
    </Grid>
  );
}

type SignupMethodButtonSignupMethod = 'local' | 'kakao' | 'naver';

const labels: Record<SignupMethodButtonSignupMethod, string> = {
  local: '만 14세 이상 회원가입',
  kakao: '카카오 계정으로 신규가입',
  naver: '네이버 계정으로 신규가입',
};

type SignupMethodButtonProps = { method: SignupMethodButtonSignupMethod; onSelect: () => void };

function SignupMethodButton({ method, onSelect }: SignupMethodButtonProps) {
  if (method !== 'local')
    return (
      <Button social={{ provider: method, appearance: 'signup' }} size="tall" onClick={onSelect}>
        {labels[method]}
      </Button>
    );

  return (
    <Button
      fullWidth
      onClick={onSelect}
      variant="primary"
      size="tall"
      style={
        {
          '--button-bg': 'var(--color-black-100)',
          '--button-color': 'var(--color-white-000)',
          '--button-border-color': 'var(--color-black-100)',
          '--button-border-width': '0px',
        } as CSSProperties
      }
    >
      {labels.local}
    </Button>
  );
}

type SignupMethodStepSignupMethodOption = {
  id: SignupMethodButtonSignupMethod;
  label: string;
  description: string;
};

const benefits = [
  { iconName: 'gift', title: '신규가입', description: '1만원 쿠폰' },
  { iconName: 'partyHorn', title: '기념일', description: '축하 쿠폰' },
  { iconName: 'medal', title: '회원 등급별', description: '혜택' },
];

const methodOrder = ['kakao', 'naver', 'local'] as const;

const benefitsLink = css({ textUnderlineOffset: '3px' });

type SignupMethodStepProps = {
  methods: SignupMethodStepSignupMethodOption[];
  onSelect: (method: SignupMethodButtonSignupMethod) => void;
};

function SignupMethodStep({ methods, onSelect }: SignupMethodStepProps) {
  const methodById = new Map(methods.map((method) => [method.id, method]));

  return (
    <section aria-labelledby="signup-title">
      <ContentSection
        gap="6"
        header={
          <ContentHeader
            titleAs="h1"
            titleProps={{ web: 'heading7', mo: 'heading5', id: 'signup-title' }}
            descriptionProps={{ variant: 'body3', tone: 'tertiary' }}
            title="가입과 동시에 시작되는 혜택!"
            description="HOKA Korea 온라인 회원만을 위한 특별한 혜택!"
          />
        }
      >
        <Grid columns={3} gap="1.5" aria-label="회원가입 혜택">
          {benefits.map((benefit) => (
            <SignupBenefit key={benefit.iconName} {...benefit} />
          ))}
        </Grid>

        <Center>
          <Link className={benefitsLink} href="/support/member-benefits">
            <Typography as="span" variant="textLinkKr2">
              회원 등급별 혜택 더 보기
            </Typography>
          </Link>
        </Center>
      </ContentSection>

      <Stack gap="2" mt="9">
        {methodOrder.map((method) => (
          <SignupMethodButton
            key={method}
            method={method}
            onSelect={() => onSelect(methodById.get(method)!.id)}
          />
        ))}
      </Stack>
      <Box mt="4" textAlign="center">
        <Typography as="p" variant="body5">
          만 14세 미만은 회원가입 및 이용이 불가합니다.
        </Typography>
      </Box>
    </section>
  );
}

type SignupProgressSignupMethod = 'local' | 'kakao' | 'naver';

type SignupStep = 0 | 1 | 2 | 3;

const styles = {
  current: css({
    color: 'var(--color-text-primary) !important',
    '&::before': { bg: 'var(--color-black-100) !important' },
  }),
  complete: css({
    '&::before': {
      bg: 'var(--color-black-100) !important',
    },
  }),
};

type SignupProgressProps = {
  method: SignupProgressSignupMethod;
  step: SignupStep;
};

function SignupProgress({ method, step }: SignupProgressProps) {
  const labels =
    method === 'naver' ? ['정보 입력', '가입 완료'] : ['약관 동의', '정보 입력', '가입 완료'];
  const currentStep = method === 'naver' ? step - 1 : step;

  return (
    <Grid
      as="ol"
      gridTemplateColumns="repeat(3, 1fr)"
      gap="2"
      mb="34px"
      p={0}
      listStyle="none"

      aria-label="회원가입 단계"
    >
      {labels.map((label, index) => {
        const position = index + 1;
        const state =
          currentStep === position
            ? styles.current
            : currentStep > position
              ? styles.complete
              : undefined;

        return (
          <li
            className={cx(
              state,
              css({
                display: 'grid',
                gap: '5px',
                color: 'var(--color-black-40)',
                textAlign: 'center',
                _before: {
                  h: '3px',
                  bg: 'var(--color-black-20)',
                  content: '""',
                },
              }),
            )}
            key={label}
          >
            <Typography variant="body4" weight={currentStep === position ? 'medium' : 'regular'}>
              {position}
            </Typography>
            <Typography variant="body5" weight={currentStep === position ? 'medium' : 'regular'}>
              {label}
            </Typography>
          </li>
        );
      })}
    </Grid>
  );
}

type SignupLayoutProps = ComponentProps<typeof SignupProgress> & { children: ReactNode };

function SignupLayout({ step, method, children }: SignupLayoutProps) {
  return (
    <AccountPageLayout
      contentAs="section"
      contentLabelledBy="signup-title"
      fillMobileViewport
      pageCss={css.raw({ pt: '24', pb: '24' })}
      contentCss={css.raw({ w: '100%', minW: 0 })}
    >
      {step !== 0 ? (
        <ContentSection
          gap="7"
          title="회원가입"
          headerProps={{
            gap: '2',
            titleAs: 'h1',
            titleProps: { variant: 'heading6', id: 'signup-title' },
            eyebrow: 'JOIN HOKA',
            eyebrowProps: { variant: 'body5', tone: 'tertiary', weight: 'medium' },
          }}
        >
          <SignupProgress method={method} step={step} />
        </ContentSection>
      ) : null}
      {children}
    </AccountPageLayout>
  );
}

type SignupMethod = 'local' | 'kakao' | 'naver';

type SignupMethodOption = {
  id: SignupMethod;
  label: string;
  description: string;
};

const signupMethods: SignupMethodOption[] = [
  { id: 'local', label: '이메일로 가입', description: '아이디와 비밀번호로 HOKA 계정을 만듭니다.' },
  { id: 'kakao', label: '카카오로 가입', description: '현재 연결되지 않았습니다.' },
  { id: 'naver', label: '네이버로 가입', description: '현재 연결되지 않았습니다.' },
];

/** 회원가입 방법과 가입 흐름의 진입점을 표시합니다. (Displays signup methods and entry points to registration.) */
export default function Page() {
  const router = useRouter();
  const [unavailableMethod, setUnavailableMethod] = useState<SignupMethod | null>(null);
  const selectedMethod = signupMethods.find((item) => item.id === unavailableMethod);

  const startSignup = (method: SignupMethod) => {
    if (method === 'local') {
      router.push('/signup/verify');
      return;
    }

    setUnavailableMethod(method);
  };

  return (
    <>
      <SignupLayout step={0} method="local">
        <SignupMethodStep methods={signupMethods} onSelect={startSignup} />
      </SignupLayout>
      <ModalDialog
        open={selectedMethod !== undefined}
        onOpenChange={(open) => {
          if (!open) setUnavailableMethod(null);
        }}
        title="회원가입 안내"
        closeLabel="회원가입 안내 닫기"
        size="sm"
        actions={{ kind: 'single', onConfirm: () => setUnavailableMethod(null) }}
      >
        <Typography as="p" variant="body3">
          {selectedMethod?.label.replace('로 가입', '')} 회원가입 기능은 현재 연결되지 않았습니다.
        </Typography>
      </ModalDialog>
    </>
  );
}
