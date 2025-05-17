import React from 'react';
import { MdCalendarToday } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateInput({ pickupDate, setPickupDate, returnDate, setReturnDate }) {
  const today = new Date();

  const earliestReturn = pickupDate
    ? (() => {
        const d = new Date(pickupDate);
        d.setDate(d.getDate() + 1);
        return d;
      })()
    : (() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d;
      })();

  return (
    <div className='containerStyle'>
      <div className='boxStyle'>
        <MdCalendarToday size={20} color="#666" className="iconStyle" />
        <DatePicker
          selected={pickupDate}
          onChange={date => {
            setPickupDate(date);
            if (returnDate && date >= returnDate) {
              setReturnDate(null);
            }
          }}
          placeholderText="Pick-up Date"
          dateFormat="dd/MM/yyyy"
          minDate={today}
          customInput={<input className="inputStyle" readOnly />}
        />
      </div>

      <div className='boxStyle'>
        <MdCalendarToday size={20} color="#666" className="iconStyle" />
        <DatePicker
          selected={returnDate}
          onChange={date => setReturnDate(date)}
          placeholderText="Return Date"
          dateFormat="dd/MM/yyyy"
          minDate={earliestReturn}
          customInput={<input className="inputStyle" readOnly />}
        />
      </div>
    </div>
  );
}
