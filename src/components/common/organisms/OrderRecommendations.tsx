/**
 * [ 개발팀 바인딩 ]
 * items는 추천 서비스가 정렬한 표시 목록입니다. id/name/gender/price/href/imageSrc를 변환해 전달하며 원격 조회는 부모가 소유합니다. 현재 items를 공통 ProductCard 표시 모델로 연결하며 옵션·활동·재고를 추론하지 않습니다.
 * 빈 응답/로딩/오류는 부모에서 처리하고 시안 추천 배열을 실제 응답에 자동으로 섞지 않습니다.
 */

'use client';

import { useRef } from 'react';
import type { ReactNode } from 'react';

import { css } from 'styled-system/css';
import { Box, HStack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Icon } from '@/components/common/atoms/Icon';

import { ProductCard } from '@/components/common/molecules/ProductCard/ProductCard';

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

/** 추천 표시 데이터를 공통 상품 타일로 연결합니다. (Connects recommendation display data to the shared product tile.) */
function OrderRecommendationItem({ item, layout = 'compact' }: Props) {
  return (
    <Box
      minW="0"
      flex={
        layout === 'checkout'
          ? '0 0 calc((100% - 64px) / 5)'
          : layout === 'portrait'
            ? '0 0 calc((100% - 48px) / 4)'
            : '0 0 140px'
      }
      _mobile={{ flexBasis: layout === 'compact' ? '140px' : '150px' }}
    >
      <ProductCard
        href={item.href}
        product={{
          id: item.id,
          name: item.name,
          gender: item.gender,
          price: item.price,
          primaryImage: item.imageSrc,
        }}
        variant={layout === 'compact' ? 'history' : 'showcase'}
      />
    </Box>
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
