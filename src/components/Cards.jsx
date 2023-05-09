import houseImg from '../assets/img/house.jpg';

export function Card(props) {
  return (
    <>
      <div className="flex flex-row w-full p-2 gap-4 justify-center">
        {props.data.slice(0, 3).map((venue) => (
          <div
            key={venue.id}
            className="backdrop-blur-xl bg-white/30 h-80 w-60 border border-light_salmon rounded-xl p-1 flex flex-col transition ease-in-out delay-100 duration-500 hover:-translate-y-4"
          >
            <div className="flex-1 p-1">
              <div className="drop-shadow-xl">
                <img
                  src={venue.media ? venue.media : { houseImg }}
                  className="object-cover h-32 w-60 rounded-xl border border-1 border-gray-800 m-auto drop-shadow-xl"
                  alt="Logo"
                />
              </div>
              <div className="p-2">
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
            <div className="">
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
