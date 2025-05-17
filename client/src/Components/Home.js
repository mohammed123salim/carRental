import React, { useEffect, useState } from "react";
import DateInput from "./Date";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdLocationOn } from "react-icons/md";


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Home = () => {
  const email = useSelector((state) => state.users.user.email);
  const [cars, setCars] = useState([]);
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [location, setLocation] = useState("muscat-international-airport");
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  // Fetch cars from MongoDB
  useEffect(() => {
    axios
      //.get("http://localhost:3001/getCars")
      .get(`${SERVER_URL}/getCars`)
      .then((res) => setCars(res.data))
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  // Handle car view
  const handleViewCar = (id) => {
    if (!pickupDate || !returnDate) {
      alert("Please select both pick-up and return dates first.");
      return;
    }

    localStorage.setItem("pickupDate", pickupDate);
    localStorage.setItem("returnDate", returnDate);
    navigate(`/carinfos/${id}`);
  };

  const handleBrowse = () => {
  if (!pickupDate || !returnDate) {
    alert("Please select both pick-up and return dates first.");
    return;
  }

  axios
    //.get("http://localhost:3001/getAvailableCars"
    .get(`${SERVER_URL}/getAvailableCars`, {
      params: { pickup: pickupDate, return: returnDate },
    })
    .then((res) => setCars(res.data))
    .catch((err) => console.error("Error fetching available cars:", err));
};

  return (
    <Container fluid style={{ padding: "2rem" }}>
      <Row className="mb-4">
        <Col md="4">
          <div className="location-select" style={{ display: "flex", alignItems: "center" }}>
            <MdLocationOn size={20} color="#666" style={{ marginRight: "8px" }} />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-select"
            >
              <option value="muscat-international-airport">
                Muscat International Airport
              </option>
              
            </select>
          </div>
        </Col>
        <Col md="4">
          <DateInput
            pickupDate={pickupDate}
            setPickupDate={setPickupDate}
            returnDate={returnDate}
            setReturnDate={setReturnDate}
          />
        </Col>
        <Col md="4">
          <Button block className="browse-button" onClick={handleBrowse}>
            Browse
          </Button>

        </Col>
      </Row>

      <Row className="car-grid">
        {cars.map((car) => (
          <Col key={car._id} md="3" className="mb-4">
            <div className="car-card">
              <img
                //src={`http://localhost:3001${car.imageUrl}`}
                src={`${SERVER_URL}${car.imageUrl}`}
                alt={car.carName}
                className="car-image"
                style={{ width: "100%", height: "auto" }}
              />
              <p className="text-center">
                <strong>{car.carName}</strong>
              </p>
              <p className="text-center">from {car.pricePerDay} OMR/Day</p>
              <Button
                block
                className="view-btn"
                onClick={() => handleViewCar(car._id)}
              >
                View
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
