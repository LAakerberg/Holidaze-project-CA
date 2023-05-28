import { useParams } from 'react-router-dom';
import { useApiCall } from '../../../hooks/api/useApiCall';
import { venueApiUrl } from '../../../services/authorization/apiBase';
import { VenueDetails } from '../../../components/venue/VenueDetails';
import { Message } from '../../../components/Message';

/**
 * Renders the Details page component.
 */
export function DetailsPage() {
  const { id } = useParams();
  /**
   * Makes an API call to retrieve venue details and bookings for the specified ID.
   * Manages the loading state and error handling.
   */
  const { data, response, isLoading, isError } = useApiCall(
    venueApiUrl + id + `?_bookings=true`
  );

  if (isLoading) {
    return <Message type="loading" text="Loading venues" />; // Display loading message while venue data is being fetched
  }

  if (isError) {
    return <Message type="error" text="Error loading the venues" />; // Display error message if there was an error fetching the venue data
  }

  return (
    <>
      <VenueDetails venueData={data} response={response} />
    </>
  );
}
