import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';
import { HStack, Stack } from 'styled-system/jsx';
import { ButtonLink } from '@/components/common/atoms/Button/Button';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { MyPageMembership } from './MyPageMembership';
import { MyPageBenefits } from './MyPageBenefits';

const profileLink = css({ textDecoration: 'none!' });

export function MyPageOverviewProfile() {
  return (
    <ContentSection
      gap="4"
      title={
        <>
          <ButtonLink className={profileLink} href="/mypage/profile" size="lg" variant="link">
            <HStack as="span" gap="1">
              <HStack as="span" gap="0.5">
                <Typography as="span" variant="heading4">
                  박연진
                </Typography>
                <Typography as="span" variant="heading4">
                  님
                </Typography>
              </HStack>
              <Icon name="chevron-right" size="16px" />
            </HStack>
          </ButtonLink>
        </>
      }
      headerProps={{ titleAs: 'h1', titleProps: { variant: 'heading4' } }}
    >
      <Stack gap="2">
        <MyPageMembership />
        <MyPageBenefits />
      </Stack>
    </ContentSection>
  );
}
