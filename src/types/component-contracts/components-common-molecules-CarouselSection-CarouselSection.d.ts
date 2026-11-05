// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type ReactNode } from 'react';
import { type Platform } from '@/context/platform';

import { type CarouselSectionProps as ImportedCarouselSectionProps } from '@/components/common/molecules/CarouselSection';

import { type MainSectionProps } from '@/types/component-contracts/components-common-layouts-MainSection';
type Props = Pick<
  ImportedCarouselSectionProps,
  | 'children'
  | 'itemCount'
  | 'platform'
  | 'desktopCenteredItemCount'
  | 'desktopItemGutter'
  | 'mobileItemGutter'
  | 'slideClassName'
  | 'railClassName'
  | 'mobileRail'
  | 'viewportKey'
>;
/** Own card sizing, terminal spacing, and the responsive carousel viewport. */
declare function CarouselSectionRail({
  children,
  itemCount,
  platform,
  desktopCenteredItemCount,
  desktopItemGutter,
  mobileItemGutter,
  slideClassName,
  railClassName,
  mobileRail,
  viewportKey,
}: Props): import('react').JSX.Element;
export type CarouselSectionProps = {
  className?: string;
  children: ReactNode;
  itemCount: number;
  platform: Platform;
  /** Mobile slide sizing; desktop sizing is derived from the central content grid. */
  slideClassName?: string;
  title: string;
  titleVariant?: MainSectionProps['titleVariant'];
  tabs?: ReactNode;
  beforeViewport?: ReactNode;
  desktopCenteredItemCount: number;
  desktopItemGutter: number;
  mobileItemGutter: number;
  railClassName?: string;
  mobileRail?: 'default' | 'bleed';
  spacing?: MainSectionProps['spacing'];
  /** Remounts the viewport (and resets its position) when this changes. */
  viewportKey?: string;
};
/** Home content rail with a shared responsive carousel frame and controls. */
export declare function CarouselSection({
  className,
  children,
  itemCount,
  platform,
  slideClassName,
  title,
  titleVariant,
  beforeViewport,
  desktopCenteredItemCount,
  desktopItemGutter,
  mobileItemGutter,
  railClassName,
  mobileRail,
  spacing,
  viewportKey,
}: CarouselSectionProps): import('react').JSX.Element;
export { CarouselSectionRail };
