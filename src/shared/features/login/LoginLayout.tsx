import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { AccountPageLayout } from '@/shared/components/layouts/AccountPageLayout/AccountPageLayout';

export function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <AccountPageLayout pageCss={css.raw({ pb: '124px' })}>
      <ContentSection
        gap="10"
        title={
          <>
            HOKA Korea에
            <br />
            오신것을 환영합니다
          </>
        }
        headerProps={{ titleAs: 'h1', titleProps: { variant: 'loginTitle', id: 'login-title' } }}
      >
        <div>{children}</div>
      </ContentSection>
    </AccountPageLayout>
  );
}
