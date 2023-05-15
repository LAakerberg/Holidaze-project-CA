import { useEffect, useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { getVenue } from '../../services/authorization/apiBase';

/* import houseImg from '../../assets/img/house.jpg'; */

import { VenueForm } from './CreateVenue';
import { Spinner } from '../Spinner';
import { EditVenueForm } from './EditVenue';

export function ManageVenue({ data }) {
  const user = JSON.parse(localStorage.getItem('userData'));

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  if (user.venueManager === true) {
    return (
      <>
        <div className="border border-light_salmon bg-gray-200 py-1 my-1">
          <div className="flex flex-col p-1">
            <div className="flex flex-row">
              <div className="flex-1">
                <h3>Manage venue</h3>
              </div>
              <div className="flex-initial">
                <button
                  className={`arrow-button ${isOpen ? 'open' : ''}`}
                  onClick={toggleOpen}
                >
                  <TiArrowSortedDown />
                </button>
              </div>
            </div>
            <div>{isOpen && <HandlingVenues data={data} />}</div>
          </div>
        </div>
      </>
    );
  } else {
    return console.log('No admin access');
  }
}

function HandlingVenues({ data }) {
  return (
    <>
      <MyVenues key="comp1" data={data} />
      <VenueCreation key="comp2" />
    </>
  );
}

function VenueEdit({ venue }) {
  const [editOpen, setEditOpen] = useState(false);

  const toggleEditOpen = () => {
    setEditOpen(!editOpen);
  };

  return (
    <div className="static">
      <button
        className={`edit-button ${editOpen ? 'open' : ''}`}
        onClick={toggleEditOpen}
      >
        {editOpen ? (
          <AiOutlineClose className="icons-style_close" />
        ) : (
          <AiOutlineEdit className="icons-style_edit" />
        )}
      </button>

      {editOpen && <EditVenueForm venue={venue} />}
    </div>
  );
}

function VenueCreation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="venue-form">
      <div className="flex">
        <div className="flex-1">
          <h3>Create New Venue</h3>
        </div>
        <div className="flex-initial">
          <button
            className={`arrow-button ${isOpen ? 'open' : ''}`}
            onClick={toggleOpen}
          >
            <TiArrowSortedDown />
          </button>
        </div>
      </div>
      {isOpen && <VenueForm />}
    </div>
  );
}

function DeleteVenue({ venueId, onError, onMessage }) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleDelete = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      // Perform the delete request
      // You can use the fetch API or any other library you prefer
      const response = await fetch(getVenue + `${venueId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        // Handle the successful deletion
        // You can update the UI or perform any other necessary actions
        console.log('Venue deleted successfully');
        setSuccessMessage('Venue deleted successfully, page will refresh!');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        // Handle the error case if the deletion was not successful
        console.log('Failed to delete the venue');
        setErrorMessage('Error deleting the venue');
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error deleting the venue:', error);
      setErrorMessage('Error deleting the venue', error);
    }
  };

  useEffect(() => {
    onError(errorMessage);
    onMessage(successMessage);
  }, [errorMessage, successMessage, onError, onMessage]);

  return (
    <>
      <button type="button" onClick={handleDelete}>
        <AiOutlineDelete className="icons-style_edit" />
      </button>
    </>
  );
}

function MyVenues({ data }) {
  const [errorMessage, setErrorMessage] = useState('');
  const handleDeleteError = (error) => {
    setErrorMessage(error);
  };

  const [successMessage, setSuccessMessage] = useState('');
  const handleSuccess = (message) => {
    setSuccessMessage(message);
  };

  if (data.venues.length > 0) {
    return (
      <div>
        {successMessage && (
          <>
            <div className="border bg-green-500/50 border-green-800 w-full m-auto">
              <div className="flex">
                <div className="flex-1 p-1">
                  <p>{successMessage}</p>
                </div>
                <div className="flex-initial p-1">
                  <Spinner />
                </div>
              </div>
            </div>
          </>
        )}
        {errorMessage ? (
          <>
            <div className="flex border bg-red-500/50 border-red-800 w-full h-10 m-auto">
              <p className="m-auto">{errorMessage}</p>
            </div>
          </>
        ) : null}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-1 gap-5">
          {data.venues.map((venue) => (
            <div key={venue.id} className="flex flex-row p-1">
              <div className="flex-1">
                <div>
                  <img
                    src={venue.media[0]}
                    alt={venue.name}
                    className="object-cover rounded-xl h-32 w-32 border border-1 border-gray-800 m-auto drop-shadow-xl hover:scale-110 hover:transition delay-50 duration-500 ease-in-out"
                    /*                     onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = houseImg;
                    }} */
                  />
                </div>
                <div className="">
                  {venue.name.length > 15
                    ? `${venue.name.slice(0, 20)}...`
                    : venue.name}
                </div>
              </div>
              <div className="flex flex-col h-32">
                <div className="flex-1" id="edit_venue">
                  <VenueEdit venue={venue} />
                </div>
                <div className="flex-1">
                  <DeleteVenue
                    venueId={venue.id}
                    onError={handleDeleteError}
                    onMessage={handleSuccess}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex border bg-red-500/50 border-red-800 w-full h-10 m-auto">
        <p className="m-auto">No venue created yet!</p>
      </div>
    );
  }
}
