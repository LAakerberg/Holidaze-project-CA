import houseImg from '../assets/img/house.jpg';

export function ListVenues(props) {
  return (
    <>
      {props.data.slice(0, 5).map((venue) => (
        <div
          key={venue.id}
          className="backdrop-blur-xl bg-white/30 hover:bg-white h-40 w-full border border-light_salmon p-1 mb-2 flex flex-row transition ease-in-out delay-100 duration-500"
        >
          <div className="flex flex-row p-1">
            <div className="drop-shadow-xl flex-none w-36 m-1">
              <img
                src={venue.media ? venue.media : { houseImg }}
                className="object-cover rounded-xl h-32 w-36 border border-1 border-gray-800 m-auto drop-shadow-xl"
                alt="Logo"
              />
            </div>
            <div className="flex-1 px-1 hidden md:block">
              <p>
                Descriptions: Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Nulla lacinia lorem vel ipsum viverra, at tempus mi
                aliquam. Nunc in justo nisl.
              </p>
            </div>
            <div className=" flex">
              <ul className="">
                <li>Breakfast: Yes</li>
                <li>Wifi: No</li>
                <li>Parking: Yes</li>
                <li>Pets: Yes</li>
              </ul>
            </div>
          </div>
          <div className="justify-center m-auto">
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
