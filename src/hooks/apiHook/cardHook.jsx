import { useFetchVenues } from '../../services/api/apiFetch';
import { Card } from '../../components/Cards';

export function ApiCard() {
  const { venues, isLoading, isError } = useFetchVenues();

  if (isLoading) {
    return <div>Loading Venues</div>;
  }

  if (isError) {
    return <div>Error loading the venues</div>;
  }

  return (
    <>
      {/* Render Card component */}
      <Card data={venues} />
    </>
  );
}
