import { useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import houseImg from '../../assets/img/house.jpg';

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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data or perform other actions here
  };

  return (
    <div className="venue-form">
      <h3>Create New Venue</h3>
      <form onSubmit={handleSubmit}>
        {/* Form fields for venue creation */}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

function MyVenues({ data }) {
  console.log(data);

  /*   for (let i = 0; i < data.venues.length; i++) {

  } */

  if (0 < data.venues.length) {
    return (
      <>
        <div>
          <div className="flex p-1 gap-5">
            {data.venues.map((venue) => (
              <div key={venue.id} className="p-1">
                <img
                  src={houseImg}
                  className="object-cover rounded-xl h-32 sm:w-36 border border-1 border-gray-800 m-auto drop-shadow-xl hover:scale-110 hover:transition delay-50 duration-500 ease-in-out"
                />
                <div className="">
                  {venue.name.length > 15
                    ? `${venue.name.slice(0, 15)}...`
                    : venue.name}
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

  /*   return (
    <div className="w-20 h-20 rounded-xl bg-topaz text-center justify-center items-center">
      <p className="m-auto text-center justify-center items-center">Venue</p>
    </div>
  ); */
}
