import type { ReactNode } from 'react';
import type { SystemStyleObject } from 'styled-system/types';
import type { TypographyTone } from '@/components/common/atoms/Typography/Typography';
import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';

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
    <ContentHeader
      title={title}
      titleAs="h1"
      titleProps={{ web: 'heading7', mo: 'heading5', id: titleId }}
      description={description}
      descriptionProps={{ variant: 'body3', tone: descriptionTone }}
      css={spacingCss}
    />
  );
}
