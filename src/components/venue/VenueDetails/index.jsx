import { useEffect } from 'react';
import { BsWifi } from 'react-icons/bs';
import { TbParking } from 'react-icons/tb';
import { BiRestaurant } from 'react-icons/bi';
import { MdOutlinePets } from 'react-icons/md';
import { BookingCalendar } from '../../Calendar';
import { renderDate } from '../../../utils/formatDates';
import 'react-calendar/dist/cjs/MonthView';
import 'react-datepicker/dist/react-datepicker.css';

export function VenueDetails({ venueData }) {
  console.log(venueData.bookings);
  const titleName = venueData.name;

  useEffect(() => {
    document.title = `Venue | ${titleName}`;
  }, []);

  return (
    <>
      <div className="border border-light_salmon m-1 p-1 bg-gray-200">
        <div className="flex border border-light_salmon m-1 p-1">
          <h2 className="font-bold">{venueData.name}</h2>
        </div>
        <div className="flex flex-row border border-light_salmon m-1 p-1">
          <div className="flex-1 border border-light_salmon m-1 p-1">
            <img src={venueData.media} className="w-full h-96 object-cover" />
          </div>
          <div className="flex-initial w-40 border border-light_salmon m-1 p-1">
            <div className="flex flex-col">
              <div className="h-40">
                <div>
                  <p className="text-lg font-bold break-all">
                    This venue offers
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
              <div className="h-40">
                <p className="text-lg font-bold break-all">Location:</p>
                <ul>
                  <li className="block p-0 ">
                    Country:{' '}
                    {venueData.location?.country ? (
                      <span className="underline">
                        {venueData.location?.country}
                      </span>
                    ) : (
                      <span className="underline underline-offset-2">
                        Unknown country
                      </span>
                    )}
                  </li>
                  <li className="block p-0">
                    City:{' '}
                    {venueData.location?.city ? (
                      <span className="underline underline-offset-2">
                        {venueData.location?.city}
                      </span>
                    ) : (
                      <span className="underline underline-offset-2">
                        Unknown city
                      </span>
                    )}
                  </li>
                  <li className="block p-0">
                    Address:{' '}
                    {venueData.location?.address ? (
                      <span className="underline">
                        {venueData.location?.address}
                      </span>
                    ) : (
                      <span className="underline">Unknown address</span>
                    )}
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
          <p className="">Created: {renderDate(venueData.created)}</p>
          <p className="">ID: {venueData.id}</p>
          <p className="">Max guests: {venueData.maxGuests}</p>
          <p className="">Price: {venueData.price}</p>
          <p className="">Rating: {venueData.rating}</p>
          <p className="">Last update: {renderDate(venueData.updated)}</p>
          <p className="">Location: {venueData.location?.city}</p>
        </div>
      </div>
      <div className="border border-light_salmon m-1 p-1 bg-gray-200">
        <h4>Select a Date for Booking</h4>
        <div className="">
          <div className="flex flex-col justify-around gap-2">
            <BookingCalendar data={venueData} />
          </div>
        </div>
      </div>
    </>
  );
}
