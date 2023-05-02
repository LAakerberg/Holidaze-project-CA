import { useEffect, useState } from 'react';

import { baseUrl, getAllVenues } from './apiBase';
/* import { Card } from '../../components/Cards'; */
import { ListVenues } from '../../components/VenuesList';

export function FetchVenues() {
  /*   const { id, name, price } = props; */
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    /* const { id, name, descriptions } = props */
    async function getVenues() {
      try {
        setIsError(false);

        setIsLoading(true);

        const response = await fetch(
          baseUrl + getAllVenues + '?limit=10_&offset=0'
        );
        const json = await response.json();
        console.log(json);
        setVenues(json);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }

    getVenues();
  }, []);

  if (isLoading) {
    return <div>Loading Venues</div>;
  }

  if (isError) {
    return <div>Error loading the venues</div>;
  }

  return (
    <>
      {/* <Card data={venues} /> */}
      <ListVenues data={venues} />
    </>
  );
}

/* export function Card(props) {
  return (
    <>
      {props.data.map((venue) => (
        <div key={venue.id} className="bg-red-400 rounded-md p-1 m-1">
          <div>{venue.id}</div>
          <div>{venue.name}</div>
          <div>{venue.description}</div>
        </div>
      ))}
    </>
  );
} */
