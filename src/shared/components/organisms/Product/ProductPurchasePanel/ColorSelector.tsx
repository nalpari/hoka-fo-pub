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
  bg: 'var(--color-black-10)',
  _hover: { boxShadow: 'inset 0 -3px var(--color-black-100)' },
  _focusVisible: {
    boxShadow: 'inset 0 -3px var(--color-black-100)',
    outline: '2px solid var(--color-blue-100)',
    outlineOffset: '2px',
  },
});

const selected = css({ boxShadow: 'inset 0 -3px var(--color-black-100)' });

const thumbnail = css({
  display: 'grid',
  w: '100%',
  h: 'calc(100% - 3px)',
  p: '1',
  placeItems: 'center',
  color: 'var(--color-black-50)',
  fontSize: '12' /* 기존: 9px */,
  lineHeight: 'koreanHeading',
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
        <span
          className={css({ color: 'var(--color-black-100)', fontSize: '14', fontWeight: 'normal' })}
        >
          Color: {value}
        </span>
      }
      label="색상"
    >
      <Flex wrap="wrap" gap="2" mt="3" mb="22px">
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
