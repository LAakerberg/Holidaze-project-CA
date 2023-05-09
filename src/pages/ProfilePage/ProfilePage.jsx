import { useParams } from 'react-router-dom';
import { authFetch } from '../../services/api/apiFetch';
import { baseUrl, getProfileUrl } from '../../services/api/apiBase';
import { Profile } from '../../components/Profile';

export function ProfilePage() {
  const { name } = useParams();
  const { data, isLoading, isError } = authFetch(
    baseUrl + getProfileUrl + name,
    'GET'
  );
  if (isLoading) {
    return <div>Loading Profile</div>;
  }

  if (isError) {
    return <div>Error loading the venues</div>;
  }

  return (
    <>
      <main className="relative flex flex-col w-full md:w-4/5 max-w-screen-2xl px-1 z-10">
        <div className="mt-32"></div>
        <div className="p-1 my-1">
          <h3>Profile</h3>
          <div>
            <Profile data={data} />
          </div>
        </div>
      </main>
    </>
  );
}
