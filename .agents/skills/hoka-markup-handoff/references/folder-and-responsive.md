# 폴더 깊이와 반응형 소유권

[적용 원칙](../SKILL.md#적용-원칙)에 따라 필요한 절만 적용한다. 폴더 깊이 변경과 플랫폼 정책 변경은 서로의 자동 실행 권한이 아니다.

## 폴더 정리

- 사용자가 말하는 깊이가 파일 탐색인지 JSX 중첩인지 구별한다. 이미 한 단일 부모 통합을 반복하지 않는다.
- 디렉터리가 같은 이름 구현 하나만 가지면 Name/Name.tsx 대신 Name.tsx를 우선한다. common/domain 계층과 asset·data·type·doc·다른 구현·숨김 파일이 있는 디렉터리는 유지한다. 목적지 충돌 시 덮어쓰지 않는다.
- flattening과 컴포넌트 삭제는 별개다. source export·DOM·스타일·남기는 UI 상태·server/client 경계를 폴더 정리만으로 바꾸지 않는다. 승인된 wrapper 제거 후 빈 책임 폴더가 됐는지 다시 평가한다.
- alias·relative import·re-export·dynamic import/fixture string 조합·stories·type 계약·활성 IA/file link를 함께 고친다. typecheck만으로 문자열 경로 전체를 검증했다고 하지 않는다. old path forwarding/barrel을 새로 만들지 않는다.
- 이동 본문은 import와 분리해 비교하고 옛 runtime 경로가 사라졌는지 확인한다. flattened folder와 deleted implementation 수를 따로 보고한다. 역사적 OKF provenance는 보존하고 현재 경로를 연결한다.

## 반응형 정책

- 현재 owner `src/context/platform.tsx`의 Platform/usePlatform, root layout, Panda conditions, global token, portal, Storybook override를 함께 읽는다. 모든 hook 호출을 교체하거나 interactive tree를 복제하는 대신 provider의 자동 선택을 조정한다.
- 현재 HOKA 자동 mode는 1024px까지 mobile이고 explicit platform은 고정이다. explicit provider는 body class를 변경하지 않는다. UA 기반 device helper를 복구하지 않는다. 적용 시 실제 소스를 재확인한다.
- server/첫 hydration snapshot 호환성을 지킨다. 현재 web-first 후 client 보정이 필요한 마크업을 CSS-only first-paint라고 주장하지 않는다. platform key로 app을 재마운트하지 않고 남기는 input/selection/open state의 owner와 identity를 유지한다.
- app/body/portal class와 CSS condition을 일치시킨다. cleanup은 자동으로 변경한 class만 복구하고 다른 class를 지우지 않는다.
- 자동 PC는 1025~1199px에서 1200px canvas와 document 가로 scroll을 사용한다. 1200px 이상은 classic 세로 scrollbar 때문에 가로 넘침이 생기지 않아야 한다. fixed header와 콘텐츠 canvas를 정렬한다.
- 1024/1025·1199/1200 및 대표 PC/MO에서 innerWidth, document clientWidth/scrollWidth, canvas width와 실제 platform을 함께 확인한다. viewport 숫자만으로 mode를 판단하지 않는다.
- 입력·선택·overlay를 연 채 resize하고 keyboard/focus/portal을 확인한다. 명시적 web story의 좁은 viewport와 명시적 mobile story의 넓은 viewport는 자동 mode와 별도로 검증한다. 제거한 업무 계산을 테스트 목적으로 복구하지 않는다.
- 현재 소스로 만든 preview에서 검증하고 실제 체크·예외를 OKF에 기록한다. 대표 조작만으로 전체 시각 회귀나 모든 play 통과를 주장하지 않는다. 현재 구현 이력은 저장소 `okf/architecture/responsive-platform-2026-10-28.md`를 참고한다.
