import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Booking = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      //.get("http://localhost:3001/getAllBookings")
      .get(`${SERVER_URL}/getAllBookings`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  const updateStatus = async (bookingId, newStatus) => {
    try {
      //await axios.put(`http://localhost:3001/updateBookingStatus/${bookingId}`, {
      await axios.put(`${SERVER_URL}/updateBookingStatus/${bookingId}`, {
        status: newStatus,
      });

      // Update state immediately for UI
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="booking-container">
      <h2>All Bookings</h2>

      {bookings.length > 0 ? (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Car</th>
              <th>Plate Number</th>
              <th>Total Amount</th>
              <th>Pick-up Date</th>
              <th>Return Date</th>
              <th>Num of Days</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.userEmail}</td>
                <td className="car-info">
                  <img
                    //src={`http://localhost:3001${booking.imageUrl}`}
                    src={`${SERVER_URL}${booking.imageUrl}`}
                    alt={booking.carName}
                    className="car-img"
                  />
                  <span className="car-name">{booking.carName}</span>
                </td>
                <td>{booking.plateNum}</td>
                <td>{booking.totalPrice} OMR</td>
                <td>{new Date(booking.pickupDate).toLocaleDateString("en-GB")}</td>
                <td>{new Date(booking.returnDate).toLocaleDateString("en-GB")}</td>
                <td>{booking.totalDays}</td>
                <td className={`status ${booking.status.toLowerCase().replace(" ", "-")}`}>
                  {booking.status}
                </td>
                <td>
                  {booking.status === "In Progress" && (
                    <>
                      <button
                        onClick={() => updateStatus(booking._id, "Accepted")}
                        className="accept-btn"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateStatus(booking._id, "Rejected")}
                        className="reject-btn"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default Booking;
