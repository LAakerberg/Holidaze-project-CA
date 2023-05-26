import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    document.title = "Home page";
  }, []);

  return (
    <>
      <div className=""></div>
      <div>hello</div>
    </>
  );
}
