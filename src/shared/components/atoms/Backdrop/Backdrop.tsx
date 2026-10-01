import type { ReactNode } from 'react';
import { cva } from 'styled-system/css';
import { Box } from 'styled-system/jsx';

const backdrop = cva({
  base: { position: 'fixed', inset: '0' },
  variants: {
    placement: {
      fill: {},
      center: { display: 'grid', placeItems: 'center', p: '6', _mobile: { p: '0' } },
      centerToBottom: {
        display: 'grid',
        placeItems: 'center',
        p: '6',
        _mobile: { alignItems: 'end', p: '0' },
      },
      bottom: { display: 'flex', alignItems: 'flex-end' },
    },
    tone: {
      black72: { bg: 'rgb(0 0 0 / 72%)' },
      black60: { bg: 'rgb(0 0 0 / 60%)' },
      slate56: { bg: 'rgb(17 24 39 / 56%)' },
      black48: { bg: 'rgba(0, 0, 0, 0.48)' },
    },
    layer: {
      overlay: { zIndex: '20' },
      modal: { zIndex: '100' },
      sheet: { zIndex: '110' },
    },
  },
});

type BackdropProps = {
  children: ReactNode;
  layer: 'overlay' | 'modal' | 'sheet';
  onClose: () => void;
  placement: 'fill' | 'center' | 'centerToBottom' | 'bottom';
  tone: 'black72' | 'black60' | 'slate56' | 'black48';
};

export function Backdrop({ children, layer, onClose, placement, tone }: BackdropProps) {
  return (
    <Box className={backdrop({ layer, placement, tone })} onMouseDown={onClose} role="presentation">
      {children}
    </Box>
  );
}
