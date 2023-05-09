import houseImg from '../assets/img/house.jpg';

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

/* export function ListVenues2() {
  return (
    <>
      <div className="backdrop-blur-xl bg-white/30 h-80 w-60 border border-light_salmon rounded-xl p-1 flex flex-col transition ease-in-out delay-100 duration-500 hover:-translate-y-6">
        <div className="flex-1 p-1">
          <div className="drop-shadow-xl">
            <img
              src={houseImg}
              className="object-cover h-32 w-60 rounded-xl border border-1 border-gray-800 m-auto drop-shadow-xl"
              alt="Logo"
            />
          </div>
          <div className="p-2">
            <ul className="">
              <li>Breakfast:</li>
              <li>Wifi:</li>
              <li>Parking:</li>
              <li>Pets:</li>
            </ul>
          </div>
        </div>
        <div className="">
          <div className="text-center">
            <button className="button primary">View</button>
          </div>
        </div>
      </div>
    </>
  );
}
 */
