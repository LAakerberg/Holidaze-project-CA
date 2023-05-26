import { useParams } from "react-router-dom";
import { useApiCall } from "../../../hooks/api/useApiCall";
import { venueApiUrl } from "../../../services/authorization/apiBase";
import { VenueDetails } from "../../../components/venue/VenueDetails";
import { Message } from "../../../components/Message";

export function DetailsPage() {
  const { id } = useParams();
  const { data, response, isLoading, isError } = useApiCall(
    venueApiUrl + id + `?_bookings=true`
  );

  if (isLoading) {
    return <Message type="loading" text="Loading Profile" />;
  }

  if (isError) {
    return <Message type="error" text="Error loading the venues" />;
  }

  return (
    <>
      <VenueDetails venueData={data} response={response} />
    </>
  );
}
