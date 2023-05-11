import { useApiCall } from '../api/useApiCall';
import { Card } from '../../components/Cards';
import { getVenue } from '../../services/api/apiBase';

export function GetCard() {
  const { data, isLoading, isError } = useApiCall(getVenue);

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
