import React from 'react'
import "../assets/custom.css"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../FirebaseConfig";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../features/auth/userSlice"
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const dispatch = useDispatch();
 const navigate = useNavigate();
  
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        const user = result.user;
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          isAnonymous: user.isAnonymous,
          photoURL: user.photoURL,
          providerData: user.providerData,
        }));

        navigate("/home");
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