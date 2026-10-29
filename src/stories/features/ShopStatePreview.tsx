import type { ReactNode } from 'react';
import { type ShopState, ShopStateProvider } from '@/context/ShopShell';

const noop = () => {};

/** 스토리에 필요한 쇼핑 상태와 액션만 주입합니다. (Injects shopping state and actions needed by a story.) */
export function ShopStatePreview({
  children,
  ...value
}: Partial<ShopState> & { children: ReactNode }) {
  return (
    <ShopStateProvider
      value={{
        authenticationMode: 'demo',
        cart: [],
        add: noop,
        remove: noop,
        updateQuantity: noop,
        updateOptions: noop,
        login: noop,
        logout: noop,
        ...value,
      }}
    >
      {children}
    </ShopStateProvider>
  );
}
