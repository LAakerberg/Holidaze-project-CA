import { useEffect } from 'react';

export function Home() {
  useEffect(() => {
    document.title = 'Home page';
  }, []);

  return (
    <>
      <main className="relative flex flex-col w-full md:w-4/5 max-w-screen-2xl px-1 z-10">
        <div className=""></div>
        <div>hello</div>
      </main>
    </>
  );
}
