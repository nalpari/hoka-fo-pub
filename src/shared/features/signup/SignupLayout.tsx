import type { ComponentProps, ReactNode } from 'react';
import { css } from 'styled-system/css';
import { AccountPageLayout } from '@/shared/components/layouts/AccountPageLayout/AccountPageLayout';

import { SignupProgress } from '@/shared/components/molecules/Signup/SignupProgress';

import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';

type Props = ComponentProps<typeof SignupProgress> & { children: ReactNode };

export function SignupLayout({ step, method, children }: Props) {
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
