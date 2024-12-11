// Import necessary hooks and libraries from React, react-icons, react-toastify, react-router-dom, and Redux
import { useState, useEffect } from "react";
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  // State hook to manage form data for email and password
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Destructure email and password from formData
  const { email, password } = formData;

  // Initialize dispatch function to send actions to the Redux store
  const dispatch = useDispatch();
  // Initialize navigate function to programmatically navigate to different routes
  const navigate = useNavigate();

  // Extract relevant state from the auth slice of the Redux store
  const { isSuccess, user, message, isError, isLoading } = useSelector((state) => state.auth);

  // useEffect hook to handle side effects
  useEffect(() => {
    if (isError) {
      toast.error(message); // Show error toast if there is an error
    }
    if (isSuccess || user) {
      navigate('/'); // Navigate to the home page if login is successful or user is already logged in
    }

    dispatch(reset()); // Reset the auth state
  }, [isError, isSuccess, navigate, dispatch, message, user]); // Dependency array includes all relevant variables

  // Function to handle input changes and update formData state
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value, // Update the specific field in formData based on input name
    }));
  };

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const userData = {
      email,
      password,
    };
    dispatch(login(userData)); // Dispatch the login action with user data
  };

  // Show spinner if loading state is true
  if (isLoading) {
    return <Spinner />;
  }

  // Return JSX for the login form
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Log in to get productive</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          {/* EMAIL */}
          <div className="form-group">
            <input 
              type="email" 
              className="form-control" 
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange} 
              required // Make the email input field required
            />
          </div>
          {/* PASSWORD */}
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange} 
              required // Make the password input field required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button> {/* Submit button */}
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
