// Import the configureStore function from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import the authReducer from the authSlice file
import authReducer from '../features/auth/authSlice'

// Configure and create the Redux store
export const store = configureStore({
  // Specify the reducers for the store
  reducer: {
    // Define a slice of the state named 'auth' and assign the authReducer to manage it
    auth: authReducer,
  },
});
