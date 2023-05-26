import { useParams } from 'react-router-dom';
import { useApiCall } from '../../../hooks/api/useApiCall';
import { venueApiUrl } from '../../../services/authorization/apiBase';
import { VenueDetails } from '../../../components/venue/VenueDetails';

export function DetailsPage() {
  const { id } = useParams();
  const { data, response, isLoading, isError } = useApiCall(
    venueApiUrl + id + `?_bookings=true`
  );

  if (isLoading) {
    return <div>Loading Profile</div>;
  }

  if (isError) {
    return <div>Error loading the venues</div>;
  }

  return (
    <>
      <VenueDetails venueData={data} response={response} />
    </>
  );
}
