# MFE / Module federation 기본 Template
`구성 Dir는 빌드 환경을 기준으로 구분하였습니다.`

폴더명 : [Host 빌드 환경]-[Remote 빌드 환경]

## 실행 화면
![실행 화면](<result.png>)

# 빌드 환경 별 MF 기능 제약, 특이사항

각 모듈의 빌드 환경과 관계없이 Federation을 통한 Component 공유는 이뤄집니다.

## Vite
+ ESM 중심 빌드 도구로 호출 시 Module Type: `module` 설정 필요
+ .json 형식의 entry file 사용 불가능, remoteEntry.js 고정
+ Dev모드 동작 방식의 제약으로 federation 활성화시 preview 모드를 통해서만 entry 파일 노출 가능, React Hot Reload 기능 활용 불가능
+ federation 2.0 기능 사용 불가
+ vite.config 설정에 사용할 모든 Federation Comp 기제 필수
+ 별도 Type 공유 라이브러리 사용 필수
+ vite 별도 라이브러이인 module-federation/vite 사용 필수


## Rspack
+ Module federation 네이티브 지원
+ .json 형식의 entry file 사용 가능, mf-manifest.json 형식 통합
+ Dev 모드에서 federation 활성화, React Hot Reload 기능 활용 가능
+ federation 2.0 기능 지원 https://module-federation.io/blog/announcement.html
+ Code Level에서 호출 모듈 정의