/**
 * [개발팀 바인딩]
 * RunClubSession은 세션 id/표시 텍스트/이미지/모집상태 모델입니다. 이미지에 절대 경로/URL을 주면 그대로 사용합니다.
 * 아래 세션/장소/안내 예시는 미연동 기본값입니다. 운영 목록/신청내역/상세 사실 정보는 RunClubDataContext의 별도 계약에 전달합니다.
 */

export type RunClubSession = {
  id: string;
  title: string;
  category: 'Road' | 'Trail';
  image: string;
  detailImage: string;
  overlayDate: string;
  location: string;
  distance: string;
  schedule: string;
  status: 'open' | 'closed' | 'upcoming';
};

export const runClubSessions: RunClubSession[] = [
  {
    id: 'yeouido-night',
    title: '여의도 나이트 시티런',
    category: 'Road',
    image: 'session-card-01.png',
    detailImage: 'session-card-01.png',
    overlayDate: '27.2.12 19:00',
    location: '여의도',
    distance: '5K',
    schedule: '2월 12일 (금) 19:00',
    status: 'open',
  },
  {
    id: 'womens-trail',
    title: '우먼스 트레일 세션',
    category: 'Trail',
    image: 'session-card-02.png',
    detailImage: 'session-card-02.png',
    overlayDate: '27.1.30 08:00',
    location: '인왕산',
    distance: '10K',
    schedule: '1월 30일 (토) 08:00',
    status: 'open',
  },
  {
    id: 'bukhansan-trail',
    title: '북악산 트레일 세션',
    category: 'Trail',
    image: 'session-card-03.png',
    detailImage: 'session-detail-bukhansan.png',
    overlayDate: '27.2.6 07:00',
    location: '북악산',
    distance: '10K',
    schedule: '2월 6일 (토) 07:00',
    status: 'closed',
  },
  {
    id: 'bukchon-night',
    title: '북촌 나이트 시티런',
    category: 'Road',
    image: 'session-card-04.png',
    detailImage: 'session-detail-bukchon.png',
    overlayDate: '27.3.16 07:00',
    location: '경복궁',
    distance: '5K',
    schedule: '3월 16일 (화) 07:00',
    status: 'open',
  },
  {
    id: 'yeouido-city',
    title: '여의도 나이트 시티런',
    category: 'Road',
    image: 'session-card-05.png',
    detailImage: 'session-card-05.png',
    overlayDate: '27.2.12 19:00',
    location: '여의도',
    distance: '5K',
    schedule: '2월 12일 (금) 19:00',
    status: 'open',
  },
  {
    id: 'olympic-park',
    title: '올림픽공원 러닝 세션',
    category: 'Trail',
    image: 'session-card-06.png',
    detailImage: 'session-card-06.png',
    overlayDate: '27.2.6 07:00',
    location: '올림픽 공원',
    distance: '10K',
    schedule: '2월 6일 (토) 07:00',
    status: 'open',
  },
  {
    id: 'bukchon-city',
    title: '북촌 나이트 시티런',
    category: 'Road',
    image: 'session-card-07.png',
    detailImage: 'session-card-07.png',
    overlayDate: '27.3.16 07:00',
    location: '경복궁',
    distance: '5K',
    schedule: '3월 16일 (화) 07:00',
    status: 'open',
  },
  {
    id: 'inwangsan-trail',
    title: '우먼스 트레일 세션',
    category: 'Trail',
    image: 'session-card-08.png',
    detailImage: 'session-card-08.png',
    overlayDate: '27.1.30 08:00',
    location: '인왕산',
    distance: '10K',
    schedule: '1월 30일 (토) 08:00',
    status: 'upcoming',
  },
];

// 운영 응답의 절대 경로/URL은 그대로 사용하고 시안 파일명에만 기본 디렉터리를 붙입니다.
export const runClubImage = (file: string) =>
  file.startsWith('/') || /^https?:\/\//.test(file) ? file : `/images/run-club/${file}`;

export const sessionNotices = [
  '신청은 선착순으로 진행되며, 정원이 도달하면 신청이 마감됩니다. 취소 발생 시 다시 신청 가능합니다.',
  '더 많은 분들의 참여를 위해 아이디 당 1명 신청 가능합니다.',
  '만 18세 이상의 호카 공식 회원만 신청 가능합니다.',
];

export const sessionPrecautions = [
  '신청 후 사전 취소 없이 불참(노쇼) 시, 해당 연도 세션 참여가 제한됩니다. 참여가 어려운 경우, 사전에 신청 취소 부탁드립니다.',
  '기상 악화로 인한 세션 취소 시 카카오톡으로 취소 알림이 발송됩니다.',
  '안전과 세션 운영 상의 이유로 만 18세 이상 성인만 세션 참여가 가능합니다.',
  '세션은 정시 진행됩니다. 세션 10분 전까지 체크인해 주시기 바랍니다.',
  '주차를 지원하지 않으니, 대중교통 이용을 권장드립니다.',
  '참가자를 대상으로 사진, 영상 촬영 및 활용을 위한 동의서 작성이 진행됩니다. 동의 거부 시 프로그램 참여가 제한될 수 있습니다.',
];

export const runClubVenue = '호카 더현대 서울 매장';

export const runClubAddress = '서울 영등포구 여의대로 108 더현대서울, 3F';
