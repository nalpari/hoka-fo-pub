'use client';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Grid } from 'styled-system/jsx';
import { products } from '@/mocks/products';
import { Button } from '@/shared/components/atoms/Button/Button';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import { ProductGallery } from '@/shared/components/organisms/Product/ProductGallery/ProductGallery';
import { ProductDetailSections } from '@/shared/components/organisms/Product/ProductDetailSections/ProductDetailSections';
import { ProductPurchasePanel } from '@/shared/components/organisms/Product/ProductPurchasePanel/ProductPurchasePanel';
import { ProductActionBar } from '@/shared/components/molecules/Product/ProductActionBar';
import type { CartItem } from '@/shared/types/cart';
import { css } from 'styled-system/css';
import { ModalDialog } from '@/shared/components/molecules/ModalDialog/ModalDialog';

const detailLayout = css({
  maxW: 'var(--content-width)',
  mx: 'auto',
  py: '16',
  '& h1': { fontSize: '42px' },
  _mobile: {
    px: 'var(--layout-mobile-inline-gutter)',
    pt: '8',
    pb: '108px',
    '& h1': { fontSize: '30px' },
  },
});

const detailTop = css({
  display: 'grid',
  gridTemplateColumns: '1.35fr 0.65fr',
  gap: '50px',
  _mobile: { display: 'block', '& article': { pt: '25px' } },
});

const emptyState = css({
  display: 'grid',
  minH: '240px',
  gap: '15px',
  placeItems: 'center',
  p: '30px',
  bg: 'var(--soft)',
});

const modalImage = css({ display: 'block', w: '100%', h: 'auto', objectFit: 'contain' });

const detailContent = css({ minW: '0' });

const imageModal = css({
  '& > div': {
    display: 'grid',
    minH: 'min(64vh, 520px)',
    placeItems: 'center',
    bg: '#f2f2f2',
    color: '#777',
  },
  _mobile: { w: '100%', h: '100%', borderRadius: '0' },
});

const bottomSheet = css({
  pb: '18px',
  '& p': { m: '24px 18px', color: '#555', lineHeight: '1.6' },
  _mobile: { w: '100%', borderRadius: '12px 12px 0 0' },
});

const modalAction = css({
  w: 'calc(100% - 36px)',
  minH: '11',
  m: '0 18px',
  borderColor: '#111827',
  bg: '#111827',
  color: '#fff',
});

export function ProductDetailPage({ onAddToCart }: { onAddToCart: (item: CartItem) => void }) {
  const { pathname } = useLocation();
  const product = products.find((item) => pathname.endsWith(item.id));
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const openReviews = () => {
    const reviews = document.getElementById('reviews');
    reviews?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    requestAnimationFrame(() => reviews?.focus({ preventScroll: true }));
  };
  const openSizeGuide = () => {
    window.open(
      'https://www.hoka.com/',
      'shoe-size-guide',
      'popup=yes,width=900,height=1000,resizable=yes,scrollbars=yes',
    );
  };
  if (!product)
    return (
      <ContentLayout className={emptyState} title="상품을 찾을 수 없습니다.">
        <Link to="/products">상품 목록으로</Link>
      </ContentLayout>
    );

  return (
    <ContentLayout
      className={detailLayout}
      breadcrumbItems={[
        { label: 'HOME', href: '/' },
        { label: '상품', href: '/products' },
        { label: product.category },
      ]}
    >
      <Grid className={detailTop}>
        <Box className={detailContent}>
          <ProductGallery
            images={[product.primaryImage, product.hoverImage]}
            colorVariants={products
              .filter((variant) => variant.collection === product.collection)
              .map((variant) => ({
                id: variant.id,
                image: variant.primaryImage,
                name: variant.name,
                selected: variant.id === product.id,
              }))}
            onOpen={setZoomImage}
          />
          <ProductDetailSections hasSizeGuide={product.hasSizeGuide ?? product.sizes.length > 0} />
        </Box>
        <ProductPurchasePanel
          onAddToCart={onAddToCart}
          onOpenSizeGuide={openSizeGuide}
          onOrder={() => location.assign('/checkout')}
          onViewReviews={openReviews}
          product={product}
        />
      </Grid>
      <ProductActionBar
        onOpenPurchase={() =>
          document
            .getElementById('product-purchase')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      />
      {zoomImage && (
        <ModalDialog
          closeLabel="이미지 확대 닫기"
          onOpenChange={(open) => !open && setZoomImage(null)}
          open={Boolean(zoomImage)}
          placement="centerToBottom"
          popupClassName={imageModal}
          title="상품 이미지"
        >
          <Box>
            <img alt={product.name} className={modalImage} src={zoomImage} />
          </Box>
        </ModalDialog>
      )}
      {sizeGuideOpen && (
        <ModalDialog
          closeLabel="사이즈 가이드 닫기"
          onOpenChange={setSizeGuideOpen}
          open={sizeGuideOpen}
          placement="centerToBottom"
          popupClassName={bottomSheet}
          title="사이즈 가이드"
        >
          <p>
            발 길이를 기준으로 편안한 사이즈를 선택해 주세요. 반 사이즈 사이에서는 여유 있는
            사이즈를 권장합니다.
          </p>
          <Button className={modalAction} onClick={() => setSizeGuideOpen(false)}>
            확인
          </Button>
        </ModalDialog>
      )}
    </ContentLayout>
  );
}
