import type { ReactNode } from 'react';
import { Box, Grid } from 'styled-system/jsx';
import { AccountPageLayout } from '@/shared/components/layouts/AccountPageLayout/AccountPageLayout';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

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
      <Box mb="10" _mobile={{ mb: '8' }}>
        <Typography as="h1" web="heading7" mo="heading5">
          {title}
        </Typography>
        {description ? (
          <Box mt="3">
            <Typography as="p" variant="body3" tone="tertiary">
              {description}
            </Typography>
          </Box>
        ) : null}
      </Box>
      {children}
      {actions ? (
        <Grid gridTemplateColumns="1fr 1fr" gap="2" mt={actionsSpacing === 'compact' ? '6' : '8'}>
          {actions}
        </Grid>
      ) : null}
    </AccountPageLayout>
  );
}
