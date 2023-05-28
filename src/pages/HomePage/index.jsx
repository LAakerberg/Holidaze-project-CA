import { useEffect } from 'react';

export function Home() {
  useEffect(() => {
    document.title = 'Home page';
  }, []);

  return (
    <>
      <div>
        <h2>Home</h2>
      </div>
      <div className="border border-light_salmon my-1">
        <div className="flex flex-col bg-gray-200 p-4">
          <p className="">
            Welcome to Holidaze Summer, the place were you can both rent your
            next vacation or choose to rent out your own place. Maybe rent a
            house and at the same time rent out your own house to earn money.
          </p>
          <p className="line-clamp-3 leading-6">
            Everything is possible here and why not earn some money will you are
            on vacation yourself with the hole family and have some extra money
            to spare.
          </p>
          <p>
            To become an host you just create an account and start to rent out
            your place today. You can also with the same account book your next
            trip.
          </p>
          <div className="px-2 border-t-2 border-topaz">
            <p>Have a happy hosting and vacation</p>
            <p className="p-0 indent-8 list-disc">
              Sincerely Holidaze Summer...
            </p>
          </div>
        </div>
      </div>
      <div className=""></div>

      <div className=""></div>
    </>
  );
}
