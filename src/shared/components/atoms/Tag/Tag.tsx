import type { ReactNode } from 'react';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

const tag = css({
  minH: '32px',
  p: '7px 8px 7px 10px',
  bg: '#eee',
  _mobile: {
    minH: '28px',
  },
});
const labelTag = css({
  color: 'var(--color-text-primary)',
  fontSize: '16px',
});

const deleteButton = css({
  w: '16px!',
  h: '16px!',
  minW: '16px!',
  minH: '16px!',
  _mobile: { w: '14px!', h: '14px!', minW: '14px!', minH: '14px!' },
});

const deleteIcon = css({
  w: '16px!',
  h: '16px!',
  _mobile: { w: '14px!', h: '14px!' },
});

export type TagProps = {
  children: ReactNode;
  onDelete?: () => void;
};

/** A compact label that can optionally remove its associated selection. */
export function Tag({ children, onDelete }: TagProps) {
  if (!onDelete) return <span className={tag}>{children}</span>;

  return (
    <HStack className={tag} gap="6px">
      <span className={labelTag}>{children}</span>
      <IconButton
        aria-label={`${typeof children === 'string' ? children : '태그'} 삭제`}
        className={deleteButton}
        onClick={onDelete}
        size="16px"
      >
        <Icon className={deleteIcon} name="tag-delete" size="16px" />
      </IconButton>
    </HStack>
  );
}
