import type { ScreenDefinition } from '@/data/screenRegistry';

const storybookReadyIaNumbers = new Set([
  1, 158, 200, 223, 224, 226, 227, 229, 230, 231, 233, 234, 235, 236, 237, 238, 251, 252, 253, 254,
  255, 256, 257, 258, 259,
]);

const storybookReadyScreenCodes = new Set(['eland_hca_01', 'eland_hut_01']);

const storybookPendingIaNumbers = new Set([225, 228]);

const storybookWorkingScreenCodes = new Set(['eland_hca_02']);

const storybookWorkingScreenCodePrefixes = ['eland_hlo_'];

export function isStorybookReady(iaNumber: number, screenCode: string) {
  return storybookReadyIaNumbers.has(iaNumber) || storybookReadyScreenCodes.has(screenCode);
}

export function isStorybookPending(iaNumber: number) {
  return storybookPendingIaNumbers.has(iaNumber);
}

export function isStorybookWorking(screenCode: string) {
  return (
    storybookWorkingScreenCodes.has(screenCode) ||
    storybookWorkingScreenCodePrefixes.some((prefix) => screenCode.startsWith(prefix))
  );
}

export type ScreenProgress = {
  pcDesign: 'received' | 'missing' | 'revision-planned' | null;
  moDesign: 'received' | 'missing' | 'revision-planned' | null;
  pcPublishing: 'ready' | 'revision' | 'working' | 'pending';
  moPublishing: 'ready' | 'revision' | 'working' | 'pending';
};

export type ScreenProgressOverrides = Readonly<Partial<Record<number, Partial<ScreenProgress>>>>;

// 2026-10-29 Figma 데스크탑의 Main / PLP / PDP > HOKA RUN CLUB에서 확인했습니다.
// PC / HOKA RUN CLUB / List, Detail 및 Mobile / HOKA RUN CLUB / List, Detail.
// https://www.figma.com/design/soQFEF6eeDjnQP7wY9Q96M/Main---PLP---PDP?node-id=2536-2823
// 사용자 기준: PC/MO 최종 화면 프레임이 있으면 수급, 확인 범위에서 못 찾으면 미수급입니다.
const confirmedDesignReceipts: Partial<
  Record<number, Pick<ScreenProgress, 'pcDesign' | 'moDesign'>>
> = {
  // [HOKA]Design > 로그인/ID찾기/비밀번호 찾기: Desktop/Mobile Login 및 계정 흐름.
  // https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1-18
  223: { pcDesign: 'received', moDesign: 'received' },
  224: { pcDesign: 'received', moDesign: 'received' },
  226: { pcDesign: 'received', moDesign: 'received' },
  227: { pcDesign: 'received', moDesign: 'received' },
  229: { pcDesign: 'received', moDesign: 'received' },
  // 첨부 로그인 디자인(2026-10-29)에서 MO 잠금 안내·비밀번호 변경완료 모달도 확인했습니다.
  251: { pcDesign: 'received', moDesign: 'received' },
  252: { pcDesign: 'received', moDesign: 'received' },
  253: { pcDesign: 'received', moDesign: 'received' },
  254: { pcDesign: 'received', moDesign: 'received' },
  // [HOKA]Design > 마이페이지: Desktop / MY Page, Product Reviews, 회원등급.
  // Mobile은 쿠폰, 러닝세션 신청내역, 회원정보, 배송지, 관심/최근/재입고 상품 프레임도 있습니다.
  // https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=389-9339
  177: { pcDesign: 'received', moDesign: 'received' },
  182: { pcDesign: 'received', moDesign: 'received' },
  183: { pcDesign: 'received', moDesign: 'received' },
  184: { pcDesign: 'received', moDesign: 'received' },
  191: { pcDesign: 'received', moDesign: 'received' },
  195: { pcDesign: 'received', moDesign: 'received' },
  // 첨부 마이페이지 디자인에서 PC 전용 배치와 각 PC/MO 화면을 추가 확인했습니다.
  196: { pcDesign: 'received', moDesign: 'received' },
  200: { pcDesign: 'received', moDesign: 'received' },
  201: { pcDesign: 'received', moDesign: 'received' },
  202: { pcDesign: 'received', moDesign: 'received' },
  203: { pcDesign: 'received', moDesign: 'received' },
  204: { pcDesign: 'received', moDesign: 'received' },
  205: { pcDesign: 'received', moDesign: 'received' },
  // [HOKA]Design > 메인/ 상품리스트 / 상세페이지: PC / Main, Mobile / Main.
  // https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=1181-38880
  1: { pcDesign: 'received', moDesign: 'received' },
  // [HOKA]Design > 회원가입: Desktop/Mobile Join, 휴대폰 인증, 약관, 정보입력, 부가정보, 모달.
  // https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=127-1333
  233: { pcDesign: 'received', moDesign: 'received' },
  234: { pcDesign: 'received', moDesign: 'received' },
  235: { pcDesign: 'missing', moDesign: 'missing' },
  236: { pcDesign: 'received', moDesign: 'received' },
  237: { pcDesign: 'received', moDesign: 'received' },
  // 최초 검색에서는 Desktop 프레임만 발견했으나 2026-10-29 사용자가 MO 수급을 확인했습니다.
  238: { pcDesign: 'received', moDesign: 'received' },
  239: { pcDesign: 'missing', moDesign: 'missing' },
  240: { pcDesign: 'missing', moDesign: 'missing' },
  241: { pcDesign: 'missing', moDesign: 'missing' },
  242: { pcDesign: 'missing', moDesign: 'missing' },
  255: { pcDesign: 'received', moDesign: 'received' },
  256: { pcDesign: 'received', moDesign: 'received' },
  257: { pcDesign: 'received', moDesign: 'received' },
  // [HOKA]Design > 장바구니/주문하기/주문내역: Desktop/Mobile Cart, Order/Payment.
  // https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=962-5160
  // 2026-10-29 사용자 확인: 장바구니와 주문 상세의 PC 디자인 수정 중.
  170: { pcDesign: 'revision-planned', moDesign: 'received' },
  171: { pcDesign: 'revision-planned', moDesign: 'received' },
  // 2026-10-29 사용자 요청: 주문 영역 PC 디자인 수정예정. MO는 첨부에서 확인한 화면만 수급.
  172: { pcDesign: 'revision-planned', moDesign: 'received' },
  173: { pcDesign: 'revision-planned', moDesign: 'missing' },
  175: { pcDesign: 'revision-planned', moDesign: 'missing' },
  176: { pcDesign: 'revision-planned', moDesign: 'missing' },
  // 보유 쿠폰 조회와 주문 상세·취소/반품 상세는 Mobile 전용 프레임만 확인됐습니다.
  174: { pcDesign: 'revision-planned', moDesign: 'received' },
  178: { pcDesign: 'received', moDesign: 'received' },
  179: { pcDesign: 'missing', moDesign: 'received' },
  181: { pcDesign: 'missing', moDesign: 'received' },
  // [HOKA]Design > 고객센터: Desktop / 고객센터 및 Mobile / 고객센터 최종 프레임.
  // https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=324-4175
  206: { pcDesign: 'received', moDesign: 'received' },
  // 마이페이지 Q&A의 같은 화면 코드도 고객센터 공통 화면을 사용합니다.
  185: { pcDesign: 'received', moDesign: 'received' },
  187: { pcDesign: 'received', moDesign: 'received' },
  189: { pcDesign: 'received', moDesign: 'received' },
  207: { pcDesign: 'received', moDesign: 'received' },
  208: { pcDesign: 'received', moDesign: 'received' },
  // 첨부 고객센터 시안에서 PC 공지 상세와 MO 문의 목록도 확인했습니다.
  209: { pcDesign: 'received', moDesign: 'received' },
  210: { pcDesign: 'received', moDesign: 'received' },
  211: { pcDesign: 'received', moDesign: 'received' },
  212: { pcDesign: 'received', moDesign: 'received' },
  216: { pcDesign: 'received', moDesign: 'received' },
  217: { pcDesign: 'received', moDesign: 'received' },
  218: { pcDesign: 'received', moDesign: 'received' },
  // 첨부 시안은 PC/MO 모두 이용약관·개인정보 탭을 포함합니다.
  219: { pcDesign: 'received', moDesign: 'received' },
  260: { pcDesign: 'received', moDesign: 'received' },
  // [HOKA]Design > 검색_공통: Desktop / Search, Mobile / Search 및 입력 상태별 프레임.
  // https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=648-17782
  // 2026-10-29 사용자 직접 확인: 전체메뉴 PC/MO 디자인 수급.
  245: { pcDesign: 'received', moDesign: 'received' },
  246: { pcDesign: 'received', moDesign: 'received' },
  // 같은 페이지의 Desktop / Search / Results 및 Mobile / Search / Results.
  247: { pcDesign: 'received', moDesign: 'received' },
  // [HOKA]Design > 에러페이지: [PC]/[MO] 404/시스템 점검/기타 에러페이지 프레임.
  // https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=577-10864
  248: { pcDesign: 'received', moDesign: 'received' },
  249: { pcDesign: 'received', moDesign: 'received' },
  250: { pcDesign: 'received', moDesign: 'received' },
  // 2026-10-30 사용자 직접 확인: 러닝 세션 신청(기존 UTMB) PC/MO 디자인 수급.
  158: { pcDesign: 'received', moDesign: 'received' },
  // 2026-10-30 사용자 확인: 기획전 상세는 현재 목업이며 디자인 미수급.
  167: { pcDesign: 'missing', moDesign: 'missing' },
  258: { pcDesign: 'received', moDesign: 'received' },
  259: { pcDesign: 'received', moDesign: 'received' },
};

// 위 페이지에서 PC / PLP / Default, Mobile / PLP, PC / PDP, Mobile / PDP를 확인했습니다.
// 동일 화면 코드를 쓰는 카테고리는 공통 템플릿의 수급 여부를 공유합니다.
const confirmedTemplateDesigns: Record<string, Pick<ScreenProgress, 'pcDesign' | 'moDesign'>> = {
  eland_hca_01: { pcDesign: 'received', moDesign: 'received' },
  eland_hca_02: { pcDesign: 'received', moDesign: 'received' },
};

// 사용자 직접 확인과 2026-10-29 재검수 결과입니다. 시안 대비 남은 UI 차이는 revision입니다.
// 근거: okf/architecture/design-reaudit-2026-10-29.md. 실제 서비스 연결 여부와 구분합니다.
export const confirmedPublishingProgress: Readonly<
  Partial<Record<number, Partial<Pick<ScreenProgress, 'pcPublishing' | 'moPublishing'>>>>
> = {
  170: { pcPublishing: 'revision', moPublishing: 'ready' },
  171: { pcPublishing: 'revision', moPublishing: 'ready' },
  172: { pcPublishing: 'ready', moPublishing: 'ready' },
  174: { pcPublishing: 'ready', moPublishing: 'ready' },
  177: { pcPublishing: 'revision', moPublishing: 'revision' },
  // PC의 공통 마이페이지 메뉴도 첨부 시안과 달라 본문만으로 완료 처리하지 않습니다.
  178: { pcPublishing: 'revision', moPublishing: 'ready' },
  179: { moPublishing: 'ready' },
  181: { moPublishing: 'ready' },
  182: { pcPublishing: 'revision', moPublishing: 'ready' },
  183: { pcPublishing: 'revision', moPublishing: 'ready' },
  184: { pcPublishing: 'revision', moPublishing: 'ready' },
  185: { pcPublishing: 'ready', moPublishing: 'ready' },
  187: { pcPublishing: 'ready', moPublishing: 'ready' },
  189: { pcPublishing: 'ready', moPublishing: 'ready' },
  191: { pcPublishing: 'revision', moPublishing: 'revision' },
  195: { pcPublishing: 'revision', moPublishing: 'revision' },
  196: { pcPublishing: 'revision', moPublishing: 'revision' },
  200: { pcPublishing: 'revision', moPublishing: 'revision' },
  201: { pcPublishing: 'revision', moPublishing: 'ready' },
  202: { pcPublishing: 'revision', moPublishing: 'ready' },
  203: { pcPublishing: 'revision', moPublishing: 'revision' },
  204: { pcPublishing: 'revision', moPublishing: 'ready' },
  205: { pcPublishing: 'revision', moPublishing: 'ready' },
  206: { pcPublishing: 'ready', moPublishing: 'ready' },
  207: { pcPublishing: 'ready', moPublishing: 'ready' },
  208: { pcPublishing: 'ready', moPublishing: 'revision' },
  209: { pcPublishing: 'ready', moPublishing: 'ready' },
  210: { pcPublishing: 'ready', moPublishing: 'ready' },
  211: { pcPublishing: 'ready', moPublishing: 'ready' },
  212: { pcPublishing: 'revision', moPublishing: 'revision' },
  213: { pcPublishing: 'pending', moPublishing: 'pending' },
  216: { pcPublishing: 'ready', moPublishing: 'ready' },
  217: { pcPublishing: 'ready', moPublishing: 'ready' },
  218: { pcPublishing: 'ready', moPublishing: 'ready' },
  219: { pcPublishing: 'ready', moPublishing: 'ready' },
  260: { pcPublishing: 'revision', moPublishing: 'revision' },
  // 아이핀 인증은 사용자 확인에 따라 PC/MO 퍼블리싱 대기.
  235: { pcPublishing: 'pending', moPublishing: 'pending' },
  // 2026-10-29 첨부 디자인과 소스 대조에서 확인한 후속 수정 항목.
  223: { pcPublishing: 'ready', moPublishing: 'ready' },
  224: { pcPublishing: 'ready', moPublishing: 'ready' },
  227: { pcPublishing: 'ready', moPublishing: 'ready' },
  234: { pcPublishing: 'revision', moPublishing: 'revision' },
  236: { moPublishing: 'ready' },
  251: { pcPublishing: 'ready', moPublishing: 'ready' },
  253: { pcPublishing: 'revision', moPublishing: 'revision' },
  254: { pcPublishing: 'ready', moPublishing: 'ready' },
  // 검색 레이어와 404/시스템 점검/기타 에러 화면의 PC/MO 퍼블리싱 완료.
  246: { pcPublishing: 'ready', moPublishing: 'ready' },
  248: { pcPublishing: 'ready', moPublishing: 'ready' },
  249: { pcPublishing: 'ready', moPublishing: 'ready' },
  250: { pcPublishing: 'ready', moPublishing: 'ready' },
};

const myPagePcNavigationNote =
  'PC 공통 메뉴: 첨부의 구매내역·상품내역·MY HOKA·Q&A·계정관리 대신 쇼핑·HOKA MEMBERS·계정 관리 구성을 사용함.';

const phoneTermsReviewNote =
  'PC/MO 수정: 인증 약관의 이전 버전 선택이 첨부의 별도 선택창(PC 라디오·MO 휠)이 아닌 본문 안 버튼 목록임.';

// 별도로 확인해야 하는 검토 비고만 IA와 검색에 노출합니다.
export const screenReviewNotes: Readonly<Partial<Record<number, string>>> = {
  170: 'PC 수정: 상품 행의 성별·관심상품 표시 누락, 주문하기 버튼이 시안의 검정 채움 대신 테두리형임. MO 완료 유지.',
  171: 'PC 수정: 결제 요약의 총 결제금액 라벨이 두 줄로 꺾임. PC 디자인 수정예정 유지.',
  176: '디자인 확인: 약관 전문보기는 공통 이용약관/개인정보 페이지 링크. 첨부에 주문 전용 약관 본문 시안 없음.',
  177: 'PC 수정: 본문이 640px로 제한되고 등급·쿠폰·관심상품 요약이 한 줄 대신 두 단으로 배치됨. MO 수정: 주문 배송 내역에 시안에 없는 캐러셀·페이지 선택 점이 남아 있음.',
  178: myPagePcNavigationNote,
  182: myPagePcNavigationNote,
  183: myPagePcNavigationNote,
  184: myPagePcNavigationNote,
  191: `PC/MO 수정: 상품리뷰 본문 제목이 없고 탭부터 시작함. ${myPagePcNavigationNote}`,
  195: `PC/MO 수정: 등급·누적금액 상단 배치, 등급 아이콘의 배경/글자색, 공통 혜택 구성이 다름. MO에 시안에 없는 컬러 배경 카드가 있음. ${myPagePcNavigationNote}`,
  196: `PC/MO 수정: 빈 입력 상태에서 쿠폰 등록 버튼이 숨겨짐. 쿠폰 우측의 검정 띠와 티켓 윤곽이 시안과 다름. ${myPagePcNavigationNote}`,
  200: `PC/MO 수정: 최근순이 선택 컨트롤 대신 고정 텍스트이며 MO 신청 취소 버튼이 별도 왼쪽 행에 배치됨. ${myPagePcNavigationNote}`,
  201: `PC 수정: 회원정보 라벨·값이 시안의 조밀한 좌우 행 대신 큰 제목과 값의 세로 묶음으로 표시됨. ${myPagePcNavigationNote}`,
  202: `PC 수정: 좌측 회원정보 요약이 시안의 조밀한 행 배치와 다름. ${myPagePcNavigationNote}`,
  203: `PC/MO 수정: 배송지 목록의 본문 제목 누락. PC 수정·삭제 액션이 주소 오른쪽 대신 아래에 있고 배송지 추가 버튼이 본문 전체 너비임. ${myPagePcNavigationNote}`,
  204: `PC 수정: 배송지 등록 폼과 저장 버튼이 시안의 중앙 좁은 폭 대신 본문 전체 너비임. ${myPagePcNavigationNote}`,
  205: `PC 수정: 배송지 수정 폼이 시안의 중앙 좁은 폭 대신 본문 전체 너비임. ${myPagePcNavigationNote}`,
  208: 'MO 수정: 첨부 공지 목록은 제목 오른쪽에 날짜를 표시하나 현재는 제목 아래에 표시함.',
  212: 'PC/MO 수정: 지도에 시안에 없는 어두운 API 지도 노출 영역 안내 오버레이가 남아 있음.',
  213: '미작업: 본문은 디자인 작업 중 안내만 있음. 첨부에는 별도 회원등급 안내 본문 시안 없음.',
  260: 'PC 수정: 이미지 왼쪽·설명 오른쪽 배치가 시안의 큰 이미지 위·설명 아래 2열과 다름. PC/MO 성별·발볼 선택도 시안의 pill형 대신 사각 버튼임. 첨부는 진행중이며 확정 이미지·치수 추가 확인 필요.',
  234: phoneTermsReviewNote,
  235: '미작업: 본인인증 선택 화면의 아이핀 버튼만 있으며 클릭 후 인증 화면·동작 없음. 첨부에 아이핀 내부 화면은 없음.',
  253: phoneTermsReviewNote,
};

// 기존 통합 상태를 초기값으로 보존하며 플랫폼별 확인값은 별도로 전달한다.
// 디자인 수급은 퍼블리싱 상태나 파일·스토리 존재로 추정하지 않는다.
// 조사한 Figma 파일의 최종 화면 목록에서 찾지 못한 항목은 사용자 기준에 따라 미수급이다.
export function getScreenProgress(
  screen: ScreenDefinition,
  overrides: ScreenProgressOverrides,
): ScreenProgress {
  const publishing = isStorybookPending(screen.iaNumber)
    ? 'pending'
    : isStorybookReady(screen.iaNumber, screen.screenCode)
      ? 'ready'
      : isStorybookWorking(screen.screenCode)
        ? 'working'
        : 'pending';
  const override = overrides[screen.iaNumber];
  const confirmedDesign =
    confirmedDesignReceipts[screen.iaNumber] ?? confirmedTemplateDesigns[screen.screenCode];
  return {
    pcDesign:
      override?.pcDesign !== undefined
        ? override.pcDesign
        : (confirmedDesign?.pcDesign ?? 'missing'),
    moDesign:
      override?.moDesign !== undefined
        ? override.moDesign
        : (confirmedDesign?.moDesign ?? 'missing'),
    pcPublishing:
      override?.pcPublishing ??
      confirmedPublishingProgress[screen.iaNumber]?.pcPublishing ??
      publishing,
    moPublishing:
      override?.moPublishing ??
      confirmedPublishingProgress[screen.iaNumber]?.moPublishing ??
      publishing,
  };
}
