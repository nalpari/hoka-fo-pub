'use client';

import Link from 'next/link';

import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography/Typography';

type Props = { eyebrow: string; title: string; description: string; to: string; action: string };

const titleStyle = css({
  my: '2',
  mx: '0',
});

const descriptionStyle = css({
  maxW: '500px',
  m: '0',
});

const actionStyle = css({
  flex: 'none',
  textDecoration: 'underline',
  textUnderlineOffset: '4px',
});

export function PersonalizationCard({ eyebrow, title, description, to, action }: Props) {
  return (
    <HStack
      as="article"
      justifyContent="space-between"
      gap="6"
      minH="185px"
      p="30px 38px"
      bg="var(--color-off-white-100)"
      _mobile={{
        minH: '210px',
        p: '25px',
      }}
    >
      <div>
        <Typography as="small" variant="body5">
          {eyebrow}
        </Typography>
        <Typography as="h3" variant="heading8" className={titleStyle}>
          {title}
        </Typography>
        <Typography as="p" variant="body5" className={descriptionStyle} tone="subtle">
          {description}
        </Typography>
      </div>
      <Link href={to}>
        <Typography variant="textLink2" className={actionStyle}>
          {action} →
        </Typography>
      </Link>
    </HStack>
  );
}
