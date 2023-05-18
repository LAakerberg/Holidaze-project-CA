import { BookedVenue } from '../venue/BookedVenue';
import { ManageVenue } from '../venue/ManageVenue';
import { useState, useEffect } from 'react';

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
          <div className="flex flex-row bg-gray-200 p-1">
            <div>
              {' '}
              <img
                src={data.avatar}
                className="w-52 object-contain rounded-full"
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
          <ManageVenue data={data} onVenueDelete={handleDelete} />{' '}
          {/* Render the ManageVenue component */}
        </div>

        <div className="">
          <BookedVenue bookingData={data} />
        </div>
      </div>
    </>
  );
}
