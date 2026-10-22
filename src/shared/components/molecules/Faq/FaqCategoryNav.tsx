import { FilterTabs } from '@/shared/components/atoms/FilterTabs/FilterTabs';
import type { FaqCategory } from '@/shared/features/faq/faq.data';
import { Box } from 'styled-system/jsx';
import { css } from 'styled-system/css';

type Props = {
  category: FaqCategory;
  categories: FaqCategory[];
  onCategoryChange: (category: FaqCategory) => void;
};

export function FaqCategoryNav({ category, categories, onCategoryChange }: Props) {
  return (
    <Box as="nav" aria-label="FAQ 카테고리" pt="8" pb="4" _mobile={{ pt: '6', pb: '8' }}>
      <FilterTabs
        ariaLabel="FAQ 카테고리"
        onValueChange={onCategoryChange}
        options={categories.map((item) => ({ label: item, value: item }))}
        value={category}
        variant="fill"
        className={css({ _mobile: { '& > [role="group"]': { mb: '0', px: '0' } } })}
      />
    </Box>
  );
}
