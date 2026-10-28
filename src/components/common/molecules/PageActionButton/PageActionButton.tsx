import type { ComponentProps, ReactNode } from 'react';
import { Box } from 'styled-system/jsx';
import { Button, ButtonLink } from '@/components/common/atoms/Button/Button';
import {
  LoadMoreButton,
  LoadMoreButtonContent,
} from '@/components/common/atoms/LoadMoreButton/LoadMoreButton';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'short' | 'tall';
  width?: 'default' | 'compact' | 'narrow';
  counter?: { current: number; total: number };
  containerProps?: Pick<ComponentProps<typeof Box>, 'mt' | 'pt' | '_mobile'>;
};

/** Centered page action with an optional load-more page counter. */
export function PageActionButton({
  children,
  href,
  onClick,
  variant = 'secondary',
  size = 'short',
  width = 'default',
  counter,
  containerProps,
}: Props) {
  const content = counter ? <LoadMoreButtonContent counter={counter} label={children} /> : children;

  return (
    <Box
      pt="9"
      w="100%"
      maxW={width === 'compact' ? '180px' : width === 'narrow' ? '160px' : '500px'}
      mx="auto"
      {...containerProps}
      _mobile={{ maxW: width === 'default' ? '500px' : 'none', ...containerProps?._mobile }}
    >
      {href ? (
        <ButtonLink href={href} variant={variant} size={size} fullWidth>
          {content}
        </ButtonLink>
      ) : counter ? (
        <LoadMoreButton
          counter={counter}
          label={children}
          variant={variant}
          size={size}
          fullWidth
          onClick={onClick}
        />
      ) : (
        <Button variant={variant} size={size} fullWidth onClick={onClick}>
          {content}
        </Button>
      )}
    </Box>
  );
}
