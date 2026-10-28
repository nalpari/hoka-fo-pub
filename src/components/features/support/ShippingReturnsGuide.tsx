import type { ReactNode } from 'react';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Typography } from '@/components/common/atoms/Typography/Typography';
import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';

export function ShippingReturnsNumberedList({
  items,
  compact = false,
}: {
  items: readonly ReactNode[];
  compact?: boolean;
}) {
  return (
    <Stack as="ol" gap={compact ? '2' : '4'} m="0" p="0" listStyleType="none">
      {items.map((item, index) => (
        <HStack as="li" key={index} alignItems="flex-start" gap="2">
          <Box flexShrink="0">
            <Typography variant="body4">{index + 1}.</Typography>
          </Box>
          <Typography variant="body4">{item}</Typography>
        </HStack>
      ))}
    </Stack>
  );
}

export function ShippingReturnsBulletList({ items }: { items: readonly ReactNode[] }) {
  return (
    <Stack as="ul" gap="0" pl="2" listStyleType="none">
      {items.map((item, index) => (
        <HStack as="li" key={index} alignItems="flex-start" gap="1">
          <Typography as="span" variant="body4" tone="subtle" aria-hidden="true">
            ・
          </Typography>
          <Typography variant="body4" tone="subtle">
            {item}
          </Typography>
        </HStack>
      ))}
    </Stack>
  );
}

export function ShippingReturnsGuidePanel({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <ContentSection
      title={title}
      headerProps={{ titleAs: 'h3', titleProps: { variant: 'heading9', weight: 'semibold' } }}
      gap="4"
      px={{ base: '4', _mobile: '2' }}
      pt={{ base: '3', _mobile: '4' }}
    >
      {children}
    </ContentSection>
  );
}
