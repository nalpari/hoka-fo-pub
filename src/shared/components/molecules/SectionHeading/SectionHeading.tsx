import type { ReactNode } from 'react';
import { Flex } from 'styled-system/jsx';
import { css } from 'styled-system/css';

const root = css({
  alignItems: 'center',
  justifyContent: 'space-between',
  '& h2': { fontSize: { base: '28', _mobile: '20' } },
  /*'& h2': { fontSize: { base: '30px', _mobile: '22px' } },*/
});

type SectionHeadingProps = {
  title: ReactNode;
  action?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
};

/** Standard page-section heading with an optional trailing action. */
export function SectionHeading({ title, action, as: Heading = 'h2' }: SectionHeadingProps) {
  return (
    <Flex className={root}>
      <Heading>{title}</Heading>
      {action}
    </Flex>
  );
}
