import { VenueBooked } from '../venue/VenueBooked';
import { ManageVenue } from '../venue/ManageVenue';
import { useState, useEffect } from 'react';
import { EditProfile } from './EditProfile';

/**
 * Profile component.
 * Displays user profile information.
 *
 * @param {Object} data - The user profile data.
 * @param {Function} onVenueDelete - The function to call when a venue is deleted.
 * @returns {JSX.Element} The rendered Profile component.
 */
export function Profile({ data, onVenueDelete }) {
  const [venueList, setVenueList] = useState(data.venues); // State variable for the list of venues

  useEffect(() => {
    setVenueList(data.venues); // Update the venue list when the data.venues prop changes
  }, [data.venues]);

  /**
   * Event handler for venue deletion.
   *
   * @param {number} venueId - The ID of the venue to delete.
   */
  const handleDelete = (venueId) => {
    // Call the onVenueDelete function passed from the ProfilePage component
    onVenueDelete(venueId);
    setVenueList(venueList.filter((venue) => venue.id !== venueId)); // Remove the deleted venue from the list
  };

  return (
    <>
      <div>
        <div className="border border-light_salmon my-1">
          <div className="absolute p-1">
            <EditProfile />
          </div>
          <div className="flex flex-row bg-gray-200 p-1">
            <div className="p-2">
              <img
                src={data.avatar}
                alt={(data.avatar, 'Profile picture')}
                className="w-52 object-contain rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS54088iJjHpn-y9FCxGAh5NBEdHugwIXewWQ&usqp=CAU';
                }}
              />
            </div>
            <div className="px-2 border-l-2 border-topaz">
              <div>
                <p className="text-lg font-bold">{data.name}</p>
              </div>
              <div className="">
                My stats:
                <ul>
                  <li>Bookings: {data._count?.bookings}</li>
                  <li>Venues: {data._count?.venues}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <ManageVenue dataName={data} onVenueDelete={handleDelete} />{' '}
          {/* Render the ManageVenue component */}
        </div>

        <div className="">
          <VenueBooked bookingData={data} />
        </div>
      </div>
    </>
  );
}
