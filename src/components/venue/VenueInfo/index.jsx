import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useState } from 'react';
import { renderDate } from '../../../utils/formatDates';

/**
 * Component for displaying venue information and bookings.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.info - The information about the venue.
 * @returns {JSX.Element} The VenueInfo component.
 */
export function VenueInfo({ info }) {
  const [isPopupVisible, setPopupVisible] = useState(false);

  /**
   * Handles the mouse enter event to show the popup.
   */
  const handleMouseEnter = () => {
    setPopupVisible(true);
  };

  /**
   * Handles the mouse leave event to hide the popup.
   */
  const handleMouseLeave = () => {
    setPopupVisible(false);
  };

  // Extract bookings from the info object
  const bookings = info.bookings;

  return (
    <>
      <div
        className="transition delay-50 duration-300 ease-in-out"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Render your venue icon here */}
        <AiOutlineInfoCircle className="icons-style_edit" alt="Text" />

        {isPopupVisible && (
          <div className="popup transition delay-50 duration-300 ease-in-out">
            {/* Render popup content here */}
            <div>
              <div>Bookings</div>
              <div className="border border-light_salmon transition delay-50 duration-300 ease-in-out">
                {bookings.length > 0 ? (
                  bookings
                    .sort(
                      (b, a) => Date.parse(a.dateFrom) - Date.parse(b.dateFrom)
                    )
                    .map((booked) => {
                      const today = new Date();
                      let className;
                      if (Date.parse(booked.dateFrom) < Date.parse(today)) {
                        className =
                          'border border-light_salmon bg-red-200 p-1 m-1';
                      } else {
                        className = 'border border-light_salmon p-1 m-1';
                      }
                      return (
                        <div className={className} key={booked.id}>
                          <p>
                            Booking ref: {booked.id.slice(0, 8).toUpperCase()}
                          </p>
                          {renderDate(booked.dateFrom)} -{' '}
                          {renderDate(booked.dateTo)}
                        </div>
                      );
                    })
                ) : (
                  <div className="p-1 m-1">No bookings made yet</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
