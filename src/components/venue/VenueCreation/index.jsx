import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { VenueForm } from "./VenueForm";

/**
 * This function is holding the creation of venue and when toggle the button the manager will get access to the VenueForm.
 * @returns {JSX.Element} - Open and close the VenueForm.
 */
export function VenueCreation() {
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
            className={`arrow-button ${isOpen ? "open" : ""}`}
            onClick={toggleOpen}
            id="open_venue_form"
          >
            <TiArrowSortedDown />
          </button>
        </div>
      </div>
      {isOpen && <VenueForm />}
    </div>
  );
}
