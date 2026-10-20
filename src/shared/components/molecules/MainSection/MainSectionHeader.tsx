import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { css } from 'styled-system/css';
import { contentFrame } from 'styled-system/patterns';
import type { MainSectionProps } from './MainSection';

type Props = Pick<MainSectionProps, 'title' | 'titleVariant' | 'actionSlot'>;

const heading = css({ m: '0' });

/** Keep the section heading and actions aligned to the central content grid. */
export function MainSectionHeader({ title, titleVariant, actionSlot }: Props) {
  return (
    <ContentHeader
      title={title}
      titleProps={{ className: heading, variant: titleVariant }}
      orientation="horizontal"
      gap="8px"
      action={actionSlot}
      className={contentFrame({
        mobileWidth: 'calc(100% - var(--layout-mobile-content-inline-space))',
      })}
      mx="auto"
    />
  );
}
