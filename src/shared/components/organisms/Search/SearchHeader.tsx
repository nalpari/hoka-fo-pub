import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

const close = css({
  w: '8',
  h: '8',
  border: '0',
  bg: 'transparent',
  fontSize: '28',
  lineHeight: 'hoka',
});

type SearchHeaderProps = { onClose: () => void };

export function SearchHeader({ onClose }: SearchHeaderProps) {
  return (
    <HStack gap="normal" justifyContent="space-between" mb="5">
      <Typography as="h2" variant="heading9" id="site-search-title" className={css({ m: '0' })}>
        검색
      </Typography>
      <IconButton aria-label="검색 닫기" className={close} onClick={onClose}>
        ×
      </IconButton>
    </HStack>
  );
}
