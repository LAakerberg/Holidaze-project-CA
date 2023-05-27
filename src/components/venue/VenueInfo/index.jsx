import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useState } from 'react';
import { renderDate } from '../../../utils/formatDates';
import { useApiCall } from '../../../hooks/api/useApiCall';
import { bookingVenueUrl } from '../../../services/authorization/apiBase';

export function VenueInfo({ info }) {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleMouseEnter = () => {
    setPopupVisible(true);
  };

  const handleMouseLeave = () => {
    setPopupVisible(false);
  };
  /*   console.log(info.bookings); */
  const bookings = info.bookings;
  console.log(bookings);
  return (
    <>
      <div
        className="transition delay-50 duration-300 ease-in-out"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Render your venue icon here */}
        <AiOutlineInfoCircle className="icons-style_edit" alt="Text" />

        {isPopupVisible && (
          <div className="popup transition delay-50 duration-300 ease-in-out">
            {/* Render popup content here */}
            <div>
              <div>Bookings</div>
              <div className="border border-light_salmon transition delay-50 duration-300 ease-in-out">
                {bookings.length > 0 ? (
                  bookings
                    .sort(
                      (b, a) => Date.parse(a.dateFrom) - Date.parse(b.dateFrom)
                    )
                    .map((booked) => {
                      const today = new Date();
                      let className;
                      if (Date.parse(booked.dateFrom) < Date.parse(today)) {
                        className =
                          'border border-light_salmon bg-red-200 p-1 m-1';
                      } else {
                        className = 'border border-light_salmon p-1 m-1';
                      }
                      return (
                        <div className={className} key={booked.id}>
                          <p>
                            Booking ref: {booked.id.slice(0, 8).toUpperCase()}
                          </p>
                          {renderDate(booked.dateFrom)} -{' '}
                          {renderDate(booked.dateTo)}
                        </div>
                      );
                    })
                ) : (
                  <div className="p-1 m-1">No bookings made yet</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export function VenueSpecifiedInfo() {
  const { data, isLoading, isError } = useApiCall(
    bookingVenueUrl +
      'f1153ea5-f805-496f-a815-b7a474e899e3' +
      `?_customer=true&_venue=false` // API endpoint for retrieving user profile data
  );

  if (isLoading) {
    return <div>Loading Profile</div>; // Display loading message while profile data is being fetched
  }

  if (isError) {
    return <div>Error loading the Profile</div>; // Display error message if there was an error fetching the profile data
  }

  return data;
}
