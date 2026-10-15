import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

type RunClubDetailLayoutProps = {
  hero: ReactNode;
  guide: ReactNode;
  desktopContent: ReactNode;
  mobileAction: ReactNode;
  applicationNotice: ReactNode;
};

export function RunClubDetailLayout({
  hero,
  guide,
  desktopContent,
  mobileAction,
  applicationNotice,
}: RunClubDetailLayoutProps) {
  return (
    <main
      className={css({
        _mobile: { '& ~ footer': { mb: 'calc(92px + env(safe-area-inset-bottom))' } },
      })}
    >
      {hero}
      {guide}
      <Box _mobile={{ display: 'none' }}>{desktopContent}</Box>
      {mobileAction}
      {applicationNotice}
    </main>
  );
}
