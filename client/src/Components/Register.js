import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardBody,
  Button
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchemaValidation } from '../Validations/UserValidations';
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from '../Features/UserSlice';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const [locationLoading, setLocationLoading] = useState(false);

  const onSubmit = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      age: data.age,
      password: data.password,
    };
    dispatch(registerUser(userData));
    alert("Registered successfully!");
    navigate("/login");
  };

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=4d86370d12e54166a34f9efd54c4be73`
            );
            const data = await response.json();
            if (data?.results?.length > 0) {
              const components = data.results[0].components;
              const autoAddress = `${components.city || components.town || components.village}, ${components.state}, ${components.country}`;
              setValue("address", autoAddress);
            } else {
              alert("Location found but could not extract details.");
            }
          } catch {
            alert("Error getting location data.");
          } finally {
            setLocationLoading(false);
          }
        },
        () => {
          alert("Location permission denied.");
          setLocationLoading(false);
        }
      );
    } else {
      alert("Geolocation not supported by browser.");
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
                    placeholder="Enter Your Name"
                    {...register('name')}
                  />
                  <p className="error">{errors.name?.message}</p>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    {...register('email')}
                  />
                  <p className="error">{errors.email?.message}</p>
                </div>

                <div className="form-group address-location-group">
                  <div className="address-wrapper">
                    <input
                      type="text"
                      placeholder="📍 Use current location"
                      readOnly
                      {...register('address')}
                    />
                    <button
                      type="button"
                      className="location-btn"
                      onClick={handleGetLocation}
                      title="Get Current Location"
                    >
                      📍
                    </button>
                  </div>
                  <p className="error">{errors.address?.message}</p>
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter Your Phone"
                    {...register('phone')}
                  />
                  <p className="error">{errors.phone?.message}</p>
                </div>

                <div className="form-group">
                  <input
                    type="number"
                    placeholder="Enter Your Age"
                    {...register('age')}
                  />
                  <p className="error">{errors.age?.message}</p>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    {...register('password')}
                  />
                  <p className="error">{errors.password?.message}</p>
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register('confirmPassword')}
                  />
                  <p className="error">{errors.confirmPassword?.message}</p>
                </div>

                <Button type="submit" color="primary" block disabled={locationLoading}>
                  {locationLoading ? "Getting location..." : "Register"}
                </Button>

              </form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default RegisterPage;
