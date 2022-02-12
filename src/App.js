import React from 'react';
import Login from './Components/Login';
import Home from './Components/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { UserContext } from './context/UserProvider';


const theme = createTheme({
  palette: {
    mode: 'dark',
    common: { black: '#1e2d53', white: '#edf2f4' },
    background: { paper: '#002231', default: '#272727' },
    primary: { dark: '#33658a', main: '#28427b', light: '#ffba08' },
    secondary: { dark: '#33658a', main: '#2f4550', light: '#ffba08' },
    text: { primary: '#edf2f4' }
  }
})

function App() {
  
  const { user } = useContext(UserContext);

  return (
    
    <ThemeProvider theme={theme}>     
      {user ? <Home /> : <Login />}
    </ThemeProvider>
  );
}

export default App;
