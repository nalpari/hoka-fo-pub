import { css, cva } from 'styled-system/css';
import { Flex, VStack } from 'styled-system/jsx';
import { Button } from '@/shared/components/atoms/Button/Button';

const root = css({
  position: 'absolute',
  inset: '0',
  display: 'none',
  placeContent: 'center',
  justifyItems: 'center',
  gap: '13px',
  bg: 'rgb(0 0 0 / 62%)',
  color: '#fff',
});

const button = css({
  borderRadius: '22px',
  py: '11px',
  px: '8',
  bg: '#fff',
  color: '#111',
});

const sizes = css({ color: '#fff', lineHeight: '1.8', textAlign: 'center' });

const swatch = cva({
  base: {
    display: 'inline-block',
    w: '18px',
    h: '18px',
    m: '0.5',
    border: '1px solid #bbb',
    borderRadius: 'full',
    verticalAlign: 'middle',
  },
  variants: { color: { black: { bg: '#111' }, white: { bg: '#fff' } } },
});

/** Product image quick-view overlay. */
export function ProductQuick() {
  return (
    <VStack className={root} data-product-quick>
      <Button className={button} size="sm">
        Quick View
      </Button>
      <Flex>
        <span className={swatch({ color: 'black' })} />
        <span className={swatch({ color: 'white' })} />
      </Flex>
      <small className={sizes}>220 225 230 235 240 245 250 255 260</small>
    </VStack>
  );
}
