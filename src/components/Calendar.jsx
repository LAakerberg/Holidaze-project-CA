import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export function BookingCalendar() {
  const [date, setDate] = useState(new Date());

  const onChange = (selectedDate) => {
    setDate(selectedDate);
    console.log(selectedDate);
    console.log(selectedDate[0]);
    console.log(selectedDate[1]);
  };

  return (
    <>
      <div>
        <h1>Calendar Example</h1>
        <Calendar
          className="custom-calendar bg-gradient-to-b from-light_salmon to-topaz drop-shadow-lg"
          onChange={onChange}
          value={date}
          selectRange
        />
      </div>
      <div>
        <button className="button primary">Book</button>
      </div>
    </>
  );
}
