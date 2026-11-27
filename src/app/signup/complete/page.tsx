'use client';

/**
 * [ 개발팀 바인딩 ]
 * 이 화면은 가입 성공 안내만 표시합니다. 실제 가입 요청은 signup/information 제출에서 통합 소유자가 완료해야 합니다. 현재 연결 Context·요청은 없습니다.
 * 서비스 연결 시 URL 진입 자체를 가입 완료의 근거로 사용하지 말고 서버 세션/일회성 완료 상태로 진입 가능 여부를 관리합니다.
 */

import { Box, Center, VStack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';

/** 회원가입 완료 안내와 후속 이동을 표시합니다. (Displays registration completion and follow-up navigation.) */
export default function Page() {
  return (
    <AccountPageLayout contentWidth="500px">
      <VStack gap="0" alignItems="stretch" textAlign="center">
        <Typography as="h1" web="h4" mo="h5">
          회원가입 완료
        </Typography>
        <Center py="9">
          <Icon name="join-check" size="48px" />
        </Center>
        <VStack gap="4">
          <Typography as="p" variant="b2M">
            회원가입이 성공적으로 완료되었습니다!
          </Typography>
          <Typography as="p" variant="b6">
            쇼핑하러 가기 전 로그인을 진행해주세요.
          </Typography>
        </VStack>
        <Box pt="8">
          <ButtonLink href="/" variant="primary" fullWidth>
            쇼핑하러 가기
          </ButtonLink>
        </Box>
      </VStack>
    </AccountPageLayout>
  );
}
