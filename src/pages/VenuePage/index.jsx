import { useEffect } from 'react';
import { GetVenues } from '../../hooks/venues/GetVenues';

/**
 * Renders the Venues page component.
 */
export function VenuesPage() {
  /**
   * Sets the document title when the component mounts.
   * This effect runs only once.
   */
  useEffect(() => {
    document.title = 'Venues page';
  }, []);

  return (
    <>
      <div className="">
        <GetVenues />
      </div>
    </>
  );
}
