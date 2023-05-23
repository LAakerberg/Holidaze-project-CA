import { useEffect } from 'react';
import { BsWifi } from 'react-icons/bs';
import { TbParking } from 'react-icons/tb';
import { BiRestaurant } from 'react-icons/bi';
import { MdOutlinePets } from 'react-icons/md';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Calendar } from 'react-calendar';
import { bookingVenueUrl } from '../../services/authorization/apiBase';
import 'react-calendar/dist/cjs/MonthView';
import 'react-datepicker/dist/react-datepicker.css';

export function VenueDetails({ venueData }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  console.log(venueData);
  console.log(venueData.bookings);
  const titleName = venueData.name;

  useEffect(() => {
    document.title = `Venue | ${titleName}`;
  }, []);

  useEffect(() => {
    if (venueData.bookings) {
      const dates = venueData.bookings.reduce((acc, booking) => {
        const startDate = new Date(booking.dateFrom);
        const endDate = new Date(booking.dateTo);

        const bookingDates = getBookingDates(startDate, endDate);
        return [...acc, ...bookingDates];
      }, []);

      setBookedDates(dates);
    }
  }, [venueData.bookings]);

  const getBookingDates = (startDate, endDate) => {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  return (
    <>
      <div className="border border-light_salmon m-1 p-1">
        <div className="flex border border-light_salmon m-1 p-1">
          <h2 className="font-bold">{venueData.name}</h2>
        </div>
        <div className="flex flex-row border border-light_salmon m-1 p-1">
          <div className="flex-1 border border-light_salmon m-1 p-1">
            <img src={venueData.media} className="w-full h-96 object-cover" />
          </div>
          <div className="flex-initial w-40 border border-light_salmon m-1 p-1">
            <div className="flex flex-col">
              <div className="h-60">
                <div>
                  <p className="text-lg font-bold break-all">
                    This venue offers:
                  </p>
                  <ul className="grid grid-cols-2 list-none">
                    <li className="p-0">
                      {venueData.meta?.breakfast ? (
                        <div className="main-icon">
                          <BiRestaurant
                            className="icons-style"
                            title="Restaurant available"
                          />
                          <div className=""></div>
                        </div>
                      ) : (
                        <div className="main-icon">
                          <BiRestaurant className="icons-style" />
                          <div className="cross"></div>
                        </div>
                      )}
                    </li>
                    <li className="p-0">
                      {venueData.meta?.parking ? (
                        <div className="main-icon">
                          <TbParking
                            className="icons-style"
                            title="Parking available"
                          />
                          <div className=""></div>
                        </div>
                      ) : (
                        <div className="main-icon">
                          <TbParking
                            className="icons-style"
                            title="No parking"
                          />
                          <div className="cross"></div>
                        </div>
                      )}
                    </li>
                    <li className="p-0">
                      {venueData.meta?.pets ? (
                        <div className="main-icon">
                          <MdOutlinePets
                            className="icons-style"
                            title="Pets allowed"
                          />
                          <div className=""></div>
                        </div>
                      ) : (
                        <div className="main-icon">
                          <MdOutlinePets
                            className="icons-style"
                            title="No pets allowed"
                          />
                          <div className="cross"></div>
                        </div>
                      )}
                    </li>
                    <li className="p-0">
                      {venueData.meta?.wifi ? (
                        <div className="main-icon">
                          <BsWifi
                            className="icons-style"
                            title="Wifi available"
                          />
                          <div className=""></div>
                        </div>
                      ) : (
                        <div className="main-icon">
                          <BsWifi
                            className="icons-style"
                            title="No wifi available"
                          />
                          <div className="cross"></div>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="">
                <ul>
                  <li className="block p-0">
                    Country: {venueData.location?.country ?? 'Unknown country'}
                  </li>
                  <li className="block p-0">
                    City: {venueData.location?.city ?? 'Unknown city'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-light_salmon m-1 p-1">
          <div className="border-b border-light_salmon">
            <h4>About</h4>
          </div>
          <p></p>
          <p>{venueData.description}</p>
        </div>
        <div className="border border-light_salmon m-1 p-1">
          <p className="">Created: {venueData.created}</p>
          <p className="">ID: {venueData.id}</p>
          <p className="">Max guests: {venueData.maxGuests}</p>
          <p className="">Price: {venueData.price}</p>
          <p className="">Rating: {venueData.rating}</p>
          <p className="">Last update: {venueData.updated}</p>
          <p className="">Location: {venueData.location?.city}</p>
        </div>
      </div>
      <div className="border border-light_salmon m-1 p-1">
        <h4>Select a Date for Booking</h4>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          excludeDates={bookedDates}
        />
      </div>
      <div className="border border-light_salmon m-1 p-1">
        <h4>Select a Date for Booking</h4>
        <div className="text-center justify-center">
          <div>
            <BookingCalendar data={venueData} />
          </div>
        </div>
      </div>
    </>
  );
}

function BookingCalendar({ data }) {
  console.log(data.id);
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (selectedDate) => {
    setSelectedDates(selectedDate);
  };

  const handleBookClick = async () => {
    try {
      if (selectedDates.length === 2) {
        const dateFrom = selectedDates[0].toISOString();
        const dateTo = selectedDates[1].toISOString();
        const guests = 1;
        const venueId = '9f1c16fe-6023-4af9-9c59-d3ec8863563f';

        const accessToken = localStorage.getItem('accessToken');

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
      <div>
        <h1>Calendar Example</h1>
        <Calendar
          className="custom-calendar bg-gradient-to-b from-light_salmon to-topaz drop-shadow-lg"
          onChange={handleDateChange}
          value={selectedDates}
          selectRange
        />
      </div>
      <div>
        <button className="button primary" onClick={handleBookClick}>
          Book
        </button>
      </div>
    </>
  );
}
