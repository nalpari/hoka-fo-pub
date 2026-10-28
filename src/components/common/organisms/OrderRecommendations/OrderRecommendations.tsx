import Link from 'next/link';

import { css } from 'styled-system/css';
import { HStack, Stack } from 'styled-system/jsx';

import { Typography } from '@/components/common/atoms/Typography/Typography';

import { ContentSection } from '@/components/common/layouts/ContentSection/ContentSection';

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
        flex: '0 0 140px',
        color: 'black.100',
        _mobile: { flexBasis: layout === 'portrait' ? '151px' : '140px' },
      })}
    >
      <Stack gap="1">
        <img
          src={item.imageSrc}
          alt=""
          className={css({
            w: '140px',
            h: '140px',
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
  return (
    <ContentSection
      as="section"
      gap="4"
      overflow="hidden"
      title={title}
      headerProps={{
        titleAs: 'h2',
        titleProps: { web: 'heading8', mo: layout === 'portrait' ? 'heading6' : 'heading7' },
      }}
    >
      <HStack
        gap={layout === 'portrait' ? { base: '1', _mobile: '2.5' } : '1'}
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
