import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { css } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

const heading = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: '5',
  '& h2': { m: '0' },
});

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
    <Box className={heading}>
      <Typography as="h2" variant="heading9" id="site-search-title">
        검색
      </Typography>
      <IconButton aria-label="검색 닫기" className={close} onClick={onClose}>
        ×
      </IconButton>
    </Box>
  );
}
