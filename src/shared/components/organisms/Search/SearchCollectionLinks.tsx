import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { Button } from '@/shared/components/atoms/Button/Button';
import { css } from 'styled-system/css';
import type { SearchCollection } from './searchOverlayData';

const collectionLinksStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '0',
  py: '18px',
  _mobile: { justifyContent: 'flex-start', rowGap: '2', columnGap: '0' },
  '& button': {
    border: '0',
    borderRight: '1px solid var(--color-black-20)',
    py: '0',
    px: '4',
    bg: 'transparent',
    color: 'var(--color-text-subtle)',
    _hover: { textDecoration: 'underline' },
    _mobile: { px: '2.5' },
  },
  '& button:last-child': { borderRight: '0' },
});

type SearchCollectionLinksProps = {
  collections: readonly SearchCollection[];
  onSelect: (id: string) => void;
};

export function SearchCollectionLinks({ collections, onSelect }: SearchCollectionLinksProps) {
  return (
    <nav aria-label="기획전 바로가기" className={collectionLinksStyle}>
      {collections.map((collection) => (
        <Button key={collection.id} onClick={() => onSelect(collection.id)}>
          <Typography variant="body5" weight="semibold">
            {collection.label}
          </Typography>
        </Button>
      ))}
    </nav>
  );
}
