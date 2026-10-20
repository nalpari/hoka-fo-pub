'use client';

import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { useState } from 'react';
import Image from 'next/image';
import { css } from 'styled-system/css';
import { Box, HStack, Stack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Typography } from '@/shared/components/atoms/Typography/Typography';

export type StoreResult = {
  name: string;
  address: string;
  phone: string;
  hours?: string;
};

const mapImage = css({
  position: 'absolute',
  w: '105.36%',
  h: '439.32%',
  top: '-168.95%',
  left: '-0.09%',
  maxW: 'none',
});

export function StoreResults({ stores }: { stores: readonly StoreResult[] }) {
  const [openedMap, setOpenedMap] = useState<string | null>('영등포 타임스퀘어점');

  if (stores.length === 0) {
    return (
      <Box py="16" textAlign="center">
        <Typography web="body4" mo="body4" tone="tertiary">
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
            title={<>{store.name}</>}
            headerProps={{
              titleAs: 'h3',
              titleProps: { web: 'heading9', mo: 'heading9', weight: 'semibold' },
            }}
          >
            <Stack gap="1">
              <Typography web="body5" mo="body5" tone="tertiary">
                {store.address}
              </Typography>
              <HStack gap="1">
                <Typography web="body5" mo="body5" tone="tertiary">
                  전화번호:
                </Typography>
                <Typography web="body5" mo="body5">
                  {store.phone}
                </Typography>
              </HStack>
              {store.hours && (
                <HStack gap="1">
                  <Typography web="body5" mo="body5" tone="tertiary">
                    운영시간:
                  </Typography>
                  <Typography web="body5" mo="body5">
                    {store.hours}
                  </Typography>
                </HStack>
              )}
            </Stack>
            {isOpen && (
              <Box
                position="relative"
                w="100%"
                h={{ base: '422px', _mobile: '174px' }}
                overflow="hidden"
                aria-label={`${store.name} 지도 미리보기`}
              >
                <Image
                  src="/images/store-finder/map-preview.png"
                  alt=""
                  width={1170}
                  height={2532}
                  className={mapImage}
                  unoptimized
                />
                <Box position="absolute" inset="0" bg="rgba(0, 0, 0, 0.5)" />
                <Box position="absolute" inset="0" display="grid" placeItems="center">
                  <Typography web="body4" mo="body4" tone="inverse">
                    API 지도 노출 영역
                  </Typography>
                </Box>
              </Box>
            )}
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
          </ContentSection>
        );
      })}
    </Stack>
  );
}
