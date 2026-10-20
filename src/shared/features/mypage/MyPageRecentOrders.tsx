import { Box } from 'styled-system/jsx';
import { ContentSection } from '@/shared/components/layouts/ContentSection/ContentSection';
import { ButtonLink } from '@/shared/components/atoms/Button/Button';
import {
  Carousel,
  CarouselPagination,
  CarouselViewport,
} from '@/shared/components/molecules/Carousel/Carousel';
import { usePlatform } from '@/shared/context/platform';
import { MyPageOrderTile } from './MyPageOrderTile';
import { orderItems } from './mypage-home-data';

export function MyPageRecentOrders() {
  const platform = usePlatform();

  return (
    <ContentSection
      as="section"
      gap="6"
      aria-label="주문 배송 내역"
      title="주문 배송 내역"
      headerProps={{
        orientation: 'horizontal',
        gap: '2',
        titleProps: { web: 'heading8', mo: 'heading5' },
        action: (
          <ButtonLink href="/mypage/orders" size="md" variant="link">
            전체 보기
          </ButtonLink>
        ),
      }}
    >
      <Carousel itemCount={orderItems.length}>
        <CarouselViewport freeMode={false} mode={platform} showScrollbar={false}>
          {orderItems.map((item, index) => (
            <MyPageOrderTile item={item} key={`${item.name}-${index}`} />
          ))}
        </CarouselViewport>
        <Box mt="6">
          <CarouselPagination label="주문 상품 선택" />
        </Box>
      </Carousel>
    </ContentSection>
  );
}
