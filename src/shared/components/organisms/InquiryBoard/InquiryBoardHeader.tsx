import type { ReactNode } from 'react';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type InquiryBoardHeaderProps = {
  headingId: string;
  title: string;
  count: number;
  excludePrivate: boolean;
  onExcludePrivateChange: (checked: boolean) => void;
  action?: ReactNode;
};

const checkbox = css({
  gap: '8px',
  color: 'var(--color-text-tertiary)',
  '& [role="checkbox"]': { w: '18px', h: '18px' },
});

export function InquiryBoardHeader({
  headingId,
  title,
  count,
  excludePrivate,
  onExcludePrivateChange,
  action,
}: InquiryBoardHeaderProps) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      gap="4"
      pb="5"
      borderBottom="1px solid var(--color-black-100)"
      _mobile={{ flexWrap: 'wrap' }}
    >
      <Flex alignItems="center" flexWrap="wrap" gap="5" _mobile={{ gap: '3' }}>
        <Typography as="h3" id={headingId} variant="body2" weight="bold">
          {title}({count})
        </Typography>
        <Checkbox
          label="비밀글 제외"
          labelVariant="body4"
          className={checkbox}
          checked={excludePrivate}
          onCheckedChange={onExcludePrivateChange}
        />
      </Flex>
      {action}
    </Flex>
  );
}
