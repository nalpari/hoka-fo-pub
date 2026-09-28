# 임시 정책과 가정

- Excel 원본 파일은 제공된 경로에서 이 실행 환경으로 접근할 수 없었다. 사용자 프롬프트에 명시된 104개 항목과 계층을 기준으로 등록부를 만들었다. 원본을 사용할 수 있게 되면 행 17~133을 대조해 `screenRegistry.ts`의 행 번호·Depth 경로를 보정한다.
- Web은 Mobile 시트 기능 계층을 공유한다는 임시 가정이다.
- UA에 `iPhone`, `Android Mobile`, `Windows Phone`이 있으면 Mobile, `iPad`, `Tablet`, Mobile이 아닌 Android도 Mobile이다. iPad 데스크톱 모드는 `MacIntel` 및 `maxTouchPoints > 1`로 보완한다. 터치 지원 Windows PC는 Mobile로 바꾸지 않는다. 판별 불가는 Web이다.
- 화면 너비나 `matchMedia`는 기기 판별에 사용하지 않는다. Web 최소 콘텐츠 폭은 1024px이며, 작은 PC 창에서는 가로 스크롤을 허용한다. Mobile은 360~430px을 목표로 한다.
- 제품, 이미지, 가격, 카테고리는 모두 가상 데이터다. Men/Women/Kids 등의 상세 카테고리는 확정 메뉴가 아니다.
- About Hoka 3개 원본 미정 항목은 검수 목록에만 기록하며 사용자 메뉴에 노출하지 않는다. `세타 및 손질 방법 안내`는 원문을 보존했다.
- 인증, 개인정보 저장, 알림, 결제, 주문 전송, 외부 API는 데모 상태다.
