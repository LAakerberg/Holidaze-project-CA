import { Search } from '../../components/Search';
import { venueApiUrl } from '../../services/authorization/apiBase';
import { useApiCall } from '../api/useApiCall';

/**
 * Renders the venue search component that fetches venue data from an API and displays a search interface.
 */
export const VenueSearch = () => {
  const { data, isLoading, isError } = useApiCall(venueApiUrl);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return <Search data={data} />;
};
