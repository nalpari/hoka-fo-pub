import type { ReactNode } from 'react';
import { usePlatform } from '@/shared/context/platform';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';

const tag = css({
  h: '8',
  p: '7px 8px 7px 10px',
  bg: 'var(--color-black-20)',
  _mobile: {
    h: '7',
  },
});

const labelTag = css({
  color: 'var(--color-text-primary)',
  fontSize: '16',
});

export type TagProps = {
  children: ReactNode;
  onDelete?: () => void;
};

/** A compact label that can optionally remove its associated selection. */
export function Tag({ children, onDelete }: TagProps) {
  const platform = usePlatform();
  if (!onDelete) return <span className={tag}>{children}</span>;

  return (
    <Flex className={tag} gap="1.5" alignItems="center" justifyContent="space-between">
      <span className={labelTag}>{children}</span>
      <IconButton
        aria-label={`${typeof children === 'string' ? children : '태그'} 삭제`}
        onClick={onDelete}
        size={platform === 'mobile' ? '14px' : '16px'}
      >
        <Icon name="tag-delete" size={platform === 'mobile' ? '14px' : '16px'} />
      </IconButton>
    </Flex>
  );
}
