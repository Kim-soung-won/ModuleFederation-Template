import { Modules } from "./modules";

/**
 내보내는 설정 관리 함수
 * 동적으로 파일 경로를 가져올 수 없어 직접 파일 명과 Name 지정
 * json 파일을 통해 관리하며, 모듈 이름을 key로 지정해 모든 모듈을 통합 관리할 수 있을 것 같다.
 * baseUrl: ./ 로 기본 설정한다. 이 값은 원격에서 호출할 경우 import({Module Name}/{baseUrl}) 형태로 사용된다.
 * baseFilePath: export 될 파일의 경로를 표시한다. 확장자까지 명시해줘야하며 ./src/ 로 시작한다.
 */
interface AutoExposeProps {
  baseUrl: string;
  baseFilePath: string;
  moduleName: string;
}

export const getAutoExposes = ({
  baseUrl,
  baseFilePath,
  moduleName,
}: AutoExposeProps) => {
  const exposes: Record<string, string> = {};
  //내보내는 Comp가 있을 경우 Modules.[Module Name].comp 로 설정
  const list = Modules[moduleName].comp;

  Object.entries(list).forEach(([key, value]) => {
    exposes[`${baseUrl}${key}`] = `${baseFilePath}${value.filePath}`;
  });

  return exposes;
};
