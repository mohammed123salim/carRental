import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Col, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const CarInfos = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [pickupDate, setPickupDate] = useState(() => new Date(localStorage.getItem("pickupDate")));
  const [returnDate, setReturnDate] = useState(() => new Date(localStorage.getItem("returnDate")));
  const [days, setDays] = useState(0);
  const navigate = useNavigate();


  const email = useSelector((state) => state.users.user.email);

  useEffect(() => {
    //axios.get(`http://localhost:3001/getCar/${id}`)
    axios.get(`${SERVER_URL}/getCar/${id}`).then((res) => {
      setCar(res.data);
    });
  }, [id]);

  useEffect(() => {
    if (pickupDate && returnDate) {
      const diffTime = Math.abs(returnDate - pickupDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    }
  }, [pickupDate, returnDate]);

  if (!car) return <p>Loading car details...</p>;

  const totalPrice = days * car.pricePerDay;

  const handleRent = async () => {
  const bookingData = {
    carId: car._id,
    carName: car.carName,
    carBrand: car.carBrand,
    modelYear: car.modelYear,
    plateNum: car.plateNum,
    imageUrl: car.imageUrl,
    userEmail: email,
    pickupDate,
    returnDate,
    pricePerDay: car.pricePerDay,
    totalDays: days,
    totalPrice,
  };

     try {
    //await axios.post("http://localhost:3001/bookCar", bookingData);
    await axios.post(`${SERVER_URL}/bookCar`, bookingData);
    
    alert("Car booked successfully!");
     navigate("/profile");
  } catch (err) {
    if (err.response?.status === 400) {
      alert(err.response.data.message); // "Car is already booked for the selected dates."
    } else {
      console.error("Booking failed:", err);
      alert("Booking failed");
    }
  }
};

  return (
    <div className="car-info-container">
      <img
        //src={`http://localhost:3001${car.imageUrl}`}
        src={`${SERVER_URL}${car.imageUrl}`}
        alt={car.carName}
        className="car-info-image"
      />
      <h2>{car.carBrand} {car.carName} {car.modelYear}</h2>
      <Row>
        <Col>
          <p><strong>Transmission:</strong> {car.transmission}</p>
          <p><strong>Fuel Type:</strong> {car.fuelType}</p>
        </Col>
      </Row>

      <div className="summary">
        <p><strong>Price per Day:</strong> {car.pricePerDay} OMR</p>
        <p><strong>Days of Rent:</strong> {days} days</p>
        <p><strong>Total:</strong> {totalPrice} OMR</p>
      </div>

      <Button className="view-btn" onClick={handleRent}>Rent</Button>
    </div>
  );
};

export default CarInfos;
