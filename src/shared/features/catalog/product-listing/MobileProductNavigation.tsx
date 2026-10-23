import { Box, HStack } from 'styled-system/jsx';
import { Icon } from '@/shared/components/atoms/Icon/Icon';
import { IconButton } from '@/shared/components/atoms/IconButton/IconButton';
import { useScrollPin } from '@/shared/lib/useScrollPin';
import { MobileCategoryTabs } from './MobileCategoryTabs';

type MobileProductNavigationProps = {
  activity: string;
  onActivityChange: (activity: string) => void;
  onOpenFilters: () => void;
};

/** Keep the activity rail and filter action together below the mobile GNB. */
export function MobileProductNavigation({
  activity,
  onActivityChange,
  onOpenFilters,
}: MobileProductNavigationProps) {
  const { markerRef, pinned } = useScrollPin();

  return (
    <Box h="9">
      <Box ref={markerRef} h="1px" mb="-1px" scrollMarginTop="var(--layout-site-header-height)" />
      <HStack
        as="nav"
        aria-label="상품 목록 탐색"
        pos={pinned ? 'fixed' : 'relative'}
        top={pinned ? 'var(--layout-site-header-height)' : undefined}
        insetInline={pinned ? '0' : undefined}
        zIndex="10"
        h="9"
        px="4"
        gap={pinned ? '3' : '0'}
        bg="var(--hoka-white)"
        borderBottom={pinned ? '1px solid token(colors.black.20)' : undefined}
      >
        <MobileCategoryTabs activity={activity} onChange={onActivityChange} />
        {pinned && (
          <IconButton
            aria-label="상품 필터 열기"
            aria-haspopup="dialog"
            size={36}
            onClick={onOpenFilters}
          >
            <Icon name="filter" />
          </IconButton>
        )}
      </HStack>
    </Box>
  );
}
