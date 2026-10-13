export type RunClubSession = {
  id: string;
  title: string;
  category: 'Road' | 'Trail';
  image: string;
  detailImage: string;
  overlayDate: string;
  course: string;
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
    course: '여의도 5K',
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
    course: '인왕산 10K',
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
    course: '북악산 10K',
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
    course: '경복궁 5K',
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
    course: '여의도 5K',
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
    course: '올림픽 공원 10K',
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
    course: '경복궁 5K',
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
    course: '인왕산 10K',
    schedule: '1월 30일 (토) 08:00',
    status: 'upcoming',
  },
];

export const runClubImage = (file: string) => `/images/run-club/${file}`;

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
