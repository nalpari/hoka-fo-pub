import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { css } from 'styled-system/css';
import { Center, Stack } from 'styled-system/jsx';
import { AccountPageLayout } from '@/shared/components/layouts/AccountPageLayout/AccountPageLayout';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Icon } from '@/shared/components/atoms/Icon/Icon';

export function RegistrationCompleteContent() {
  return (
    <AccountPageLayout
      contentWidth="500px"
      pageCss={css.raw({ px: '4', pb: '124px', _mobile: { pt: '24', pb: '124px' } })}
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
        <ButtonLink href="/" variant="primary" fullWidth>
          쇼핑하러 가기
        </ButtonLink>
      </ContentSection>
    </AccountPageLayout>
  );
}
