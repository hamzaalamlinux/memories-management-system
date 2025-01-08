import React, { useEffect, useState } from 'react'
import "../assets/custom.css"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../FirebaseConfig";
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin, login, register, resetError } from "../features/auth/userSlice"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { PatternFormat } from 'react-number-format';

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


const RegisterComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [contactNumber,setcontactNumber ] = useState();
    const [errors , setErrors] = useState({email : '', password : ''});
    const {error} = useSelector((state) => state.user);
    const handleGoogleLogin =  async () => {
        try {
            const response = await signInWithPopup(auth, googleProvider);
            if (response) {
              const result = response.user;
              const user = {
                google_id: result.uid,
                email: result.email,
              };
              dispatch(googleLogin(user));
      
              // navigate("/app");
            }
          } catch (error) {
            console.log(error);
          }
    }

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(resetError());
        if(validateForm()){
            const user = {
                name : userName,
                email : email,
                password : password,
                phoneNumber : contactNumber
            }
            dispatch(register(user));
            // navigate("/app");
        }
    }


  const validateForm = () => {
    const newErrors = {username : '', email: '', password: '', contactNumber: ''};
    let isValid = true;
    if(!userName){
        newErrors.username = 'Username is required';
    }
    if(!email){
      newErrors.email = 'Email is required';
      isValid = false;
    }
    
    if(!password){
      newErrors.password = 'Password is required';
      isValid = false;
    }

    if(password.lenght != 8){
        newErrors.password = "Password is required";
        isValid = false;
    }

    if(!contactNumber){
        newErrors.contactNumber = 'Contact number required';
        isValid = false;
    }
    if(contactNumber.lenght > 15){
        newErrors.contactNumber = 'Contact number required';
        isValid = false;
    }


    setErrors(newErrors);
    return isValid;
  }


  useEffect(() => {
    dispatch(resetError);
} , [dispatch])

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name == "username") setUsername(value);
        if(name == "email") setEmail(value);
        if(name == "password") setPassword(value);
       
    }
    const handlePhoneChange = (value) => {
        setcontactNumber(value); // Update the contactNumber state with the new value
    };

    
  return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={{position : "relative"}}>
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

      <Form.Label className="h5">Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Enter your username"
          required
          className="p-3"
          value={userName}
          onChange={handleChange}
          isInvalid={!!errors.username}
        />
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

      <Form.Group className="mb-4" controlId="formPassword">
        <Form.Label className="h5">Contact Number</Form.Label>
        <PhoneInput
        country={"pk"} // Default country
        value={contactNumber}
       
        onChange={handlePhoneChange}
        inputStyle={{
            width: "100%", // Make it responsive
            padding: "12px 45px", // Adjust padding to make it less wide
            fontSize: "16px",
            borderRadius: "5px", // Add border radius for a nicer look
            border: "1px solid #ccc", // Add border for clarity
            boxSizing: "border-box", // Ensure padding doesn't cause overflow
        }}
        dropdownStyle={{
          fontSize: "14px",
          borderRadius: "5px", 
        }}
      />
        <Form.Control.Feedback type="invalid">
          {errors.contactNumber}
        </Form.Control.Feedback>
      </Form.Group>
  
      {/* Submit Button */}
      <Button
        variant="primary"
        type="submit"
        onClick={handleRegister}
        className="btn btn-lg btn-block w-100 py-3 mt-3"
      >
        Submit
      </Button>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="btn btn-outline-danger btn-lg btn-block w-100 py-3 mt-3">
        <i className="fab fa-google mx-2"></i> Sign Up  with Google
      </button>
      <span className='text-center mx-4 my-4'>Already have an account? <Link to="/">Login now</Link></span>
    </Form>
    </div>
  )
}

export default RegisterComponent