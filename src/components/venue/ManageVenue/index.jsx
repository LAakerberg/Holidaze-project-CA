import { useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import { VenueEdit } from '../VenueEdit/index';
import { HandlingVenues } from '../HandlingVenues';
import { VenueDelete } from '../VenueDelete';
import { Link, useParams } from 'react-router-dom';

/* import houseImg from '../../assets/img/house.jpg'; */

import { Spinner } from '../../Spinner';

// MyVenues
import { useApiCall } from '../../../hooks/api/useApiCall';
import { getProfileUrl } from '../../../services/authorization/apiBase';
import { VenueInfo } from '../VenueInfo';

/**
 * Renders the component to manage a venue.
 * @param {Object} props - The component props.
 * @param {Object} props.data - The venue data.
 * @returns {JSX.Element} - The rendered component.
 */
export function ManageVenue({ dataName }) {
  const user = JSON.parse(localStorage.getItem('userData'));
  const venueData = dataName;

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (venueData.name === user.name && user.venueManager === true) {
    return (
      <>
        <div className="border border-light_salmon bg-gray-200 py-1 my-1">
          <div className="flex flex-col p-1">
            <div className="flex flex-row">
              <div className="flex-1">
                <h3>Manage venue ({venueData._count?.venues})</h3>
              </div>
              <div className="flex-initial">
                <button
                  className={`arrow-button ${isOpen ? 'open' : ''}`}
                  onClick={toggleOpen}
                  id="open_manage_venue"
                >
                  <TiArrowSortedDown />
                </button>
              </div>
            </div>
            <div>{isOpen && <HandlingVenues data={venueData} />}</div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}

/**
 * This function is rendering if the venueManger has any active venues. If the manager does not have any venues it's will
 * been rendering that's no venue is created yet. The function will also execute successful or error message during edit or deleting.
 * @param {string} props The components props
 * @param {string} data.venues Is mapping all venues
 * @returns Returns the venues where the manager can edit or delete
 */

export function MyVenues({ onVenueDelete }) {
  const { name } = useParams(); // Get the 'name' parameter from the URL
  const { data, isLoading, isError } = useApiCall(
    getProfileUrl + name + `/venues?_bookings=true&_owner=true` // API endpoint for retrieving user profile data
  );

  console.log(data);
  const [errorMessage, setErrorMessage] = useState('');
  const handleDeleteError = (error) => {
    setErrorMessage(error);
  };

  const [successMessage, setSuccessMessage] = useState('');
  const handleSuccess = (message) => {
    setSuccessMessage(message);
  };

  const handleVenueDelete = (venueId) => {
    onVenueDelete(venueId);
  };

  if (isLoading) {
    return <div>Loading Profile</div>; // Display loading message while profile data is being fetched
  }

  if (isError) {
    return <div>Error loading the Profile</div>; // Display error message if there was an error fetching the profile data
  }

  if (data.length > 0) {
    return (
      <div>
        {successMessage && (
          <>
            <div className="border bg-green-500/50 border-green-800 w-full m-auto">
              <div className="flex">
                <div className="flex-1 p-1">
                  <p>{successMessage}</p>
                </div>
                <div className="flex-initial p-1">
                  <Spinner />
                </div>
              </div>
            </div>
          </>
        )}
        {errorMessage && (
          <>
            <div className="flex border bg-red-500/50 border-red-800 w-full h-10 m-auto">
              <p className="m-auto">{errorMessage}</p>
            </div>
          </>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 p-1 gap-5">
          {data.map((venue) => (
            <div key={venue.id} className="flex flex-row p-1">
              <Link to={`/venues/details/${venue.id}`}>
                <div className="flex-1">
                  <div>
                    <img
                      src={venue.media[0]}
                      alt={venue.name}
                      className="object-cover rounded-xl h-32 w-32 border border-1 border-gray-800 m-auto drop-shadow-xl hover:scale-110 hover:transition delay-50 duration-500 ease-in-out"
                      /*                     onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = houseImg;
                    }} */
                    />
                  </div>
                  <div className="">
                    {venue.name.length > 15
                      ? `${venue.name.slice(0, 25)}...`
                      : venue.name}
                  </div>
                </div>
              </Link>
              <div className="flex flex-col h-32">
                <div className="flex-1">
                  <VenueInfo info={venue} />
                </div>
                <div className="flex-1" id="edit_venue">
                  <VenueEdit venue={venue} />
                </div>
                <div className="flex-1">
                  <VenueDelete
                    venueId={venue.id}
                    onError={handleDeleteError}
                    onMessage={handleSuccess}
                    onVenueDelete={handleVenueDelete}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex border bg-red-500/50 border-red-800 w-full h-10 m-auto">
        <p className="m-auto">No venue created yet!</p>
      </div>
    );
  }
}
