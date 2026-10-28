// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type MainSectionProps as ImportedMainSectionProps } from '@/components/common/molecules/MainSection/MainSection';
import { type ReactNode } from 'react';
import { type TypographyVariant } from '@/components/common/atoms/Typography/Typography';
type Props = Pick<ImportedMainSectionProps, 'title' | 'titleVariant' | 'actionSlot'>;
/** 섹션 제목과 액션을 콘텐츠 그리드에 맞춥니다. (Aligns the section title and actions to the content grid.) */
declare function MainSectionHeader({
  title,
  titleVariant,
  actionSlot,
}: Props): import('react').JSX.Element;
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
export { MainSectionHeader };
