'use client';

import Image from 'next/image';

import { useState } from 'react';

import { css } from 'styled-system/css';
import { Box, Grid, HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { SupportTabs } from '@/components/common/molecules/SupportTabs';

import { ContentSection } from '@/components/common/layouts/ContentSection';
import { CustomerCenterLayout } from '@/components/common/layouts/CustomerCenterLayout';

import { storeCities, storesByCity } from '@/components/store-finder/store.data';
import { supportNavigation } from '@/components/support/support.navigation';

/** Keeps the existing map sample undistorted within the PC/mobile preview frames. */
function StoreMapPreview({ storeName }: { storeName: string }) {
  return (
    <Box
      pos="relative"
      w="100%"
      h={{ base: '422px', _mobile: '240px' }}
      overflow="hidden"
      aria-label={`${storeName} 지도 미리보기`}
    >
      <Image
        src="/images/store-finder/map-preview.png"
        alt=""
        width={1170}
        height={2532}
        className={css({
          pos: 'absolute',
          w: '105.36%',
          h: 'auto',
          top: '50%',
          left: '-0.09%',
          transform: 'translateY(-50%)',
          maxW: 'none',
        })}
        unoptimized
      />
      <Grid pos="absolute" inset="0" gap="0" placeItems="center" bg="rgba(0, 0, 0, 0.5)">
        <Typography variant="body4" tone="inverse">
          API 지도 노출 영역
        </Typography>
      </Grid>
    </Box>
  );
}

type StoreResult = {
  name: string;
  address: string;
  phone: string;
  hours?: string;
};

function StoreResults({ stores }: { stores: readonly StoreResult[] }) {
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

const tabs = storeCities.map((city) => ({
  value: city,
  label: city,
  content: <StoreResults stores={storesByCity[city]} />,
}));

/** 매장 검색 조건과 검색 결과를 관리합니다. (Manages store search filters and results.) */
export default function Page() {
  return (
    <CustomerCenterLayout
      title="매장 찾기"
      mobileTitleVariant="heading5"
      activePath="/support/store"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: '고객센터', href: '/support' },
        { label: '매장찾기' },
      ]}
      groups={supportNavigation}
    >
      <Stack gap="6" mt="6">
        <SupportTabs ariaLabel="매장 지역" defaultValue="서울" tabs={tabs} />
      </Stack>
    </CustomerCenterLayout>
  );
}
