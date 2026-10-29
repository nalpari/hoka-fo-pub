/**
 * [개발팀 바인딩]
 * suggestedSearches/popularSearches/autocompleteSearches/collectionLinks는 검색 오버레이의 현재 고정 예시입니다.
 * 실시간 추천·인기 검색어는 ShopShell의 검색 오버레이 소유자에서 서버 응답 배열로 교체해야 합니다. 자동완성은 현재 입력값에 대한 이전 응답을 폐기합니다.
 * collectionLinks.id는 컬렉션 경로 식별자입니다. 표시 라벨로 ID를 추정하거나 실제 검색 결과 상품을 이 예시 배열에 넣지 않습니다.
 */

export type SearchCollection = { label: string; id: string };

export const suggestedSearches = ['스피드고트', '여성러닝화', '본디8', '트레일러닝화', '마하5'];

export const popularSearches = [
  '러닝화',
  '클리프톤',
  '본디',
  '카하',
  '아나카파',
  'GTX',
  '트레일 러닝화',
  '여성 러닝화',
  '남성 러닝화',
  '리커버리',
];

export const autocompleteSearches = [
  '트레일 러닝화',
  '러닝 양말',
  '러닝화 추천',
  '러닝 반바지',
  '트레일 러닝화 여성',
  '트레일 러닝화 남성',
  '러닝화 키즈',
  '10K 러닝화',
  '러닝룩',
  ...suggestedSearches,
  ...popularSearches,
];

export const collectionLinks: readonly SearchCollection[] = [
  { label: '스피드고트', id: '8386' },
  { label: '여성러닝화', id: '8309' },
  { label: '본디8', id: '8311' },
  { label: '트레일러닝화', id: '8300' },
  { label: '마하5', id: '8002' },
];
