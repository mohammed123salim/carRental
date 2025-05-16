import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ManageCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [showDelete, setShowDelete] = useState(false);

  const fetchCars = async () => {
    try {
      const res = await axios.get('http://localhost:3001/getCars');
      setCars(res.data);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const deleteCar = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`http://localhost:3001/deleteCar/${id}`);
        fetchCars(); // Refresh
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleAddCarClick = () => navigate('/addcar');
  const handleUpdateClick = (id) => navigate(`/updatecar/${id}`); // 

  return (
    <div className="manage-cars-container">
      <div className="top-buttons">
        <button className="add-car-button" onClick={handleAddCarClick}>
          Add Car
        </button>
        <button className="toggle-delete-button" onClick={() => setShowDelete(!showDelete)}>
          {showDelete ? "Delete Car" : "Delete Car"}
        </button>
      </div>

      <div className="car-grid">
        {cars.map((car) => (
          <div key={car._id} className="car-card">

        <img
        src={`http://localhost:3001${car.imageUrl}`}
        alt={car.carName}
        className="car-image"
        />


            <p>{car.carName}</p>
            <p><strong>{car.carBrand}</strong></p>
            <p>from {car.pricePerDay} OMR/Day</p>
            <button className="view-btn" onClick={() => handleUpdateClick(car._id)}>
              Update
            </button>
            {showDelete && (
              <button onClick={() => deleteCar(car._id)} className="delete-btn">
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCars;
