import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Correct usage of your environment variable
const SERVER_URL = process.env.REACT_APP_SERVER_URL;


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
      console.log("Register API URL:", SERVER_URL); // For debugging
      const response = await axios.post(`${SERVER_URL}/registerUser`, userData);
      return response.data.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

// Login User
export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post(`${SERVER_URL}/login`, userData);
    return response.data.user;
  } catch (error) {
    console.error(error);
    throw new Error("Invalid credentials");
  }
});

// The same for other APIs:
export const logout = createAsyncThunk("/users/logout", async () => {
  try {
    await axios.post(`${SERVER_URL}/logout`);
  } catch (error) {
    console.error(error);
  }
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(`${SERVER_URL}/getUsers`);
  return response.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`${SERVER_URL}/deleteUser/${id}`);
  return id;
});

// Redux slice remains the same
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
