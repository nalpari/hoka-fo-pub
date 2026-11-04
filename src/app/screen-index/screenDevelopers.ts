import type { ScreenDefinition } from '@/data/screenRegistry';

import { isScreenDeleted } from './screenConnections';

export const developerWbsSource = {
  url: 'https://docs.google.com/spreadsheets/d/1BAxtSHBSp8DguH0gv2EbnEpqHZhZEez66eyTSmAcG6w/edit?gid=1070650770',
  checkedAt: '2026-11-04',
};

type DeveloperAssignment = {
  area: string;
  name: string;
  wbs: string;
  row: number;
};

// [ 개발팀 바인딩 ] IA 관리 소유자가 확인한 Schedule의 FO 개발(5.3.2), X열 파트·Y열 담당
// 스냅샷입니다. 커밋 작성자나 실시간 Sheets 조회가 아니며, WBS 변경 시 이 매핑을 갱신합니다.
// 내부 IA 번호로 연결하고 미확정·담당 공란은 추정하지 않습니다. 상태 URL은 같은 화면 담당자를
// 사용하되 주문서 배송지 상태는 WBS의 세부 담당자를 표시합니다.
const assignments: (DeveloperAssignment & { iaNumbers: number[] })[] = [
  {
    iaNumbers: [1],
    area: '메인페이지',
    name: '이현주, 박기홍, 박혜리, 조혜리',
    wbs: '5.3.2.2.1',
    row: 320,
  },
  {
    iaNumbers: [245],
    area: '공통 레이아웃/GNB/Footer',
    name: '성인환',
    wbs: '5.3.2.1.1.1',
    row: 270,
  },
  { iaNumbers: [248, 249, 250], area: '예외 화면', name: '성인환', wbs: '5.3.2.1.1.2', row: 271 },
  { iaNumbers: [246, 247], area: '검색', name: '성인환', wbs: '5.3.2.1.5', row: 316 },
  {
    iaNumbers: [233, 234, 235, 236, 237, 238, 255, 256, 257],
    area: '자체회원가입',
    name: '반자은',
    wbs: '5.3.2.1.2.1',
    row: 275,
  },
  {
    iaNumbers: [239, 240, 241, 242],
    area: '소셜회원가입',
    name: '반자은',
    wbs: '5.3.2.1.2.2',
    row: 276,
  },
  { iaNumbers: [223], area: '자체회원 로그인', name: '반자은', wbs: '5.3.2.1.3.2', row: 280 },
  { iaNumbers: [230, 231], area: '소셜회원 로그인', name: '반자은', wbs: '5.3.2.1.3.3', row: 281 },
  { iaNumbers: [224, 225, 226], area: '아이디 찾기', name: '반자은', wbs: '5.3.2.1.3.4', row: 282 },
  { iaNumbers: [227, 228], area: '비밀번호찾기', name: '반자은', wbs: '5.3.2.1.3.5', row: 283 },
  { iaNumbers: [229, 252], area: '비밀번호 재설정', name: '반자은', wbs: '5.3.2.1.3.6', row: 284 },
  {
    iaNumbers: [251, 253, 254],
    area: '계정잠금 해제',
    name: '반자은',
    wbs: '5.3.2.1.3.7',
    row: 285,
  },
  { iaNumbers: [178], area: '주문배송 조회 목록', name: '김진영', wbs: '5.3.2.3.3.1.1', row: 345 },
  { iaNumbers: [179], area: '주문배송 조회 상세', name: '김진영', wbs: '5.3.2.3.3.1.2', row: 346 },
  { iaNumbers: [180], area: '취소/반품 내역 목록', name: '김진영', wbs: '5.3.2.3.3.2.1', row: 350 },
  { iaNumbers: [181], area: '취소/반품 내역 상세', name: '김진영', wbs: '5.3.2.3.3.2.2', row: 351 },
  { iaNumbers: [182], area: '관심상품', name: '반자은', wbs: '5.3.2.1.4.2.1', row: 291 },
  { iaNumbers: [183], area: '오늘 본 상품', name: '반자은', wbs: '5.3.2.1.4.2.2', row: 292 },
  { iaNumbers: [184], area: '재입고 알림 상품', name: '반자은', wbs: '5.3.2.1.4.2.3', row: 293 },
  { iaNumbers: [185], area: 'FAQ', name: '송지은', wbs: '5.3.2.1.4.3.1', row: 295 },
  { iaNumbers: [187, 189], area: '1:1 문의', name: '송지은', wbs: '5.3.2.1.4.3.2', row: 296 },
  { iaNumbers: [191, 192, 193], area: '상품리뷰', name: '송지은', wbs: '5.3.2.1.4.3.3', row: 297 },
  { iaNumbers: [195], area: '회원등급', name: '성인환', wbs: '5.3.2.1.4.4.1', row: 299 },
  { iaNumbers: [196, 197], area: '쿠폰 화면', name: '송지은', wbs: '5.3.2.1.4.4.2', row: 300 },
  { iaNumbers: [200], area: '러닝세션 신청내역', name: '송지은', wbs: '5.3.2.1.4.4.4', row: 302 },
  {
    iaNumbers: [201, 202],
    area: '회원정보확인 및 수정, 탈퇴',
    name: '반자은',
    wbs: '5.3.2.1.4.5.1',
    row: 304,
  },
  {
    iaNumbers: [203, 204, 205],
    area: '배송지관리',
    name: '반자은',
    wbs: '5.3.2.1.4.5.2',
    row: 305,
  },
  { iaNumbers: [207], area: 'FAQs', name: '송지은', wbs: '5.3.2.1.4.6.1', row: 307 },
  { iaNumbers: [208, 209], area: '공지사항', name: '송지은', wbs: '5.3.2.1.4.6.2', row: 308 },
  { iaNumbers: [210, 211], area: '1:1문의', name: '송지은', wbs: '5.3.2.1.4.6.3', row: 309 },
  { iaNumbers: [212], area: '매장찾기', name: '송지은', wbs: '5.3.2.1.4.6.4', row: 310 },
  {
    iaNumbers: [213],
    area: '온라인 회원등급 안내',
    name: '송지은',
    wbs: '5.3.2.1.4.6.5',
    row: 311,
  },
  { iaNumbers: [216], area: '배송 및 반품안내', name: '송지은', wbs: '5.3.2.1.4.6.7', row: 313 },
  {
    iaNumbers: [217],
    area: '세탁 및 손질방법 안내',
    name: '송지은',
    wbs: '5.3.2.1.4.6.8',
    row: 314,
  },
  { iaNumbers: [218, 219], area: '약관', name: '송지은', wbs: '5.3.2.1.4.6.9', row: 315 },
  {
    iaNumbers: [153, 154, 156, 157, 158],
    area: 'EXPLORE',
    name: '조혜리',
    wbs: '5.3.2.2.5',
    row: 327,
  },
  { iaNumbers: [155, 258], area: '러닝세션목록', name: '조혜리', wbs: '5.3.2.2.7.1', row: 332 },
  { iaNumbers: [259], area: '러닝세션상세(신청)', name: '조혜리', wbs: '5.3.2.2.7.2', row: 333 },
  {
    iaNumbers: [159, 160, 161, 162],
    area: '런칭캘린더목록',
    name: '박혜리',
    wbs: '5.3.2.2.6.1',
    row: 329,
  },
  { iaNumbers: [166], area: '기획전목록', name: '조혜리', wbs: '5.3.2.2.4.1', row: 325 },
  { iaNumbers: [167], area: '기획전상세', name: '조혜리', wbs: '5.3.2.2.4.2', row: 326 },
  { iaNumbers: [170], area: '장바구니 목록', name: '김진영', wbs: '5.3.2.3.1.1', row: 336 },
  { iaNumbers: [171], area: '주문서 상세·쿠폰·PG', name: '전은주', wbs: '5.3.2.3.2.1', row: 339 },
  { iaNumbers: [171, 172, 173], area: '배송지 변경', name: '김진영', wbs: '5.3.2.3.2.2', row: 340 },
  { iaNumbers: [174], area: '주문 쿠폰', name: '전은주', wbs: '5.3.2.3.2.3', row: 341 },
  { iaNumbers: [175], area: 'PG', name: '전은주', wbs: '5.3.2.3.2.4', row: 342 },
];

export function getScreenDevelopers(
  screen: ScreenDefinition,
  href?: string,
): DeveloperAssignment[] {
  if (isScreenDeleted(screen)) return [];
  const assigned = assignments.filter(({ iaNumbers }) => iaNumbers.includes(screen.iaNumber));
  if (screen.iaNumber === 171 && href?.split(/[?#]/)[0] === '/checkout/preview-shipping') {
    return assigned.filter(({ area }) => area === '배송지 변경');
  }
  if (assigned.length) return assigned;
  if (screen.screenCode === 'eland_hca_01') {
    return [{ area: '상품목록', name: '박혜리', wbs: '5.3.2.2.3.1', row: 323 }];
  }
  if (screen.screenCode === 'eland_hca_02') {
    return [{ area: '상품상세', name: '박기홍', wbs: '5.3.2.2.2', row: 321 }];
  }
  return [];
}

export function getScreenDeveloperNames(screen: ScreenDefinition): string[] {
  return Array.from(
    new Set(
      getScreenDevelopers(screen).flatMap(({ name }) =>
        name
          .split(/[,/]/)
          .map((part) => part.trim())
          .filter(Boolean),
      ),
    ),
  );
}

export function matchesScreenDeveloper(screen: ScreenDefinition, developer: string): boolean {
  if (developer === 'all') return true;
  if (isScreenDeleted(screen)) return false;
  const names = getScreenDeveloperNames(screen);
  return developer === 'unassigned' ? names.length === 0 : names.includes(developer);
}
