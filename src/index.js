import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter, Routes, Route,
 } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import Principal from './views/Principal';
import Productos from './views/Productos';
import Blog from './views/Blog';
import Precios from './views/Precios';
import Perfil from './views/Perfil';
import Clima from './views/Clima';


ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<App userEmail />}>
          <Route index element={ <Principal /> } />
          <Route path="precios" element={ <Precios/> }/>
          <Route path="productos" element={ <Productos /> }/>
          <Route path="tareas" element={ <Blog /> }/>
          <Route path="perfil" element={ <Perfil /> }/>
          <Route path="clima" element={ <Clima /> }/>
        </Route>
      </Routes>    
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
