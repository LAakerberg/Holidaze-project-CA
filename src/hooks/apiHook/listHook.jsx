import { authFetch } from '../../services/api/apiFetch';
import { ListVenues } from '../../components/VenuesList';
import { baseUrl, getAllVenues } from '../../services/api/apiBase';

export function ApiList() {
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
      {/* Render ListVenues component */}
      <ListVenues data={data} />
    </>
  );
}
