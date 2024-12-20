import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import LogoutComponent from '../components/LogoutComponent';
import { useSelector } from 'react-redux';
import { AddMemories } from '../components/AddMemories';

const MainRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route path='/' element={
        isAuthenticated ? <Navigate to="/app" replace /> : <LoginComponent />
      }
      />

      <Route path="/app" element={<ProtectedRoute />}>
        <Route index element={
          <Home />
        }
        />

        <Route path='add-memories' element={

          <AddMemories />
        }
        />

        <Route path='memories' element={

          <AddMemories />
        }
        />

        <Route path='logout' element={
          <LogoutComponent />
        }
        />
      </Route>
    </Routes>
  )
}

export default MainRoute