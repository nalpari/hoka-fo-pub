import { type ReactNode } from 'react';

import { type TypographyVariant } from '@/components/common/atoms/Typography/Typography';

export type MainSectionProps = {
  title: string;
  titleVariant?: TypographyVariant;
  actionSlot?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Extended content starts on the central grid and reaches the frame's right edge. */
  contentWidth?: 'contained' | 'fullBleed' | 'extended';
  spacing?: 'default' | 'compact';
};
/** 홈 콘텐츠 영역과 반응형 제목 및 헤더 액션을 배치합니다. (Arranges a home content region with a responsive title and header actions.) */
export declare function MainSection({
  title,
  titleVariant,
  actionSlot,
  children,
  className,
  contentWidth,
  spacing,
}: MainSectionProps): import('react').JSX.Element;
