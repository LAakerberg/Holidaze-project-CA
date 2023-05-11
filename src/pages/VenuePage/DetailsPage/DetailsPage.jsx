import { useParams } from 'react-router-dom';
import { useApiCall } from '../../../hooks/api/useApiCall';

const url = `https://api.noroff.dev/api/v1/holidaze/venues/`;

export function DetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useApiCall(url + id);
  console.log(data);
  if (isLoading) {
    return <div>Loading Profile</div>;
  }

  if (isError) {
    return <div>Error loading the venues</div>;
  }

  return (
    <>
      <div className="border border-light_salmon m-1 p-1">
        <div className="flex border border-light_salmon m-1 p-1">
          <h3>{data.name}</h3>
        </div>
        <div className="flex flex-row border border-light_salmon m-1 p-1">
          <div className="flex-1 border border-light_salmon m-1 p-1">
            <img src={data.media} className="w-full h-96 object-cover" />
          </div>
          <div className="flex-none w-40 border border-light_salmon m-1 p-1">
            <div className="flex flex-col">
              <div className="h-60">
                <div>
                  <p>Meta</p>
                </div>
              </div>
              <div className="">
                <div> {/* {<VenueLocation data={data} />} */}</div>
                <p>{data.name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-light_salmon m-1 p-1">
          <div className="border-b border-light_salmon">
            <h4>About</h4>
          </div>
          <p></p>
          <p>{data.description}</p>
        </div>
      </div>
    </>
  );
}
