import React from 'react'
import "../assets/custom.css"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../FirebaseConfig";
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from "../features/auth/userSlice"
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const dispatch = useDispatch();
 const navigate = useNavigate();
  
  const handleGoogleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      if (response) {
        const result  = response.user;
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
  return (
    <div className='mt-5'>
      <button onClick={handleGoogleLogin} className='custom-btn btn btn-lg btn-block'>
      <i className="fab fa-google mx-2"></i>Sign in with google</button>
    </div>
  )
}

export default LoginComponent