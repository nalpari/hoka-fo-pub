import { Typography } from '@/components/common/atoms/Typography/Typography';
import { Button } from '@/components/common/atoms/Button/Button';
import type { SearchCollection } from './searchOverlayData';
import { Flex } from 'styled-system/jsx';
import { css } from 'styled-system/css';

type SearchCollectionLinksProps = {
  collections: readonly SearchCollection[];
  onSelect: (id: string) => void;
};

export function SearchCollectionLinks({ collections, onSelect }: SearchCollectionLinksProps) {
  return (
    <Flex
      aria-label="기획전 바로가기"
      as="nav"
      flexWrap="wrap"
      justifyContent="center"
      gap="0"
      py="18px"
      _mobile={{ justifyContent: 'flex-start', rowGap: '2', columnGap: '0' }}
    >
      {collections.map((collection) => (
        <Button
          key={collection.id}
          onClick={() => onSelect(collection.id)}
          className={css({
            '&&': {
              border: '0',
              borderRight: '1px solid var(--color-black-20)',
              py: '0',
              px: '4',
              bg: 'transparent',
              color: 'var(--color-text-subtle)',
              _hover: { textDecoration: 'underline' },
              _mobile: { px: '2.5' },
              _last: { borderRight: '0' },
            },
          })}
        >
          <Typography variant="body5" weight="semibold">
            {collection.label}
          </Typography>
        </Button>
      ))}
    </Flex>
  );
}
