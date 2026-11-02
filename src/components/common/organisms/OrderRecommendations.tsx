/**
 * [개발팀 바인딩]
 * items는 추천 서비스가 정렬한 표시 목록입니다. id/name/gender/price/href/imageSrc를 변환해 전달하며 원격 조회는 부모가 소유합니다.
 * 빈 응답/로딩/오류는 부모에서 처리하고 시안 추천 배열을 실제 응답에 자동으로 섞지 않습니다.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useRef } from 'react';
import type { ReactNode } from 'react';
import { usePlatform } from '@/context/platform';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

import { faChevronRight } from '@/icons/fontAwesome';

type OrderRecommendation = {
  id: string;
  gender?: string;
  name: string;
  price: number;
  imageSrc: string;
  href: string;
};

type OrderRecommendationLayout = 'compact' | 'portrait' | 'checkout';

type Props = { item: OrderRecommendation; layout?: OrderRecommendationLayout };

/** 추천 상품의 이미지와 상품명·가격을 연결합니다. (Links an order recommendation with its image and price.) */
function OrderRecommendationItem({ item, layout = 'compact' }: Props) {
  const mobile = usePlatform() === 'mobile';
  const checkoutLayout = layout === 'checkout';
  const portraitLayout = layout !== 'compact';

  return (
    <Link
      href={item.href}
      className={css({
        flex: checkoutLayout
          ? '0 0 calc((100% - 64px) / 5)'
          : layout === 'portrait'
            ? '0 0 calc((100% - 48px) / 4)'
            : '0 0 140px',
        color: 'black.100',
        _mobile: { flexBasis: portraitLayout ? '151px' : '140px' },
      })}
    >
      <Stack
        gap={
          checkoutLayout
            ? { base: '4', _mobile: '3' }
            : layout === 'portrait'
              ? { base: '4', _mobile: '1' }
              : '1'
        }
      >
        <Image
          src={item.imageSrc}
          alt=""
          width={checkoutLayout ? 342 : layout === 'portrait' ? 151 : 140}
          height={checkoutLayout ? 429 : layout === 'portrait' ? 328 : 140}
          sizes={
            checkoutLayout
              ? '(max-width: 1024px) 151px, calc((100vw - 208px) / 5)'
              : layout === 'portrait'
                ? '(max-width: 1024px) 151px, (max-width: 1200px) 260px, 22vw'
                : '140px'
          }
          className={css({
            w: portraitLayout ? '100%' : '140px',
            h: portraitLayout ? 'auto' : '140px',
            aspectRatio: checkoutLayout
              ? '342.4 / 428.6'
              : layout === 'portrait'
                ? '262.4 / 328.46'
                : '1',
            objectFit: checkoutLayout ? 'cover' : layout === 'portrait' ? 'contain' : 'cover',
            bg: 'black.10',
            _mobile: checkoutLayout
              ? { w: '151px', h: '189px' }
              : layout === 'portrait'
                ? { w: '151px', h: '225px', mb: '2', objectFit: 'contain' }
                : undefined,
          })}
        />
        <Stack
          gap={
            checkoutLayout
              ? { base: '4', _mobile: '1.5' }
              : layout === 'portrait'
                ? { base: '4', _mobile: '1' }
                : '1'
          }
        >
          <Stack
            gap={
              checkoutLayout
                ? { base: '2.5', _mobile: '0.5' }
                : layout === 'portrait'
                  ? { base: '2.5', _mobile: '1' }
                  : '1'
            }
          >
            <Typography
              web={portraitLayout ? 'body3' : 'body5'}
              mo={checkoutLayout ? 'body4' : 'body5'}
              weight={portraitLayout && !mobile ? 'medium' : undefined}
            >
              {item.gender ?? 'All Gender'}
            </Typography>
            <Typography
              web={portraitLayout ? 'body3' : 'body5'}
              mo={checkoutLayout ? 'body4' : 'body5'}
              weight={portraitLayout && !mobile ? 'medium' : 'semibold'}
              className={css({ lineClamp: 2 })}
            >
              {item.name}
            </Typography>
          </Stack>
          <Typography
            web={portraitLayout ? 'body3' : 'body5'}
            mo={checkoutLayout ? 'body4' : 'body5'}
            weight={portraitLayout && !mobile ? 'medium' : undefined}
          >
            {item.price.toLocaleString()}원
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
}

export type OrderRecommendationsProps = {
  items: readonly OrderRecommendation[];
  title?: ReactNode;
  layout?: OrderRecommendationLayout;
};

/** 함께 구매할 상품을 가로 스크롤 목록으로 표시합니다. (Displays horizontally scrollable order recommendations.) */
export function OrderRecommendations({
  items,
  title = '함께 구매하면 좋은 상품',
  layout = 'compact',
}: OrderRecommendationsProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const portraitLayout = layout !== 'compact';

  return (
    <ContentSection
      as="section"
      gap={
        layout === 'checkout'
          ? { base: '8', _mobile: '4' }
          : layout === 'portrait'
            ? { base: '6', _mobile: '4' }
            : '4'
      }
      overflow="hidden"
      title={title}
      headerProps={{
        titleAs: 'h2',
        orientation: 'horizontal',
        action:
          layout === 'checkout' ? (
            <HStack display={{ _mobile: 'none' }} gap="2">
              <Button
                variant="icon"
                size={48}
                shape="circle"
                aria-label="이전 추천 상품"
                className={css({ bg: 'black.10', color: 'black.40' })}
                onClick={() =>
                  viewport.current?.scrollBy({
                    left: -viewport.current.clientWidth,
                    behavior: 'smooth',
                  })
                }
              >
                <Icon
                  fontAwesomeIcon={faChevronRight}
                  size="16px"
                  className={css({ transform: 'rotate(180deg)' })}
                />
              </Button>
              <Button
                variant="icon"
                size={48}
                shape="circle"
                aria-label="다음 추천 상품"
                className={css({ bg: 'black.100', color: 'white.0' })}
                onClick={() =>
                  viewport.current?.scrollBy({
                    left: viewport.current.clientWidth,
                    behavior: 'smooth',
                  })
                }
              >
                <Icon fontAwesomeIcon={faChevronRight} size="16px" />
              </Button>
            </HStack>
          ) : layout === 'portrait' ? (
            <HStack display={{ _mobile: 'none' }} gap="2">
              <Button
                variant="icon"
                aria-label="이전 추천 상품"
                onClick={() =>
                  viewport.current?.scrollBy({
                    left: -viewport.current.clientWidth,
                    behavior: 'smooth',
                  })
                }
              >
                ←
              </Button>
              <Button
                variant="icon"
                aria-label="다음 추천 상품"
                onClick={() =>
                  viewport.current?.scrollBy({
                    left: viewport.current.clientWidth,
                    behavior: 'smooth',
                  })
                }
              >
                →
              </Button>
            </HStack>
          ) : undefined,
        titleProps: {
          web:
            layout === 'checkout' ? 'headingKr6' : layout === 'portrait' ? 'heading7' : 'heading8',
          mo:
            layout === 'checkout' ? 'headingKr6' : layout === 'portrait' ? 'heading6' : 'heading7',
        },
      }}
    >
      <HStack
        ref={viewport}
        gap={
          layout === 'checkout'
            ? { base: '4', _mobile: '2.5' }
            : layout === 'portrait'
              ? { base: '4', _mobile: '2.5' }
              : '1'
        }
        overflowX="auto"
        alignItems="flex-start"
        scrollbarWidth={portraitLayout ? { _mobile: 'none' } : undefined}
      >
        {items.map((item) => (
          <OrderRecommendationItem key={item.id} item={item} layout={layout} />
        ))}
      </HStack>
    </ContentSection>
  );
}
