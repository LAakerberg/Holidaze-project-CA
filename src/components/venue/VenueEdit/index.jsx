import { useState } from 'react';
import { EditVenueForm } from './EditVenueForm';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';

/**
 * Renders the component to edit a venue.
 * @param {Object} props - The component props.
 * @param {Object} props.venue - Load the specific venue to edit by the ID.
 * @returns {JSX.Element} - The rendered component.
 */

export function VenueEdit({ venue }) {
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
