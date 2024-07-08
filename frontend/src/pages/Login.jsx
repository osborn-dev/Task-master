import { useState, useEffect } from "react"
import {FaSignInAlt} from 'react-icons/fa'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {isSuccess, user, message, isError, isLoading} = useSelector((state) => state.auth)

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

    const userData = {
      email,
      password,
    }
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login into your account</p>
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
        <div className="form-group">
          <button className=" btn btn-block">Submit</button>
        </div>
      </form>
    </section>
    </>
  )
}
export default Login