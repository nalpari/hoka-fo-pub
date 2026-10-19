import type { ComponentProps, ReactNode } from 'react';
import { Box, HStack } from 'styled-system/jsx';
import { Button, ButtonLink } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'short' | 'tall';
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
  counter,
  containerProps,
}: Props) {
  const content = counter ? (
    <HStack gap="1" justifyContent="center">
      <Typography variant="cta2" weight="semibold">
        {children}
      </Typography>
      <Typography variant="body5" tone="tertiary">
        ({counter.current}/{counter.total})
      </Typography>
    </HStack>
  ) : (
    children
  );

  return (
    <Box pt="9" maxW="500px" mx="auto" {...containerProps}>
      {href ? (
        <ButtonLink href={href} variant={variant} size={size} fullWidth>
          {content}
        </ButtonLink>
      ) : (
        <Button variant={variant} size={size} fullWidth onClick={onClick}>
          {content}
        </Button>
      )}
    </Box>
  );
}
