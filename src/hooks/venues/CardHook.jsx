import { authFetch } from '../../services/api/apiFetch';
import { Card } from '../../components/Cards';
import { baseUrl, getAllVenues } from '../../services/api/apiBase';

export function GetCard() {
  const { data, isLoading, isError } = authFetch(baseUrl + getAllVenues);

  if (isLoading) {
    return <div>Loading Venues</div>;
  }

  if (isError) {
    return <div>Error loading the venues</div>;
  }

  return (
    <>
      {/* Render Card component */}
      <Card data={data} />
    </>
  );
}
