import { useState, useEffect } from "react"
import {FaUser} from 'react-icons/fa'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const {name, email, password, password2} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isLoading, user, isError, message, isSuccess} = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, navigate, dispatch, message, user])

  const onChange = (e) => {
    // setformdata is activated when the name value is changed
    setFormData((prevState) => ({
      ...prevState, 
      [e.target.name]: e.target.value
    }) )
  }
  // form submit function
  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }
      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

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
          required
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
          required
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
          required
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
          required
          />
        </div>
        <div className="form-group">
          <button className=" btn btn-block">Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}
export default Register