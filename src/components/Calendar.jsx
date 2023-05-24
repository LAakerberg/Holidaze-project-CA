import { useState } from 'react';
import { Calendar } from 'react-calendar';
import { bookingVenueUrl } from '../services/authorization/apiBase';
import { renderDate } from '../utils/formatDates';

export function BookingCalendar({ data }) {
  console.log(data);
  const user = JSON.parse(localStorage.getItem('userData'));
  const [selectedDates, setSelectedDates] = useState([]);
  const handleDateChange = (selectedDate) => {
    setSelectedDates(selectedDate);
  };

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

  renderDate(selectedDates[0]);
  renderDate(selectedDates[1]);

  console.log(selectedDates);
  console.log(selectedDates[0]);
  console.log(selectedDates[1]);

  const handleBookClick = async () => {
    const idFromVenue = data.id;
    try {
      if (selectedDates.length === 2) {
        const dateFrom = selectedDates[0].toISOString();
        const dateTo = selectedDates[1].toISOString();
        const guests = 1;
        const venueId = idFromVenue;
        const accessToken = localStorage.getItem('accessToken');
        console.log(venueId);
        // Perform API call here with the selected dates
        const response = await fetch(bookingVenueUrl, {
          method: 'POST',
          body: JSON.stringify({ dateFrom, dateTo, guests, venueId }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
          throw new Error('Failed to book. Please try again.');
        }
        const data = await response.json();
        console.log(data);
        // Handle API response
      } else {
        console.log('Please select both dateFrom and dateTo');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
  return (
    <>
      <div className="flex flex-row">
        <div className="flex">
          <Calendar
            className="custom-calendar bg-gradient-to-b from-light_salmon to-topaz drop-shadow-lg"
            onChange={handleDateChange}
            value={selectedDates}
            tileDisabled={tileDisabled} // Pass the function as tileDisabled prop
            selectRange
          />
        </div>
        <div className="flex flex-col border border-light_salmon ml-5">
          <div className="p-5">
            <div className="flex flex-col">
              <span className="font-bold">Reservation name:</span>
              <input type="text" value={user.name} disabled readOnly />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">How many guests?</span>
              <input type="number" max={data.maxGuests} />
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
          <div className="text-center">
            <button className="button primary" onClick={handleBookClick}>
              Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
