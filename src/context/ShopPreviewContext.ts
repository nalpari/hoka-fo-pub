'use client';

import { createContext, useContext } from 'react';

type ShopPreviewState = { isLoggedIn: boolean; logout: () => void };

/** 인증 요청 없이 셸과 소비 화면의 로그인 표시를 공유합니다. */
export const ShopPreviewContext = createContext<ShopPreviewState | null>(null);

export function useShopPreviewLogout() {
  return useContext(ShopPreviewContext)?.logout ?? null;
}

export function useShopPreviewLoggedIn() {
  return useContext(ShopPreviewContext)?.isLoggedIn ?? false;
}
