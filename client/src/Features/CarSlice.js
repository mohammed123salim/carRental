import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  car: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
};



// Async action for registering a new car
export const registerCar = createAsyncThunk("cars/addCar", async (carData) => {
  try {
    const response = await axios.post("http://localhost:3001/addCar", carData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });



    console.log("Car Registration Response:", response);
    return response.data.car;
  } catch (error) {
    console.error("Error registering car:", error);
    throw error;
  }
});

// Slice
export const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    addCar: (state, action) => {
      state.car = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCar.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(registerCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.car = action.payload;
      })
      .addCase(registerCar.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
      
  },
});

export const { addCar } = carSlice.actions;

export default carSlice.reducer;
