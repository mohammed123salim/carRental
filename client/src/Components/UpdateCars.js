import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  Button
} from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CarSchemaValidation } from "../Validations/CarValidations";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UpdateCar = () => {
  const { id } = useParams(); // Get car ID from route
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(CarSchemaValidation),
  });

  // Fetch car data to pre-fill form
  useEffect(() => {
    //axios.get(`http://localhost:3001/getCar/${id}`)
    axios.get(`${SERVER_URL}/getCar/${id}`)
      .then((res) => {
        const car = res.data;
        reset(car); // Fill form with data
        setImagePreview(car.imageUrl);
      })
      .catch((err) => {
        console.error("Failed to fetch car:", err);
      });
  }, [id, reset]);

  const onSubmit = (data) => {
    //axios.put(`http://localhost:3001/updateCar/${id}`, data)
    axios.put(`${SERVER_URL}/updateCar/${id}` , data)
      .then((res) => {
        alert("Car updated successfully!");
        navigate("/managecars");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Error updating car");
      });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="register-page">
      <div className="register-body">
        <Container fluid>
          <Card className="register-card mx-auto">
            <CardBody>
              <form className="div-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Car Name"
                    {...register("carName")}
                  />
                  <p className="error">{errors.carName?.message}</p>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Car Brand"
                    {...register("carBrand")}
                  />
                  <p className="error">{errors.carBrand?.message}</p>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Model Year"
                    {...register("modelYear")}
                  />
                  <p className="error">{errors.modelYear?.message}</p>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Plate Number"
                    {...register("plateNum")}
                  />
                  <p className="error">{errors.plateNum?.message}</p>
                </div>

                <div className="form-group">
                  <select {...register("transmission")}>
                    <option value="">Select Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                  <p className="error">{errors.transmission?.message}</p>
                </div>
                <div className="form-group">
                  <select {...register("fuelType")}>
                    <option value="">Select Fuel Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                  </select>
                  <p className="error">{errors.fuelType?.message}</p>
                </div>
              
                 <div className="form-group">
                  <h6>Car Image</h6>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Car Preview"
                      className="preview-image mt-2"
                    />
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Price Per Day (OMR)"
                    {...register("pricePerDay")}
                  />
                  <p className="error">{errors.pricePerDay?.message}</p>
                </div>
                <Button type="submit" color="primary" block>
                  Update Car
                </Button>
              </form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default UpdateCar;
