import { Search } from '../../components/Search';
import { getVenue } from '../../services/api/apiBase';
import { useApiCall } from '../api/useApiCall';

export const VenueSearch = () => {
  const { data, isLoading, isError } = useApiCall(getVenue);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return <Search data={data} />;
};
