'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { css } from 'styled-system/css';
import { Box, Grid, Stack } from 'styled-system/jsx';
import type { Product } from '@/mocks/products';
import { Accordion } from '@/shared/components/atoms/Accordion/Accordion';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { ProductDetailInquiryContent } from './ProductDetailInquiryContent';
import { ProductDetailDeliveryContent } from './ProductDetailDeliveryContent';
import { ProductDetailReturnGuide } from './ProductDetailReturnGuide';
import { ProductTechSpecs } from './ProductTechSpecs';
import { ProductDetailEditorial } from './ProductDetailEditorial';

const styles = {
  destination: css({
    scrollMarginTop:
      'calc(var(--layout-site-header-height) + var(--product-detail-nav-height) + 24px)',
  }),
  navigation: css({
    position: 'sticky',
    top: 'var(--layout-site-header-height)',
    zIndex: '5',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    borderBottom: '1px solid var(--color-black-20)',
    bg: 'var(--hoka-white)',
  }),
  link: css({
    textAlign: 'center',
    py: '5',
    color: 'inherit',
    textDecoration: 'none',
    borderBottom: '2px solid transparent',
    '&[aria-current="location"]': { borderBottomColor: 'var(--color-black-100)' },
    _focusVisible: { outline: '2px solid var(--color-focus-ring)' },
  }),
  placeholder: css({
    display: 'grid',
    placeItems: 'center',
    aspectRatio: '2 / 1',
    bg: 'var(--color-black-10)',
    p: '8',
    textAlign: 'center',
  }),
  supportItem: css({ py: '6', borderBottom: '1px solid var(--color-black-20)' }),
};

const destinations = [
  { id: 'product-details', label: '상품 정보' },
  { id: 'product-reviews', label: '리뷰' },
  { id: 'product-inquiries', label: '상품 문의' },
];

export function ProductDetailSections({ product }: { product: Product }) {
  const [activeSection, setActiveSection] = useState('product-details');
  const [navigationHeight, setNavigationHeight] = useState(64);
  const rootRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const navigation = navigationRef.current;
    if (!root || !navigation) return;

    const sections = destinations.map(({ id }) => root.querySelector<HTMLElement>(`#${id}`));
    let frame = 0;

    const update = () => {
      frame = 0;
      const boundary = navigation.getBoundingClientRect().bottom + 24;
      let current = destinations[0].id;

      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= boundary + 1) {
          current = destinations[index].id;
        }
      });
      setActiveSection(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(() => {
      setNavigationHeight(navigation.getBoundingClientRect().height);
      scheduleUpdate();
    });
    observer.observe(navigation);
    observer.observe(root);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    scheduleUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      cancelAnimationFrame(frame);
    };
  }, []);

  const layoutStyle = {
    '--product-detail-nav-height': `${navigationHeight}px`,
  } as CSSProperties;

  return (
    <Stack gap="10" ref={rootRef} style={layoutStyle}>
      <nav ref={navigationRef} aria-label="상품 상세 정보" className={styles.navigation}>
        {destinations.map((destination) => (
          <a
            key={destination.id}
            href={`#${destination.id}`}
            className={styles.link}
            aria-current={activeSection === destination.id ? 'location' : undefined}
          >
            <Typography variant="body3">{destination.label}</Typography>
          </a>
        ))}
      </nav>
      <Stack gap="96px">
        <Box id="product-details" className={styles.destination}>
          <ProductTechSpecs product={product} />
        </Box>
        {product.styleCode === 'HOKADFG34S' && <ProductDetailEditorial />}
        <Box className={styles.placeholder}>
          <Typography variant="heading8">상세페이지 영역 (이미지세트 &amp; IMC)</Typography>
        </Box>
        <ContentSection
          id="product-reviews"
          className={styles.destination}
          title={`리뷰 (${product.reviewCount})`}
          headerProps={{ titleAs: 'h2', titleProps: { variant: 'heading8' } }}
          gap="6"
        >
          <Box className={styles.placeholder}>
            <Typography variant="heading8">크리마 영역 · 가로 1016px</Typography>
          </Box>
        </ContentSection>
        <Box id="product-inquiries" className={styles.destination}>
          <ProductDetailInquiryContent />
        </Box>
        <Accordion
          indicatorSize="13px"
          itemClassName={styles.supportItem}
          items={[
            {
              value: 'notice',
              title: <Typography variant="heading9">상품 고시 정보</Typography>,
              content: (
                <Grid as="dl" gridTemplateColumns="120px 1fr" gap="4" py="6">
                  <Typography as="dt" variant="body3">
                    상품명
                  </Typography>
                  <Typography as="dd" variant="body3">
                    {product.name}
                  </Typography>
                  <Typography as="dt" variant="body3">
                    품번
                  </Typography>
                  <Typography as="dd" variant="body3">
                    {product.styleCode ?? '상품별 표기 참조'}
                  </Typography>
                </Grid>
              ),
            },
            {
              value: 'delivery',
              title: <Typography variant="heading9">배송 및 반품</Typography>,
              content: <ProductDetailDeliveryContent />,
            },
            {
              value: 'returns',
              title: <Typography variant="heading9">반품 정책</Typography>,
              content: <ProductDetailReturnGuide />,
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}
