import { useEffect } from 'react';
import { FetchVenues } from '../../services/Api/apiFetch';

export function Home() {
  useEffect(() => {
    document.title = 'Home page';
  }, []);

  return (
    <>
      <main className="relative flex flex-col w-full md:w-4/5 max-w-screen-2xl px-1">
        <div className="flex flex-row absolute -top-60 z-10 w-full p-2 gap-4 justify-center">
          <FetchVenues />
        </div>
        <div className="mt-32"></div>
        <div></div>
      </main>
    </>
  );
}
