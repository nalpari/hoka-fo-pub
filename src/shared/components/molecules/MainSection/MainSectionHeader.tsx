import { HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { contentFrame } from 'styled-system/patterns';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { MainSectionProps } from './MainSection';

type Props = Pick<MainSectionProps, 'title' | 'titleVariant' | 'actionSlot'>;

const heading = css({ m: '0' });

/** Keep the section heading and actions aligned to the central content grid. */
export function MainSectionHeader({ title, titleVariant, actionSlot }: Props) {
  return (
    <HStack
      className={contentFrame({
        mobileWidth: 'calc(100% - var(--layout-mobile-content-inline-space))',
      })}
      mx="auto"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography as="h2" className={heading} variant={titleVariant}>
        {title}
      </Typography>
      {actionSlot}
    </HStack>
  );
}
