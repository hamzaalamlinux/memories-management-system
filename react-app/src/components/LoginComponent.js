import React, { useEffect, useState } from 'react'
import "../assets/custom.css"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../FirebaseConfig";
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin, login, resetError } from "../features/auth/userSlice"
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';


const LoginComponent = () => {

  
  const {error} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  
  const [errors, setErrors] = useState({ email: '', password: '' });


  useEffect(() => {
      dispatch(resetError);
  } , [dispatch])
  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      if (response) {
        const result = response.user;
        const user = {
          google_id: result.uid,
          email: result.email,
        };
        dispatch(googleLogin(user));

        navigate("/app");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(resetError);
    if(validateForm()){
      const user = {
        email : email,
        password : password
      }
      dispatch(login(user));
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  }

  const validateForm = () => {
    const newErrors = {email: '', password: ''};
    let isValid = true;
    if(!email){
      newErrors.email = 'Email is required';
      isValid = false;
    }
    if(!password){
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ position: 'relative' }}>
    {error && (
      <div className="alert alert-danger text-center" role="alert" style={{ position: 'absolute', top: '40px', width: '100%', maxWidth: '400px' }}>
        {error} {/* Display the API error */}
      </div>
    )}
    <Form
      className="border p-4 rounded shadow-lg"
      style={{ maxWidth: '400px', width: '100%' }}
    >
      {/* Email Input Field */}
      <Form.Group className="mb-4" controlId="formEmail">
        <Form.Label className="h5">Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="p-3"
          value={email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
  
      {/* Password Input Field */}
      <Form.Group className="mb-4" controlId="formPassword">
        <Form.Label className="h5">Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          required
          className="p-3"
          onChange={handleChange}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>
  
      {/* Submit Button */}
      <Button
        variant="primary"
        type="submit"
        onClick={handleLogin}
        className="btn btn-lg btn-block w-100 py-3 mt-3"
      >
        Submit
      </Button>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn btn-outline-danger btn-lg btn-block w-100 py-3 mt-3"
      >
        <i className="fab fa-google mx-2"></i> Sign in with Google
      </button>
    </Form>
  </div>
  
  )
}

export default LoginComponent