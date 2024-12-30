import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/userSlice';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout()); // Dispatch the logout action
        navigate("/"); // Redirect to the home page
    }, [dispatch, navigate]); // Dependencies ensure it runs once

    return null; // Render nothing
};

export default LogoutComponent;
