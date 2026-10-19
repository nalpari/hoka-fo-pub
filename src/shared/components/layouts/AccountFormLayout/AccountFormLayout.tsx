import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';
import { AccountPageLayout } from '@/shared/components/layouts/AccountPageLayout/AccountPageLayout';
import { AccountFormHeader } from '@/shared/components/molecules/AccountFormHeader/AccountFormHeader';

type Props = {
  title: ReactNode;
  description?: string;
  contentWidth?: '420px' | '568px';
  fillMobileViewport?: boolean;
  children: ReactNode;
  dialogs?: ReactNode;
  actions?: ReactNode;
  actionsSpacing?: 'default' | 'compact';
};

export function AccountFormLayout({
  title,
  description,
  contentWidth = '420px',
  fillMobileViewport = false,
  children,
  dialogs,
  actions,
  actionsSpacing = 'default',
}: Props) {
  return (
    <AccountPageLayout
      contentWidth={contentWidth}
      fillMobileViewport={fillMobileViewport}
      outsideContent={dialogs}
    >
      <AccountFormHeader
        title={title}
        description={description}
        spacingCss={css.raw({ mb: '10', _mobile: { mb: '8' } })}
      />
      {children}
      {actions ? (
        <Grid gridTemplateColumns="1fr 1fr" gap="2" mt={actionsSpacing === 'compact' ? '6' : '8'}>
          {actions}
        </Grid>
      ) : null}
    </AccountPageLayout>
  );
}
