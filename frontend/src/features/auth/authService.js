// Importing the axios library for making HTTP requests
import axios from 'axios'

// Base URL for the API endpoints related to user authentication
const API_URL = '/api/users/'

// Function to register a new user
const register = async (userData) => {
    // Making a POST request to the API to register the user
    const response = await axios.post(API_URL, userData)

    // If the response contains user data, save it to localStorage
    if (response.data) {
        // Storing the user data in localStorage in JSON format
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    // Returning the response data
    return response.data
}

// Function to log in a user
const login = async (userData) => {
    // Making a POST request to the API to log in the user
    const response = await axios.post(API_URL + 'login', userData)

    // If the response contains user data, save it to localStorage
    if (response.data) {
        // Storing the user data in localStorage in JSON format
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    // Returning the response data
    return response.data
}

// Function to log out a user
const logout = () => {
    // Removing the user data from localStorage
    localStorage.removeItem('user')
}

// Creating an object that groups the authentication functions together
const authService = {
    register,
    logout,
    login
}

// Exporting the authService object so it can be used in other parts of the application
export default authService
