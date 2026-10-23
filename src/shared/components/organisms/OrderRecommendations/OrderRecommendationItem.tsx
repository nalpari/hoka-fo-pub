import Link from 'next/link';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { css } from 'styled-system/css';
import { Stack } from 'styled-system/jsx';

export type OrderRecommendation = {
  id: string;
  gender?: string;
  name: string;
  price: number;
  imageSrc: string;
  href: string;
};

export type OrderRecommendationLayout = 'compact' | 'portrait';

type Props = { item: OrderRecommendation; layout?: OrderRecommendationLayout };

/** 추천 상품의 이미지와 상품명·가격을 연결합니다. (Links an order recommendation with its image and price.) */
export function OrderRecommendationItem({ item, layout = 'compact' }: Props) {
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
