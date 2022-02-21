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
    background: { paper: '#26282B', default: '#26282B' },
    primary: { dark: '#3B5998', main: '#3B5998', light: '#ffba08' },
    secondary: { dark: '#33658a', main: '#fcfcfc', light: '#ffba08' },
    text: { primary: '#F7F7F7' }
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
