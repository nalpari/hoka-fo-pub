'use client';

import { useEffect, useRef, useState } from 'react';
import { ProductInformation } from '@/shared/components/organisms/Product/ProductDetailSections/ProductInformation';
import { ProductInquiry } from '@/shared/components/organisms/Product/ProductDetailSections/ProductInquiry';
import { ProductReviews } from '@/shared/components/organisms/Product/ProductDetailSections/ProductReviews';
import { SizeGuideTable } from '@/shared/components/organisms/Product/ProductDetailSections/SizeGuideTable';
import { css, cva } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

const tabBar = css({
  position: 'sticky',
  top: 'var(--layout-site-header-height)',
  zIndex: '2',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  borderTop: '1px solid var(--color-black-100)',
  borderBottom: '1px solid var(--color-black-100)',
  bg: 'var(--color-white-000)',
});
const tab = cva({
  base: {
    position: 'relative',
    minW: '0',
    w: '100%',
    minH: { base: '58px', _mobile: '48px' },
    px: { base: '3', _mobile: '1' },
    border: '0',
    borderRight: { base: '1px solid var(--color-black-20)', _mobile: '0' },
    bg: 'var(--color-white-000)',
    color: 'var(--color-text-muted)',
    fontSize: { _mobile: '12' },
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    _focusVisible: {
      zIndex: '1',
      outline: '2px solid var(--color-black-100)',
      outlineOffset: '-2px',
    },
  },
  variants: {
    active: {
      true: {
        color: 'var(--color-black-100)',
        _after: {
          position: 'absolute',
          right: '0',
          bottom: '-1px',
          left: '0',
          h: '3px',
          bg: 'var(--color-black-100)',
          content: '""',
        },
      },
      false: {},
    },
  },
});

const desktopTabTitle = css({ _mobile: { display: 'none' } });

const mobileTabTitle = css({ display: 'none', _mobile: { display: 'inline' } });

const sections = [
  { id: 'product-information', title: '상품정보', mobileTitle: '상품정보', description: '' },
  {
    id: 'size-guide',
    title: '사이즈',
    mobileTitle: '사이즈',
    description: '사이즈 선택에 필요한 가이드와 제품 치수를 안내합니다.',
  },
  {
    id: 'reviews',
    title: '상품리뷰 (12)',
    mobileTitle: '리뷰',
    description: '구매 고객의 착용 후기와 평점을 확인할 수 있습니다.',
  },
  { id: 'inquiries', title: '상품문의', mobileTitle: '문의', description: '' },
] as const;

type SectionId = (typeof sections)[number]['id'];

type ProductDetailSectionsProps = {
  hasSizeGuide?: boolean;
};

export function ProductDetailSections({ hasSizeGuide = true }: ProductDetailSectionsProps) {
  const [activeId, setActiveId] = useState<SectionId>(sections[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const visibleSections = hasSizeGuide
    ? sections
    : sections.filter((section) => section.id !== 'size-guide');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visibleSections[0]) setActiveId(visibleSections[0].target.id as SectionId);
      },
      { rootMargin: '-140px 0px -55% 0px', threshold: 0 },
    );
    Object.values(sectionRefs.current).forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, [hasSizeGuide]);
  const scrollToSection = (id: SectionId) => {
    setActiveId(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box as="section" mt={{ base: '64px', _mobile: '35px' }} aria-label="상품 상세 정보">
      <Grid className={tabBar} role="tablist" aria-label="상품 상세 메뉴">
        {visibleSections.map((section) => (
          <Button
            aria-controls={section.id}
            aria-selected={activeId === section.id}
            className={tab({ active: activeId === section.id })}
            id={`${section.id}-tab`}
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            role="tab"
          >
            <span className={desktopTabTitle}>{section.title}</span>
            <span className={mobileTabTitle}>{section.mobileTitle}</span>
          </Button>
        ))}
      </Grid>
      <Box minW="0">
        {visibleSections.map((section) => (
          <article
            aria-labelledby={`${section.id}-tab`}
            className={css({
              minH: { base: '520px', _mobile: '400px' },
              py: { base: '72px', _mobile: '48px' },
              scrollMarginTop: { base: '150px', _mobile: '125px' },
              borderBottom: '1px solid var(--color-black-20)',
              '& h2': { m: '0 0 18px', fontSize: { base: '28', _mobile: '24' } },
              '& > p': {
                maxW: '620px',
                m: '0',
                color: 'var(--color-text-muted)',
                lineHeight: 'body',
              },
            })}
            id={section.id}
            key={section.id}
            ref={(element) => {
              sectionRefs.current[section.id] = element;
            }}
            role="tabpanel"
            tabIndex={-1}
          >
            <h2>{section.title}</h2>
            {section.id === 'product-information' ? (
              <ProductInformation />
            ) : (
              <p>{section.description}</p>
            )}
            {section.id === 'size-guide' && <SizeGuideTable />}
            {section.id === 'reviews' && <ProductReviews />}
            {section.id === 'inquiries' && <ProductInquiry />}
          </article>
        ))}
      </Box>
    </Box>
  );
}
