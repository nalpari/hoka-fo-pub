export type FaqCategory =
  | '전체'
  | '웹사이트'
  | '통합마일리지'
  | '수선/A/S'
  | '매장 관련'
  | '제품'
  | '멤버스/쿠폰'
  | '교환/반품';
export type FaqEntry = { category: Exclude<FaqCategory, '전체'>; question: string; answer: string };
export const faqCategories: FaqCategory[] = [
  '전체',
  '웹사이트',
  '통합마일리지',
  '수선/A/S',
  '매장 관련',
  '제품',
  '멤버스/쿠폰',
  '교환/반품',
];
export const faqs: FaqEntry[] = [
  {
    category: '웹사이트',
    question: '회원가입은 어떻게 하나요?',
    answer:
      '온라인 매장에서 회원등록 및 개인정보 처리 동의를 완료하시면 가입이 완료됩니다. 이미 가입하신 경우에는 기존 계정으로 로그인해 주세요.',
  },
  {
    category: '멤버스/쿠폰',
    question: '회원의 혜택은 무엇인가요?',
    answer:
      '호카 멤버스 회원에게는 구매 실적에 따른 등급별 혜택과 쿠폰, 이벤트 소식을 제공해 드립니다.',
  },
  {
    category: '웹사이트',
    question: 'ID와 비밀번호를 잊어버렸어요',
    answer:
      '로그인 화면의 아이디/비밀번호 찾기를 이용해 본인 인증 후 확인하거나 재설정할 수 있습니다.',
  },
  {
    category: '웹사이트',
    question: '회원정보를 변경하고 싶어요',
    answer: '로그인 후 마이페이지의 회원정보 관리에서 연락처와 배송지 정보를 수정하실 수 있습니다.',
  },
  {
    category: '웹사이트',
    question: '회원가입 당시의 e-mail 주소를 사용하지 않아요',
    answer: '고객센터를 통해 본인 확인 후 이메일 주소 변경을 도와드립니다.',
  },
  {
    category: '웹사이트',
    question: '회원을 탈퇴하고 싶습니다',
    answer: '마이페이지에서 회원 탈퇴 메뉴를 선택하실 수 있습니다.',
  },
  {
    category: '제품',
    question: '구매하고 싶은데 결제를 어떻게 하죠?',
    answer: '상품 상세 페이지에서 옵션을 선택한 후 구매하기 버튼을 눌러 결제를 진행해 주세요.',
  },
  {
    category: '매장 관련',
    question: '전문매장, 백화점, 상설매장의 위치를 알고 싶습니다',
    answer: '매장 찾기에서 지역과 매장 유형으로 원하는 매장을 검색하실 수 있습니다.',
  },
  {
    category: '제품',
    question: '신발세탁은 어떻게 해야하나요?',
    answer:
      '제품 소재에 맞는 관리법을 확인해 주세요. 세탁기 사용은 제품 손상의 원인이 될 수 있습니다.',
  },
  {
    category: '교환/반품',
    question: '제품을 환불받고 싶습니다. 환불규정은 어떻게 되나요?',
    answer:
      '수령일과 상품 상태에 따라 교환 및 반품이 가능하며, 자세한 기준은 배송·반품 안내를 참고해 주세요.',
  },
  {
    category: '수선/A/S',
    question: '제품의 수선을 맡기고 싶습니다',
    answer: 'A/S 접수 전 제품 상태와 구매 정보를 준비해 고객상담실에 문의해 주세요.',
  },
];
