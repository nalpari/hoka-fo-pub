'use client';

import { createContext, useContext } from 'react';

/** 인증 요청 없이 공통 셸의 로그인 표시만 해제하는 퍼블리싱 전용 연결입니다. */
export const ShopPreviewLogoutContext = createContext<(() => void) | null>(null);

export function useShopPreviewLogout() {
  return useContext(ShopPreviewLogoutContext);
}
