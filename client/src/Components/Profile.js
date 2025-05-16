import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import useLocation from "./Location"; // Import the custom hook

const Profile = () => {
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();
  const placeInfo = useLocation(); // use the hook
  const [bookings, setBookings] = useState([]);

  

  useEffect(() => {
    if (!email) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:3001/getBookings/${email}`)
        .then((res) => setBookings(res.data))
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [email, navigate]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Profile</h1>
      <p><strong>Email:</strong> {email}</p>


      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Total Amount</th>
              <th>Pick-up Date</th>
              <th>Return Date</th>
              <th>Num of Days</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="car-info">
                  <img
                    src={`http://localhost:3001${booking.imageUrl}`}
                    alt={booking.carName}
                    className="car-img"
                  />
                  <span className="car-name">{booking.carName}</span>
                </td>
                <td>{booking.totalPrice} OMR</td>
                <td>{new Date(booking.pickupDate).toLocaleDateString("en-GB")}</td>
                <td>{new Date(booking.returnDate).toLocaleDateString("en-GB")}</td>
                <td>{booking.totalDays}</td>
                <td className="status">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}

      <h2>Current Location</h2>
      {placeInfo ? (
        <ul>
          <li><strong>City:</strong> {placeInfo.city}</li>
          <li><strong>Region:</strong> {placeInfo.region}</li>
          <li><strong>Country:</strong> {placeInfo.country}</li>
          <li><strong>Latitude:</strong> {placeInfo.latitude}</li>
          <li><strong>Longitude:</strong> {placeInfo.longitude}</li>
          <li><strong>Accuracy:</strong> {placeInfo.accuracy} meters</li>
          
        </ul>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
};

export default Profile;
