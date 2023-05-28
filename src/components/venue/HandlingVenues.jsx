import { MyVenues } from './ManageVenue';
import { VenueCreation } from '../venue/VenueCreation';

/**
 * Component for handling venues, displaying a list of venues and providing venue creation functionality.
 *
 * @param {Object} props - The component props.
 * @param {Object[]} props.data - The array of venue data.
 * @param {Function} props.onVenueDelete - The function to handle venue deletion.
 * @returns {JSX.Element} The HandlingVenues component.
 */
export function HandlingVenues({ data, onVenueDelete }) {
  return (
    <>
      <MyVenues key="comp1" data={data} onVenueDelete={onVenueDelete} />
      <VenueCreation key="comp2" />
    </>
  );
}
