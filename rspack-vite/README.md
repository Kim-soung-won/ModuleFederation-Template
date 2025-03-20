# MFE Rspack(Host) <-> Vite(Remote) 환경 Exam


## 각 모듈 실행 명령어

### Host (Rspack 환경)
`npm run dev` : Dev 모드 실행  

### Remote (Vite 환경)
`npm run start-mf` : 기본 Module federation 실행  

## 최초 실행
`git clone`  
  

(아래 순서 상관 X)   
`npm --prefix mfe-host i && npm --prefix mfe-host run dev`  
`npm --prefix mfe-remote i && npm --prefix mfe-remote run start-mf`  

## 타입 공유 실행
Vite와 Rspack 환경 섞일 경우 불가능