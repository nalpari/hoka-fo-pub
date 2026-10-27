import { ContentHeader } from '@/shared/components/molecules/ContentHeader/ContentHeader';
import { css } from 'styled-system/css';
import { contentFrame } from 'styled-system/patterns';
import type { MainSectionProps } from './MainSection';

type Props = Pick<MainSectionProps, 'title' | 'titleVariant' | 'actionSlot'>;

const heading = css({ m: '0' });

/** 섹션 제목과 액션을 콘텐츠 그리드에 맞춥니다. (Aligns the section title and actions to the content grid.) */
export function MainSectionHeader({ title, titleVariant, actionSlot }: Props) {
  return (
    <ContentHeader
      title={title}
      titleProps={{
        className: heading,
        web: titleVariant ?? 'heading5',
        mo: titleVariant ?? 'heading4',
      }}
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
