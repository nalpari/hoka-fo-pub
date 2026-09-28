'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Platform } from '@/shared/lib/device';

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
