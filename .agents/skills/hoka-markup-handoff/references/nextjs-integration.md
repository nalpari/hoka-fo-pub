# Next.js integration workflow

[적용 원칙](../SKILL.md#적용-원칙)에 따라 서비스·시연 흐름을 제거한다. 아래 navigation/query 보존은 남기는 일반 탐색·로컬 UI와 비대상 소비자에 한한다. 결제 URL 생성·인증 성공 redirect를 프레임워크 통합을 이유로 유지하지 않는다. dynamic import의 실제 loading/error/닫기 등 프레임워크 동작은 서비스 시뮬레이션과 구별한다.

Use this workflow when adopting a Next.js API or changing a component boundary that provides framework behavior. Read the relevant guide in the installed `node_modules/next/dist/docs/`; the installed version takes precedence over remembered options.

## Choose the owner

- Internal route navigation belongs to `next/link`; imperative navigation and reactive pathname/query reads belong to `next/navigation` in App Router. Preserve native links for external sites, downloads and fragments, including their focus and scroll behavior.
- Content images that benefit from resizing belong to `next/image`. Preserve aspect ratio, fit, alt text and hover behavior. Derive `sizes` from the real container, desktop canvas, automatic mobile threshold and fixed preview modes. Keep remote patterns narrow. Treat SVGs, authenticated/blob previews and CDN loaders according to their actual source contract; conversion alone does not prove optimization.
- Application fonts belong to `next/font/local` at the layout owner. Use CSS variables rather than forwarding typography wrappers. Preserve all existing weights, italics and fallback order. Avoid preloading every static face; use demand loading when a selective preload cannot be expressed without changing font-family matching. Keep Vite/Storybook registration available through a preview-only stylesheet, and verify the two runtimes use the same font files.
- Query-driven selection belongs to `useSearchParams`, retaining the distinction between missing and empty values. Check the nearest `Suspense` boundary for static builds. Test same-route changes, browser history, empty selection, and mocked router parameters in Storybook; do not move cart or form state into a router adapter.
- Metadata belongs to server-supported page/layout exports. Do not convert a route to a client component merely to consolidate a child. Add third-party `next/script` only for an actual integration, preserving the required loading order and callbacks.

## Deferred UI and single-parent exceptions

Use a module-level `next/dynamic(() => import('literal-path'))` for optional client UI with a useful deferred payload. A static import or barrel re-export of the same implementation can defeat that boundary; inspect all consumers, including route-preview registries.

Keep a route-only deferred implementation in the route's private component directory. This is an explicit runtime exception to single-parent consolidation: record its parent, trigger, deferred module and evidence in OKF. Keep domain state and open/close policy in the parent. Move the deferred component's private styles/types with it; share a helper only when actual production consumers need the same contract.

Preserve the selected item, loading and failure recovery, Escape/close behavior, focus destination, and scroll position. Do not disable SSR as a generic fix. Keep loading UI accessible and make sure a failed or pending import does not trap the user in a hidden parent screen.

Check the installed dynamic loader before relying on a loading callback for errors: App Router's lazy loader can throw to an error boundary instead. Keep essential close controls outside the deferred subtree and use a scoped error boundary when a route-wide fallback would discard the surrounding interaction. Do not promise import retries that reuse a rejected lazy-module promise.

## Verification

Run affected lint/format and TypeScript checks, production Next and Storybook builds, and relevant existing tests. Check production-generated font faces and preload links; confirm Storybook still renders the same fonts. Confirm the deferred chunk is absent before its trigger and requested afterward, then exercise close and reopen. Compare PC/mobile layout and query history behavior. Distinguish measured bytes/timing from inferred benefits; record any browser or tooling limits rather than claiming unperformed verification.
