import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';
import { Flex } from 'styled-system/jsx';
import { ProductOptionField } from '@/shared/components/organisms/Product/ProductPurchasePanel/ProductOptionField';

const option = css({
  position: 'relative',
  w: '78px',
  h: '58px',
  p: '0',
  border: '0',
  bg: '#f7f7f8',
  _hover: { boxShadow: 'inset 0 -3px #111' },
  _focusVisible: {
    boxShadow: 'inset 0 -3px #111',
    outline: '2px solid #0082ca',
    outlineOffset: '2px',
  },
});
const selected = css({ boxShadow: 'inset 0 -3px #111' });
const thumbnail = css({
  display: 'grid',
  w: '100%',
  h: 'calc(100% - 3px)',
  p: '4px',
  placeItems: 'center',
  color: '#777',
  fontSize: '9px',
  lineHeight: '1.1',
  textAlign: 'center',
});
const thumbnailImage = css({ w: '100%', h: '100%', objectFit: 'contain' });
const srOnly = css({
  position: 'absolute',
  w: '1px',
  h: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
});

type ColorSelectorProps = {
  colors: string[];
  image: string;
  value: string;
  onChange: (color: string) => void;
};

/** 상품 옵션 중 색상을 하나 고르는 컨트롤입니다. */
export function ColorSelector({ colors, image, value, onChange }: ColorSelectorProps) {
  return (
    <ProductOptionField
      action={
        <span className={css({ color: '#111', fontSize: '14px', fontWeight: '400' })}>
          Color: {value}
        </span>
      }
      label="색상"
    >
      <Flex wrap="wrap" gap="8px" mt="12px" mb="22px">
        {colors.map((color) => (
          <Button
            aria-label={color}
            aria-pressed={value === color}
            className={`${option} ${value === color ? selected : ''}`}
            key={color}
            onClick={() => onChange(color)}
          >
            <span className={thumbnail}>
              <img alt="" aria-hidden="true" className={thumbnailImage} src={image} />
            </span>
            <span className={srOnly}>{color}</span>
          </Button>
        ))}
      </Flex>
    </ProductOptionField>
  );
}
