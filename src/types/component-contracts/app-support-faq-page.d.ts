// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type FaqCategory } from '@/components/faq/faq.data';
import { type ReactNode } from 'react';
type Props = {
  category: FaqCategory;
  categories: FaqCategory[];
  onCategoryChange: (category: FaqCategory) => void;
};
declare function FaqCategoryNav({
  category,
  categories,
  onCategoryChange,
}: Props): import('react').JSX.Element;
type FaqSearchProps = {
  query: string;
  onQueryChange: (query: string) => void;
};
declare function FaqSearch({ query, onQueryChange }: FaqSearchProps): import('react').JSX.Element;
type FaqControlsProps = {
  category: FaqCategory;
  query: string;
  categories: FaqCategory[];
  onCategoryChange: (category: FaqCategory) => void;
  onQueryChange: (query: string) => void;
};
declare function FaqControls({
  category,
  query,
  categories,
  onCategoryChange,
  onQueryChange,
}: FaqControlsProps): import('react').JSX.Element;
type FaqQuestionProps = {
  question: string;
};
declare function FaqQuestion({ question }: FaqQuestionProps): import('react').JSX.Element;
type FaqAnswerProps = {
  answer: ReactNode;
};
declare function FaqAnswer({ answer }: FaqAnswerProps): import('react').JSX.Element;
declare function FaqEmptyState(): import('react').JSX.Element;
type FaqListEntry = {
  question: string;
  answer: ReactNode;
};
type FaqListProps = {
  entries: readonly FaqListEntry[];
  openQuestion: string | null;
  onToggle: (question: string) => void;
};
declare function FaqList({
  entries,
  openQuestion,
  onToggle,
}: FaqListProps): import('react').JSX.Element;
/** 자주 묻는 질문의 분류와 펼침 상태를 관리합니다. (Manages FAQ categories and expanded answers.) */
export default function Page(): import('react').JSX.Element;
export {
  FaqCategoryNav,
  FaqSearch,
  FaqControls,
  FaqQuestion,
  FaqAnswer,
  FaqEmptyState,
  FaqList,
  type FaqListEntry,
  type FaqListProps,
};
