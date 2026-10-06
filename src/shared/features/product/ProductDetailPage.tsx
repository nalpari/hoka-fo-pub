'use client';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { css } from 'styled-system/css';
import { products } from '@/mocks/products';
import { Accordion, type AccordionEntry } from '@/shared/components/atoms/Accordion/Accordion';
import { ProductCard } from '@/shared/components/molecules/ProductCard/ProductCard';
import { Typography } from '@/shared/components/atoms/Typography/Typography';
import { ContentLayout } from '@/shared/components/layouts/ContentLayout/ContentLayout';
import type { CartItem } from '@/shared/types/cart';
import { ProductDetailGallery } from '@/shared/features/product/ProductDetailGallery';
import { ProductPurchaseActions } from '@/shared/features/product/ProductPurchaseActions';
import {
  ProductVariantSelectors,
  productWidthOptions,
} from '@/shared/features/product/ProductVariantSelectors';

const styles = {
  page: css({ maxW: '1420px', mx: 'auto', pt: '7', pb: '24', _mobile: { p: '0 0 100px' } }),
  layout: css({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 2fr) minmax(340px, .85fr)',
    gap: '8',
    _mobile: { display: 'block' },
  }),
  grid: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '2',
    _mobile: { display: 'none' },
  }),
  image: css({ display: 'block', w: '100%', aspectRatio: '1', objectFit: 'cover', bg: '#f7f7f9' }),
  mobileGallery: css({ display: 'none', _mobile: { display: 'block', bg: '#f7f7f9' } }),
  slide: css({
    w: '100%',
    aspectRatio: '1',
    '& img': { w: '100%', h: '100%', objectFit: 'cover' },
  }),
  dots: css({
    position: 'relative',
    zIndex: '1',
    mt: '-24px',
    pb: '16px',
    '& button': { w: '7px', h: '7px', borderRadius: '50%', bg: '#bbb' },
    '& button[aria-pressed="true"]': { w: '28px', bg: '#000' },
  }),
  panel: css({
    position: 'sticky',
    top: '104px',
    alignSelf: 'start',
    px: '4',
    _mobile: { position: 'static', px: '4', pt: '8' },
  }),
  eyebrow: css({ color: '#009dff', fontSize: '13px', fontWeight: '700' }),
  audience: css({ mt: '2', color: '#555', fontSize: '14px' }),
  review: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: '4',
    '& button': { p: '0', border: '0', bg: 'transparent' },
  }),
  reviewLink: css({
    display: 'flex',
    gap: '2',
    color: '#555',
    fontSize: '13px',
    textDecoration: 'underline',
  }),
  icons: css({ display: 'flex', gap: '3', '& button': { fontSize: '25px', lineHeight: '1' } }),
  widths: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    mt: '6',
    overflow: 'hidden',
    borderRadius: '999px',
    bg: '#e9eaec',
    '& button': {
      minH: '12',
      border: '0',
      borderRadius: '999px',
      bg: 'transparent',
      fontWeight: '700',
    },
  }),
  widthOn: css({ bg: '#000 !important', color: '#fff' }),
  section: css({ mt: '6', '& h2': { mb: '3', fontSize: '13px', fontWeight: '700' } }),
  swatches: css({
    display: 'flex',
    gap: '1.5',
    overflowX: 'auto',
    '& button': {
      flex: '0 0 58px',
      h: '44px',
      p: '0',
      overflow: 'hidden',
      border: '0',
      borderBottom: '3px solid transparent',
      bg: '#f7f7f9',
    },
    '& button[aria-pressed="true"]': { borderBottomColor: '#000' },
    '& img': { w: '100%', h: '100%', objectFit: 'cover' },
  }),
  sizeHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    '& button': {
      p: '0',
      border: '0',
      bg: 'transparent',
      fontSize: '12px',
      textDecoration: 'underline',
    },
  }),
  sizes: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '1.5',
    mt: '3',
    '& button': {
      minH: '8',
      border: '1px solid #c9c9c9',
      borderRadius: '999px',
      bg: '#fff',
      fontSize: '12px',
    },
    '& button[aria-pressed="true"]': { borderColor: '#000', bg: '#000', color: '#fff' },
    '& button:disabled': { borderColor: 'transparent', bg: '#eee', color: '#aaa' },
  }),
  error: css({ mt: '2', color: '#c00', fontSize: '12px' }),
  actions: css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2',
    mt: '6',
    '& button': { minH: '11', borderRadius: '999px', fontSize: '13px', fontWeight: '700' },
    '& button:last-child': { borderColor: '#000', bg: '#000', color: '#fff' },
    _mobile: { display: 'none' },
  }),
  info: css({
    mt: '7',
    p: '5',
    bg: '#f7f7f9',
    '& h2': { mb: '3', fontSize: '17px', fontWeight: '900' },
    '& h3': { mt: '5', mb: '2', fontSize: '12px', fontWeight: '700' },
    '& p': { fontSize: '12px', lineHeight: '1.65' },
  }),
  specs: css({
    display: 'grid',
    gridTemplateColumns: '76px 1fr',
    gap: '1.5 3',
    mt: '5',
    fontSize: '12px',
    '& dt': { fontWeight: '700' },
  }),
  accordion: css({
    mt: '8',
    borderTop: '1px solid #ddd',
    '& > *': { borderBottom: '1px solid #ddd' },
    '& button': { minH: '13', fontSize: '13px', fontWeight: '700' },
    '& p': { pb: '4', color: '#555', fontSize: '12px', lineHeight: '1.6' },
  }),
  recs: css({
    gridColumn: '1 / -1',
    mt: '16',
    _mobile: { mt: '10', px: '4' },
    '& h2': { mb: '5', fontSize: '28px', fontWeight: '900' },
  }),
  rail: css({
    display: 'flex',
    gap: '3',
    overflowX: 'auto',
    '& > *': { flex: '0 0 190px' },
    _mobile: { gap: '2', '& > *': { flexBasis: '118px' } },
  }),
  fixed: css({
    display: 'none',
    _mobile: {
      position: 'fixed',
      right: '0',
      bottom: '0',
      left: '0',
      zIndex: '20',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '2',
      p: '4',
      borderTop: '1px solid #ddd',
      bg: '#fff',
      '& button': { minH: '12', borderRadius: '999px', fontSize: '19px', fontWeight: '900' },
      '& button:last-child': { borderColor: '#000', bg: '#000', color: '#fff' },
    },
  }),
};

const empty = css({ display: 'grid', minH: '240px', placeItems: 'center', p: '8', bg: '#f7f7f9' });

const productSupportItems: AccordionEntry[] = [
  { value: 'inquiry', title: '상품 문의', content: <p>상품과 배송에 관한 문의를 남겨 주세요.</p> },
  {
    value: 'delivery',
    title: '배송 및 반품',
    content: <p>수령 후 7일 이내 미착용 상품은 반품하실 수 있습니다.</p>,
  },
  {
    value: 'after-sales',
    title: 'A/S 안내',
    content: <p>품질보증 기준에 따라 A/S를 지원합니다.</p>,
  },
];

export function ProductDetailPage({ onAddToCart }: { onAddToCart: (item: CartItem) => void }) {
  const { pathname } = useLocation();
  const product = products.find((item) => pathname.endsWith(item.id));
  const [color, setColor] = useState(product?.colors[0] ?? '');
  const [width, setWidth] = useState(
    product ? (productWidthOptions(product, product.colors[0] ?? '')[0]?.label ?? '') : '',
  );
  const [size, setSize] = useState('');
  const [wish, setWish] = useState(false);
  const [error, setError] = useState('');
  const gallery = product?.galleryImages?.length
    ? product.galleryImages
    : product
      ? [product.primaryImage, product.hoverImage]
      : [];
  const recommendations = products.filter((item) => item.id !== product?.id).slice(0, 6);

  if (!product)
    return (
      <ContentLayout className={empty} title="상품을 찾을 수 없습니다.">
        <Link to="/products">상품 목록으로</Link>
      </ContentLayout>
    );

  const submit = (order: boolean) => {
    if (!size) {
      setError('사이즈를 선택해 주세요.');
      document
        .getElementById('product-size')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setError('');
    onAddToCart({ id: product.id, color, width, size, quantity: 1 });
    if (order) location.assign('/checkout');
  };

  return (
    <ContentLayout className={styles.page}>
      <main className={styles.layout}>
        <ProductDetailGallery images={gallery} productName={product.name} />
        <article className={styles.panel}>
          <header>
            <p className={styles.eyebrow}>{product.promotion}</p>
            <p className={styles.audience}>{product.gender} | 데일리 러닝, 워킹</p>
            <Typography as="h1" className={css({ mt: '1' })} variant="productTitle">
              {product.name}
            </Typography>
            <Typography as="p" className={css({ mt: '3' })} variant="productPrice">
              {product.price.toLocaleString('ko-KR')}원
            </Typography>
            <div className={styles.review}>
              <button
                className={styles.reviewLink}
                onClick={() =>
                  document
                    .getElementById('product-information')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                type="button"
              >
                <strong>★★★★☆</strong>
                <span>{product.reviewCount}개 리뷰 보기</span>
              </button>
              <div className={styles.icons}>
                <button aria-label="공유하기" type="button">
                  ♧
                </button>
                <button
                  aria-label="관심상품"
                  aria-pressed={wish}
                  onClick={() => setWish(!wish)}
                  type="button"
                >
                  {wish ? '♥' : '♡'}
                </button>
              </div>
            </div>
          </header>
          <ProductVariantSelectors
            color={color}
            error={error}
            gallery={gallery}
            onColorChange={(nextColor) => {
              setColor(nextColor);
              setWidth(productWidthOptions(product, nextColor)[0]?.label ?? '');
              setSize('');
              setError('');
            }}
            onOpenSizeGuide={() =>
              window.open(
                'https://www.hoka.com/',
                'shoe-size-guide',
                'popup=yes,width=900,height=1000,resizable=yes,scrollbars=yes',
              )
            }
            onSizeChange={(nextSize) => {
              setSize(nextSize);
              setError('');
            }}
            onWidthChange={(nextWidth) => {
              setWidth(nextWidth);
              setSize('');
              setError('');
            }}
            product={product}
            size={size}
            width={width}
          />
          <ProductPurchaseActions
            onAddToCart={() => submit(false)}
            onOrder={() => submit(true)}
            placement="inline"
          />
          <section className={styles.info} id="product-information">
            <h2>상품 정보</h2>
            <h3>어떤 날씨에도 무심함 있는 편안한 주행</h3>
            <p>{product.detailDescription}</p>
            <h3>새로운 특징</h3>
            <p>
              알갱한 발볼 부분의 돔이 지지력과 착화감이 개선된 새로운 라스트를 만나보실 수 있습니다.
            </p>
            <dl className={styles.specs}>
              <dt>컬러</dt>
              <dd>{color}</dd>
              <dt>스타일코드</dt>
              <dd>{product.styleCode}</dd>
              <dt>발볼 넓이</dt>
              <dd>{width}</dd>
            </dl>
          </section>
          <section className={styles.accordion} aria-label="상품 안내">
            <Accordion indicatorSize="13px" items={productSupportItems} multiple={false} />
          </section>
        </article>
        <section className={styles.recs} aria-labelledby="recommendation-title">
          <h2 id="recommendation-title">추천 상품</h2>
          <div className={styles.rail}>
            {recommendations.map((item) => (
              <ProductCard key={item.id} product={item} variant="showcase" />
            ))}
          </div>
        </section>
      </main>
      <ProductPurchaseActions
        onAddToCart={() => submit(false)}
        onOrder={() => submit(true)}
        placement="fixed"
      />
    </ContentLayout>
  );
}
