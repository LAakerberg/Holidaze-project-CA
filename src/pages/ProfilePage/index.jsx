import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useApiCall } from '../../hooks/api/useApiCall';
import { getProfileUrl } from '../../services/authorization/apiBase';
import { Profile } from '../../components/Profile';
import { Message } from '../../components/Message';

/**
 * Profile page component.
 * Displays user profile information.
 */
export function ProfilePage() {
  const user = JSON.parse(localStorage.getItem('userData')); // Retrieve user data from localStorage
  const { name } = useParams(); // Get the 'name' parameter from the URL

  const { data, isLoading, isError } = useApiCall(
    getProfileUrl + name + `?_bookings=true&_venues=true&sortOrder=asc` // API endpoint for retrieving user profile data
  );

  useEffect(() => {
    document.title = `Profile | ${user.name}`; // Set document title including the user's name
  }, []);

  if (isLoading) {
    return <Message type="loading" text="Loading the profile" />; // Display loading message while profile data is being fetched
  }

  if (isError) {
    return <Message type="error" text="Error loading the profile" />; // Display error message if there was an error fetching the profile data
  }

  return (
    <>
      <div className=""></div>
      <div className="p-1 my-1">
        <h2>Profile</h2>
        <div>
          <Profile data={data} />{' '}
        </div>
      </div>
    </>
  );
}
