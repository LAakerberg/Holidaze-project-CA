import { useState } from 'react';
import { Calendar } from 'react-calendar';
import { bookingVenueUrl } from '../services/authorization/apiBase';
import { renderDate } from '../utils/formatDates';
import { Message } from './Message';
import { useNavigate } from 'react-router-dom';

/**
 * Component for booking a venue using a calendar.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The venue data for booking.
 * @returns {JSX.Element} The BookingCalendar component.
 */
export function BookingCalendar({ data }) {
  const user = JSON.parse(localStorage.getItem('userData'));
  const [selectedDates, setSelectedDates] = useState([]);
  const [guests, setGuests] = useState(1);
  const [bookingStatus, setBookingStatus] = useState(null); // New state for booking status
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  /**
   * Event handler for date selection in the calendar.
   *
   * @param {Date|Date[]} selectedDate - The selected date(s).
   */
  const handleDateChange = (selectedDate) => {
    setSelectedDates(selectedDate);
  };

  /**
   * Function to disable specific dates in the calendar.
   *
   * @param {Object} param - The date object.
   * @param {Date} param.date - The date to be evaluated.
   * @returns {boolean} Whether the date should be disabled.
   */
  const tileDisabled = ({ date }) => {
    const formattedDate = new Date(date.toDateString());
    return bookedDates?.some((booking) => {
      const formattedDateFrom = new Date(booking.dateFrom);
      const formattedDateTo = new Date(booking.dateTo);
      return (
        formattedDate >= formattedDateFrom && formattedDate <= formattedDateTo
      );
    });
  };

  const bookedDates = data.bookings?.map((booking) => ({
    dateFrom: new Date(booking.dateFrom),
    dateTo: new Date(booking.dateTo),
  }));

  /**
   * Event handler for the book button click.
   * Sends a booking request to the server.
   */
  const handleBookClick = async () => {
    const idFromVenue = data.id;
    try {
      if (selectedDates.length === 2) {
        const dateFrom = selectedDates[0].toISOString();
        const dateTo = selectedDates[1].toISOString();
        const venueId = idFromVenue;
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch(
          bookingVenueUrl + `?_customer=true&_venue=true`,
          {
            method: 'POST',
            body: JSON.stringify({ dateFrom, dateTo, guests, venueId }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          setBookingStatus('success'); // Set booking status to 'success'
          setMessage({
            type: 'success',
            text: 'Booking was successful, page will reload',
          });
          setTimeout(() => {
            navigate(`/profile/${user.name}`);
          }, 3000);
        } else {
          setMessage({
            type: 'error',
            text: 'Failed to book. Please try again.',
          });
        }
      } else {
        setMessage({
          type: 'error',
          text: 'Please select both dateFrom and dateTo.',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error, not able to book',
        error,
      });
    }
  };

  const handleGuestsChange = (event) => {
    const value = parseInt(event.target.value); // Parse the input value as an integer
    setGuests(value); // Update the guests state with the new value
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-around">
        <div className=" flex mt-4 mx-2">
          <Calendar
            className="custom-calendar bg-gradient-to-b from-light_salmon to-topaz drop-shadow-lg"
            onChange={handleDateChange}
            value={selectedDates}
            tileDisabled={tileDisabled} // Pass the function as tileDisabled prop
            selectRange
          />
        </div>

        <div
          className="flex flex-col border border-light_salmon p-5 mt-4 mx-2"
          id="booking_menu"
        >
          <div className="">
            <div className="flex flex-col">
              <span className="font-bold">Reservation name:</span>
              <input type="text" value={user.name} disabled readOnly />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">How many guests?</span>
              <input
                type="number"
                id="guests"
                placeholder="Max guests"
                min="1"
                max={data.maxGuests}
                value={guests}
                onChange={handleGuestsChange}
              />
            </div>
            <div className="flex flex-col">
              <div>
                <span className="font-bold">Selected dates</span>
              </div>
              <p>
                From:{' '}
                {selectedDates.length > 0 ? renderDate(selectedDates[0]) : null}
              </p>
              <p>
                To:{' '}
                {selectedDates.length > 0 ? renderDate(selectedDates[1]) : null}
              </p>
            </div>
          </div>
          {message && ( // Render Message if message exists
            <Message type={message.type} text={message.text} />
          )}
          {bookingStatus !== 'success' && ( // Render the Book button if booking status is not 'success'
            <div className="text-center">
              <button className="button primary" onClick={handleBookClick}>
                Book
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
