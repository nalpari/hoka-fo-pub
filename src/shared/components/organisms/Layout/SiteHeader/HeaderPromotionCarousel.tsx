'use client';

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { css } from 'styled-system/css';
import { useCarousel } from '@/shared/components/molecules/Carousel/CarouselContext';
import {
  Carousel,
  CarouselControls,
  CarouselViewport,
} from '@/shared/components/molecules/Carousel/Carousel';
import { HeaderPromotionContent, type HeaderPromotionButtonType } from './HeaderPromotionContent';
import { headerPromotionItems, type HeaderPromotionItem } from './headerPromotionData';
import { HStack, Grid } from 'styled-system/jsx';

const promotionViewport = css({ minW: '0', h: '100%', gridColumn: '2', gridRow: '1' });

const promotionControls = css({
  display: 'contents',
  '& button': {
    w: '32px',
    h: '32px',
    gridRow: '1',
    '--icon-carousel-circle-color': 'transparent',
    '--icon-carousel-path-color': 'var(--hoka-white)',
  },
  '& button:first-child': { gridColumn: '1' },
  '& button:last-child': { gridColumn: '3' },
  '& svg': { w: '24px', h: '24px' },
});

const promotionSlide = css({
  w: '100%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

/** Own the promotion slides, viewport styling, and carousel behavior. */
export function HeaderPromotionCarousel({
  buttonType,
  items = headerPromotionItems,
}: {
  buttonType?: HeaderPromotionButtonType;
  items?: HeaderPromotionItem[];
}) {
  if (items.length === 0) return null;

  if (items.length === 1) {
    const item = items[0];

    return (
      <HStack
        gap="normal"
        justifyContent="center"
        w="100%"
        h="100%"
        px="2"
        css={{ '--promotion-frame-space': '16px' }}
      >
        <HeaderPromotionContent
          message={item.message}
          href={item.href}
          buttonType={buttonType ?? item.buttonType}
        />
      </HStack>
    );
  }

  return (
    <Carousel itemCount={items.length} loop>
      <PromotionCarouselFrame buttonType={buttonType} items={items} />
    </Carousel>
  );
}

function PromotionCarouselFrame({
  buttonType,
  items,
}: {
  buttonType?: HeaderPromotionButtonType;
  items: HeaderPromotionItem[];
}) {
  const { activeIndex } = useCarousel();
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [contentWidth, setContentWidth] = useState<number>();

  useLayoutEffect(() => {
    const content = contentRefs.current[activeIndex];
    if (!content) return;

    const measure = () => setContentWidth(content.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [activeIndex, items, buttonType]);

  return (
    <Grid
      gridTemplateColumns="32px minmax(0, 1fr) 32px"
      alignItems="center"
      gap="35px"
      w="calc(var(--promotion-content-width, 280px) + 150px)"
      maxW="100%"
      minW="0"
      h="100%"
      px="2"
      style={
        {
          '--promotion-content-width': contentWidth === undefined ? undefined : `${contentWidth}px`,
        } as CSSProperties
      }
    >
      <CarouselViewport
        effect="fade"
        className={promotionViewport}
        slideClassName={promotionSlide}
        freeMode={false}
        showScrollbar={false}
      >
        {items.map((item, index) => (
          <HeaderPromotionContent
            ref={(element) => {
              contentRefs.current[index] = element;
            }}
            key={item.id}
            message={item.message}
            href={item.href}
            buttonType={buttonType ?? item.buttonType}
          />
        ))}
      </CarouselViewport>
      <CarouselControls className={promotionControls} />
    </Grid>
  );
}
