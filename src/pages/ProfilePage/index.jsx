import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApiCall } from "../../hooks/api/useApiCall";
import { getProfileUrl } from "../../services/authorization/apiBase";
import { Profile } from "../../components/Profile";

/**
 * Profile page component.
 * Displays user profile information.
 */
export function ProfilePage() {
  const user = JSON.parse(localStorage.getItem("userData")); // Retrieve user data from localStorage
  const { name } = useParams(); // Get the 'name' parameter from the URL
  const [shouldUpdateProfile, setShouldUpdateProfile] = useState(false); // State variable to trigger profile update
  const { data, isLoading, isError } = useApiCall(
    getProfileUrl + name + `?_bookings=true&_venues=true&sortOrder=asc`, // API endpoint for retrieving user profile data
    shouldUpdateProfile // Pass shouldUpdateProfile as a dependency to trigger the API call
  );

  useEffect(() => {
    document.title = `Profile | ${user.name}`; // Set document title including the user's name
  }, []);

  /**
   * Event handler for venue deletion.
   * Sets shouldUpdateProfile to true to trigger the API call and update the profile.
   */
  const handleVenueDelete = () => {
    setShouldUpdateProfile(true);
  };

  if (isLoading) {
    return <div>Loading Profile</div>; // Display loading message while profile data is being fetched
  }

  if (isError) {
    return <div>Error loading the Profile</div>; // Display error message if there was an error fetching the profile data
  }

  return (
    <>
      <div className=""></div>
      <div className="p-1 my-1">
        <h3>Profile</h3>
        <div>
          <Profile data={data} onVenueDelete={handleVenueDelete} />{" "}
          {/* Render the Profile component with the fetched data and the delete venue event handler */}
        </div>
      </div>
    </>
  );
}
