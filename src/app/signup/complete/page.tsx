'use client';

/**
 * [개발팀 바인딩]
 * 이 화면은 가입 성공 안내만 표시합니다. 실제 가입 요청은 signup/information의 AccountServicesContext.register에서 완료해야 합니다.
 * 서비스 연결 시 URL 진입 자체를 가입 완료의 근거로 사용하지 말고 서버 세션/일회성 완료 상태로 진입 가능 여부를 관리합니다.
 */

import { css } from 'styled-system/css';
import { Center, Stack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection';

/** 회원가입 완료 안내와 후속 이동을 표시합니다. (Displays registration completion and follow-up navigation.) */
export default function Page() {
  return (
    <AccountPageLayout
      contentWidth="500px"
      pageCss={css.raw({ px: '4', _mobile: { pt: '24', pb: '124px' } })}
      contentCss={css.raw({
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        gap: '8',
      })}
    >
      <ContentSection
        gap="8"
        title="회원가입 완료"
        headerProps={{ titleAs: 'h1', titleProps: { web: 'heading6', mo: 'heading4' } }}
        footer={
          <ButtonLink href="/" variant="primary" fullWidth>
            쇼핑하러 가기
          </ButtonLink>
        }
      >
        <Center>
          <Icon src="/images/icon/join-check.svg" size="48px" />
        </Center>
        <Stack gap="4">
          <Typography as="p" variant="body2">
            가입이 성공적으로 이루어졌습니다!
          </Typography>
          <Typography as="p" variant="body4">
            고객님께 알찬 정보, 다양한 이벤트와 혜택을 드리고자{' '}
            <br className={css({ display: 'none', _mobile: { display: 'inline' } })} />
            최선을 다하겠습니다
          </Typography>
        </Stack>
      </ContentSection>
    </AccountPageLayout>
  );
}
