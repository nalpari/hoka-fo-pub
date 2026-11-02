'use client';
import { type ReactNode, useMemo, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, Flex, HStack, Stack } from 'styled-system/jsx';

import { Accordion } from '@/components/common/atoms/Accordion';
import { Button } from '@/components/common/atoms/Button';
import { EmptyState } from '@/components/common/atoms/EmptyState';
import { FilterTabs } from '@/components/common/atoms/FilterTabs';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentHeader } from '@/components/common/molecules/ContentHeader';
import { SearchField } from '@/components/common/molecules/SearchField';

import { faqCategories, type FaqCategory, faqs } from '@/app/support/faq/faq.data';
import { supportNavigation } from '@/app/support/support.navigation';
import { CustomerCenterLayout } from '@/components/support/CustomerCenterLayout';
import { faChevronDown } from '@/icons/fontAwesome';
type Props = {
  category: FaqCategory;
  categories: FaqCategory[];
  onCategoryChange: (category: FaqCategory) => void;
};
function FaqCategoryNav({ category, categories, onCategoryChange }: Props) {
  return (
    <Box as="nav" aria-label="FAQ 카테고리" pt="8" pb="32px" _mobile={{ pt: '6', pb: '8' }}>
      <FilterTabs
        ariaLabel="FAQ 카테고리"
        onValueChange={onCategoryChange}
        options={categories.map((item) => ({
          label: item === 'AS/품질' ? 'AS/불량' : item,
          value: item,
        }))}
        value={category}
        variant="fill"
        railClassName={css({ gap: '8px', _mobile: { gap: '6px' } })}
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
      <Box
        w="590px"
        maxW="100%"
        _mobile={{ w: '100%' }}
        css={{ _mobile: { '& input::placeholder': { color: 'black.50' } } }}
      >
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
    <Box pt="8">
      <FaqSearch query={query} onQueryChange={onQueryChange} />
      <FaqCategoryNav
        category={category}
        categories={categories}
        onCategoryChange={onCategoryChange}
      />
    </Box>
  );
}
type FaqQuestionProps = {
  question: string;
};
function FaqQuestion({ question }: FaqQuestionProps) {
  return (
    <HStack gap="2" minW="0">
      <Typography as="span" variant="body2" className={css({ flexShrink: 0, w: '17px' })}>
        Q
      </Typography>
      <Typography as="span" variant="headingKr9">
        {question}
      </Typography>
    </HStack>
  );
}
type FaqAnswerProps = {
  answer: ReactNode;
};
function FaqAnswer({ answer }: FaqAnswerProps) {
  return (
    <Box bg="black.10" px="4" py="6" whiteSpace="pre-line">
      {typeof answer === 'string' ? (
        <Stack gap="4">
          {answer.split('\n\n').map((paragraph, index) => (
            <Stack gap="2.5" key={index}>
              {paragraph.split('\n').map((line, lineIndex) => (
                <Typography as="p" variant="bodyKr4" key={lineIndex}>
                  {line}
                </Typography>
              ))}
            </Stack>
          ))}
        </Stack>
      ) : (
        <Typography as="div" variant="bodyKr4">
          {answer}
        </Typography>
      )}
    </Box>
  );
}
type FaqListEntry = {
  id?: string;
  question: string;
  answer: ReactNode;
};
type FaqListProps = {
  entries: readonly FaqListEntry[];
  openQuestion: string | null;
  onToggle: (question: string) => void;
};
const styles = {
  question: css({
    minH: '74px',
    gap: '16px',
    py: '24px',
    textAlign: 'left',
    boxShadow: 'inset 0 -1px 0 var(--color-black-20)',
    '&[aria-expanded="true"]': { boxShadow: 'none' },
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
          indicator={
            <Flex as="span" w="24px" h="24px" alignItems="center" justifyContent="center">
              <Icon fontAwesomeIcon={faChevronDown} size="16px" />
            </Flex>
          }
          triggerClassName={styles.question}
          multiple={false}
          value={openQuestion ? [openQuestion] : []}
          onValueChange={(values) => {
            const question = values[0] ?? openQuestion;
            if (question !== null) onToggle(question);
          }}
          items={entries.map((item) => ({
            value: item.id ?? item.question,
            title: <FaqQuestion question={item.question} />,
            content: <FaqAnswer answer={item.answer} />,
          }))}
        />
      ) : (
        <EmptyState
          variant="plain"
          title="검색 결과가 없습니다."
          titleProps={{ as: 'p', web: 'body4', mo: 'body5', tone: 'tertiary' }}
          layoutProps={{ py: '15' }}
        />
      )}
    </Box>
  );
}
/** 자주 묻는 질문의 분류와 펼침 상태를 관리합니다. (Manages FAQ categories and expanded answers.) */
export function RouteContent({ previewEmpty = false }: { previewEmpty?: boolean }) {
  const platform = usePlatform();
  const [category, setCategory] = useState<FaqCategory>('전체');
  const [query, setQuery] = useState(previewEmpty ? '검색 결과 없음' : '');
  const [shown, setShown] = useState(10);
  const [open, setOpen] = useState<string | null | undefined>();
  const openQuestion = open === undefined ? (platform === 'web' ? faqs[0].question : null) : open;
  const entries = useMemo(
    () =>
      previewEmpty
        ? []
        : faqs.filter(
            (item) =>
              (category === '전체' || item.category === category) &&
              `${item.question} ${item.answer}`.toLowerCase().includes(query.toLowerCase()),
          ),
    [category, query, previewEmpty],
  );
  const displayed = entries.slice(0, shown);
  const total = entries.length;
  const changeCategory = (next: FaqCategory) => {
    setCategory(next);
    setShown(10);
    setOpen(null);
  };
  return (
    <CustomerCenterLayout
      className={css({ _mobile: { pb: '72px' } })}
      header={
        <ContentHeader title="FAQs" titleAs="h1" titleProps={{ web: 'heading6', mo: 'heading5' }} />
      }
      activePath="/support/faq"
      groups={supportNavigation}
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: 'FAQs' },
      ]}
      footer={
        shown < entries.length ? (
          <Flex justifyContent="center" pt="10" _mobile={{ pt: '6' }}>
            <Button
              variant="secondary"
              size="short"
              density="compact"
              className={css({ w: '180px', '& > span': { w: '100%' }, _mobile: { w: 'auto' } })}
              loadMore={{
                counter: { current: displayed.length, total },
              }}
              onClick={() => {
                setShown((count) => count + 10);
              }}
            />
          </Flex>
        ) : null
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
      {
        <FaqList
          entries={previewEmpty ? [] : displayed}
          openQuestion={openQuestion}
          onToggle={(question) => setOpen(openQuestion === question ? null : question)}
        />
      }
    </CustomerCenterLayout>
  );
}
export const routePreviewComponents = { FaqList } satisfies Pick<
  typeof import('@/types/component-contracts/app-support-faq-page'),
  'FaqList'
>;
