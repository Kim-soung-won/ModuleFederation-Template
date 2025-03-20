import { useNavigate } from "react-router";

export function GoRemoteBtn() {
  const navigater = useNavigate();
  return (<button onClick={() => {
    navigater("./remote");
  }}><h1>Go Remote</h1></button>);
}