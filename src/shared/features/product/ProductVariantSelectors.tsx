import { Radio } from '@base-ui/react/radio';
import { RadioGroup } from '@base-ui/react/radio-group';
import { css } from 'styled-system/css';
import type { Product, ProductWidthOption } from '@/mocks/products';

const styles = {
  widths: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    mt: '6',
    overflow: 'hidden',
    borderRadius: '999px',
    bg: '#e9eaec',
    '& [role="radio"]': {
      display: 'grid',
      minH: '12',
      placeItems: 'center',
      borderRadius: '999px',
      fontWeight: '700',
      cursor: 'pointer',
    },
    '& [data-checked]': { bg: '#000', color: '#fff' },
  }),
  section: css({ mt: '6', '& h2': { mb: '3', fontSize: '13px', fontWeight: '700' } }),
  colors: css({
    display: 'flex',
    gap: '1.5',
    overflowX: 'auto',
    '& [role="radio"]': {
      flex: '0 0 58px',
      h: '44px',
      overflow: 'hidden',
      borderBottom: '3px solid transparent',
      bg: '#f7f7f9',
      cursor: 'pointer',
    },
    '& [data-checked]': { borderBottomColor: '#000' },
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
    '& [role="radio"]': {
      display: 'grid',
      minH: '8',
      placeItems: 'center',
      border: '1px solid #c9c9c9',
      borderRadius: '999px',
      bg: '#fff',
      fontSize: '12px',
      cursor: 'pointer',
    },
    '& [data-checked]': { borderColor: '#000', bg: '#000', color: '#fff' },
    '& [data-disabled]': {
      borderColor: 'transparent',
      bg: '#eee',
      color: '#aaa',
      cursor: 'not-allowed',
    },
  }),
  error: css({ mt: '2', color: '#c00', fontSize: '12px' }),
};

export function productWidthOptions(product: Product, color: string): ProductWidthOption[] {
  return (
    product.colorOptions?.find((option) => option.color === color)?.widths ?? [
      { label: product.width, sizes: product.sizes, soldOut: product.soldOut },
    ]
  );
}

type ProductVariantSelectorsProps = {
  product: Product;
  gallery: string[];
  color: string;
  width: string;
  size: string;
  error: string;
  onColorChange: (color: string) => void;
  onWidthChange: (width: string) => void;
  onSizeChange: (size: string) => void;
  onOpenSizeGuide: () => void;
};

export function ProductVariantSelectors({
  product,
  gallery,
  color,
  width,
  size,
  error,
  onColorChange,
  onWidthChange,
  onSizeChange,
  onOpenSizeGuide,
}: ProductVariantSelectorsProps) {
  const widthOptions = productWidthOptions(product, color);
  const selected = widthOptions.find((option) => option.label === width) ?? widthOptions[0];

  return (
    <>
      <RadioGroup
        aria-label="발볼 선택"
        className={styles.widths}
        onValueChange={onWidthChange}
        value={width}
      >
        {widthOptions.map((option) => (
          <Radio.Root key={option.label} value={option.label}>
            {option.label}
          </Radio.Root>
        ))}
      </RadioGroup>
      <section className={styles.section}>
        <h2>컬러: {color}</h2>
        <RadioGroup
          aria-label="컬러 선택"
          className={styles.colors}
          onValueChange={onColorChange}
          value={color}
        >
          {product.colors.map((item, index) => (
            <Radio.Root aria-label={item} key={item} value={item}>
              <img alt="" src={gallery[index % gallery.length]} />
            </Radio.Root>
          ))}
        </RadioGroup>
      </section>
      <section className={styles.section} id="product-size">
        <div className={styles.sizeHeader}>
          <h2>사이즈</h2>
          <button onClick={onOpenSizeGuide} type="button">
            사이즈 가이드
          </button>
        </div>
        <RadioGroup
          aria-label="사이즈 선택"
          className={styles.sizes}
          onValueChange={onSizeChange}
          value={size}
        >
          {selected?.sizes.map((item) => (
            <Radio.Root disabled={selected.soldOut.includes(item)} key={item} value={item}>
              {item}
            </Radio.Root>
          ))}
        </RadioGroup>
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        <p className={css({ mt: '2', color: '#777', fontSize: '11px' })}>사이즈 추천: 정사이즈</p>
      </section>
    </>
  );
}
