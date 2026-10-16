# 지식 번들 변경 이력

## 2026-10-16

- **Feature**: Typography에 unstyled variant를 추가해 호출자 스타일과 네이티브 표현을 유지할 수 있도록 했다. [UI 아키텍처](architecture/ui.md)에 recipe 생략 범위와 플랫폼 선택 계약을 기록했다.

- **Fix**: 상품 상세 컬러 선택의 공통 Radio 스타일 충돌을 해소했다. PC는 너비에 맞춘 80px 열 그리드, 모바일만 가로 스크롤을 사용하고 크기·간격·선택 표시를 유지한다. 기존 스토리의 배치 회귀 검사와 [UI 아키텍처](architecture/ui.md)를 갱신했다.

- **Feature**: 상품 목록 목 데이터에 Daily Motion 3의 20% 할인 예시를 추가하고 카드·hover 미리보기에서 정상가를 ProductPrice까지 전달했다. 카드 할인 스토리와 [프로젝트 개요](project.md)·[UI 아키텍처](architecture/ui.md)를 갱신했다.

- **Feature**: ProductPrice에 선택적 originalPrice, 정상가 취소선과 자동 계산한 빨간 할인율을 추가하고 일반·할인·모바일·동일 가격 스토리 및 [UI 아키텍처](architecture/ui.md)를 갱신했다.

- **Refactor**: TermsDialog의 단일 확인 footer도 SingleActionDialog로 통일했다. tall/fullWidth 버튼, 확인 닫기와 모바일 fullscreen·scrollFade·버전 전환 계약을 유지했다.

- **Refactor**: SingleActionDialog로 확인 버튼 하나의 footer를 공용화하고 기가입·마케팅 수신내역·주소 입력 팝업에 적용했다. 버튼 크기/너비와 확인·닫기 콜백을 유지하고 공용 스토리 및 [UI 아키텍처](architecture/ui.md)를 갱신했다.

- **Refactor**: ConfirmDialog와 주소·로그아웃·기가입·마케팅 수신내역·약관 팝업을 공용 영역에 정리하고 기존 호출부를 연결했다. 마이페이지 주소 버튼을 공용 수동 입력 팝업으로 전환하고 공용 스토리·IA 링크와 [UI 아키텍처](architecture/ui.md)를 갱신했다. 빌드/정적 검사와 기존 회귀 테스트 결과, 브라우저 검증 미실행을 기록했다.

- **Refactor**: 기능별 JSX·국가/마이페이지/상품/가입/인증 모달 분리 구현을 반영했다. 계정 잠금의 중복 배경 제거와 공통 ModalDialog footer 사용 계약을 [UI 아키텍처](architecture/ui.md)에 보완했다.

- **Refactor**: 런클럽 스토리 분류와 공용 미리보기·IA 링크 변경을 독립 변경으로 반영했다. [UI 아키텍처](architecture/ui.md)에 기본 목록/상세 스토리 식별자를 명시했다.

- **Refactor**: 마이페이지 모달 5개와 휴대폰 인증 상세 모달을 기능 내부 컴포넌트로 분리했다. 상태·저장·삭제·단계 전환은 부모에 유지하고 알뜰폰 확인은 footer로 이전했다. 기존 독립 모달 유지 판단과 브라우저 확인 결과를 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Refactor**: 회원가입 우편번호 찾기를 기능 내부 AddressSearchModal로 분리하고 확인 버튼을 ModalDialog.footer로 옮겼다. 독립적인 값/콜백 API와 PC·모바일 controlled 스토리를 추가하고 [UI 아키텍처](architecture/ui.md)에 현재 수동 입력 계약을 기록했다.

- **Refactor**: 지정 레이아웃 9개 파일의 단일 스타일을 Panda JSX로 이전하고 모달 8곳의 액션을 공통 footer 슬롯으로 옮겼다. 기존 콜백과 반응형 계약, 브라우저 검증 결과를 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Fix**: 재입고 취소 다이얼로그 액션을 공통 ModalDialog footer 슬롯으로 옮겼다. 상품 이미지 뷰어의 메인 이미지·페이지네이션을 gap=0의 Grid 기반 ProductDetailViewerGallery로 분리하고 [UI 아키텍처](architecture/ui.md)에 계약을 기록했다.

- **Refactor**: 사용자 지정 run-club·product·mypage·locales·catalog 영역의 단일 사용 DOM/스타일을 Panda JSX로 이전했다. 런클럽 포스터/안내/빈 상태, 국가 선택 헤더/제목/목록, 마이페이지 breadcrumb·상품내역 5개 영역, 상품 상세 그리드/지원/액션, 배송·반품 안내 4개 영역을 기능 내부에서 분리했다. 기존 상태·콜백·반응형 값과 검증 범위를 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Refactor**: 사용자 지정 영역을 HomeCarouselRail·MainSectionHeader·ProductDetailsIdentity/Options·SiteHeaderInner·ProductDetailBody로 분리했다. MainSection·SiteHeaderContent 바깥 프레임을 Panda JSX props로 전환하고 DOM·반응형 값·상태 수명을 유지했다. 5개 화면의 분리 전후 구조·치수 비교와 검증 결과를 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Update**: RunClub Storybook을 `List`·`Detail` 하위 그룹으로 분리하고 공통 Preview를 공유했다. IA 200·258·259 미리보기 링크와 [UI 아키텍처](architecture/ui.md), [프로젝트 개요](project.md)를 새 story ID에 맞췄다.

- **Fix**: 확장 캐러셀 마지막 카드 뒤에 중앙 그리드 바깥 여백을 추가하고, 카드 간격을 오른쪽 한쪽에 배치해 끝에서 여백만큼 추가 클릭되던 snap 단계를 제거했다. 시작/끝 대칭 정렬·정확한 클릭 횟수·컨트롤 disabled 상태를 검사하는 Storybook play와 [UI 아키텍처](architecture/ui.md)를 갱신했다.

- **Update**: 중앙 최대 1532px과 일부 영역 확장 규칙을 공통 MainSection·HomeCarouselSection에 적용했다. 홈·상품 추천·런클럽 추천의 카드 계산을 통일하고, 헤더·푸터·상품 상세·세션 안내 정렬, 홈 테스트 항목 12개, 모바일 옵션 행 넘침을 정리했다. 대형 화면·빈 항목·단일 항목 스토리와 [UI 아키텍처](architecture/ui.md)를 갱신했다.

- **Update**: 헤더 홍보 데이터가 1개면 정적 콘텐츠만 표시하고 Carousel·Nav를 생략하도록 변경했다. 단일 데모 데이터와 개수별 Storybook 검사를 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Update**: CarouselViewport에 기본 slide·선택 fade 전환을 추가하고 헤더 홍보 배너에 cross-fade를 적용했다. Storybook에 효과·불투명도 검사를 추가하고 [UI 아키텍처](architecture/ui.md)에 설정을 기록했다.

- **Fix**: 헤더 홍보 안내 문구의 PC 타이포를 body3로 지정하고 회원 혜택 콘텐츠를 중앙 정렬했다. 조건부 justifyContent는 undefined로 생략하며 [UI 아키텍처](architecture/ui.md)에 계약을 기록했다.

- **Fix**: 홍보 Carousel의 프레임을 활성 콘텐츠 너비에 맞춰 줄이고 좌우 Nav 간격을 각각 35px로 고정했다. 텍스트 중앙 정렬과 인접 슬라이드 넘침 차단을 적용하고 PC·375px·320px 측정 결과를 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Update**: CarouselPagination의 점 너비·높이를 `size` prop으로 노출하고 기본값 5px을 유지했다. 비활성 너비 애니메이션에도 적용하고 [UI 아키텍처](architecture/ui.md)에 계약을 기록했다.

- **Update**: CarouselScrollbar의 높이·위쪽 여백을 `h`·`mt` props로 노출하고 기본값 20px·24px을 유지했다. CarouselViewport의 전달 props와 [UI 아키텍처](architecture/ui.md)를 갱신했다.

- **Update**: CarouselControls의 화살표 이름과 크기를 `iconName`·`iconSize` props로 노출했다. 기본값은 `carousel-arrow`·48px이며 버튼 크기도 같은 값을 따른다. [UI 아키텍처](architecture/ui.md)에 계약을 기록했다.

- **Fix**: 푸터 로고·모바일 메뉴 간격과 다중 펼침, 사업자 타이포·링크 밑줄 및 Shop 목록을 조정하고 [UI 아키텍처](architecture/ui.md)에 변경 내용과 검증 범위를 기록했다.

- **Refactor**: Carousel의 내부 Context·Viewport·Scrollbar·Pagination·Controls를 같은 폴더의 개별 파일로 분리했다. 기존 공개 import 경로와 props·동작·스타일을 유지하고 [UI 아키텍처](architecture/ui.md)에 책임 경계를 기록했다.

- **Update**: 복사된 홍보 슬라이드를 문구·버튼 종류가 다른 데모 데이터 4개로 교체하고 좌우 Nav를 추가했다. 공통 Carousel 컨트롤의 스타일 확장과 순환 모드 버튼 활성화를 보완하고 Storybook 순환·배치 검증을 추가했다.

- **Refactor**: 배너의 Carousel 구성과 슬라이드 스타일을 내부 `HeaderPromotionCarousel`로 분리하고 기존 4개 슬라이드·동작·스타일을 유지했다.

- **Update**: 헤더 회원 혜택 콘텐츠 4개를 기존 Carousel로 구성해 한 번에 하나씩 표시하고 스와이프로 순환하도록 변경했다. 버튼 종류별 배치와 50px 배너 높이를 유지했다.

- **Update**: 배너의 `buttonType`으로 문구와 정렬을 함께 선택한다. `details`의 “자세히 보기”는 HStack, `memberBenefits`의 “회원 혜택 자세히 보기”는 VStack이며 플랫폼과 무관하다.

- **Refactor**: 회원 혜택 배너 외곽을 `HStack as="aside"`와 Panda JSX 스타일 props로 바꿨다. 기존 반응형 값과 색상 명시도를 유지했다.

- **Refactor**: 헤더 회원 혜택 배너의 문구·링크·반응형 콘텐츠 스타일을 내부 `HeaderPromotionContent`로 분리했다. 기존 DOM·스타일·경로를 유지하고 [UI 아키텍처](architecture/ui.md)에 책임 경계와 작업 트리 출처를 기록했다.

## 2026-10-16

- **Update**: `/support/after-sales`의 A/S 처리현황을 Figma PC·모바일 배송 및 반품안내 화면으로 교체하고 메뉴명·탭·배송 안내 내용을 맞췄다. 내용 확인을 미룬 나머지 두 탭은 비활성화했다. [라우팅](architecture/routing.md)과 [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Fix**: 검색창과 공지사항 화면의 잘못된 `white.000` 배경 토큰을 `white.0`으로 바꿔 CSS 빌드 오류를 해소했다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Refactor**: 답변된 1:1 문의 행의 직접 구현한 펼침 상태를 공통 `Accordion`으로 이전하고, 미답변 행의 빈 클릭 동작을 제거했다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Fix**: 문의 등록 화면에서 공통 고객센터 제목·소개 문구 숨김을 취소하고 PC·모바일 모두 다시 표시한다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Refactor**: 1:1 문의 등록의 문의 유형·상세 유형 선택창을 기본 `Select`에서 공통 `Dropdown`으로 교체하고 필수 라벨과 기존 선택값을 유지했다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Refactor**: 1:1 문의 유의사항의 직접 구현한 열림 상태·버튼·화살표를 공통 `Accordion`으로 바꾸고 기본 펼침 상태와 목록 스타일을 유지했다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Refactor**: Figma FAQ 줄 탭을 공통 `FilterTabs`의 `line` 변형으로 추가하고 FAQ 카테고리 탭을 이전했다. PC·모바일 Storybook 사례를 추가했다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Fix**: FAQ 공통 검색창의 입력 포커스 outline을 제거해 외곽선이 겹쳐 보이지 않도록 했다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Refactor**: FAQ 검색 입력·돋보기·반응형 배치를 공통 `SearchField` molecule로 분리하고 FAQ에서 재사용한다. PC·모바일 Storybook 사례를 추가했다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Fix**: 공지사항 목록 첫 행 위와 펼친 행의 제목·내용 사이에 옅은 Divider를 추가했다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Refactor**: `FaqList`의 섹션 상단선과 답변 영역 스타일을 Panda Box 속성으로 옮기고 Accordion 슬롯에 필요한 CSS만 남겼다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Fix**: 고객센터 공통 소개 영역을 데스크톱 1200px 폭·좌우 34px 패딩으로 맞추고 모바일 페이지 여백은 유지했다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Fix**: 고객센터 메인 공지사항 미리보기의 제목 아래 강조선과 각 공지 행 아래 옅은 구분선을 공통 Divider로 표시했다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Fix**: 공지사항 목록의 PC 상단 강조선과 PC·모바일 행 구분선을 Panda Divider로 분리하고 행 높이·제목/날짜·더보기 배치를 최신 Figma에 맞췄다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Fix**: Figma 문의 등록 화면처럼 `/support/inquiries/new`에서 공통 고객센터 소개 영역을 PC·모바일 모두 숨기고 Breadcrumb과 사이드 메뉴는 유지했다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Update**: 고객센터 Figma에서 누락됐던 공지사항·1:1 문의 PC/모바일 화면을 확인하고 별도 라우트를 공통 고객센터 레이아웃에 연결했다. 공지 아코디언·모바일 상세, 문의 빈 상태·Q/A, 등록 폼과 재사용 유의사항을 적용했다. 구형 문의 구현을 제거하고 Storybook 화면을 추가했다. [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Update**: 최신 Figma 고객센터 메인 `327:5231`에 맞춰 Breadcrumb·소개·사이드 메뉴를 Support/FAQ 공통 `CustomerCenterLayout`으로 합치고 반복 상담 카드를 feature-local `SupportContactCard`로 추출했다. PC·모바일 공지 행·FAQ 미리보기와 FAQ 첫 질문 문구를 최신 시안에 맞췄으며, Support/FAQ PC·모바일 Storybook 화면을 추가했다. [UI 아키텍처](architecture/ui.md)에 재사용 경계와 화면 동작을 기록했다.
- **Update**: Figma 고객센터 메인 노드 `327:5231`을 기준으로 PC·모바일 상담 카드, 운영시간, 공지사항, FAQ 구성을 `SupportPage`에 적용했다. 공통 SideNavigation·FaqList·ButtonLink를 재사용하고 [UI 아키텍처](architecture/ui.md)에 화면 구성과 정적 공지 데이터 범위를 기록했다.
- **Fix**: PC 고객센터 메뉴를 Figma의 LNB에 맞춰 실제 항목명·순서, Help Center 타이포, 링크 간격, 불필요한 그룹 제목 숨김, 그룹 구분선으로 조정했다. 상세는 [UI 아키텍처](architecture/ui.md)에 반영했다.
- **Refactor**: 고객센터 본문의 배치·여백을 Panda JSX props로 옮기고 공통 SideNavigation에 support appearance를 추가해 메뉴 구조와 간격도 JSX에서 읽히도록 정리했다. 스타일 원칙과 적용 범위를 [UI 아키텍처](architecture/ui.md)에 기록했다.
- **Refactor**: SideNavigation 제목과 링크 텍스트를 공통 Typography heading7·heading9·body4/body5로 이전하고 자체 글자 스타일 CSS를 제거했다. [UI 아키텍처](architecture/ui.md)에 적용한 variant를 기록했다.
- **Fix**: 고객센터 메뉴는 현재 경로만 검정으로, 비선택 항목은 tertiary 회색으로 표시하도록 Typography tone을 연결했다. [UI 아키텍처](architecture/ui.md)에 상태별 색상 규칙을 반영했다.
- **Update**: Figma FAQ의 모바일 접힘·펼침과 데스크톱 펼침 화면을 `FaqPage`에 반영했다. 검색·8개 카테고리·첫 10개 표시·질문 아코디언을 기존 컴포넌트로 구성하고 [UI 아키텍처](architecture/ui.md)에 동작과 정적 데이터 범위를 기록했다.

## 2026-10-15

- **Update**: 헤더 회원 혜택 배너를 모바일에도 표시하고 두 줄 중앙 정렬·12px 안내와 링크를 추가했다. 첨부 이미지의 문구를 반영하고 [UI 아키텍처](architecture/ui.md)에 구현 출처·Figma 조회 제한·검증 범위를 기록했다.

- **Fix**: PR #30의 publishing 병합 충돌을 해결해 마이페이지 개별 화면·selectionLabel과 메뉴·러닝세션 Typography 추가를 모두 보존했다. 러닝세션 신청내역의 직접 연결에 맞춰 옛 이벤트 분기를 제거하고 양쪽 [UI 아키텍처](architecture/ui.md)·인덱스·변경 기록을 통합했다.

- **Fix**: 임직원 쿠폰의 고정 목록 ID를 인스턴스별 `useId()`로 바꿔 여러 영역의 `aria-controls` 대상 중복을 방지했다. 기존 펼침·접힘 동작과 검증 범위를 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Refactor**: 지정한 마이페이지·MyPage organism·SegmentedControl 범위를 점검해 러닝 프로필 화면과 쿠폰 카드를 내부 구성으로 분리했다. 밑줄형 버튼의 selectionLabel Typography 토큰을 추가하고 [UI 아키텍처](architecture/ui.md)에 보존 계약·전체 Base UI 가용성·후속 후보를 기록했다.

- **Refactor**: 회원정보의 세 섹션 경계선을 인라인 `borderTop`에서 Panda `Divider`로 바꾸고 기존 뒤 여백은 `Stack` 간격으로 유지했다. [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Update**: 회원정보 하단의 마케팅 수신 동의를 Figma의 세 행·우측 상태 정렬·24px/16px 간격으로 맞추고 모바일 쿠폰북 선택값을 추가했다. [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Fix**: 임직원 쿠폰을 한 번 접고 다시 펼친 뒤 칩이 잘못 줄바꿈되는 현상을 막기 위해 접힘 완료 시 `nowrap`을 복원하고 재클릭 시 대기 타이머를 취소했다. [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Update**: 임직원 쿠폰 펼침·접힘에 높이, 화살표, 가장자리 페이드 전환을 추가하고 움직임 감소 설정을 반영했다. [UI 아키텍처](architecture/ui.md)에 동작을 기록했다.

- **Fix**: 접힌 임직원 쿠폰 목록은 가로 한 줄 `nowrap`, 펼친 목록은 `wrap`이 되도록 수정했다. [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Update**: 임직원 쿠폰의 접힌 한 줄과 펼친 세 줄 레이아웃을 제공된 두 상태 이미지에 맞춰 조정했다. [UI 아키텍처](architecture/ui.md)에 줄 간격을 기록했다.

- **Update**: 쿠폰 페이지에 임직원 쿠폰 칩 목록을 추가하고 펼침·접힘 동작을 독립 `EmployeeCoupons` 컴포넌트로 분리했다. [UI 아키텍처](architecture/ui.md)에 구조를 기록했다.

- **Update**: 모바일 쿠폰 목록의 탭·총 개수·카드·더보기 버튼 간격과 카드 내부 제목·금액·조건·기간 간격을 Figma 노드 `753:18722`에 맞췄다. [UI 아키텍처](architecture/ui.md)에 수치를 기록했다.

- **Update**: 리워드 화면의 등급·회원 공통 혜택 번호를 CSS 목록 마커에서 `map` 인덱스와 `Typography`로 바꿔 본문과 같은 폰트를 적용했다. [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Update**: 마이페이지 회원 공통 혜택을 Figma 노드 `714:22146`와 대조해 네 묶음의 제목·혜택 문구·쿠폰 조건을 복원하고, 번호/불릿·모바일 타이포·여백을 반영했다. [UI 아키텍처](architecture/ui.md)에 수치와 출처를 기록했다.

- **Update**: 리워드 카드의 보조 혜택 `ul`에 원형 불릿(`disc`)을 명시해 목록 마커를 표시했다. [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Update**: 리워드 카드 혜택을 주항목과 작은 보조 설명으로 분리해 번호·불릿 계층과 모바일 타이포 크기를 바로잡았다. [UI 아키텍처](architecture/ui.md)에 목록 구조를 기록했다.

- **Update**: 리워드 등급 카드의 배경색과 원 안 이니셜 글자색을 공통 `--tier-color`로 연결했다. [UI 아키텍처](architecture/ui.md)에 Figma 색상 토큰 매핑을 기록하고 Panda CSS 생성을 확인했다.

- **Update**: Typography의 자동 언어 감지를 확인하고, 리워드 화면에서 영문·숫자 콘텐츠의 중복 `language="en"` 네 곳을 제거했다. [UI 아키텍처](architecture/ui.md)에 해당 계약을 반영했다.

- **Update**: 마이페이지 회원등급·리워드 화면에서 모바일 Figma 기준 Typography 지정값을 `variant`에서 `mo`로 옮겼다. [UI 아키텍처](architecture/ui.md)에 모바일 전용 지정 원칙을 기록했다.

- **Update**: 마이페이지 작성 완료 리뷰에 공용 `RatingStars`를 추가하고, 작성·수정한 별점과 본문을 화면 내부 상태에서 목록으로 연결했다. [UI 아키텍처](architecture/ui.md)에 데모 상태와 표시 계약을 기록했다.

- **Update**: 리뷰·쿠폰에서 반복하던 밑줄형 SegmentedControl 스타일을 공용 `variant="underline"`로 옮기고 두 호출부와 controlled Storybook 사례를 갱신했다. [UI 아키텍처](architecture/ui.md)에 새 표현 계약을 기록했다.

- **Update**: 마이페이지 Figma 8개 화면의 본문·제목·카드·목록 타이포를 다시 대조했다. 리뷰 날짜/구매, 리워드 이름/등급/금액, 쿠폰 금액, 재입고 신청일처럼 영문과 한글이 섞인 줄은 기존 Typography variant를 나눠 적용하고 [UI 아키텍처](architecture/ui.md)에 역할을 기록했다.

- **Update**: Figma의 마이페이지 8개 영역(리뷰, 회원등급, 쿠폰, 회원정보, 배송지, 관심상품, 최근 본 상품, 재입고 알림)을 기존 atoms·molecules와 공통 MyPageFrame으로 구성하고 모바일 Storybook 상태를 추가했다. 상품 색상 썸네일은 내려받은 Figma 자산을 사용하며 목록·폼 동작은 로컬 데모 상태다. [UI 아키텍처](architecture/ui.md)를 갱신했다.

- **Update**: 마이페이지 주문 카드가 공용 `ProductThumbnail`을 사용하도록 정리하고 96px 슬롯 크기를 레이아웃에 지정했다. Typography의 자동 언어 감지를 확인해 마이페이지 호출부에서 `Kr` 접미사를 제거했다. 프로필 이동은 공용 `ButtonLink`, 구분선은 Panda `Divider`를 사용한다. [UI 아키텍처](architecture/ui.md)를 갱신했다.

- **Update**: run-club 재사용 점검으로 DetailLayout·Filters를 추출하고 Hero의 메타데이터 준비를 Page로 옮겼다. Hero·Guide·Recommendations·SessionImage는 Panda JSX props로 정리하고 표·안내·placeholder 타입 스케일을 Typography로 통합했다. Base UI 전체 exports 대조와 유지·개선 근거는 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Update**: 첨부 디자인 기준으로 러닝세션 모바일 목록·빈 상태·상세·하단 고정 신청 버튼을 구현했다. feature 내부 Facts·ApplyButton·MobileActionBar를 조합하고 Typography 오버레이·포스터 variant 및 `PAGES/MYPAGE/RunClub` 모바일 상태 스토리를 추가했다. Figma 재인증 오류와 첨부 이미지 사용 승인을 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Fix**: 마이페이지 러닝세션 신청내역을 RunClubPage로 연결하고 옛 이벤트·대회 신청 임시 분기를 제거했다. 공통 메뉴 명칭과 IA 200·258·259 미리보기, `PAGES/MYPAGE/RunClub` Storybook 경로를 맞추고 [라우팅](architecture/routing.md)·[UI](architecture/ui.md)·[프로젝트 개요](project.md)에 기록했다.

- **Update**: 메뉴 제목을 기존 heading5·고객 지원을 heading9로 통합하고 미사용 navigationHeading variant·토큰·스토리를 제거했다. 광고 제목은 PC·모바일 24px로 맞췄다. 최종 간격과 타이포그래피 계약을 [UI 아키텍처](architecture/ui.md)에 정리하고 타입 검사·변경 파일 lint·Storybook 빌드·OKF 검사를 통과했다.

- **Update**: 첨부 디자인에 맞춰 MenuDrawer 고객 지원 아이콘 슬롯을 24×24px Flex 시작 정렬로 변경하고 텍스트 gap을 8px로 맞췄다. 아이콘 자체의 16px 크기는 유지하고 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Fix**: MenuDrawer Sale 텍스트의 굵기를 Typography weight=medium으로 직접 지정해 body3 기본 굵기가 부모 medium을 덮는 문제를 수정했다. [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Update**: MenuDrawer 상세 Accordion 패널 여백을 pt=4·pb=6으로 변경하고 [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Update**: MenuDrawerGroups의 하위 링크 목록을 Stack as=ul로 이전하고 목록용 css를 제거했다. 기존 링크 간격·목록 의미를 유지하고 [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Fix**: MenuDrawer 뒤로가기 내용이 가운데 배치되는 문제를 버튼 자체의 flex 시작 정렬로 수정했다. IconButton·기존 크기·ref는 유지하고 [UI 아키텍처](architecture/ui.md)에 정렬 계약을 기록했다.

- **Update**: MenuDrawerBackButton을 styled.button에서 공통 IconButton으로 변경했다. size=auto와 local Panda css로 행 전체 클릭 영역·패딩·포커스 ref를 유지하고 [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Update**: MenuDrawer 고객 지원 메뉴를 Panda JSX로 이전하고 뒤로가기의 정렬·간격을 Flex props로 지정했다. 클릭 영역·포커스·ref·safe area를 보존하고 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Update**: MenuDrawerNavigation의 외곽 cva를 Box JSX props로 이전하고 뒤로가기 버튼·스타일을 내부 MenuDrawerBackButton으로 분리했다. 기존 여백·포커스 ref·접근성 이름을 유지하고 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Update**: MegaMenuAD의 slot recipe를 styled(Link)·Panda JSX props로 이전했다. PC·모바일 값과 포커스·Typography 의미를 보존하고 [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Update**: MegaMenuPanel의 목록·광고 배치를 내부 `MegaMenuContent`로 분리했다. 기존 Grid 치수·여백과 Panel의 키보드 경계 동작을 유지하고 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Update**: MenuDrawer 쇼핑 목록을 `Stack as="ul" gap="0"`로 이전하고 목록용 css를 제거했다. 행의 클릭 영역·가로 정렬은 유지하며 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Update**: MenuDrawer의 Best·카테고리·런칭캘린더를 link/category 타입의 단일 목록과 공통 제목·아이콘 렌더링으로 정리했다. 순서·이동·화살표 표시를 보존하고 [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Update**: MenuDrawer 기본 쇼핑 메뉴와 행 스타일을 내부 `MenuDrawerShoppingLinks`로 분리했다. Base에는 목록·광고의 Stack 조합을 남기고 [UI 아키텍처](architecture/ui.md)에 책임을 기록했다.

- **Update**: MenuDrawer 기본 메뉴와 광고를 내부 `MenuDrawerBase`로 분리하고 광고의 `mt: 56px`를 `Stack gap="56px"`로 이전했다. [UI 아키텍처](architecture/ui.md)에 소유 책임을 반영했다.

- **Update**: 모바일 전체 메뉴의 공통 행을 49px 최소 높이에서 py=4로 변경하고 버튼의 패딩 초기화를 px=0으로 제한했다. [UI 아키텍처](architecture/ui.md)에 높이 계산 방식과 브라우저 패딩 검증 결과를 기록했다.

- **Update**: HOME 베스트셀러의 긴 상품명이 옆 카드와 겹치는 문제를 수정했다. ProductDetails 내부 VStack 너비를 카드에 맞춰 기존 ProductName 말줄임이 적용되도록 하고 브라우저 확인 결과를 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Update**: `components/`·`features/`의 311개 TSX를 재사용 스킬로 점검하고 48개 파일의 일회성 스타일 선언 66개를 Panda JSX props로 이전했다. 동등한 토큰을 우선하며 계정 잠금 해제·계정 찾기의 실제 Stack 간격 8px을 보존했다. [UI 아키텍처](architecture/ui.md)에 기존 조합·공유 스타일 유지 근거, Base UI 카탈로그 대조와 후속 후보를 기록했다.

- **Update**: `MenuDrawer/`를 재사용 스킬로 재점검하고 상세 Accordion·하위 링크·펼침 표시를 내부 `MenuDrawerGroups`로 분리했다. 기존 메뉴별 초기화·단일 열기·라우팅을 보존하고 스토리에 최초 닫기 버튼과 상세 뒤로가기 버튼의 포커스 검증을 추가했다. [UI 아키텍처](architecture/ui.md)와 [Organisms 점검](architecture/organisms.md)에 유지 판단을 기록했다.

- **Update**: `HeaderAuthLink` 간격을 PC `1.5`, 모바일 `2px`로 구분하고 [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Update**: 메뉴 헤더의 닫기 버튼을 `IconButton`으로 교체하고 기존 크기·접근성 이름·포커스 표시를 유지했다. 공통 버튼 타입에 ref 지원을 추가하고 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Update**: 모바일 전체 메뉴의 로그인/회원가입을 각각 `/login`·`/signup` 링크로 분리하고 Divider를 배치했다. 기존 `HeaderAuthLink`에 선택적 `onNavigate` 콜백을 추가해 재사용하고 두 링크 선택 시 메뉴를 닫는다. 로그인 상태의 마이페이지 링크는 유지한다.

- **Update**: 모바일 전체 메뉴의 Accordion을 단일 열기 모드로 변경했다. 다른 그룹을 열면 기존 그룹을 닫고 열린 그룹을 다시 누르면 모두 닫을 수 있다. 기존 Navigation 스토리를 이 동작에 맞게 수정하고 [UI 아키텍처](architecture/ui.md)와 [Organisms 재사용 점검](architecture/organisms.md)에 반영했다.

- **Update**: 사용자 지정 `organisms` 범위를 재사용 스킬로 점검했다. 메뉴의 프레임·헤더·탐색·지원 영역을 분리하고 웹/모바일 광고 카드를 `MegaMenuAD`로 통합했다. 공통 Accordion의 제어형 API를 FAQ에 적용하고 FAQ·매장 목록의 feature 데이터 타입 의존을 제거했다. 메뉴 Typography 스케일과 스토리를 추가하고 [Organisms 재사용 점검](architecture/organisms.md)에 전체 Base UI 카탈로그 대조, 유지 판단과 후속 후보를 기록했다.

- **Update**: 모바일 전체 메뉴를 로그인 헤더, 카테고리 상세 전환, 공통 Accordion, Clifton UTL 배너와 한국어 고객 지원 링크로 변경했다. 웹 `megaMenus` 데이터를 재사용하고 Free Solid 아이콘과 제공된 멤버십 SVG를 적용했다. 로그인 상태 전달, 뒤로가기 포커스 복귀와 재진입 초기화를 [UI 아키텍처](architecture/ui.md)에 기록했다.

## 2026-10-14

- **Update**: 런클럽 배지 높이를 52px에서 28px로 조정한 시각적 변경을 구조 개선과 별도 커밋으로 분리하고 [UI 아키텍처](architecture/ui.md)에 반영했다.

- **Update**: 지정한 국가 선택·본인 인증·계정 찾기·상품 목록·계정 잠금 기능을 재점검했다. 국가 데이터/레이아웃/지역 목록, 비밀번호 재설정 화면/필드/순수 검증, 계정 잠금의 표시/이동을 분리하고 localeHeading 토큰과 지역 접근성 ID를 정리했다. 관련 스토리·순수 규칙 테스트와 [UI 아키텍처](architecture/ui.md), [변경 검증](development/verification.md)을 갱신했다.

- **Update**: 공통 컴포넌트 네 계층을 점검해 controlled `RatingInput`을 추가하고 리뷰 별점 선택을 이전했다. ModalDialog의 제목/닫기·고정 푸터를 내부 부품으로 분리하고 DescriptionList의 readonly/id 계약과 Panda 스타일을 정리했다. 관련 Storybook 시나리오와 [UI 아키텍처](architecture/ui.md)의 보존 계약·유지 판단을 갱신했다.

- **Update**: 추가 지정된 9개 기능 폴더를 점검해 Home·Signup·ProductDetail 프레임과 약관 상세 모달을 기능 내부에 분리했다. 러닝 프로필·세션 제목을 Typography 토큰으로 이전하고 상품 텍스트의 색상 상속 API를 정리했다. 기존 catalog·계정 찾기·본인 인증 조합의 유지 근거와 후속 후보를 [UI 아키텍처](architecture/ui.md)에 기록했다.

- **Update**: README를 현재 HOKA 퍼블리싱·데모 구현에 맞춰 정리했다. `/checkout` 구현 여부, 63개 경로 패턴, 실행·검증 명령, Panda 스타일·컴포넌트 조합과 상태 수명 안내를 갱신하고 [프로젝트 개요](project.md)의 주문/결제 미구현 설명을 바로잡았다. 근거는 현재 작업 트리의 README, App Router 페이지, ShopShell, 주문/결제 코드와 package.json·테스트다.

- **Update**: 모든 Storybook 스토리를 `src/stories/`에 작성하도록 `AGENTS.md` 기본 지침을 추가하고, `src/shared/features/mypage/MyPage.stories.tsx`를 `src/stories/features/mypage/`로 옮겼다. 기존 탐색 설정이 해당 경로만 포함함을 확인하고 [UI 아키텍처](architecture/ui.md)에 배치 규칙과 작업 트리 출처를 반영했다.

- **Update**: 로그인 기능을 Layout·Form·Actions·Membership로 분리하고 기존 상태·검증·이동 처리를 유지했다. `loginTitle` Typography 토큰으로 PC 36px·모바일 22px 제목 스케일을 공통화하고 실제 LoginPage를 사용하는 controlled Storybook 흐름을 추가했다. [상태](architecture/state.md)와 [UI](architecture/ui.md)에 책임·보존 계약을 반영했다.

- **Update**: 구조 조합 기준으로 헤더의 sticky 영역·콘텐츠 슬롯을 기존 organism 내부에 분리했다. 주문/결제는 Layout·Content·Fields·Summary와 순수 합계 계산으로 나누고 32px `pageTitle` Typography 토큰과 PC/모바일·상태별 스토리를 추가했다. [UI 아키텍처](architecture/ui.md)에 책임·슬롯·보존 계약을, [변경 검증](development/verification.md)에 합계 테스트 명령을 반영했다.

- **Update**: features/components 재사용 점검에서 쿠폰·리뷰 필터를 `SegmentedControl`로 통합하고 표현 확장 API·빈 문자열 값 처리를 추가했다. 상품 상세 스크롤 메뉴의 의미와 Drawer의 Escape 처리 책임을 정리하고 관련 Storybook 시나리오를 추가했다. [UI 아키텍처](architecture/ui.md)에 반영 내용과 후속 후보를 기록했다.

- **Review**: 코드 리뷰 잔여 지적(영국 국기 자산, Clifton 상품 색상·갤러리, FAQ 답변 검색, 캐러셀 마지막 슬라이드 판정, 모달 닫기·확인 이동)을 수정했다. [UI 아키텍처](architecture/ui.md), [프로젝트 개요](project.md), [라우팅과 플랫폼](architecture/routing.md)에 반영했다.
- **Update**: 이름 검증과 3분 인증 타이머를 `src/shared/lib/`로 공통화했다. [UI 아키텍처](architecture/ui.md)의 코드 배치에 반영했다.
- **Update**: 최상위 선언 사이 빈 줄 규칙(`AGENTS.md`)을 `src` 전체 62개 파일에 일괄 적용했다. 동작 변경은 없고 [UI 아키텍처](architecture/ui.md)의 스타일 기준에 반영했다.
- **Update**: `/checkout` 주문/결제 화면을 추가하고 [라우팅과 플랫폼](architecture/routing.md)의 경로 표와 라우트 회귀 테스트에 반영했다. 상품 목록 링크의 필터 값(`cushioning`, `support`, `activity`, `collection`)을 목 상품 데이터에 맞췄다.
- **Review**: 코드 리뷰 지적에 따른 UI 수정(Run Club 링크 `href`, 목록 프로모션 카드 삽입·정렬·초기화, `platform-*` 클래스를 `<body>`에 추가, ButtonLink의 `role` 제거, Hero 일시정지 조건 등)을 검토했다. [UI 아키텍처](architecture/ui.md)의 기술 내용과 충돌하지 않아 문서 내용 변경은 없다.
- **Review**: 검색 오버레이의 검색 범위 쿼리 파라미터를 `category`에서 `scope`로 바꾼 변경을 검토했다. [UI 아키텍처](architecture/ui.md)에 검색 쿼리 파라미터 설명이 없어 문서 내용 변경은 없다.

- **Update**: Windows에서 Git 훅을 직접 실행하던 회귀 테스트를 Git 커밋을 통한 검사로 바꾸고 PowerShell 종료 코드 테스트를 추가했다. 글로벌 Git 설정을 빈 임시 파일로 격리하도록 수정하고 [변경 검증](development/verification.md)에 반영했다.

- **Update**: 로컬 graft 연동 스크립트 `.claude/helpers/**`를 ESLint 검사에서 제외하고 [변경 검증](development/verification.md)에 반영했다.
- **Update**: OKF 훅과 npm 명령의 PowerShell 호환성을 검토하고 `scripts/okf.ps1` 설치·검사 진입점과 `npm.cmd` 사용 예시를 추가했다.

- **Update**: 소스 변경 후 문서 갱신을 안내하는 Codex·Claude 훅과 Git pre-commit 누락 검사를 추가했다. [유지보수](maintenance.md), [설치](development/setup.md), [검증](development/verification.md) 절차에 반영했다.

- **Initialization**: OKF v0.2 지식 번들을 구성하고 [프로젝트 개요](project.md), [아키텍처](architecture/index.md), [개발 절차](development/index.md), [유지보수](maintenance.md)를 작성했다.
- **Integration**: 루트 README와 AGENTS.md에서 이 번들의 진입점을 연결하고, 커밋 스킬이 참조하는 [워크트리 절차](development/worktrees.md)를 추가했다.
