import { FilterTabs } from '@/shared/components/atoms/FilterTabs/FilterTabs';
import type { FaqCategory } from '@/shared/features/faq/faq.data';
import { Box } from 'styled-system/jsx';

type Props = {
  category: FaqCategory;
  categories: FaqCategory[];
  onCategoryChange: (category: FaqCategory) => void;
};

export function FaqCategoryNav({ category, categories, onCategoryChange }: Props) {
  return (
    <Box as="nav" aria-label="FAQ 카테고리" pt="3" pb="6" _mobile={{ pt: '4' }}>
      <FilterTabs
        ariaLabel="FAQ 카테고리"
        onValueChange={onCategoryChange}
        options={categories.map((item) => ({ label: item, value: item }))}
        value={category}
        variant="outline"
      />
    </Box>
  );
}
