'use client';

import { useMemo, useState } from 'react';
import { PageActionButton } from '@/components/common/molecules/PageActionButton/PageActionButton';
import { FaqControls } from '@/components/common/molecules/Faq/FaqControls';
import { FaqList } from '@/components/common/organisms/Faq/FaqList';
import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout';
import { faqCategories, faqs, type FaqCategory } from '@/components/features/faq/faq.data';
import { supportNavigation } from '@/components/features/support/support.navigation';
import { usePlatform } from '@/context/platform';

/** 자주 묻는 질문의 분류와 펼침 상태를 관리합니다. (Manages FAQ categories and expanded answers.) */
export default function Page() {
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
      <FaqList
        entries={entries.slice(0, shown)}
        openQuestion={open}
        onToggle={(question) => setOpen(open === question ? null : question)}
      />
    </CustomerCenterLayout>
  );
}
