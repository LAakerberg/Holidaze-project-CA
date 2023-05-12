import { CreateVenue } from './CreateVenue';

export function Profile({ data }) {
  return (
    <>
      <div>
        <div className="border border-light_salmon my-1">
          <div className="flex flex-row bg-gray-200 p-1">
            <div>
              {' '}
              <img
                src={data.avatar}
                className="w-52 object-contain rounded-full"
              />
            </div>
            <div className="px-2 border-l-2 border-topaz">
              <div>
                <p className="text-lg font-bold">{data.name}</p>
              </div>
              <div className="">
                My stats:
                <ul>
                  <li>Bookings: {data._count?.bookings}</li>
                  <li>Venues: {data._count?.venues}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <CreateVenue data={data} />
        </div>
        <div className="border border-light_salmon bg-gray-200 py-1 my-1">
          <div className="p-1">
            <h3>Upcoming booking</h3>
          </div>
        </div>
        <div className="border border-light_salmon bg-gray-200 py-1 my-1">
          <div className="p-1">
            <h3>History</h3>
          </div>
        </div>
      </div>
    </>
  );
}
