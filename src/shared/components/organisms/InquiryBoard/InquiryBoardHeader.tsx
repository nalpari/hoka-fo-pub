import type { ReactNode } from 'react';
import { Flex } from 'styled-system/jsx';
import { Checkbox } from '@/shared/components/atoms/Checkbox/Checkbox';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';

type InquiryBoardHeaderProps = {
  headingId: string;
  title: string;
  count: number;
  variant?: 'default' | 'product';
  filterDisabled?: boolean;
  excludePrivate: boolean;
  onExcludePrivateChange: (checked: boolean) => void;
  action?: ReactNode;
};

export function InquiryBoardHeader({
  headingId,
  title,
  count,
  variant = 'default',
  filterDisabled,
  excludePrivate,
  onExcludePrivateChange,
  action,
}: InquiryBoardHeaderProps) {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      gap="4"
      pb={variant === 'product' ? '23px' : '5'}
      borderBottom="1px solid var(--color-black-100)"
      _mobile={{ flexWrap: 'wrap' }}
    >
      <ContentHeader
        titleAs="h3"
        title={
          variant === 'product' ? (
            <>
              {title} <Typography variant="productSectionCount">({count})</Typography>
            </>
          ) : (
            `${title}(${count})`
          )
        }
        titleProps={{
          id: headingId,
          variant: variant === 'product' ? 'productSectionTitle' : 'body2',
          weight: variant === 'product' ? undefined : 'bold',
        }}
        orientation="horizontal"
        justifyContent="flex-start"
        flexWrap="wrap"
        gap="5"
        _mobile={{ gap: '3' }}
        action={
          <Checkbox
            label="비밀글 제외"
            variant="filter"
            disabled={filterDisabled}
            checked={excludePrivate}
            onCheckedChange={onExcludePrivateChange}
          />
        }
      />
      {action}
    </Flex>
  );
}
