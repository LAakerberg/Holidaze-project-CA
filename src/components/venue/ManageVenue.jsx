import { useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import houseImg from '../../assets/img/house.jpg';

import { VenueForm } from './CreateVenue';

export function CreateVenue({ data }) {
  const user = JSON.parse(localStorage.getItem('userData'));

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (user.venueManager === true) {
    return (
      <>
        <div className="border border-light_salmon bg-gray-200 py-1 my-1">
          <div className="flex flex-col p-1">
            <div className="flex flex-row">
              <div className="flex-1">
                <h3>Manage venue</h3>
              </div>
              <div className="flex-initial">
                <button
                  className={`arrow-button ${isOpen ? 'open' : ''}`}
                  onClick={toggleOpen}
                >
                  <TiArrowSortedDown />
                </button>
              </div>
            </div>
            <div>{isOpen && <ManageVenue data={data} />}</div>
          </div>
        </div>
      </>
    );
  } else {
    return console.log('No admin access');
  }
}

function ManageVenue({ data }) {
  return (
    <>
      <MyVenues key="comp1" data={data} />
      <VenueCreation key="comp2" />
    </>
  );
}

function VenueCreation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="venue-form">
      <div className="flex">
        <div className="flex-1">
          <h3>Create New Venue</h3>
        </div>
        <div className="flex-initial">
          <button
            className={`arrow-button ${isOpen ? 'open' : ''}`}
            onClick={toggleOpen}
          >
            <TiArrowSortedDown />
          </button>
        </div>
      </div>
      {isOpen && <VenueForm />}
    </div>
  );
}

function MyVenues({ data }) {
  console.log(data);

  if (0 < data.venues.length) {
    return (
      <>
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-1 gap-5">
            {data.venues.map((venue) => (
              <div key={venue.id} className="flex flex-row p-1">
                <div>
                  <div>
                    <img
                      src={houseImg}
                      className="object-cover rounded-xl h-32 sm:w-36 border border-1 border-gray-800 m-auto drop-shadow-xl hover:scale-110 hover:transition delay-50 duration-500 ease-in-out"
                    />
                  </div>
                  <div className="">
                    {venue.name.length > 15
                      ? `${venue.name.slice(0, 20)}...`
                      : venue.name}
                  </div>
                </div>
                <div className="flex flex-col h-32">
                  <div className="flex-1">
                    <AiOutlineEdit className="icons-style_edit" />
                  </div>
                  <div className="flex-1">
                    <AiOutlineDelete className="icons-style_edit" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <p>No Venues</p>
        </div>
      </>
    );
  }
}
