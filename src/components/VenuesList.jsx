import houseImg from '../assets/img/house.jpg';
import { useState } from 'react';

export function ListVenues(props) {
  return (
    <>
      {props.data.slice(3, 15).map((venue) => (
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
                  src={venue.media ? venue.media : { houseImg }}
                  className="object-cover rounded-xl h-32 sm:w-36 border border-1 border-gray-800 m-auto drop-shadow-xl"
                  alt="Logo"
                />
              </div>
              <div className="flex-1 w-full px-1 md:block">
                <p>{venue.description.slice(0, 200)}</p>
              </div>
              <div className="flex-none w-32">
                <ul className="">
                  <li className="block p-0">
                    Breakfast: {venue.meta.breakfast ? 'Yes' : 'No'}
                  </li>
                  <li className="block p-0">
                    Wifi: {venue.meta.wifi ? 'Yes' : 'No'}
                  </li>
                  <li className="block p-0">
                    Parking: {venue.meta.parking ? 'Yes' : 'No'}
                  </li>
                  <li className="block p-0">
                    Pets: {venue.meta.pets ? 'Yes' : 'No'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center m-auto">
            <div className="text-center">
              <button className="button primary">View</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export function VenueSlice(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = props.data.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.data.length / productsPerPage); i++) {
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
            currentPage === Math.ceil(props.data.length / productsPerPage)
          }
        >
          Next
        </button>
      </div>
      <div>
        {currentProducts.map((venue) => (
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
                  <p>{venue.description.slice(0, 200)}</p>
                </div>
                <div className="flex-none w-32">
                  <ul className="">
                    <li className="block p-0">
                      Breakfast: {venue.meta.breakfast ? 'Yes' : 'No'}
                    </li>
                    <li className="block p-0">
                      Wifi: {venue.meta.wifi ? 'Yes' : 'No'}
                    </li>
                    <li className="block p-0">
                      Parking: {venue.meta.parking ? 'Yes' : 'No'}
                    </li>
                    <li className="block p-0">
                      Pets: {venue.meta.pets ? 'Yes' : 'No'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-center m-auto">
              <div className="text-center">
                <button className="button primary">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
