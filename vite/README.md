# Micro FrontEnd / Module federation Vite 환경 Exam

## 각 모듈 실행 명령어

`npm run dev` : 모듈 단독 실행  
`npm run start-mf` : 기본 Module federation 실행  
`npm run pull` : 연결된 원격 모듈 Type 파일 불러오기 ( 원격 모듈 Exposes 실행 중인 대상만 )  
`npm run exposes` : 자신이 내보내는 Comp의 Type 데이터 내보내기 활성화  

## 최초 실행
`git clone`  
  

(아래 순서 상관 X)   
`npm --prefix mfe-remote i && npm --prefix mfe-remote run start-mf`  
`npm --prefix mfe-host i && npm --prefix mfe-host run start-mf`  

## 타입 공유 실행
(순서대로)  
`npm --prefix mfe-remote i && npm --prefix mfe-remote run exposes`  
`npm --prefix mfe-host i && npm --prefix mfe-host run pull`  
