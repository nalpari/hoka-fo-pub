/**
 * [개발팀 바인딩]
 * items는 추천 서비스가 정렬한 표시 목록입니다. id/name/gender/price/href/imageSrc를 변환해 전달하며 원격 조회는 부모가 소유합니다.
 * 빈 응답/로딩/오류는 부모에서 처리하고 시안 추천 배열을 실제 응답에 자동으로 섞지 않습니다.
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useRef } from 'react';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Button } from '@/components/common/atoms/Button';
import { Typography } from '@/components/common/atoms/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection';

type OrderRecommendation = {
  id: string;
  gender?: string;
  name: string;
  price: number;
  imageSrc: string;
  href: string;
};

type OrderRecommendationLayout = 'compact' | 'portrait';

type Props = { item: OrderRecommendation; layout?: OrderRecommendationLayout };

/** 추천 상품의 이미지와 상품명·가격을 연결합니다. (Links an order recommendation with its image and price.) */
function OrderRecommendationItem({ item, layout = 'compact' }: Props) {
  return (
    <Link
      href={item.href}
      className={css({
        flex: layout === 'portrait' ? '0 0 calc((100% - 48px) / 4)' : '0 0 140px',
        color: 'black.100',
        _mobile: { flexBasis: layout === 'portrait' ? '151px' : '140px' },
      })}
    >
      <Stack gap="1">
        <Image
          src={item.imageSrc}
          alt=""
          width={layout === 'portrait' ? 151 : 140}
          height={layout === 'portrait' ? 225 : 140}
          sizes={
            layout === 'portrait'
              ? '(max-width: 1024px) 151px, (max-width: 1200px) 260px, 22vw'
              : '140px'
          }
          className={css({
            w: layout === 'portrait' ? '100%' : '140px',
            h: layout === 'portrait' ? 'auto' : '140px',
            aspectRatio: layout === 'portrait' ? '151 / 225' : '1',
            objectFit: 'cover',
            bg: 'black.10',
            _mobile:
              layout === 'portrait'
                ? { w: '151px', h: '225px', mb: '2', objectFit: 'contain' }
                : undefined,
          })}
        />
        <Typography variant="body5">{item.gender ?? 'All Gender'}</Typography>
        <Typography variant="body5" weight="semibold" className={css({ lineClamp: 2 })}>
          {item.name}
        </Typography>
        <Typography variant="body5">{item.price.toLocaleString()}원</Typography>
      </Stack>
    </Link>
  );
}

export type OrderRecommendationsProps = {
  items: readonly OrderRecommendation[];
  title?: string;
  layout?: OrderRecommendationLayout;
};

/** 함께 구매할 상품을 가로 스크롤 목록으로 표시합니다. (Displays horizontally scrollable order recommendations.) */
export function OrderRecommendations({
  items,
  title = '함께 구매하면 좋은 상품',
  layout = 'compact',
}: OrderRecommendationsProps) {
  const viewport = useRef<HTMLDivElement>(null);
  return (
    <ContentSection
      as="section"
      gap="4"
      overflow="hidden"
      title={title}
      headerProps={{
        titleAs: 'h2',
        orientation: 'horizontal',
        action:
          layout === 'portrait' ? (
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
        titleProps: { web: 'heading8', mo: layout === 'portrait' ? 'heading6' : 'heading7' },
      }}
    >
      <HStack
        ref={viewport}
        gap={layout === 'portrait' ? { base: '4', _mobile: '2.5' } : '1'}
        overflowX="auto"
        alignItems="flex-start"
        scrollbarWidth={layout === 'portrait' ? { _mobile: 'none' } : undefined}
      >
        {items.map((item) => (
          <OrderRecommendationItem key={item.id} item={item} layout={layout} />
        ))}
      </HStack>
    </ContentSection>
  );
}
