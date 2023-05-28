import { useApiCall } from '../api/useApiCall';
import { VenuesList } from '../../components/venue/VenuesList';
import { venueApiUrl } from '../../services/authorization/apiBase';
import { Message } from '../../components/Message';

/**
 * Renders the component that fetches and displays a list of venues.
 *
 */
export function GetVenues() {
  const { data, isLoading, isError } = useApiCall(
    venueApiUrl + `?limit=100&offset=5`
  );

  if (isLoading) {
    return <Message type="loading" text="Loading venues" />; // Display loading message while venue data is being fetched
  }

  if (isError) {
    return <Message type="error" text="Error loading the venues" />; // Display error message if there was an error fetching the venue data
  }

  return (
    <>
      <VenuesList data={data} />
    </>
  );
}
