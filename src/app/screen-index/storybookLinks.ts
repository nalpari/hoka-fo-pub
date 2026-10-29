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
  258: { pcDesign: 'received', moDesign: 'received' },
  259: { pcDesign: 'received', moDesign: 'received' },
};

// 위 페이지에서 PC / PLP / Default, Mobile / PLP, PC / PDP, Mobile / PDP를 확인했습니다.
// 동일 화면 코드를 쓰는 카테고리는 공통 템플릿의 수급 여부를 공유합니다.
const confirmedTemplateDesigns: Record<string, Pick<ScreenProgress, 'pcDesign' | 'moDesign'>> = {
  eland_hca_01: { pcDesign: 'received', moDesign: 'received' },
  eland_hca_02: { pcDesign: 'received', moDesign: 'received' },
};

// 사용자 직접 확인 또는 2026-10-29 첨부 디자인·소스 대조 결과이며 레거시 통합 상태와 구분합니다.
export const confirmedPublishingProgress: Readonly<
  Partial<Record<number, Partial<Pick<ScreenProgress, 'pcPublishing' | 'moPublishing'>>>>
> = {
  170: { pcPublishing: 'revision', moPublishing: 'ready' },
  171: { pcPublishing: 'revision', moPublishing: 'revision' },
  174: { moPublishing: 'revision' },
  177: { pcPublishing: 'revision' },
  178: { pcPublishing: 'revision' },
  182: { pcPublishing: 'revision' },
  183: { pcPublishing: 'revision' },
  184: { pcPublishing: 'revision' },
  191: { pcPublishing: 'revision' },
  195: { pcPublishing: 'revision' },
  196: { pcPublishing: 'revision' },
  200: { pcPublishing: 'revision', moPublishing: 'revision' },
  202: { pcPublishing: 'revision' },
  206: { pcPublishing: 'revision', moPublishing: 'revision' },
  208: { moPublishing: 'revision' },
  216: { pcPublishing: 'revision', moPublishing: 'revision' },
  // 아이핀 인증은 사용자 확인에 따라 PC/MO 퍼블리싱 대기.
  235: { pcPublishing: 'pending', moPublishing: 'pending' },
  // 2026-10-29 첨부 디자인과 소스 대조에서 확인한 후속 수정 항목.
  223: { pcPublishing: 'revision', moPublishing: 'revision' },
  224: { pcPublishing: 'revision', moPublishing: 'revision' },
  227: { pcPublishing: 'revision', moPublishing: 'revision' },
  234: { pcPublishing: 'revision', moPublishing: 'revision' },
  236: { moPublishing: 'revision' },
  251: { pcPublishing: 'revision', moPublishing: 'revision' },
  253: { pcPublishing: 'revision', moPublishing: 'revision' },
  254: { pcPublishing: 'revision', moPublishing: 'revision' },
  // 검색 레이어와 404/시스템 점검/기타 에러 화면의 PC/MO 퍼블리싱 완료.
  246: { pcPublishing: 'ready', moPublishing: 'ready' },
  248: { pcPublishing: 'ready', moPublishing: 'ready' },
  249: { pcPublishing: 'ready', moPublishing: 'ready' },
  250: { pcPublishing: 'ready', moPublishing: 'ready' },
};

// 첨부 디자인·실제 소스 비교에서 확인한 미완료 범위를 IA 비고와 검색에 함께 노출합니다.
export const screenReviewNotes: Readonly<Partial<Record<number, string>>> = {
  170: '디자인 대조: PC 상품 표·행별 수량/주문 버튼·상품금액/배송비 요약·선택/전체 주문 버튼 없음. 옵션 모달 좌우 배치와 고객센터 2열 배치 미적용. PC 디자인 수정예정·MO 퍼블 완료는 사용자 확인 유지.',
  171: '디자인 대조: PC 현시안의 주문상품 표·우측 결제 요약 배치 없음(디자인 수정예정). MO 보유쿠폰 조회 대신 단일 드롭다운 사용. 주문완료 본문은 있음. 실제 PG 승인·주문 저장은 서비스 연결 대기.',
  172: '디자인 확인: MO 배송지 직접 입력·요청사항·250자 입력 UI 있음. 기본배송지로 등록 체크값은 제출 payload에 포함되지 않음.',
  173: '연동 대기: 공통 주소 찾기는 직접 입력 모달이며 실제 주소 검색 미연동. 첨부에 주소 검색 내부 시안은 없음.',
  174: '디자인 대조: MO 보유쿠폰 조회의 상품별 접기/펼치기·쿠폰 라디오·사용불가 상태·장바구니 쿠폰·적용 버튼/합계 모달 없음. 단일 쿠폰 드롭다운만 있음.',
  175: '연동 대기: 결제 수단 타일·submit 계약은 있으나 실제 PG 창은 제공되지 않음. 첨부에 PG 내부 화면 없음.',
  176: '디자인 확인: 약관 전문보기는 공통 이용약관/개인정보 페이지 링크. 첨부에 주문 전용 약관 본문 시안 없음.',
  177: '디자인 대조: PC 주문 배송 내역의 상품정보·수량·가격·주문상태 표 대신 모바일형 캐러셀을 표시. 빈 주문 전용 문구 없음.',
  178: '디자인 대조: PC 주문배송조회 상품정보·수량·가격·주문상태 열 배치 없이 MO형 상품 행과 전체폭 액션 사용. MO 목록·빈 상태·조회/상세/취소/반품/배송조회 UI는 있음. 배송 추적 이력은 고정 샘플.',
  182: '디자인 대조: PC 관심상품은 3열 시안이나 현재 PC/MO 모두 2열 그리드.',
  183: '디자인 대조: PC 최근 본 상품은 3열 시안이나 현재 PC/MO 모두 2열 그리드.',
  184: '디자인 대조: PC 재입고 목록의 상품정보·신청일·상태 열 헤더와 열 정렬 없음(현재 MO형 행).',
  191: '디자인 대조: PC 상품평의 열 헤더와 상품정보·평가·리뷰·수정 열 배치 없이 모바일형 행 사용.',
  195: '디자인 대조: PC 현재 등급·누적금액 진행바와 행형 등급 안내 대신 세로 컬러 카드 사용.',
  196: '디자인 대조: PC 쿠폰 내역의 티켓형 2열 배치 없이 세로 목록 사용.',
  200: '디자인 대조: 신청내역 전용 제목·전체/신청완료/취소 탭·최근순·행 목록·신청취소 모달 없음. 일반 런클럽 목록 재사용.',
  202: '디자인 대조: PC 좌측 회원정보·우측 수정 폼의 2열 배치 없음(현재 세로 순서).',
  206: '디자인 대조: 고객센터 메인 하단의 1:1 문의·FAQs 바로가기 카드 영역 없음.',
  208: '디자인 대조: MO 목록에서 날짜를 제목 아래 배치해야 하나 현재 제목·날짜가 가로 한 줄.',
  212: '연동 대기: 매장 지도는 샘플 이미지 위 API 지도 노출 영역 안내이며 실제 지도·길찾기 미연동.',
  213: '미작업: 본문은 디자인 작업 중 안내만 있음. 첨부에는 별도 회원등급 안내 본문 시안 없음.',
  216: '디자인 대조: 반품 유의사항 탭의 고객센터 연락처 패널과 1:1문의·FAQ·주문배송조회 바로가기 3개 없음.',
  260: '디자인 확인: 첨부에 진행중 표시와 이미지 추후 적용 안내 있음. 실제 이미지·확정 사이즈표 데이터 추가 확인 필요.',
  223: '디자인 대조: 가입 시 허용한 밑줄(_) 포함 아이디를 로그인 검증이 거절함. 소셜 로그인은 버튼만 있으며 OAuth 미연동.',
  224: '디자인 대조: 계정 잠금 결과에 따른 안내 모달 분기 미구현.',
  227: '디자인 대조: 공통 계정 찾기에서 계정 잠금 결과 분기 미구현.',
  230: '연동 대기: 소셜 로그인 버튼은 있으나 OAuth 대신 미연동 안내만 표시.',
  231: '연동 대기: 소셜 로그인 버튼은 있으나 OAuth 대신 미연동 안내만 표시.',
  233: '연동 대기: 카카오·네이버 신규가입 버튼은 있으나 소셜 가입 단계 대신 미연동 안내 표시.',
  234: '디자인 대조: 휴대폰 인증 약관 상세 모달 본문·확인 버튼 미구현. 인증 입력·오류·타이머 UI는 있음.',
  235: '미작업: 본인인증 선택 화면의 아이핀 버튼만 있으며 클릭 후 인증 화면·동작 없음. 첨부에 아이핀 내부 화면은 없음.',
  236: '디자인 대조: MO 이전 약관 선택의 데모 목록은 가운데 날짜만 선택 가능하며 휠 선택 동작 없음.',
  237: '연동 대기: 주소 찾기는 우편번호·주소 직접 입력 모달이며 실제 주소 검색 미연동. 회원정보·오류 UI는 있음.',
  251: '디자인 대조: 잠금 안내 모달은 있으나 로그인·계정 찾기 결과에서 연결하는 분기 없음.',
  253: '디자인 대조: 인증 약관 상세 본문·이전 약관 선택 및 인증시간 만료 안내 모달 미구현(현재 인라인 오류).',
  254: '디자인 대조: 홈으로 버튼이 홈(/) 대신 로그인(/login)으로 이동.',
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
