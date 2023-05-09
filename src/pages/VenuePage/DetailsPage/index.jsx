import { authFetch } from '../../../services/api/apiFetch';
import { useParams } from 'react-router-dom';
import { getVenue } from '../../../services/api/apiBase';

export function VenuesSpecific() {
  const { id } = useParams();
  const { data, isLoading, isError } = authFetch(getVenue + id, 'GET');
  if (isLoading) {
    return <div>Loading Profile</div>;
  }

  if (isError) {
    return <div>Error loading the venues</div>;
  }
  return (
    <>
      <div>Hello</div>
      <div className="border border-red-500 m-1 p-1">
        <h3>{data.name}</h3>
      </div>
    </>
  );
}
