import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  value: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData) => {
    try {
      const response = await axios.post("http://localhost:3001/registerUser", {
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

export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      email: userData.email,
      password: userData.password,
    });

    const user = response.data.user;
    console.log(response);
    return user;
  } catch (error) {
    //handle the error
    const errorMessage = "Invalid credentials";
    alert(errorMessage);
    throw new Error(errorMessage);
  }
});
export const logout = createAsyncThunk("/users/logout", async () => {
  try {
    // Send a request to your server to log the user out
    const response = await axios.post("http://localhost:3001/logout");
  } catch (error) {}
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:3001/getUsers");
  return response.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`http://localhost:3001/deleteUser/${id}`);
  return id;
});

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
      // Register
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

      // Fetch users
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
        state.user = action.payload; //assign the payload which is the user object return from the server after authentication
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
        // Clear user data or perform additional cleanup if needed;
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
