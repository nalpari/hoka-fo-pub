import type { ReactNode } from 'react';
import { Flex } from 'styled-system/jsx';
import { Checkbox } from '@/components/common/atoms/Checkbox/Checkbox';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ContentHeader } from '@/components/common/molecules/ContentHeader/ContentHeader';

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

/** 문의 게시판의 제목·건수·필터 동작을 배치합니다. (Arranges the inquiry board title, count, and filter action.) */
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
              {title} <Typography variant="body1" weight="medium">({count})</Typography>
            </>
          ) : (
            `${title}(${count})`
          )
        }
        titleProps={{
          id: headingId,
          variant: variant === 'product' ? 'heading8' : 'body2',
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
