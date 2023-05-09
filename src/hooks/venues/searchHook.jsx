import { authFetch } from '../../services/api/apiFetch';
import { Search } from '../../components/Search';
import { baseUrl, getAllVenues } from '../../services/api/apiBase';

export const VenueSearch = () => {
  const { data, isLoading, isError } = authFetch(baseUrl + getAllVenues);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return <Search data={data} />;
};
