'use client';

import { useEffect, useState } from 'react';

import { css, cx } from 'styled-system/css';
import { Box, Flex, Grid, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

import { specialExhibitionCategories } from './specialExhibition.data';

const hero = css({
  display: 'grid',
  minH: '1080px',
  placeItems: 'center',
  bg: '#f7f7f9',
  _mobile: { minH: '0', aspectRatio: '1' },
});

const pageTitle = css({
  fontFamily: 'var(--font-hoka)',
  fontSize: '32px',
  fontWeight: '900',
  letterSpacing: '0',
  lineHeight: '1.3',
  _mobile: { fontSize: '24px', lineHeight: '1.2' },
});

const tab = css({
  flexShrink: 0,
  border: '0',
  borderRadius: 'full',
  bg: '#e9eaeb',
  color: '#4d4d4d',
  cursor: 'pointer',
  px: '16px',
  py: '12px',
  fontFamily: 'var(--font-pretendard)',
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '1.3',
  letterSpacing: '-0.02em',
  _focusVisible: { outline: '2px solid currentColor', outlineOffset: '3px' },
  _mobile: { px: '14px', py: '6px', fontSize: '12px', lineHeight: '18px' },
});

const activeTab = css({ bg: '#000', color: '#fff', fontWeight: '600' });

const categoryHeading = css({
  _mobile: { px: '16px', '&&': { fontSize: '20px' }, lineHeight: '30px' },
});

/** 기획전의 앵커 카테고리와 고정 상품 목록을 표시합니다. (Displays anchored categories and fixed product listings for a special exhibition.) */
export function SpecialExhibitionContent() {
  const [activeCategory, setActiveCategory] = useState(specialExhibitionCategories[0].id);

  useEffect(() => {
    const sections = specialExhibitionCategories
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const firstVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0];
        if (firstVisible) setActiveCategory(firstVisible.target.id);
      },
      { rootMargin: '-25% 0px -65%', threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const moveToCategory = (id: string) => {
    setActiveCategory(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      <section aria-label="기획전 대표 이미지" className={hero}>
        <Typography as="p" variant="headingKr8" weight="bold">
          기획전 이미지 영역
        </Typography>
      </section>

      <Stack gap="0" pb="96px" _mobile={{ pb: '72px' }}>
        <Box
          maxW="1532px"
          w="calc(100% - 144px)"
          mx="auto"
          pt="88px"
          _mobile={{ w: '100%', px: '16px', pt: '72px' }}
        >
          <Typography as="h1" className={pageTitle}>
            Winter Trail Collection
          </Typography>
        </Box>

        <Box
          pos="sticky"
          top="var(--layout-site-header-height)"
          zIndex="10"
          bg="#fff"
          mt="4px"
          py="20px"
          _mobile={{
            top: 'var(--layout-site-header-height)',
            mt: '8px',
            overflowX: 'auto',
            py: '16px',
            pl: '16px',
          }}
        >
          <Flex
            maxW="1532px"
            w="calc(100% - 144px)"
            mx="auto"
            gap="8px"
            _mobile={{ w: 'max-content', gap: '6px', mx: '0' }}
          >
            {specialExhibitionCategories.map((category) => {
              const selected = activeCategory === category.id;
              return (
                <Button
                  aria-controls={category.id}
                  aria-pressed={selected}
                  className={cx(tab, selected && activeTab)}
                  key={category.id}
                  onClick={() => moveToCategory(category.id)}
                  type="button"
                  variant="unstyled"
                >
                  {category.title}
                </Button>
              );
            })}
          </Flex>
        </Box>

        <Stack
          maxW="1532px"
          w="calc(100% - 144px)"
          mx="auto"
          gap="96px"
          pt="20px"
          _mobile={{ w: '100%', gap: '72px', pt: '8px' }}
        >
          {specialExhibitionCategories.map((category) => (
            <section
              id={category.id}
              key={category.id}
              className={css({ scrollMarginTop: '160px' })}
            >
              <Stack gap="24px" _mobile={{ gap: '14px' }}>
                <Typography as="h2" className={categoryHeading} variant="headingKr8" weight="black">
                  {category.title}
                </Typography>
                <Grid
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  css={{
                    '@media (min-width: 1920px)': {
                      '.platform-web &': { gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' },
                    },
                  }}
                  columnGap="24px"
                  rowGap="40px"
                  _mobile={{
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    columnGap: '14px',
                    rowGap: '40px',
                  }}
                >
                  {category.products.map((product) => (
                    <ProductCard
                      href={`/products/${product.id}`}
                      key={product.id}
                      options={['promotion', 'like', 'colors']}
                      product={product}
                      variant="listing"
                    />
                  ))}
                </Grid>
              </Stack>
            </section>
          ))}
        </Stack>
      </Stack>
    </main>
  );
}
