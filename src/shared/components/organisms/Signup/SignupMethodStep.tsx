'use client';

import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { AccountFormHeader } from '@/shared/components/molecules/AccountFormHeader/AccountFormHeader';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { SignupBenefit } from '@/shared/components/organisms/Signup/SignupBenefit';
import {
  SignupMethodButton,
  type SignupMethod,
} from '@/shared/components/organisms/Signup/SignupMethodButton';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { Box, Center, Grid, Stack } from 'styled-system/jsx';

type SignupMethodOption = {
  id: SignupMethod;
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
  methods: SignupMethodOption[];
  onSelect: (method: SignupMethod) => void;
};

export function SignupMethodStep({ methods, onSelect }: SignupMethodStepProps) {
  const methodById = new Map(methods.map((method) => [method.id, method]));

  return (
    <section aria-labelledby="signup-title">
      <ContentSection
        gap="6"
        header={
          <AccountFormHeader
            title="가입과 동시에 시작되는 혜택!"
            titleId="signup-title"
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
