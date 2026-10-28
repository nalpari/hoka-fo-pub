'use client';

import {
  createContext,
  type ReactNode,
  useContext,
  useLayoutEffect,
  useSyncExternalStore,
} from 'react';

export type Platform = 'web' | 'mobile';

const mobileQuery = '(max-width: 1024px)';

function subscribePlatform(onChange: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const subscribeFixedPlatform = () => () => {};

const getPlatform = (): Platform => (window.matchMedia(mobileQuery).matches ? 'mobile' : 'web');

const getServerPlatform = (): Platform => 'web';

const PlatformContext = createContext<Platform>('web');

type PlatformProviderProps = {
  platform?: Platform;
  children: ReactNode;
};

/** 화면 폭 또는 명시한 플랫폼을 제공합니다. (Provides the viewport-based or explicitly selected platform.) */
export function PlatformProvider({ platform, children }: PlatformProviderProps) {
  const viewportPlatform = useSyncExternalStore(
    platform === undefined ? subscribePlatform : subscribeFixedPlatform,
    platform === undefined ? getPlatform : getServerPlatform,
    getServerPlatform,
  );
  const resolvedPlatform = platform ?? viewportPlatform;

  useLayoutEffect(() => {
    if (platform !== undefined) return;

    const { classList } = document.body;
    const wasMobile = classList.contains('platform-mobile');
    const wasWeb = classList.contains('platform-web');
    classList.toggle('platform-mobile', resolvedPlatform === 'mobile');
    classList.toggle('platform-web', resolvedPlatform === 'web');

    return () => {
      classList.toggle('platform-mobile', wasMobile);
      classList.toggle('platform-web', wasWeb);
    };
  }, [platform, resolvedPlatform]);

  return <PlatformContext.Provider value={resolvedPlatform}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  return useContext(PlatformContext);
}
