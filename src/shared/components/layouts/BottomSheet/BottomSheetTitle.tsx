import type { ReactNode } from 'react';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type BottomSheetTitleProps = {
  children: ReactNode;
};

export function BottomSheetTitle({ children }: BottomSheetTitleProps) {
  return (
    <Typography as="h2" variant="bottomSheetTitle">
      {children}
    </Typography>
  );
}
