'use client';

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/shared/components/layouts/AppLayout/AppLayout';
import type { CartItem } from '@/shared/types/cart';
import type { Platform } from '@/shared/lib/device';
import { PlatformProvider } from '@/shared/context/platform';

type ShopState = {
  readonly cart: CartItem[];
  readonly add: (item: CartItem) => void;
  readonly updateQuantity: (item: CartItem, quantity: number) => void;
  readonly remove: (item: CartItem) => void;
  readonly login: () => void;
  readonly logout: () => void;
};

const ShopContext = createContext<ShopState | null>(null);

const subscribeHydration = () => () => {};

const clientSnapshot = () => true;

const serverSnapshot = () => false;

export function useShop() {
  const shop = useContext(ShopContext);
  if (!shop) throw new Error('useShop requires ShopShell');
  return shop;
}

export function ShopShell({
  platform = 'web',
  children,
}: {
  readonly platform?: Platform;
  readonly children: ReactNode;
}) {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const hydrated = useSyncExternalStore(subscribeHydration, clientSnapshot, serverSnapshot);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem('hoka-is-logged-in') === 'true';
    } catch {
      return false;
    }
  });
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = 3;
  const recentCount = 7;
  const handleLogin = () => {
    setIsLoggedIn(true);
    try {
      localStorage.setItem('hoka-is-logged-in', 'true');
    } catch {
      // ignore storage failures in demo mode
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    try {
      localStorage.removeItem('hoka-is-logged-in');
    } catch {
      // ignore storage failures in demo mode
    }
    router.push('/login');
  };
  const add = (item: CartItem) =>
    setCart((previous) => {
      const found = previous.find(
        (current) =>
          current.id === item.id &&
          current.color === item.color &&
          current.width === item.width &&
          current.size === item.size,
      );
      return found
        ? previous.map((current) =>
            current === found
              ? { ...current, quantity: current.quantity + item.quantity }
              : current,
          )
        : [...previous, item];
    });
  const updateQuantity = (item: CartItem, quantity: number) =>
    quantity < 1
      ? setCart((previous) => previous.filter((current) => current !== item))
      : setCart((previous) =>
          previous.map((current) => (current === item ? { ...current, quantity } : current)),
        );
  const remove = (item: CartItem) =>
    setCart((previous) => previous.filter((current) => current !== item));

  return (
    <ShopContext.Provider
      value={{ cart, add, updateQuantity, remove, login: handleLogin, logout: handleLogout }}
    >
      <PlatformProvider platform={platform}>
        <div className={`app platform-${platform}`}>
          <AppLayout
            cart={count}
            isLoggedIn={hydrated && isLoggedIn}
            wishlistCount={wishlistCount}
            recentCount={recentCount}
          >
            {children}
          </AppLayout>
        </div>
      </PlatformProvider>
    </ShopContext.Provider>
  );
}
