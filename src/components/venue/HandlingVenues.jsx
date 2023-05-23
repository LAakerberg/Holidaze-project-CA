import { MyVenues } from './ManageVenue';
import { VenueCreation } from '../venue/VenueCreation';

export function HandlingVenues({ data, onVenueDelete }) {
  return (
    <>
      <MyVenues key="comp1" data={data} onVenueDelete={onVenueDelete} />
      <VenueCreation key="comp2" />
    </>
  );
}
