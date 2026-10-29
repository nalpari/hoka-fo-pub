/**
 * [개발팀 바인딩]
 * Address.id는 현재 UI에서 숫자로 사용하는 배송지 식별자입니다. 서버 문자열 ID를 연결하면 이 타입과 AddressBinding/save/remove의 소비자 타입도 함께 확장해야 합니다.
 * recipient/name/phone/alternatePhone/zip/address/detail/isDefault를 매핑하고 기본 배송지 변경은 서버 원자성/중복 해제를 검증한 뒤 최신 목록으로 반영합니다.
 */

export type Address = {
  id: number;
  recipient: string;
  name: string;
  phone: string;
  alternatePhone: string;
  zip: string;
  address: string;
  detail: string;
  isDefault: boolean;
};
