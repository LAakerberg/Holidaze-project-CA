/* Deleting venues */

import { useState } from 'react';
import { venueApiUrl } from '../../../services/authorization/apiBase';
import { AiOutlineDelete } from 'react-icons/ai';
import { Message } from '../../Message';
import { useNavigate } from 'react-router-dom';

export function VenueDelete({ venueId }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const handleDelete = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      // Perform the delete request
      // You can use the fetch API or any other library you prefer
      const response = await fetch(venueApiUrl + `${venueId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        // Handle the successful deletion
        // You can update the UI or perform any other necessary actions
        console.log(response.ok);
        console.log('Venue deleted successfully');
        setMessage({
          type: 'success',
          text: 'Venue deleted successfully, page will refresh!',
        });

        setTimeout(() => {
          refreshPage();
        }, 3000);
      } else {
        // Handle the error case if the deletion was not successful

        setMessage({
          type: 'error',
          text: 'Error deleting the venue',
        });
      }
    } catch (error) {
      // Handle any network or other errors

      setMessage({
        type: 'error',
        text: 'Error deleting the venue',
        error,
      });
    }
  };

  const refreshPage = () => {
    navigate(0);
  };

  return (
    <>
      <button
        className="relative"
        type="button"
        onClick={handleDelete}
        id="delete_button"
      >
        <AiOutlineDelete className="icons-style_edit" />
      </button>
      <div className="absolute z-10 left-0 right-0">
        {message && <Message type={message.type} text={message.text} />}
      </div>
    </>
  );
}
