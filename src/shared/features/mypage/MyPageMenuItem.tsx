import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export type MyPageMenuItemProps = {
  label: string;
  to: string;
};

const menuLink = css({ display: 'block', borderBottom: '1px solid var(--color-border-subtle)' });

export function MyPageMenuItem({ label, to }: MyPageMenuItemProps) {
  return (
    <Link className={menuLink} href={to}>
      <HStack minH="14" justifyContent="space-between">
        <Typography variant="body3">{label}</Typography>
        <Icon name="chevron-right" size="16px" />
      </HStack>
    </Link>
  );
}
