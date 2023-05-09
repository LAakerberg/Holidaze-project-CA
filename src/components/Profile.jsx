export function Profile(props) {
  const data = props;
  return (
    <>
      <div>
        <div className="border border-red-400 my-1">
          <div className="flex flex-row bg-gray-200 p-1">
            <div>
              {' '}
              <img
                src={data.data.avatar}
                className="w-52 object-contain rounded-full"
              />
            </div>
            <div className="px-2 border-l-2 border-topaz">
              <div>
                <p className="text-lg font-bold">{data.data.name}</p>
              </div>
              <div className="">Stats Bookings: 0 Venues: 0</div>
            </div>
          </div>
        </div>
        <div className="border border-red-400 bg-gray-200 py-1 my-1">
          <div className="p-1">
            <h3>Upcoming booking</h3>
          </div>
        </div>
        <div className="border border-red-400 bg-gray-200 py-1 my-1">
          <div className="p-1">
            <h3>History</h3>
          </div>
        </div>
      </div>
    </>
  );
}
