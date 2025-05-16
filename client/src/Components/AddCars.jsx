import React, { useState } from 'react';
import {
  Container,
  Card,
  CardBody,
  Button
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CarSchemaValidation } from '../Validations/CarValidations';
import { useDispatch } from 'react-redux';
import { registerCar } from '../Features/CarSlice';
import { useNavigate } from 'react-router-dom';

const AddCars = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CarSchemaValidation),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("carName", data.carName);
      formData.append("carBrand", data.carBrand);
      formData.append("modelYear", data.modelYear);
      formData.append("plateNum", data.plateNum);
      formData.append("transmission", data.transmission);
      formData.append("fuelType", data.fuelType);
      formData.append("pricePerDay", data.pricePerDay);

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      await dispatch(registerCar(formData));
      alert("Car added successfully!");
      navigate("/managecars");
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Failed to add car.");
    }
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

                <Button type="submit" color="success" block>
                  Add Car
                </Button>
              </form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default AddCars;
