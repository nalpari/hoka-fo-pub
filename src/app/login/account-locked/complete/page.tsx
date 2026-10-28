'use client';

import { css } from 'styled-system/css';

import { ButtonLink } from '@/components/common/atoms/Button/Button';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { Typography } from '@/components/common/atoms/Typography/Typography';

import { AccountPageLayout } from '@/components/common/layouts/AccountPageLayout/AccountPageLayout';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';

/** 계정 잠금 해제 완료 안내를 표시합니다. (Displays the account unlock completion notice.) */
export default function Page() {
  return (
    <AccountPageLayout
      pageCss={css.raw({
        minH: '600px',
        px: '36',
        pb: '124px',
        _mobile: { minH: 'calc(100svh - var(--layout-site-header-height))' },
      })}
      contentCss={css.raw({ display: 'flex', flexDirection: 'column', gap: '9' })}
    >
      <ContentSection
        gap="9"
        title={
          <>
            <Typography as="span" web="heading7" mo="heading5">
              계정 잠금 해제 완료
            </Typography>
            <Icon name="unlock-keyhole" size="18px" />
          </>
        }
        headerProps={{
          gap: '3',
          titleAs: 'h1',
          titleProps: {
            className: css({ display: 'flex', gap: '2', alignItems: 'center', m: '0' }),
          },
          description: (
            <>
              {' '}
              <Typography as="span" variant="bodyKr3" tone="tertiary">
                계정 잠금 상태가 성공적으로 해제되었습니다.
              </Typography>
              <br />
              <Typography as="span" variant="bodyKr3" tone="tertiary">
                다시 로그인을 진행해 주세요.
              </Typography>
            </>
          ),
          descriptionProps: { className: css({ m: '0' }) },
        }}
        footer={
          <ButtonLink href="/login" variant="primary" fullWidth>
            홈으로
          </ButtonLink>
        }
      />
    </AccountPageLayout>
  );
}
