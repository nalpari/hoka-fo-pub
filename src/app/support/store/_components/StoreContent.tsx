import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import type { StoreResult } from '@/types/component-contracts/app-support-store-page';

const styles = {
  storeList: css.raw({
    m: '0',
    py: '0',
    listStyleType: 'none',
    gap: '0',
    px: { base: '0', _mobile: '4' },
  }),
  storeItem: css.raw({
    gap: { base: '5', _mobile: '4' },
    py: { base: '10', _mobile: '8' },
    _first: { pt: { base: '0', _mobile: '8' } },
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#E9EAEB',
  }),
  storeDetails: css.raw({ gap: { base: '3', _mobile: '2' } }),
  contactDetails: css.raw({ gap: { base: '1.5', _mobile: '1' } }),
  contactRow: css.raw({ gap: '2' }),
  body: css({ '&': { lineHeight: '1.5' } }),
  phoneLink: css({
    '&': { lineHeight: '1.5' },
    _mobile: { textDecoration: 'underline', textUnderlineOffset: '2px' },
  }),
};

/** 매장명과 주소·연락처·영업시간을 목록으로 표시합니다. (Displays store names, addresses, contact details, and hours.) */
export function StoreResults({ stores }: { stores: readonly StoreResult[] }) {
  const mobile = usePlatform() === 'mobile';

  return (
    <Stack as="ul" css={styles.storeList}>
      {stores.map((store) => (
        <ContentSection
          as="li"
          key={store.name}
          css={styles.storeItem}
          title={store.name}
          headerProps={{
            titleAs: 'h3',
            titleProps: { web: 'headingKr8', mo: 'headingKr6' },
          }}
        >
          <Stack css={styles.storeDetails}>
            <Typography web="body3" mo="body4" className={styles.body} tone="tertiary">
              {store.address}
            </Typography>
            <Stack css={styles.contactDetails}>
              <HStack css={styles.contactRow}>
                <Typography web="body3" mo="body4" className={styles.body} tone="tertiary">
                  전화번호
                </Typography>
                {mobile ? (
                  <Typography
                    as="a"
                    web="body3"
                    mo="body4"
                    href={store.phoneHref}
                    className={styles.phoneLink}
                  >
                    {store.phone}
                  </Typography>
                ) : (
                  <Typography web="body3" mo="body4" className={styles.body}>
                    {store.phone}
                  </Typography>
                )}
              </HStack>
              {store.hours && (
                <HStack css={styles.contactRow}>
                  <Typography web="body3" mo="body4" className={styles.body} tone="tertiary">
                    운영시간
                  </Typography>
                  <Typography web="body3" mo="body4" className={styles.body}>
                    {store.hours}
                  </Typography>
                </HStack>
              )}
            </Stack>
          </Stack>
        </ContentSection>
      ))}
    </Stack>
  );
}
