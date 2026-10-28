'use client';

import { createContext, type ReactNode, useContext } from 'react';

import type { Platform } from '@/lib/device';

const PlatformContext = createContext<Platform>('web');

type PlatformProviderProps = {
  platform: Platform;
  children: ReactNode;
};

export function PlatformProvider({ platform, children }: PlatformProviderProps) {
  return <PlatformContext.Provider value={platform}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  return useContext(PlatformContext);
}
