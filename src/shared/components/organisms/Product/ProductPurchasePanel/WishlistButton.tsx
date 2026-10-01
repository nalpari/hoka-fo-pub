import { css } from 'styled-system/css';
import { Button } from '@/shared/components/atoms/Button/Button';

const button = css({ w: '100%', minH: '11', my: '1.25' });

type WishlistButtonProps = {
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
};

/** 관심상품 상태를 표시하고 토글하는 버튼입니다. */
export function WishlistButton({ pressed, onPressedChange }: WishlistButtonProps) {
  return (
    <Button aria-pressed={pressed} className={button} onClick={() => onPressedChange(!pressed)}>
      {pressed ? '♥ 관심상품 해제' : '♡ 관심상품'}
    </Button>
  );
}
