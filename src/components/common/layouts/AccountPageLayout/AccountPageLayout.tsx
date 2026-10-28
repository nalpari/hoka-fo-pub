import type { ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import type { SystemStyleObject } from 'styled-system/types';

type Props = {
  children: ReactNode;
  contentWidth?: '420px' | '500px' | '568px';
  contentAs?: 'div' | 'section';
  contentLabelledBy?: string;
  fillMobileViewport?: boolean;
  outsideContent?: ReactNode;
  /** Compose layout differences with css.raw so Panda can extract each caller's styles. */
  pageCss?: SystemStyleObject;
  contentCss?: SystemStyleObject;
};

const page = css.raw({
  pt: '24',
  px: '5',
  pb: '20',
  _mobile: { pt: '10', px: '4', pb: '8' },
});

/** Shared account-page frame; feature layouts keep their own heading and content contracts. */
export function AccountPageLayout({
  children,
  contentWidth = '500px',
  contentAs = 'div',
  contentLabelledBy,
  fillMobileViewport = false,
  outsideContent,
  pageCss,
  contentCss,
}: Props) {
  return (
    <Box
      as="main"
      className={css(
        page,
        fillMobileViewport && {
          _mobile: { minH: 'calc(100svh - var(--layout-site-header-height))' },
        },
        pageCss,
      )}
    >
      <Box
        as={contentAs}
        aria-labelledby={contentLabelledBy}
        className={css(
          { maxW: '500px', mx: 'auto' },
          contentWidth === '420px' && { maxW: '420px' },
          contentWidth === '568px' && { maxW: '568px' },
          contentCss,
        )}
      >
        {children}
      </Box>
      {outsideContent}
    </Box>
  );
}
