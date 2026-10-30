# 제목·콘텐츠 그룹·footer action 구성

[적용 원칙](../SKILL.md#적용-원칙)을 따른다. 구조를 바꾸면서 삭제 대상의 제출/인증/저장 흐름을 되살리지 않는다. 현재 API와 저장소 `okf/architecture/content-sections.md`, `okf/architecture/footer-actions.md`의 실제 소비자를 재확인한다.

## 기본 조합

- 일반 제목은 단독 제목도 ContentHeader를 사용한다. 실제 heading level·id·Typography PC/MO·conditional 존재를 유지한다. 가격·메뉴·field label·장식 텍스트를 제목으로 자동 분류하지 않는다.
- 제목이 콘텐츠를 소개하면 ContentSection의 title/headerProps 기본 header를 우선한다. description·eyebrow·titleAs·titleProps·descriptionProps·제목 내부 간격은 headerProps에 둔다. 기존 기본 구조로 표현 가능한 ContentHeader를 custom header slot에 다시 감싸지 않는다.
- section gap은 title/body/footer 사이, headerProps.gap은 제목/설명/eyebrow 내부 간격이다. 둘을 혼동하지 않는다. 인접 액션은 headerProps.orientation="horizontal"/action을 사용하고 기존 HStack 간격을 명시한다.
- title/headerProps와 custom header ReactNode는 배타적인 대안이다. divider 등 기본 구조가 실제 표현하지 못하는 경우만 custom header를 사용하고 arbitrary object shape 추론은 하지 않는다.

## 레이아웃 보존

- 기존 parent Stack과 semantic as를 재사용한다. children을 직접 렌더해 원래 gap에 참여하게 하고 body div·불필요한 Fragment/동일 gap Stack을 추가하지 않는다. 다른 spacing·padding·정렬·조건부 계약을 가진 그룹은 유지한다.
- 기존 HTML form/list/landmark·label/ref·키보드·focus를 유지한다. button/span 기반 조작 안에 header용 h/p를 강제로 삽입하지 않는다. 제목이 있다는 이유로 PC Grid를 Stack으로 바꾸지 않는다.
- 형제 margin은 전체 경계를 조사해 gap으로 옮긴다. 다른 간격·leading space·margin collapse·divider·hidden/empty 조건을 보존하고 빈 그룹이나 음수 margin 보정을 만들지 않는다.
- nested headerProps.css로 스타일을 옮길 때 css.raw 등 Panda가 추출할 수 있는 경로를 사용한다. 다른 소비자의 우연한 클래스 생성에 의존하지 않고 실제 생성 규칙과 계산된 스타일을 확인한다.
- 없는 eyebrow/description 노드를 생성하지 않는다. API가 지원하지 않는 heading level은 실제 소비자를 위해 확장하고 편의를 위해 h4/h5를 h2로 바꾸지 않는다.

## footer action

ContentSection.footer는 children 뒤 같은 Stack의 ReactNode slot이다. 자동 div/HTML footer나 버튼 layout을 가정하지 않는다. 관련 CTA·list 더보기 등 영역 마무리 액션에 쓰고 heading+CTA만 있으면 빈 body를 만들지 않는다.

- Button/ButtonLink/native button과 기존 footer/actions/action API를 조사한다. field helper·selection·header action·행 조작과 영역 마무리를 구별한다. 기존 action group 전체의 순서·표시·일반 link·disabled/pending 표현·PC/MO 배치를 옮긴다.
- Fragment의 여러 버튼은 개별 flex item이다. 수평 HStack/Grid group을 유지한다. null/undefined는 wrapper나 gap을 남기지 않아야 한다.
- footer 앞 section gap과 기존 mt/pt를 비교해 이중 간격을 제거한다. 서로 다른 값은 실제 owner에 명시하고 큰 재설계나 음수 margin이 필요하면 기존 구성을 유지한다.
- form 밖 액션의 form id/버튼 type 의미를 확인하되 인계 화면의 실제 전송은 막는다. 공용 비대상 호출부의 Enter/FormData 계약은 유지한다. 필드 사이의 로컬 조작을 footer 이동 때문에 깨뜨리지 않는다.
- CustomerCenterLayout.footerAction·ModalDialog.actions 등 기존 owner의 typed default-action을 우선한다. custom footer는 배타적으로 지원하고 단순 action 전달 wrapper를 새로 만들지 않는다.
- ModalDialog/BottomSheet/Card footer와 fixed purchase/order/mobile bar는 scroll·focus·safe-area·버튼 크기·배치 책임을 유지한다. 모달 액션 때문에 별도 ContentSection을 추가하지 않는다.

기본/제목만/설명 있음/custom header/no footer/conditional 제거/group action/header+footer만/form 연결 중 실제 변경 상태를 검증한다. PC/MO geometry와 의미 있는 조작을 비교하고 과거 조사 결과를 현재 검증으로 기록하지 않는다.
