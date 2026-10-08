import { useMemo, useState } from 'react';
import { FaqControls } from '@/shared/components/molecules/Faq/FaqControls';
import { PageHeader } from '@/shared/components/molecules/PageHeader/PageHeader';
import { FaqList } from '@/shared/components/organisms/Faq/FaqList';
import { SidebarNavigationLayout } from '@/shared/components/layouts/SidebarNavigationLayout/SidebarNavigationLayout';
import { LoadMoreButton } from '@/shared/components/atoms/LoadMoreButton/LoadMoreButton';
import { faqCategories, faqs, type FaqCategory } from '@/shared/features/faq/faq.data';
import { supportNavigation } from '@/shared/features/support/support.navigation';
import { css } from 'styled-system/css';

const styles = {
  content: css({ '--support-content-title-gap': '28px' }),
  more: css({ display: 'block', m: '30px auto', border: '0', fontSize: '12' }),
};

export function FaqPage() {
  const [category, setCategory] = useState<FaqCategory>('전체');
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(15);
  const [open, setOpen] = useState<string | null>(faqs[0].question);
  const entries = useMemo(
    () =>
      faqs.filter(
        (item) =>
          (category === '전체' || item.category === category) &&
          item.question.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, query],
  );
  const changeCategory = (next: FaqCategory) => {
    setCategory(next);
    setShown(15);
    setOpen(null);
  };
  return (
    <SidebarNavigationLayout
      activePath="/support/faq"
      groups={supportNavigation}
      title="SUPPORT"
      titleTo="/support"
    >
      <section className={styles.content}>
        <PageHeader title="FAQs" />
        <FaqControls
          category={category}
          query={query}
          categories={faqCategories}
          onCategoryChange={changeCategory}
          onQueryChange={(value) => {
            setQuery(value);
            setShown(15);
          }}
        />
        <FaqList
          entries={entries.slice(0, shown)}
          openQuestion={open}
          onToggle={(question) => setOpen(open === question ? null : question)}
        />
        {shown < entries.length && (
          <LoadMoreButton
            className={styles.more}
            onClick={() => setShown((count) => count + 15)}
            remaining={entries.length - shown}
          />
        )}
      </section>
    </SidebarNavigationLayout>
  );
}
