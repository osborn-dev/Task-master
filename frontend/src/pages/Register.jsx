// Import necessary hooks and libraries from React, react-icons, react-toastify, react-router-dom, and Redux
import { useState, useEffect } from "react";
import { FaUser } from 'react-icons/fa';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  // State hook to manage form data for name, email, password, and password confirmation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  // Destructure name, email, password, and password2 from formData
  const { name, email, password, password2 } = formData;

  // Initialize dispatch function to send actions to the Redux store
  const dispatch = useDispatch();
  // Initialize navigate function to programmatically navigate to different routes
  const navigate = useNavigate();

  // Extract relevant state from the auth slice of the Redux store
  const { isLoading, user, isError, message, isSuccess } = useSelector((state) => state.auth);

  // useEffect hook to handle side effects
  useEffect(() => {
    if (isError) {
      toast.error(message); // Show error toast if there is an error
    }
    if (isSuccess || user) {
      navigate('/'); // Navigate to the home page if registration is successful or user is already logged in
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

    if (password !== password2) {
      toast.error('Passwords do not match'); // Show error toast if passwords do not match
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData)); // Dispatch the register action with user data
    }
  };

  // Show spinner if loading state is true
  if (isLoading) {
    return <Spinner />;
  }

  // Return JSX for the registration form
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              className="form-control" 
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange} 
              required // Make the name input field required
            />
          </div>
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
          {/* PASSWORD 2 */}
          <div className="form-group">
            <input 
              type="password" 
              className="form-control" 
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange} 
              required // Make the password confirmation input field required
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

export default Register;
