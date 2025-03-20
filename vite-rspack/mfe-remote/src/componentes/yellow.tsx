import { useNavigate } from "react-router";

export function Yellow() {
  const navigation = useNavigate();

  return (
    <>
      <h1
        style={{
          backgroundColor: "yellow",
          color: "black",
        }}
      >
        Remote Yello Page
      </h1>
      <h1
        style={{
          backgroundColor: "blue",
        }}
        onClick={() => navigation("./green")}
      >
        Go to Green
      </h1>
    </>
  );
}
