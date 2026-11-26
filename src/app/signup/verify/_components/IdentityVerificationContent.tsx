import { css } from 'styled-system/css';
import { Box, Stack } from 'styled-system/jsx';

import { ButtonLink } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

const styles = {
  phoneAction: css({
    _mobile: { minH: '44px', '& > span > span': { fontSize: '15px' } },
  }),
};

/** 회원가입에 필요한 휴대폰 본인인증을 안내합니다. (Introduces phone verification for signup.) */
export function RouteContent() {
  return (
    <Box
      as="main"
      px="16px"
      py="96px"
      _mobile={{ pt: '40px', pb: '32px', minH: 'calc(100svh - var(--layout-site-header-height))' }}
    >
      <ContentSection
        maxW={{ base: '500px', _mobile: 'none' }}
        mx="auto"
        gap={{ base: '72px', _mobile: '32px' }}
        title="본인인증"
        headerProps={{
          titleAs: 'h1',
          titleProps: { web: 'h8B', mo: 'h7B' },
          description: 'HOKA Korea 온라인 회원가입 여부 확인을 위해 본인 인증이 필요합니다.',
          descriptionProps: { variant: 'b4', tone: 'tertiary' },
        }}
      >
        <Stack gap="16px">
          <Stack alignItems="center" gap={{ base: '48px', _mobile: '24px' }}>
            <Icon name="phone-verification" size="80px" aria-hidden="true" />
            <ButtonLink
              variant="primary"
              href="/signup/verify/phone"
              fullWidth
              className={styles.phoneAction}
            >
              PASS 인증하기
            </ButtonLink>
          </Stack>
          <Typography as="p" web="b6" mo="b7" tone="tertiary">
            ※ 본인 인증 시 입력하신 정보는 본인 확인 용도 외에는 사용되지 않으며 별도 저장되지
            않습니다.
          </Typography>
        </Stack>
      </ContentSection>
    </Box>
  );
}
