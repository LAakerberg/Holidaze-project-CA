import { useParams } from 'react-router-dom';
import { useApiCall } from '../../../hooks/api/useApiCall';
import { getVenue } from '../../../services/authorization/apiBase';
import { VenueDetails } from '../../../components/venue/VenueDetails';

export function DetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useApiCall(getVenue + id);
  console.log(data);
  if (isLoading) {
    return <div>Loading Profile</div>;
  }

  if (isError) {
    return <div>Error loading the venues</div>;
  }

  return (
    <>
      <VenueDetails venueData={data} />
    </>
  );
}
