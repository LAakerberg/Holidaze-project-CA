import { Navigation } from "./Navigation";
import { MobileNavigation } from "./Mobilenavigation";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function Navbar() {
  const location = useLocation();

  useEffect(() => {
    console.log("Navigation bar has been reloaded");

    // Example: Scroll to top of the page when the user navigates to a new route
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Navigation />
      <MobileNavigation />
    </>
  );
}
