import { FaqCategoryNav } from '@/components/common/molecules/Faq/FaqCategoryNav';
import { FaqSearch } from '@/components/common/molecules/Faq/FaqSearch';
import type { FaqCategory } from '@/components/features/faq/faq.data';
import { Box } from 'styled-system/jsx';

type Props = {
  category: FaqCategory;
  query: string;
  categories: FaqCategory[];
  onCategoryChange: (category: FaqCategory) => void;
  onQueryChange: (query: string) => void;
};

export function FaqControls({
  category,
  query,
  categories,
  onCategoryChange,
  onQueryChange,
}: Props) {
  return (
    <Box pt={{ base: '10', _mobile: '6' }}>
      <FaqSearch query={query} onQueryChange={onQueryChange} />
      <FaqCategoryNav
        category={category}
        categories={categories}
        onCategoryChange={onCategoryChange}
      />
    </Box>
  );
}
