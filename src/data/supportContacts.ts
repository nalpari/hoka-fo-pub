/**
 * [ 개발팀 바인딩 ]
 * 화면설계서 2660:12280 기준의 고정 운영정보이며 /support와 공통 푸터가 함께 사용합니다.
 * 운영정보 연동 담당자는 번호·phoneHref·안내 문구와 공통 운영시간을 이 소유자에서 함께 갱신합니다.
 * 현재 조회 API나 요청 상태는 없으며 전화 링크는 기기의 전화 연결을 요청합니다.
 */
export const supportContactHours = {
  operatingHoursTitle: '평일 운영시간',
  operatingHours: '09:00~18:00',
  lunchBreak: '점심시간 12:00~13:00',
  closedDays: '토,일요일 및 공휴일 휴무',
};

export const supportContacts = [
  {
    headingId: 'support-contact-customer-title',
    title: '제품 및 매장 문의',
    description: 'A/S 및 오프라인 매장 관련 문의',
    phone: '080-960-0456',
    phoneHref: 'tel:0809600456',
  },
  {
    headingId: 'support-contact-online-title',
    title: '온라인 스토어 문의',
    description: '주문/배송 및 반품 관련 문의',
    phone: '1551-0458',
    phoneHref: 'tel:15510458',
    note: '* 아래 1:1 문의를 이용하시면 조금 더 빠르게 답변을 받아보실 수 있습니다.',
  },
];
