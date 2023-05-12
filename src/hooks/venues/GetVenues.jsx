import { useApiCall } from '../api/useApiCall';
import { VenuesList } from '../../components/venue/VenuesList';
import { getVenue } from '../../services/authorization/apiBase';

export function GetVenues() {
  const { data, isLoading, isError } = useApiCall(
    getVenue + `?limit=100&offset=5`
  );
  console.log(data);

  if (isLoading) {
    return <div>Loading Venues</div>;
  }

  if (isError) {
    return <div>Error loading the venues</div>;
  }

  return (
    <>
      <VenuesList data={data} />
    </>
  );
}
