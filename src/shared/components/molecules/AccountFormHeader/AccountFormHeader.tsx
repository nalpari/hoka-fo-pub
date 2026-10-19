import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';
import type { SystemStyleObject } from 'styled-system/types';
import { Typography, type TypographyTone } from '@/shared/components/atoms/Typography/Typography';

type Props = {
  title: ReactNode;
  titleId?: string;
  description?: ReactNode;
  descriptionTone?: TypographyTone;
  spacingCss?: SystemStyleObject;
};

/** Shared account heading; callers retain spacing to their content. */
export function AccountFormHeader({
  title,
  titleId,
  description,
  descriptionTone = 'tertiary',
  spacingCss,
}: Props) {
  return (
    <Box className={css({ display: 'flex', flexDirection: 'column', gap: '3' }, spacingCss)}>
      <Typography as="h1" web="heading7" mo="heading5" id={titleId}>
        {title}
      </Typography>
      {description ? (
        <Typography as="p" variant="body3" tone={descriptionTone}>
          {description}
        </Typography>
      ) : null}
    </Box>
  );
}
