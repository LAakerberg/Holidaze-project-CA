import { Navigation } from './Navigation';
import { MobileNavigation } from './Mobilenavigation';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Navbar component.
 * Renders the navigation bar of the website.
 */
export function Navbar() {
  const location = useLocation();
  const [shouldRender, setShouldRender] = useState(false);

  /**
   * Updates the value of `shouldRender` based on the current location.
   * If the location is '/success/login', `shouldRender` is set to true,
   * otherwise, it is set to false.
   */
  useEffect(() => {
    if (location.pathname === '/success/login') {
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
