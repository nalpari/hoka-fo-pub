---
type: Reference
title: '퍼블리싱 인계 스킬 통합과 이전 스킬 제거'
description: '개인 hoka-markup-handoff 사용과 저장소 component-reusability 제거 범위를 설명한다.'
tags: [skills, publishing, component-ownership]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-30T01:19:46Z'
source_revision: 27b7e2f5b2c5e21681af53df27a535f3f13aa170
working_tree_sources:
  - AGENTS.md
  - README.md
  - .codex/skills/component-reusability/
external_local_sources:
  - C:/Users/stead/.codex/skills/hoka-markup-handoff/SKILL.md
sources:
  - id: retired-skill
    resource: https://github.com/nalpari/hoka-fo-pub/blob/27b7e2f5b2c5e21681af53df27a535f3f13aa170/.codex/skills/component-reusability/SKILL.md
    title: '삭제 전 컴포넌트 재사용 스킬'
---

# 퍼블리싱 인계 스킬 통합과 이전 스킬 제거

2026-10-30 사용자 요청으로 저장소 `.codex/skills/component-reusability/`의 스킬과 참조 문서 9개를 삭제했다. 개인 설치 `hoka-markup-handoff`에 구조·재사용·폼·Panda·반응형·Next.js 기준을 통합한 뒤 중복 스킬을 제거한 것이다. 이전 스킬 원문은 고정된 Git 출처로 확인할 수 있다.[^retired-skill]

현재 원칙은 승인된 인계 범위의 서비스·시연 흐름 제거다. HTML·표시·접근성·반응형·최소 로컬 UI와 범위 밖 계약은 유지한다. 기존 서비스 동작을 보존하는 별도 모드를 두지 않는다. 이 결정은 앱 전체를 자동으로 변경하는 허가가 아니며 이번 삭제 작업은 애플리케이션 소스를 수정하지 않는다.

AGENTS.md의 활성 지침은 설치된 `hoka-markup-handoff`의 resource 경로를 사용하고 README의 이전 스킬 복사 명령은 제거했다. OKF의 역사적 스킬 출처와 설명은 보존하며 삭제된 파일을 가리키던 local Markdown 링크는 삭제 전 커밋의 GitHub 링크로 전환했다.

`hoka-markup-handoff`는 개인 Codex skills 폴더에 있으며 이 Git 저장소에 포함되지 않는다. 다른 환경에서는 별도로 설치해야 한다. 개인 스킬의 편집·설치는 이 커밋으로 배포되지 않는다.

이번 커밋은 위 삭제와 직접 관련 문서만 포함한다. 같은 작업 트리의 다른 화면·preview·OKF 변경은 포함하지 않는다. 검증은 삭제 범위·활성 참조·역사적 링크·선별 staged diff와 OKF 검사에 한하며 앱 빌드는 수행하지 않는다.
