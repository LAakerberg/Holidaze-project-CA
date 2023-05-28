import { useState } from 'react';
import { venueApiUrl } from '../../../services/authorization/apiBase';
import { AiOutlineDelete } from 'react-icons/ai';
import { Message } from '../../Message';
import { useNavigate } from 'react-router-dom';

/**
 * Component for deleting a venue.
 *
 * @param {Object} props - The component props.
 * @param {string} props.venueId - The ID of the venue to delete.
 * @returns {JSX.Element} The VenueDelete component.
 */
export function VenueDelete({ venueId }) {
  const user = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  /**
   * Handles the delete button click event.
   * Sends a delete request to the server to delete the venue.
   *
   * @returns {Promise<void>} A Promise that resolves when the deletion is complete.
   */
  const handleDelete = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
      const response = await fetch(venueApiUrl + `${venueId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Venue deleted successfully, page will refresh!',
        });

        setTimeout(navigate(`/profile/${user.name}`), 3000);
      } else {
        setMessage({
          type: 'error',
          text: 'Error deleting the venue',
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error deleting the venue',
        error,
      });

      setMessage({
        type: 'error',
        text: 'Error deleting the venue',
        error,
      });
    }
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
