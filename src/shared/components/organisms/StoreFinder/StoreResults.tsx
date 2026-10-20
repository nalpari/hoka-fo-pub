'use client';

import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { useState } from 'react';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { StoreMapPreview } from './StoreMapPreview';

export type StoreResult = {
  name: string;
  address: string;
  phone: string;
  hours?: string;
};

export function StoreResults({ stores }: { stores: readonly StoreResult[] }) {
  const [openedMap, setOpenedMap] = useState<string | null>('영등포 타임스퀘어점');

  if (stores.length === 0) {
    return (
      <Box py="16" textAlign="center">
        <Typography variant="body4" tone="tertiary">
          등록된 매장이 없습니다.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack as="ul" m="0" p="0" listStyleType="none">
      {stores.map((store) => {
        const isOpen = openedMap === store.name;

        return (
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
            footer={
              <Box>
                <Button
                  type="button"
                  size="short"
                  variant={isOpen ? 'secondary' : 'primary'}
                  onClick={() => setOpenedMap(isOpen ? null : store.name)}
                  aria-expanded={isOpen}
                >
                  길 찾기
                </Button>
              </Box>
            }
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
            {isOpen && <StoreMapPreview storeName={store.name} />}
          </ContentSection>
        );
      })}
    </Stack>
  );
}
