import { FaqCategoryNav } from '@/shared/components/molecules/Faq/FaqCategoryNav';
import { FaqSearch } from '@/shared/components/molecules/Faq/FaqSearch';
import type { FaqCategory } from '@/shared/features/faq/faq.data';
import { Stack } from 'styled-system/jsx';

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
    <Stack gap="0">
      <FaqSearch query={query} onQueryChange={onQueryChange} />
      <FaqCategoryNav
        category={category}
        categories={categories}
        onCategoryChange={onCategoryChange}
      />
    </Stack>
  );
}
