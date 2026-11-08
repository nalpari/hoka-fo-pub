# 2026-11-06 퍼블 변경사항 보고서

- 시작 커밋(포함) `3719352bb2fbe33689e1bdb5cf4302816f150886` · Merge commit '8c74d21b85dc9727437c25183ac18c9293b55bb2' into pub-jme
- 비교 `afd761632bdbfd7a3dfe77b28c6b39f5cb2212b5` → `b8c16b33aea8306d9454fb2ddcdf7c91e48fe44b` · 수집 2026-11-06 11:07:59 KST
- 원본 diff 44개, 보고 대상 7개 · Markdown 11개, 가이드 1개, IA 자체 7개 및 실적 0% 전용 파일 18개 제외
- IA와 담당자 매핑은 수집 시 작업 트리 `b8c16b33aea8306d9454fb2ddcdf7c91e48fe44b` 기준. [비교 diff](https://github.com/nalpari/hoka-fo-pub/compare/afd761632bdbfd7a3dfe77b28c6b39f5cb2212b5...b8c16b33aea8306d9454fb2ddcdf7c91e48fe44b)

## 개발자별 전달 사항

- 성인환 · 검색 결과 제목의 PC/MO 타이포그래피와 검색 오버레이를 확인합니다.
- 공통 UI · 비밀번호 토글, 전역 헤더의 배지·아이콘·검색 해시를 확인합니다.

## 최종 유효 변경

<table><thead><tr><th>개발담당자</th><th>메뉴 / 화면</th><th>변경사항</th><th>변경 파일 * Before</th><th>변경라인 * After</th></tr></thead><tbody>
<tr><td rowspan="5">공통 · 성인환</td><td>공통 UI · 아이콘 자산</td><td rowspan="1">기존 장바구니 SVG를 삭제한다. 등록 아이콘과 전역 헤더의 호출부 변경을 함께 확인한다.</td><td><a href="https://github.com/nalpari/hoka-fo-pub/blob/afd761632bdbfd7a3dfe77b28c6b39f5cb2212b5/public/images/icon/hoka-basket-shopping-regular.svg#L1">public/images/icon/hoka-basket-shopping-regular.svg</a><br>삭제</td><td>1–5 → 없음</td></tr>
<tr><td>공통 UI · 아이콘 레지스트리</td><td rowspan="1">사용이 정리된 hoka-basket-shopping-regular 항목을 아이콘 레지스트리에서 제거한다.</td><td><a href="https://github.com/nalpari/hoka-fo-pub/blob/b8c16b33aea8306d9454fb2ddcdf7c91e48fe44b/src/components/common/atoms/Icon.assets.ts#L270">src/components/common/atoms/Icon.assets.ts</a><br>수정</td><td>271–274 → 없음</td></tr>
<tr><td>공통 UI · 검색 헤더</td><td rowspan="1">SearchHeader의 닫기 아이콘을 xmark-regular 20px로 바꾼다. 검색 오버레이와 상품 목록·검색 사용처에 영향이 가능하다.</td><td><a href="https://github.com/nalpari/hoka-fo-pub/blob/b8c16b33aea8306d9454fb2ddcdf7c91e48fe44b/src/components/common/organisms/Search/SearchHeader.tsx#L19">src/components/common/organisms/Search/SearchHeader.tsx</a><br>수정</td><td>19 → 19</td></tr>
<tr><td>공통 UI · 전역 헤더/GNB</td><td rowspan="1">NotificationCount 숫자 기본색을 검정으로 변경하고 배지 위치·줄 높이를 조정한다. HeaderAccount 관심상품 바로가기를 제거하고 검색·메뉴 아이콘 크기를 조정한다. SiteHeader는 #site-search-panel 해시로 검색 패널을 연다.</td><td><a href="https://github.com/nalpari/hoka-fo-pub/blob/b8c16b33aea8306d9454fb2ddcdf7c91e48fe44b/src/context/ShopShell.tsx#L1970">src/context/ShopShell.tsx</a><br>수정</td><td>1971 → 없음<br>2031 → 2030<br>2041–2042 → 2040–2041<br>2056 → 2055<br>2075 → 2074<br>2077 → 2076<br>2116–2120 → 2115<br>2130 → 2125<br>2132 → 없음<br>2139 → 2133<br>2148–2153 → 2142<br>2162 → 없음<br>2168–2174 → 2156<br>2267 → 2249<br>2273–2274 → 2255–2262<br>없음 → 2480<br>2508 → 2497<br>2512 → 2501<br>없음 → 2632–2643<br>2654 → 없음</td></tr>
<tr><td>공통 UI · 헤더 타입</td><td rowspan="1">NotificationIconVariant에서 basket을 제거해 공통 헤더 아이콘 타입을 실제 구현에 맞춘다.</td><td><a href="https://github.com/nalpari/hoka-fo-pub/blob/b8c16b33aea8306d9454fb2ddcdf7c91e48fe44b/src/types/component-contracts/context-ShopShell.d.ts#L358">src/types/component-contracts/context-ShopShell.d.ts</a><br>수정</td><td>358 → 358</td></tr>
<tr><td rowspan="1">성인환</td><td>공통 &gt; 검색결과 &gt; 목록 · STATE: /search</td><td rowspan="1">ProductListTitle의 모바일 제목을 heading5로 통일하고 22px 수동 덮어쓰기를 제거한다. PC heading7과 결과 건수는 유지한다. 보고 대상은 검색 결과 화면입니다.</td><td><a href="https://github.com/nalpari/hoka-fo-pub/blob/b8c16b33aea8306d9454fb2ddcdf7c91e48fe44b/src/components/catalog/ProductListingPage.tsx#L1036">src/components/catalog/ProductListingPage.tsx</a><br>수정</td><td>1037 → 없음<br>1043 → 1042<br>1046–1053 → 1045<br>1408 → 없음</td></tr>
<tr><td rowspan="1">공통 · 반자은</td><td>공통 UI · 비밀번호 입력</td><td rowspan="1">TextInput 비밀번호 토글 아이콘을 현재 표시 상태에 맞춰 바꾸고 18px 및 black.60 톤을 적용한다. 로그인·회원가입·비밀번호 입력에 영향이 가능하다.</td><td><a href="https://github.com/nalpari/hoka-fo-pub/blob/b8c16b33aea8306d9454fb2ddcdf7c91e48fe44b/src/components/common/atoms/TextInput.tsx#L219">src/components/common/atoms/TextInput.tsx</a><br>수정</td><td>219 → 219</td></tr>
</tbody></table>

## 공통 영향과 검증 범위

- 비교 전후의 정적 import 그래프를 역추적했습니다. 상품 목록 모듈은 상품·검색 진입점 5개, TextInput은 page/layout 진입점 84개와 연결됩니다. 후자는 비밀번호 입력을 쓰는 경우에 영향이 가능합니다. 전역 헤더는 루트 레이아웃에서 공유됩니다.
- 삭제된 SVG 이름의 제품 호출은 종료 SHA의 src에서 확인되지 않았습니다. 이미지 추가는 바이너리로 집계했습니다.
- 파일별 hunk와 IA 연결을 대조했습니다. 제품 PC/MO 상호작용과 외부 서비스 연동은 실행하지 않았습니다.

## WBS 진척도

- [Schedule](https://docs.google.com/spreadsheets/d/1BAxtSHBSp8DguH0gv2EbnEpqHZhZEez66eyTSmAcG6w/edit?gid=1070650770#gid=1070650770) · 2026-11-06 11:09:53 KST 조회 · FO 개발의 B열 WBS 번호와 AB열 실적을 사용했습니다.
- 상품상세(5.3.2.2.2)와 상품목록(5.3.2.2.3.1)은 실적 0%로 보고에서 제외했습니다. 상품 목록·검색 공용 파일은 실적 80%인 검색 결과 범위로 표시합니다.
- 비교 기준은 IA의 `wbsActualSnapshot.json`에 기록된 Schedule.html 내보내기 값입니다.
- IA 연결 WBS 48개 모두 매칭 · **변경 0개, 누락 0개**. FO 개발 전체 85개의 값도 저장값과 같습니다.
