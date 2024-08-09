// Importing the authService functions for authentication
import authService from "./authService"
// Importing functions from Redux Toolkit for creating slices and async thunks
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Retrieving user data from local storage and parsing it into a JavaScript object
const user = JSON.parse(localStorage.getItem('user'))

// Defining the initial state of the auth slice
const initialState = {
    user: user ? user : null, // Setting user to parsed user data if it exists, otherwise null
    isError: false, // Initial state for error status
    isSuccess: false, // Initial state for success status
    isLoading: false, // Initial state for loading status
    message: '', // Initial state for message
}

// Asynchronous thunk action for registering a user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        // Attempt to register the user using authService
        return await authService.register(user)
    } catch (error) {
        // Handle any errors that occur during registration
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        // Reject the thunk with an error message
        return thunkAPI.rejectWithValue(message)
    }
})

// Asynchronous thunk action for logging in a user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        // Attempt to log in the user using authService
        return await authService.login(user)
    } catch (error) {
        // Handle any errors that occur during login
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        // Reject the thunk with an error message
        return thunkAPI.rejectWithValue(message)
    }
})

// Asynchronous thunk action for logging out a user
export const logout = createAsyncThunk('auth/logout', async () => {
    // Log out the user using authService
    await authService.logout()
})

// Creating a slice for authentication with initial state, reducers, and extra reducers for handling async thunks
export const authSlice = createSlice({
    name: 'auth', // Name of the slice
    initialState, // Initial state defined above
    reducers: {
        // Reducer for resetting the state to initial values
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.user = null
        }
    },
    extraReducers: (builder) => {
        // Handling different states of the register async thunk
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true // Set loading state to true when register is pending
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false // Set loading state to false when register is fulfilled
            state.isSuccess = true // Set success state to true
            state.user = action.payload // Update user state with payload data
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false // Set loading state to false when register is rejected
            state.user = null // Set user state to null
            state.isError = true // Set error state to true
            state.message = action.payload // Update message state with error message
        })
        // Handling different states of the login async thunk
        .addCase(login.pending, (state) => {
            state.isLoading = true // Set loading state to true when login is pending
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false // Set loading state to false when login is fulfilled
            state.isSuccess = true // Set success state to true
            state.user = action.payload // Update user state with payload data
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false // Set loading state to false when login is rejected
            state.user = null // Set user state to null
            state.isError = true // Set error state to true
            state.message = action.payload // Update message state with error message
        })
        // Handling the fulfilled state of the logout async thunk
        .addCase(logout.fulfilled, (state) => {
            state.user = null // Set user state to null when logout is fulfilled
        })
    },
})

// Exporting the reset action from the authSlice
export const {reset} = authSlice.actions
// Exporting the reducer from the authSlice
export default authSlice.reducer
