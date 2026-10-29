'use client';

/**
 * [개발팀 바인딩]
 * 이 Provider는 Storybook이 라우트 내부 구성을 선택하는 용도입니다. 운영 데이터/서비스 주입은 각 도메인 Context의 타입을 사용합니다.
 */

import {
  type ComponentType,
  createContext,
  createElement,
  type ReactNode,
  useContext,
} from 'react';

type RoutePreview = { target: string; props: object };

const RoutePreviewContext = createContext<RoutePreview | null>(null);

/** 페이지의 로컬 구성에 미리보기 입력을 제공합니다. (Provides preview inputs to a route-local composition.) */
export function RoutePreviewProvider({
  target,
  props,
  children,
}: RoutePreview & { children: ReactNode }) {
  return (
    <RoutePreviewContext.Provider value={{ target, props }}>
      {children}
    </RoutePreviewContext.Provider>
  );
}

export function useRoutePreview(components: Record<string, unknown>): ReactNode | undefined {
  const preview = useContext(RoutePreviewContext);
  if (!preview || !Object.prototype.hasOwnProperty.call(components, preview.target))
    return undefined;
  return createElement(components[preview.target] as ComponentType<object>, preview.props);
}
