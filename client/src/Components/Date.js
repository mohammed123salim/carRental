import React from 'react';
import { MdCalendarToday } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const containerStyle = {
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
};

const boxStyle = {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #ccc',
  borderRadius: '4px',
  background: '#fff',
  padding: '0.5rem 0.75rem',
  minWidth: '190px',
};

const iconStyle = { marginRight: '0.5rem', flexShrink: 0 };

const inputStyle = {
  border: 'none',
  outline: 'none',
  flex: 1,
  fontSize: '1rem',
  background: 'transparent',
  cursor: 'pointer',
};

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
    <div style={containerStyle}>
      <div style={boxStyle}>
        <MdCalendarToday size={20} color="#666" style={iconStyle} />
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
          customInput={<input style={inputStyle} readOnly />}
        />
      </div>

      <div style={boxStyle}>
        <MdCalendarToday size={20} color="#666" style={iconStyle} />
        <DatePicker
          selected={returnDate}
          onChange={date => setReturnDate(date)}
          placeholderText="Return Date"
          dateFormat="dd/MM/yyyy"
          minDate={earliestReturn}
          customInput={<input style={inputStyle} readOnly />}
        />
      </div>
    </div>
  );
}
