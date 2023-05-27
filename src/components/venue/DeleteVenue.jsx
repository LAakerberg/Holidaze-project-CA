/* Deleting venues */

import { useState, useEffect } from 'react';
import { venueApiUrl } from '../../services/authorization/apiBase';
import { AiOutlineDelete } from 'react-icons/ai';

export function DeleteVenueOk23({
  venueId,
  onError,
  onMessage,
  onVenueDelete,
}) {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
        setSuccessMessage('Venue deleted successfully, page will refresh!');
        setTimeout(() => {
          onVenueDelete(venueId);
        }, 4000);
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
      <button type="button" onClick={handleDelete} id="delete_button">
        <AiOutlineDelete className="icons-style_edit" />
      </button>
    </>
  );
}
