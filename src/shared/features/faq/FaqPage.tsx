'use client';

import { useMemo, useState } from 'react';
import { PageActionButton } from '@/shared/components/molecules/PageActionButton/PageActionButton';
import { Divider } from 'styled-system/jsx';
import { FaqControls } from '@/shared/components/molecules/Faq/FaqControls';
import { FaqList } from '@/shared/components/organisms/Faq/FaqList';
import { CustomerCenterLayout } from '@/shared/components/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { faqCategories, faqs, type FaqCategory } from '@/shared/features/faq/faq.data';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { usePlatform } from '@/shared/context/platform';
import { Box } from 'styled-system/jsx';

export function FaqPage() {
  const platform = usePlatform();
  const [category, setCategory] = useState<FaqCategory>('전체');
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(10);
  const [open, setOpen] = useState<string | null>(() =>
    platform === 'web' ? faqs[0].question : null,
  );
  const entries = useMemo(
    () =>
      faqs.filter(
        (item) =>
          (category === '전체' || item.category === category) &&
          `${item.question} ${item.answer}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query],
  );

  const changeCategory = (next: FaqCategory) => {
    setCategory(next);
    setShown(10);
    setOpen(null);
  };

  return (
    <CustomerCenterLayout
      title="FAQs"
      headingProps={{ _mobile: { mb: '2' } }}
      activePath="/support/faq"
      groups={supportNavigation}
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: 'FAQs' },
      ]}
      footer={
        shown < entries.length && (
          <PageActionButton
            onClick={() => setShown((count) => count + 10)}
            counter={{ current: Math.ceil(shown / 10), total: Math.ceil(entries.length / 10) }}
            width="narrow"
            containerProps={{ _mobile: { pt: '6' } }}
          >
            더보기
          </PageActionButton>
        )
      }
    >
      <Divider
        aria-hidden="true"
        orientation="horizontal"
        h="2px"
        bg="black.100"
        _mobile={{ display: 'none' }}
      />
      <FaqControls
        category={category}
        query={query}
        categories={faqCategories}
        onCategoryChange={changeCategory}
        onQueryChange={(value) => {
          setQuery(value);
          setShown(10);
        }}
      />
      <Box _mobile={{ mt: '6' }}>
        <FaqList
          entries={entries.slice(0, shown)}
          openQuestion={open}
          onToggle={(question) => setOpen(open === question ? null : question)}
        />
      </Box>
    </CustomerCenterLayout>
  );
}
