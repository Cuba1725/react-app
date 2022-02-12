//IMPORTACIONES
import React from 'react';
import { CssBaseline} from '@mui/material';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';


const Home = () => {

 

  return (
    <>
    <CssBaseline />
      <Navbar />
      <Outlet />     
     
    </>
  )
}

export default Home
