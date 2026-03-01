# 하하캠퍼스 대표 홈페이지 시제품

공공기관 스타일의 정적 웹 시제품(목업/프로토타입)입니다.

## 실행 방법

1. 가장 간단한 방법: `index.html` 더블클릭
2. 로컬 서버(선택): 프로젝트 폴더에서 아래 명령 실행

```bash
python -m http.server 8000
```

그 후 `http://localhost:8000` 접속

## 페이지 목록

- 홈: `/index.html`
- 소개: `/about/intro.html`, `/about/vision.html`, `/about/bi.html`, `/about/history.html`, `/about/location.html`
- 시설: `/facilities/index.html`, `/facilities/detail.html?slug=pickleball-tennis`
- 대관: `/rental/guide.html`, `/rental/apply.html`, `/rental/success.html`
- 프로그램: `/programs/index.html`, `/programs/detail.html?id=001`, `/programs/apply.html`, `/programs/success.html`
- 공지/자료: `/news/notices.html`, `/news/notice-detail.html?id=n001`, `/news/press.html`, `/news/gallery.html`, `/news/videos.html`
- 정책: `/policy/privacy.html`, `/policy/terms.html`
- 사이트맵: `/sitemap.html`

## 시제품 범위

- 결제 시스템 미구현
- DB/회원 인증 미구현
- 백엔드 API 미구현
- 폼 제출은 JS로 처리 후 성공 페이지로 이동(가짜 완료)

## 다음 단계(실서비스 전환 시)

1. 백엔드 API 연동(시설/프로그램/공지 CRUD)
2. 인증/권한/관리자 화면 설계
3. 실제 예약/결제/정원 관리 로직 구현
4. 개인정보보호·접근성·보안 점검 및 운영 모니터링 구축
