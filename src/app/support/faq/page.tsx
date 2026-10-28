'use client';

import { type ReactNode, useMemo, useState } from 'react';
import { usePlatform } from '@/context/platform';
import { useRoutePreview } from '@/context/RoutePreview';

import { css } from 'styled-system/css';
import { Box, Flex, HStack } from 'styled-system/jsx';

import { Accordion } from '@/components/common/atoms/Accordion/Accordion';
import { FilterTabs } from '@/components/common/atoms/FilterTabs/FilterTabs';
import { Typography } from '@/components/common/atoms/Typography/Typography';

import { SearchField } from '@/components/common/molecules/SearchField/SearchField';

import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout/CustomerCenterLayout';

import { faqCategories, type FaqCategory, faqs } from '@/components/faq/faq.data';
import { supportNavigation } from '@/components/support/support.navigation';

type Props = {
  category: FaqCategory;
  categories: FaqCategory[];
  onCategoryChange: (category: FaqCategory) => void;
};

function FaqCategoryNav({ category, categories, onCategoryChange }: Props) {
  return (
    <Box as="nav" aria-label="FAQ 카테고리" pt="8" pb="48px" _mobile={{ pt: '6', pb: '8' }}>
      <FilterTabs
        ariaLabel="FAQ 카테고리"
        onValueChange={onCategoryChange}
        options={categories.map((item) => ({ label: item, value: item }))}
        value={category}
        variant="fill"
      />
    </Box>
  );
}

type FaqSearchProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

function FaqSearch({ query, onQueryChange }: FaqSearchProps) {
  return (
    <Flex justifyContent="center" pt="6" _mobile={{ pt: '0' }}>
      <Box w="590px" maxW="100%" _mobile={{ w: '100%' }}>
        <SearchField
          label="질문 또는 답변 검색"
          placeholder="검색어를 입력해주세요"
          value={query}
          onValueChange={onQueryChange}
        />
      </Box>
    </Flex>
  );
}

type FaqControlsProps = {
  category: FaqCategory;
  query: string;
  categories: FaqCategory[];
  onCategoryChange: (category: FaqCategory) => void;
  onQueryChange: (query: string) => void;
};

function FaqControls({
  category,
  query,
  categories,
  onCategoryChange,
  onQueryChange,
}: FaqControlsProps) {
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

type FaqQuestionProps = { question: string };

function FaqQuestion({ question }: FaqQuestionProps) {
  return (
    <HStack gap="2" minW="0">
      <Typography as="b" variant="body2">
        Q
      </Typography>
      <Typography as="span" variant="body3" weight="medium">
        {question}
      </Typography>
    </HStack>
  );
}

type FaqAnswerProps = { answer: ReactNode };

function FaqAnswer({ answer }: FaqAnswerProps) {
  return (
    <Box bg="black.10" px="4" py="6" whiteSpace="pre-line">
      <Typography as="p" web="body4" mo="body4">
        {answer}
      </Typography>
    </Box>
  );
}

function FaqEmptyState() {
  return (
    <Box py="15" textAlign="center">
      <Typography as="p" web="body4" mo="body5" tone="tertiary">
        검색 결과가 없습니다.
      </Typography>
    </Box>
  );
}

type FaqListEntry = { question: string; answer: ReactNode };

type FaqListProps = {
  entries: readonly FaqListEntry[];
  openQuestion: string | null;
  onToggle: (question: string) => void;
};

const styles = {
  root: css({ '& svg': { w: '24px', h: '24px', _mobile: { w: '16px', h: '16px' } } }),
  item: css({ borderBottom: '1px solid var(--color-black-20)' }),
  question: css({
    minH: '74px',
    gap: '16px',
    py: '24px',
    textAlign: 'left',
    '&[aria-expanded="true"]': { fontWeight: 'semibold' },
    _mobile: { minH: '58px', py: '16px' },
  }),
};

function FaqList({ entries, openQuestion, onToggle }: FaqListProps) {
  return (
    <Box
      as="section"
      aria-label="자주 묻는 질문"
      borderTopColor="black.100"
      borderTopStyle="solid"
      borderTopWidth={entries.length ? '2px' : '0'}
      pt={{ base: '32px', _mobile: '8px' }}
    >
      {entries.length ? (
        <Accordion
          className={styles.root}
          itemClassName={styles.item}
          triggerClassName={styles.question}
          multiple={false}
          value={openQuestion ? [openQuestion] : []}
          onValueChange={(values) => {
            const question = values[0] ?? openQuestion;
            if (question !== null) onToggle(question);
          }}
          items={entries.map((item) => ({
            value: item.question,
            title: <FaqQuestion question={item.question} />,
            content: <FaqAnswer answer={item.answer} />,
          }))}
        />
      ) : (
        <FaqEmptyState />
      )}
    </Box>
  );
}

/** 자주 묻는 질문의 분류와 펼침 상태를 관리합니다. (Manages FAQ categories and expanded answers.) */
function RouteContent() {
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
      footerAction={
        shown < entries.length && {
          kind: 'loadMore',
          label: '더보기',
          onClick: () => setShown((count) => count + 10),
          counter: { current: Math.ceil(shown / 10), total: Math.ceil(entries.length / 10) },
          width: 'narrow',
          containerProps: css.raw({ _mobile: { pt: '6' } }),
        }
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

const routePreviewComponents = { FaqList } satisfies Pick<
  typeof import('@/types/component-contracts/app-support-faq-page'),
  'FaqList'
>;

/** 실제 화면 또는 컨텍스트로 선택한 로컬 구성을 표시합니다. (Displays the route or its context-selected local composition.) */
export default function Page() {
  const preview = useRoutePreview(routePreviewComponents);
  return preview ?? <RouteContent />;
}
