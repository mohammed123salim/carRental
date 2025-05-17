import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

const initialState = {
  user: {},
  value: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// Register User
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(`${ENV.SERVER_URL}/registerUser`, {
        name: userData.name,
        email: userData.email,
        address: userData.address,
        phone: userData.phone,
        age: userData.age,
        password: userData.password,
      });
      console.log(response);
      return response.data.user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// Login
export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post(`${ENV.SERVER_URL}/login`, {
      email: userData.email,
      password: userData.password,
    });

    const user = response.data.user;
    console.log(response);
    return user;
  } catch (error) {
    const errorMessage = "Invalid credentials";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
});

// Logout
export const logout = createAsyncThunk("/users/logout", async () => {
  try {
    await axios.post(`${ENV.SERVER_URL}/logout`);
  } catch (error) {}
});

// Fetch Users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(`${ENV.SERVER_URL}/getUsers`);
  return response.data;
});

// Delete User
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`${ENV.SERVER_URL}/deleteUser/${id}`);
  return id;
});

// Slice
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.value = state.value.filter((user) => user._id !== action.payload);
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
