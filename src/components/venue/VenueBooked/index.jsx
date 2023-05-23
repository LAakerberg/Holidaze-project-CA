import { Link } from 'react-router-dom';
import { useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import { useParams } from 'react-router-dom';
import { getProfileUrl } from '../../../services/authorization/apiBase';
import { useApiCall } from '../../../hooks/api/useApiCall';
import { Spinner } from '../../Spinner';
import { renderDate } from '../../../utils/formatDates';

export function VenueBooked() {
  const { name } = useParams(); // Get the 'name' parameter from the URL
  const { data, isLoading, isError } = useApiCall(
    getProfileUrl + name + `/` + `bookings?sortOrder=desc&_venue=true`,
    'GET'
  );

  /* console.log(data); */

  const [isOpenBooked, setIsOpenBooked] = useState(false);
  const [isOpenHistory, setIsOpenHistory] = useState(false);

  const toggleOpenBooked = () => {
    setIsOpenBooked(!isOpenBooked);
  };

  const toggleOpenHistory = () => {
    setIsOpenHistory(!isOpenHistory);
  };

  const dataApi = data;

  if (isLoading) {
    return (
      <div className="border border-light_salmon bg-gray-200 py-1 my-1">
        <div className="p-1">
          Loading venues <Spinner />
        </div>
      </div>
    ); // Display loading message while profile data is being fetched
  }

  if (isError) {
    return <div>Error loading the venues</div>; // Display error message if there was an error fetching the profile data
  }

  const today = new Date();
  const filteredBookings = dataApi?.filter((booking) => {
    const dateFrom = new Date(booking.dateFrom);
    return dateFrom >= today;
  });

  const filteredBookingsPassed = dataApi?.filter((booking) => {
    const dateFrom = new Date(booking.dateFrom);
    return dateFrom <= today;
  });

  return (
    <>
      <div className="border border-light_salmon bg-gray-200 py-1 my-1">
        <div className="p-1">
          <div className="flex">
            <div className="flex-1">
              <h3>Upcoming booking</h3>
            </div>
            <div className="flex-initial">
              <button
                className={`arrow-button ${isOpenBooked ? 'open' : ''}`}
                onClick={toggleOpenBooked}
                id="open_manage_venue"
              >
                <TiArrowSortedDown />
              </button>
            </div>
          </div>
          {isOpenBooked && (
            <div className="grid grid-cols-1 mobile:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-1 gap-5">
              {filteredBookings?.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-row p-1 justify-center"
                >
                  <Link to={`/venues/details/${booking.venue.id}`}>
                    <div className="flex-1">
                      <div>
                        <img
                          src={booking.venue.media[0]}
                          alt={booking.venue.name}
                          className="object-cover rounded-xl h-32 w-52 border border-1 border-gray-800 m-auto drop-shadow-xl hover:scale-110 hover:transition delay-50 duration-500 ease-in-out"
                        />
                      </div>
                      <div className="border rounded-lg mt-1 p-1">
                        <p>Booking dates:</p>
                        {renderDate(booking.dateFrom)} -{' '}
                        {renderDate(booking.dateTo)}
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col h-32">
                    <div className="flex-1" id="edit_venue"></div>
                    <div className="flex-1"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="border border-light_salmon bg-gray-200 py-1 my-1">
        <div className="p-1">
          <div className="flex">
            <div className="flex-1">
              <h3>History</h3>
            </div>
            <div className="flex-initial">
              <button
                className={`arrow-button ${isOpenHistory ? 'open' : ''}`}
                onClick={toggleOpenHistory}
                id="open_manage_venue"
              >
                <TiArrowSortedDown />
              </button>
            </div>
          </div>
          {isOpenHistory && (
            <div className="grid grid-cols-1 mobile:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-1 gap-5">
              {filteredBookingsPassed?.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-row p-1 justify-center"
                >
                  <Link to={`/venues/details/${booking.venue.id}`}>
                    <div className="flex-1">
                      <div>
                        <img
                          src={booking.venue.media[0]}
                          alt={booking.venue.name}
                          className="object-cover rounded-xl h-32 w-52 border border-1 border-gray-800 m-auto drop-shadow-xl hover:scale-110 hover:transition delay-50 duration-500 ease-in-out"
                        />
                      </div>
                      <div className="border rounded-lg mt-1 p-1">
                        <p>Booking dates:</p>
                        {renderDate(booking.dateFrom)} -{' '}
                        {renderDate(booking.dateTo)}
                      </div>
                    </div>
                  </Link>
                  <div className="flex flex-col h-32">
                    <div className="flex-1" id="edit_venue"></div>
                    <div className="flex-1"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
