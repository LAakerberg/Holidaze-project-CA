export function VenueDetails({ venueData }) {
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
          <div className="flex-none w-40 border border-light_salmon m-1 p-1">
            <div className="flex flex-col">
              <div className="h-60">
                <div>
                  {/*                   <ul>
                    <li className="block p-0">
                      Breakfast: {venueData.meta.breakfast ? 'Yes' : 'No'}
                    </li>
                    <li className="block p-0">
                      Parking: {venueData.meta.parking ? 'Yes' : 'No'}
                    </li>
                    <li className="block p-0">
                      Pets: {venueData.meta.pets ? 'Yes' : 'No'}
                    </li>
                    <li className="block p-0">
                      Wifi: {venueData.meta.wifi ? 'Yes' : 'No'}
                    </li>
                  </ul> */}
                </div>
              </div>
              <div className="">
                <p>{venueData.name}</p>
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
        </div>
      </div>
    </>
  );
}
