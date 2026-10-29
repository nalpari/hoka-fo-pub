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
  251: { pcDesign: 'received', moDesign: 'missing' },
  252: { pcDesign: 'received', moDesign: 'missing' },
  253: { pcDesign: 'received', moDesign: 'received' },
  254: { pcDesign: 'received', moDesign: 'received' },
  // [HOKA]Design > 마이페이지: Desktop / MY Page, Product Reviews, 회원등급.
  // Mobile은 쿠폰, 러닝세션 신청내역, 회원정보, 배송지, 관심/최근/재입고 상품 프레임도 있습니다.
  // https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=389-9339
  177: { pcDesign: 'received', moDesign: 'received' },
  182: { pcDesign: 'missing', moDesign: 'received' },
  183: { pcDesign: 'missing', moDesign: 'received' },
  184: { pcDesign: 'missing', moDesign: 'received' },
  191: { pcDesign: 'received', moDesign: 'received' },
  195: { pcDesign: 'received', moDesign: 'received' },
  196: { pcDesign: 'missing', moDesign: 'received' },
  200: { pcDesign: 'missing', moDesign: 'received' },
  201: { pcDesign: 'missing', moDesign: 'received' },
  202: { pcDesign: 'missing', moDesign: 'received' },
  203: { pcDesign: 'missing', moDesign: 'received' },
  204: { pcDesign: 'missing', moDesign: 'received' },
  205: { pcDesign: 'missing', moDesign: 'received' },
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
  // 가입완료 검색 결과는 Desktop 최종 프레임 2개뿐이며 Mobile 프레임은 없습니다.
  238: { pcDesign: 'received', moDesign: 'missing' },
  239: { pcDesign: 'missing', moDesign: 'missing' },
  240: { pcDesign: 'missing', moDesign: 'missing' },
  241: { pcDesign: 'missing', moDesign: 'missing' },
  242: { pcDesign: 'missing', moDesign: 'missing' },
  255: { pcDesign: 'received', moDesign: 'received' },
  256: { pcDesign: 'received', moDesign: 'received' },
  257: { pcDesign: 'received', moDesign: 'received' },
  // [HOKA]Design > 장바구니/주문하기/주문내역: Desktop/Mobile Cart, Order/Payment.
  // https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=962-5160
  170: { pcDesign: 'received', moDesign: 'received' },
  171: { pcDesign: 'received', moDesign: 'received' },
  // 보유 쿠폰 조회와 주문 상세·취소/반품 상세는 Mobile 전용 프레임만 확인됐습니다.
  174: { pcDesign: 'missing', moDesign: 'received' },
  178: { pcDesign: 'received', moDesign: 'received' },
  179: { pcDesign: 'missing', moDesign: 'received' },
  181: { pcDesign: 'missing', moDesign: 'received' },
  // [HOKA]Design > 고객센터: Desktop / 고객센터 및 Mobile / 고객센터 최종 프레임.
  // https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=324-4175
  206: { pcDesign: 'received', moDesign: 'received' },
  // 마이페이지 Q&A의 같은 화면 코드도 고객센터 공통 화면을 사용합니다.
  185: { pcDesign: 'received', moDesign: 'received' },
  187: { pcDesign: 'received', moDesign: 'missing' },
  189: { pcDesign: 'received', moDesign: 'received' },
  207: { pcDesign: 'received', moDesign: 'received' },
  208: { pcDesign: 'received', moDesign: 'received' },
  // 공지 상세는 Mobile / 고객센터 / 공지사항 상세만 확인됐습니다.
  209: { pcDesign: 'missing', moDesign: 'received' },
  210: { pcDesign: 'received', moDesign: 'missing' },
  211: { pcDesign: 'received', moDesign: 'received' },
  212: { pcDesign: 'received', moDesign: 'received' },
  216: { pcDesign: 'received', moDesign: 'received' },
  217: { pcDesign: 'received', moDesign: 'received' },
  218: { pcDesign: 'received', moDesign: 'received' },
  // PC는 개인정보 처리방침만 있고 이용약관 전용 프레임은 확인되지 않았습니다.
  219: { pcDesign: 'missing', moDesign: 'received' },
  260: { pcDesign: 'received', moDesign: 'received' },
  // [HOKA]Design > 검색_공통: Desktop / Search, Mobile / Search 및 입력 상태별 프레임.
  // https://www.figma.com/design/qyXJp4bnoeYSQxQULV8Wql/-HOKA-Design?node-id=648-17782
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
    pcPublishing: override?.pcPublishing ?? publishing,
    moPublishing: override?.moPublishing ?? publishing,
  };
}
