import houseImg from '../assets/img/house.jpg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function VenuesList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [venuesPerPage] = useState(10);

  const indexOfLastProduct = currentPage * venuesPerPage;
  const indexOfFirstProduct = indexOfLastProduct - venuesPerPage;
  const currentVenues = props.data.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.data.length / venuesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="text-center">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            style={{
              backgroundColor: currentPage === number ? 'gray' : 'white',
            }}
            className="p-2 m-1"
          >
            {number}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(props.data.length / venuesPerPage)
          }
        >
          Next
        </button>
      </div>
      <div className="pt-4">
        {currentVenues.map((venue) => (
          <div
            key={venue.id}
            className="backdrop-blur-xl bg-white/30 hover:bg-white border border-light_salmon p-1 mb-2 flex flex-col sm:flex-row transition ease-in-out delay-100 duration-500 items-center justify-center text-center sm:justify-start sm:text-start"
          >
            <div className="flex-1">
              <div>
                <p className="text-lg font-bold">{venue.name}</p>
              </div>
              <div className="flex flex-col sm:flex-row p-1">
                <div className="drop-shadow-xl flex-none sm:w-36 m-1">
                  <img
                    src={venue.media}
                    alt={venue.name}
                    className="object-cover rounded-xl h-32 sm:w-36 border border-1 border-gray-800 m-auto drop-shadow-xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = houseImg;
                    }}
                  />
                </div>
                <div className="flex-1 w-full px-1 md:block">
                  <p className="break-all">{venue.description.slice(0, 200)}</p>
                </div>
                <div className="flex-none w-32">
                  <ul className="">
                    <li className="block p-0">
                      Breakfast: {venue.meta.breakfast ? 'Yes' : 'No'}
                    </li>
                    <li className="block p-0">
                      Parking: {venue.meta.parking ? 'Yes' : 'No'}
                    </li>
                    <li className="block p-0">
                      Pets: {venue.meta.pets ? 'Yes' : 'No'}
                    </li>
                    <li className="block p-0">
                      Wifi: {venue.meta.wifi ? 'Yes' : 'No'}
                    </li>
                  </ul>
                </div>
                <div className="flex-none w-32">
                  Location:
                  <ul className="">
                    <li className="block p-0">
                      City:{' '}
                      {venue.location.city ? venue.location.city : 'Not in use'}
                    </li>
                    <li className="block p-0">
                      Country:{' '}
                      {venue.location.country
                        ? venue.location.country
                        : 'Not in use'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-center m-auto">
              <div className="text-center">
                <Link
                  to={`/venues/details/${venue.id}`}
                  className="button primary"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
