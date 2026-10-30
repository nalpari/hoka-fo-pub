import { HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import type { StoreResult } from '@/types/component-contracts/app-support-store-page';

/** 매장명과 주소·연락처·영업시간을 목록으로 표시합니다. (Displays store names, addresses, contact details, and hours.) */
export function StoreResults({ stores }: { stores: readonly StoreResult[] }) {
  return (
    <Stack as="ul" m="0" p="0" listStyleType="none">
      {stores.map((store) => (
        <ContentSection
          as="li"
          key={store.name}
          gap="3"
          px={{ base: '4', _mobile: '0' }}
          py="6"
          borderBottom="1px solid"
          borderColor="black.20"
          title={store.name}
          headerProps={{
            titleAs: 'h3',
            titleProps: { variant: 'heading9', weight: 'semibold' },
          }}
        >
          <Stack gap="1">
            <Typography variant="body5" tone="tertiary">
              {store.address}
            </Typography>
            <HStack gap="1">
              <Typography variant="body5" tone="tertiary">
                전화번호:
              </Typography>
              <Typography variant="body5">{store.phone}</Typography>
            </HStack>
            {store.hours && (
              <HStack gap="1">
                <Typography variant="body5" tone="tertiary">
                  운영시간:
                </Typography>
                <Typography variant="body5">{store.hours}</Typography>
              </HStack>
            )}
          </Stack>
        </ContentSection>
      ))}
    </Stack>
  );
}
