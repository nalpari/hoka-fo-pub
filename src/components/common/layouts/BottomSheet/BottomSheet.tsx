import { Drawer } from '@base-ui/react/drawer';
import { cloneElement, type ReactElement, type ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { type ButtonProps } from '@/components/common/atoms/Button/Button';
import { Icon } from '@/components/common/atoms/Icon/Icon';
import { IconButton } from '@/components/common/atoms/IconButton/IconButton';
import { Typography } from '@/components/common/atoms/Typography/Typography';

import { usePlatform } from '@/context/platform';

type BottomSheetContentProps = {
  children: ReactNode;
};

function BottomSheetContent({ children }: BottomSheetContentProps) {
  return (
    <Box minH="0" flex="0 1 auto" overflowY="auto" overscrollBehaviorY="contain" px="6" pb="8">
      {children}
    </Box>
  );
}

const footer = css({
  flexShrink: '0',
  p: 'var(--layout-mobile-inline-gutter) var(--layout-mobile-inline-gutter) calc(var(--layout-mobile-inline-gutter) + env(safe-area-inset-bottom))',
  borderTopWidth: '1px',
  borderTopStyle: 'solid',
  borderTopColor: 'var(--color-black-20)',
});

type BottomSheetFooterProps = {
  children: ReactElement<ButtonProps>;
};

function BottomSheetFooter({ children }: BottomSheetFooterProps) {
  return (
    <footer className={footer}>{cloneElement(children, { size: 'tall', fullWidth: true })}</footer>
  );
}

type BottomSheetTitleProps = {
  children: ReactNode;
};

function BottomSheetTitle({ children }: BottomSheetTitleProps) {
  return (
    <Typography as="h2" variant="body3">
      {children}
    </Typography>
  );
}

type BottomSheetHeaderProps = {
  action?: ReactNode;
  onClose?: () => void;
  title: ReactNode;
};

function BottomSheetHeader({ action, onClose, title }: BottomSheetHeaderProps) {
  return (
    <HStack
      as="header"
      flexShrink="0"
      justifyContent="space-between"
      pt="6"
      pb="6"
      px="6"
      gap="2.5"
    >
      <BottomSheetTitle>{title}</BottomSheetTitle>
      {action && <HStack gap="2.5">{action}</HStack>}
      {onClose && (
        <IconButton aria-label="닫기" onClick={onClose} size="15px">
          <Icon name="close" size="15px" />
        </IconButton>
      )}
    </HStack>
  );
}

const backdrop = css({
  position: 'fixed',
  inset: '0',
  zIndex: '110',
  bg: 'color-mix(in srgb, var(--color-black-100) 48%, transparent)',
});

const viewport = css({
  position: 'fixed',
  inset: '0',
  zIndex: '110',
  display: 'flex',
  alignItems: 'flex-end',
});

const popup = css({
  w: '100%',
  minW: '0',
});

type BottomSheetProps = {
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactElement<ButtonProps>;
  headerAction?: ReactNode;
  ariaLabel?: string;
};

/** 모바일 작업을 위한 하단 모달을 구성합니다 (A modal sheet anchored to the viewport bottom for mobile workflows). */
export function BottomSheet({
  title,
  children,
  onClose,
  footer,
  headerAction,
  ariaLabel,
}: BottomSheetProps) {
  const platform = usePlatform();

  return (
    <Drawer.Root open onOpenChange={(open) => !open && onClose()} swipeDirection="down">
      <Drawer.Portal className={`platform-${platform}`}>
        <Drawer.Backdrop className={backdrop} />
        <Drawer.Viewport className={viewport}>
          <Drawer.Popup aria-label={ariaLabel} className={popup}>
            <Stack
              gap="0"
              maxH="calc(100dvh - 44px)"
              overflow="hidden"
              borderRadius="16px 16px 0 0"
              bg="var(--color-white-000)"
              boxShadow="0 -12px 32px color-mix(in srgb, var(--color-black-100) 18%, transparent)"
            >
              <BottomSheetHeader action={headerAction} onClose={onClose} title={title} />
              <BottomSheetContent>{children}</BottomSheetContent>
              {footer && <BottomSheetFooter>{footer}</BottomSheetFooter>}
            </Stack>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
