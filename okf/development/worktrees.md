---
type: Playbook
title: '워크트리와 Git 작업'
description: '작업 분리, 브랜치 이름과 커밋·푸시 절차를 안내한다.'
tags: [git, worktree, workflow]
status: draft
generated:
  by: codex/gpt-6
  at: '2026-10-14T06:02:14Z'
source_revision: b3f7243062b500eb4909961667ad142cc368ff91
sources:
  - id: -agents-skills-hoka-cnp-skill-md
    resource: https://github.com/nalpari/hoka-fo-pub/blob/b3f7243062b500eb4909961667ad142cc368ff91/.agents/skills/hoka-cnp/SKILL.md
    title: '.agents/skills/hoka-cnp/SKILL.md'
---

# 워크트리와 Git 작업

이 문서는 로컬 작업을 분리하고 원격 브랜치 충돌을 피하기 위한 작업 절차다. 이 저장소에 워크트리 자동화 도구가 설치되어 있다는 뜻은 아니다.

## 작업 시작

`git status --short`, 현재 브랜치와 변경 내용을 먼저 확인한다. 기존 변경을 임의로 되돌리거나 다른 작업의 파일을 커밋에 포함하지 않는다. 같은 디렉터리에서 여러 작업을 수행할 때는 편집 범위를 분리한다.

워크트리가 필요하면 기존 워크트리 목록을 확인하고 사용할 기준 커밋·브랜치를 정한다. 생성할 때는 Git 또는 현재 작업 환경이 제공하는 워크트리 도구를 사용한다. 로컬 미커밋 변경이 새 워크트리로 자동 복사된다고 가정하지 않는다.

## 브랜치 이름

사용자가 정한 이름이 없으면 `codex/<작업명>`을 기본으로 사용한다. 작업명은 짧은 소문자와 하이픈으로 표현한다. 새 이름을 선택하기 전에 로컬 브랜치와 원격의 동일 이름을 확인한다.

upstream이 없는 브랜치를 처음 푸시하기 전:

```sh
git branch --show-current
git ls-remote --heads origin <현재-브랜치명>
```

동일 이름이 원격에 있으면 그 브랜치에 덮어쓰거나 강제로 푸시하지 않는다. 기존 브랜치를 이어가는 작업인지 확인한다. 새 작업이라면 `codex/<작업명>-<구분자>`처럼 다른 이름을 정하고 로컬·원격 충돌 여부를 다시 확인한다. 구분자는 날짜나 짧은 작업 구분값을 사용한다.

원격 조회가 실패했다면 이름이 비어 있다고 판단하지 않는다. 원격 상태를 확인한 뒤 첫 푸시를 진행한다.

## 커밋과 푸시

사용자가 요청한 경우 `.agents/skills/hoka-cnp/SKILL.md`를 적용한다. 의도별로 나누고 `type: 한글 subject` 형식으로 메시지를 작성한다. 대상 파일을 명시적으로 스테이징하고 계획을 먼저 보여준다.

upstream이 없고 이름 충돌이 없으면 `git push -u origin HEAD`를 사용한다. upstream이 있으면 해당 원격 브랜치에 일반 푸시한다. 보호된 `main`·`master`의 푸시가 거절되면 임의로 우회 브랜치를 만들지 않고 사용자에게 결과를 알린다.

## 작업 종료

필요한 미커밋 변경을 보존한 상태에서 작업 트리를 정리한다. 워크트리와 브랜치 삭제는 복구할 작업이 남아 있는지 확인하고 명시적으로 요청된 범위에서 수행한다. 미사용 워크트리 정리를 위해 강제 삭제나 `git reset --hard`를 기본으로 사용하지 않는다.

[변경 검증](verification.md)을 함께 확인한다.
