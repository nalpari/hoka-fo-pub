import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { Button } from '@/shared/components/atoms/Button/Button';
import { usePlatform } from '@/shared/context/platform';
import { css } from 'styled-system/css';
import { Flex } from 'styled-system/jsx';

const searchButton = css({
  w: '178px',
  h: '36px',
  minH: '36px !important',
  border: '1px solid var(--hoka-black)',
  '--button-radius': '999px',
  px: '12px',
  py: '8px',
  bg: 'var(--hoka-white)',
});

const searchLabel = css({
  display: 'flex',
  flex: '1 0 0',
  alignItems: 'center',
  h: '24px',
  minW: 0,
  color: '#4d4d4d',
  fontFamily: 'Pretendard, Arial, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  fontStyle: 'normal',
  lineHeight: 1.3,
  letterSpacing: '-0.02em',
});

export type HeaderSearchProps = {
  onSearch: () => void;
};

export function HeaderSearch({ onSearch }: HeaderSearchProps) {
  const platform = usePlatform();

  if (platform === 'web') {
    return (
      <Button className={searchButton} onClick={onSearch} aria-label="검색">
        <Flex justifyContent="space-between" alignItems="center" w="100%">
          <span className={searchLabel}>검색하기</span>
          <Icon src="/images/header/search.svg" size="16px" />
        </Flex>
      </Button>
    );
  }

  return (
    <IconButton size="32px" onClick={onSearch} aria-label="검색">
      <Icon src="/images/header/search.svg" size="19px" />
    </IconButton>
  );
}
