import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { ReactNode } from 'react';
import { Flex } from 'styled-system/jsx';

type SectionHeadingProps = {
  title: ReactNode;
  action?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
};

/** Standard page-section heading with an optional trailing action. */
export function SectionHeading({ title, action, as: Heading = 'h2' }: SectionHeadingProps) {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Typography as={Heading} variant="heading7">
        {title}
      </Typography>
      {action}
    </Flex>
  );
}
