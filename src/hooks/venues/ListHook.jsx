import { authFetch } from '../../services/api/apiFetch';
import { VenueSlice } from '../../components/VenuesList';
import { baseUrl, getAllVenues } from '../../services/api/apiBase';

export function GetList() {
  const { data, isLoading, isError } = authFetch(baseUrl + getAllVenues);
  console.log(data);

  if (isLoading) {
    return <div>Loading Venues</div>;
  }

  if (isError) {
    return <div>Error loading the venues</div>;
  }

  return (
    <>
      <VenueSlice data={data} />
    </>
  );
}
