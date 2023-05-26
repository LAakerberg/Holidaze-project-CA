import { useEffect } from "react";
import { GetVenues } from "../../hooks/venues/GetVenues";

export function VenuesPage() {
  useEffect(() => {
    document.title = "Venues page";
  }, []);

  return (
    <>
      <div className="flex flex-row absolute -top-60 z-10 w-full p-2 gap-4 justify-center"></div>
      <div className="">
        <GetVenues />
      </div>
    </>
  );
}
