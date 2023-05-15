import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useApiCall } from '../../hooks/api/useApiCall';
import { getProfileUrl } from '../../services/authorization/apiBase';
import { Profile } from '../../components/Profile';

export function ProfilePage() {
  const { name } = useParams();
  const { data, isLoading, isError } = useApiCall(
    getProfileUrl + name + `?_bookings=true&_venues=true`
  );

  const user = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    document.title = `Profile | ${user.name}`;
  }, []);

  if (isLoading) {
    return <div>Loading Profile</div>;
  }

  if (isError) {
    return <div>Error loading the Profile</div>;
  }

  return (
    <>
      <div className=""></div>
      <div className="p-1 my-1">
        <h3>Profile</h3>
        <div>
          <Profile data={data} />
        </div>
      </div>
    </>
  );
}
