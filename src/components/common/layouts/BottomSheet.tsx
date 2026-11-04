import { Drawer } from '@base-ui/react/drawer';
import { cloneElement, type ReactElement, type ReactNode, useState } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';

import { Button, type ButtonProps } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

type BottomSheetContentProps = {
  appearance: 'default' | 'catalog';
  children: ReactNode;
};

function BottomSheetContent({ appearance, children }: BottomSheetContentProps) {
  return (
    <Box
      minH="0"
      flex="0 1 auto"
      overflowY="auto"
      overscrollBehaviorY="contain"
      px={appearance === 'catalog' ? '4' : '6'}
      pb="8"
      css={
        appearance === 'catalog'
          ? { scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }
          : undefined
      }
    >
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
  appearance: 'default' | 'catalog';
  children: ReactNode;
};

function BottomSheetTitle({ appearance, children }: BottomSheetTitleProps) {
  return (
    <Typography
      as="h2"
      variant="body3"
      className={
        appearance === 'catalog'
          ? css({ '&&': { fontSize: '20px', fontWeight: 'semibold', lineHeight: '1.2' } })
          : undefined
      }
    >
      {children}
    </Typography>
  );
}

type BottomSheetHeaderProps = {
  appearance: 'default' | 'catalog';
  action?: ReactNode;
  onClose?: () => void;
  title: ReactNode;
};

function BottomSheetHeader({ appearance, action, onClose, title }: BottomSheetHeaderProps) {
  return (
    <HStack
      as="header"
      flexShrink="0"
      justifyContent="space-between"
      pt={appearance === 'catalog' ? '26px' : '6'}
      pb="6"
      px={appearance === 'catalog' ? '4' : '6'}
      gap="2.5"
    >
      <BottomSheetTitle appearance={appearance}>{title}</BottomSheetTitle>
      {action && <HStack gap="2.5">{action}</HStack>}
      {onClose && (
        <Button
          variant="icon"
          aria-label="닫기"
          onClick={onClose}
          size={appearance === 'catalog' ? '24px' : '24px'}
        >
          <Icon
            name={appearance === 'catalog' ? 'xmark-regular' : 'xmark-regular'}
            size={appearance === 'catalog' ? '24px' : '24px'}
          />
        </Button>
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
  /** 상품 목록 필터 시안의 여백·제목·모서리를 선택합니다. */
  appearance?: 'default' | 'catalog';
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactElement<ButtonProps>;
  headerAction?: ReactNode;
  ariaLabel?: string;
};

/** 모바일 작업을 위한 하단 모달을 구성합니다 (A modal sheet anchored to the viewport bottom for mobile workflows). */
export function BottomSheet({
  appearance = 'default',
  title,
  children,
  onClose,
  footer,
  headerAction,
  ariaLabel,
}: BottomSheetProps) {
  const platform = usePlatform();
  const [openingElement] = useState(() =>
    appearance === 'catalog' &&
    typeof document !== 'undefined' &&
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null,
  );

  return (
    <Drawer.Root open onOpenChange={(open) => !open && onClose()} swipeDirection="down">
      <Drawer.Portal className={`platform-${platform}`}>
        <Drawer.Backdrop
          className={[
            backdrop,
            appearance === 'catalog' ? css({ bg: 'rgba(0, 0, 0, 0.5)' }) : undefined,
          ]
            .filter(Boolean)
            .join(' ')}
        />
        <Drawer.Viewport className={viewport}>
          <Drawer.Popup
            aria-label={ariaLabel}
            className={popup}
            finalFocus={appearance === 'catalog' ? () => openingElement : undefined}
          >
            <Stack
              gap="0"
              maxH={appearance === 'catalog' ? 'calc(100dvh - 104px)' : 'calc(100dvh - 44px)'}
              overflow="hidden"
              borderRadius={appearance === 'catalog' ? '24px 24px 0 0' : '16px 16px 0 0'}
              bg="var(--color-white-000)"
              boxShadow="0 -12px 32px color-mix(in srgb, var(--color-black-100) 18%, transparent)"
            >
              <BottomSheetHeader
                appearance={appearance}
                action={headerAction}
                onClose={onClose}
                title={title}
              />
              <BottomSheetContent appearance={appearance}>{children}</BottomSheetContent>
              {footer && <BottomSheetFooter>{footer}</BottomSheetFooter>}
            </Stack>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
