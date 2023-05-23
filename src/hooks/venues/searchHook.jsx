import { Search } from '../../components/Search';
import { venueApiUrl } from '../../services/authorization/apiBase';
import { useApiCall } from '../api/useApiCall';

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
