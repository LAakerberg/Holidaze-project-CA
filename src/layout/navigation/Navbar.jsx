import { Navigation } from "./Navigation";
import { MobileNavigation } from "./Mobilenavigation";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (location.pathname === "/success/login") {
      setShouldRender(true);
    } else {
      setShouldRender(false);
    }
  }, [location]);

  if (!shouldRender) {
    return (
      <>
        <Navigation />
        <MobileNavigation />
      </>
    );
  }
}
