import { HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import type { MainSectionProps } from './MainSection';

type Props = Pick<MainSectionProps, 'title' | 'titleVariant' | 'actionSlot'>;

const heading = css({ m: '0' });

/** Keep the section heading and actions aligned to the central content grid. */
export function MainSectionHeader({ title, titleVariant, actionSlot }: Props) {
  return (
    <HStack
      w="min(calc(100% - var(--layout-web-content-inline-space)), var(--layout-web-content-max-width))"
      mx="auto"
      justifyContent="space-between"
      alignItems="center"
      _mobile={{ w: 'calc(100% - var(--layout-mobile-content-inline-space))' }}
    >
      <Typography as="h2" className={heading} variant={titleVariant}>
        {title}
      </Typography>
      {actionSlot}
    </HStack>
  );
}
