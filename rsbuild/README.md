# Micro FrontEnd / Module federation RsBuild MF 2.0 환경 Exam

## 각 모듈 실행 명령어

`npm run dev` : 모듈 단독 실행  


## MF 2.0 변경 후 개선 사항
1. Remote Comp 정의 레이어 Build Config (`.config.ts`) -> Code (`.tsx`)레벨로 변경
2. Module Federation Chrome DevTools 사용가능
3. `remoteEntry.js` -> `mf-manifest.json` 으로 exposes 파일 변경
4. TypeHint 기능 추가, 실행 명령어 통일
5. 원격 module 개발 간 hot reload 활성화
6. MF 지원 Plugin 사용 가능 