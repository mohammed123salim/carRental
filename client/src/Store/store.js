import { configureStore } from '@reduxjs/toolkit';
import usersReducer from "../Features/UserSlice.js";

export const store = configureStore({
    reducer: {
        users: usersReducer
    },
})