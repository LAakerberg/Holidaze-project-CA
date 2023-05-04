import { useFetchVenues } from '../../services/api/apiFetch';

import { ListVenues } from '../../components/VenuesList';

export function ApiList() {
  const { venues, isLoading, isError } = useFetchVenues();

  if (isLoading) {
    return <div>Loading Venues</div>;
  }

  if (isError) {
    return <div>Error loading the venues</div>;
  }

  return (
    <>
      {/* Render ListVenues component */}
      <ListVenues data={venues} />
    </>
  );
}
