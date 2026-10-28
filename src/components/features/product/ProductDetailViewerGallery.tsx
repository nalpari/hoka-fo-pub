import { css } from 'styled-system/css';
import { Box, Grid } from 'styled-system/jsx';
import {
  CarouselPagination,
  CarouselViewport,
} from '@/components/common/molecules/Carousel/Carousel';
import { ProductDetailImage } from './ProductDetailImage';

type Props = { images: string[]; productName: string };

const styles = {
  carousel: css({ '& .swiper-slide': { w: '100%' } }),
  pagination: css({
    display: 'flex',
    justifyContent: 'center',
    gap: '5px',
    mt: '5',
  }),
};

export function ProductDetailViewerGallery({ images, productName }: Props) {
  return (
    <Grid minW="0" w="100%" alignContent="start" gap="0">
      <CarouselViewport className={styles.carousel} freeMode={false} showScrollbar={false}>
        {images.map((image, index) => (
          <Box w="100%" key={image}>
            <ProductDetailImage alt={`${productName} ${index + 1}`} src={image} />
          </Box>
        ))}
      </CarouselViewport>
      <CarouselPagination className={styles.pagination} label="상품 이미지 선택" />
    </Grid>
  );
}
