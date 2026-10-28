// Type-only contracts for moved local components; never import these declarations as runtime values.
import { type ReactNode } from 'react';
import { type HomeCarouselSectionProps as ImportedHomeCarouselSectionProps } from '@/components/common/molecules/HomeCarouselSection/HomeCarouselSection';
import { type MainSectionProps } from '@/types/component-contracts/components-common-molecules-MainSection-MainSection';
import { type Platform } from '@/lib/device';
type Props = Pick<
  ImportedHomeCarouselSectionProps,
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
declare function HomeCarouselRail({
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
export type HomeCarouselSectionProps = {
  children: ReactNode;
  itemCount: number;
  platform: Platform;
  /** Mobile slide sizing; desktop sizing is derived from the central content grid. */
  slideClassName?: string;
  title: string;
  titleVariant?: MainSectionProps['titleVariant'];
  beforeViewport?: ReactNode;
  desktopCenteredItemCount: number;
  desktopItemGutter: number;
  mobileItemGutter: number;
  railClassName?: string;
  mobileRail?: 'default' | 'bleed';
  spacing?: 'default' | 'compact';
  /** Remounts the viewport (and resets its position) when this changes. */
  viewportKey?: string;
};
/** Home content rail with a shared responsive carousel frame and controls. */
export declare function HomeCarouselSection({
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
}: HomeCarouselSectionProps): import('react').JSX.Element;
export { HomeCarouselRail };
