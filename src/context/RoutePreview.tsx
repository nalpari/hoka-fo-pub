'use client';

import {
  createContext,
  createElement,
  useContext,
  type ComponentType,
  type ReactNode,
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
