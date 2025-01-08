import logo from './logo.svg';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import MainRoute from './routes/MainRoute';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setupAxiosInterceptors } from './api/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function App() {
 
  return (
    
   <MainRoute/>
  );
}

export default App;
