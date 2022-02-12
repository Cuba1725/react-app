import React, { useState } from 'react'
import { 
    Box, Typography, Button, FormControl, IconButton,
    CssBaseline, TextField, Input, InputLabel, 
    InputAdornment, Divider, Container,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import firebaseApp from '../Credenciales';
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider
 } from 'firebase/auth';
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();




const Login = () => {

    const [values, setValues] = useState({
        password: '',
        showPassword: false,	
    });

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value});
    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (e) => { 
        e.preventDefault();
    };

    async function iniciarSesion(e) {
        e.preventDefault();
        const correo = e.target.email.value;
        const password = e.target.password.value;

        if(estaRegistrado) {
            //si se registra
            const usuario = await createUserWithEmailAndPassword(
                auth, correo, password
            );            
        }else{
            //si está iniciando sesión
            signInWithEmailAndPassword(auth, correo, password)
        }
    }

    const signInWithFacebook = () => {
        const facebookProvider = new FacebookAuthProvider();
        signInWithPopup(auth, facebookProvider)
        .then((res) => {
            const userName = res.user.displayName; 
            const userPhoto = res.user.photoURL;           
        })
        .catch((err) => {
            console.log(err);
            alert(err);
        })
    }

    const [estaRegistrado, setEstaRegistrado] = useState(false);

  return (
      <>
      <CssBaseline />
    <Container maxWidth="sm">
        <Box sx={{mt: 4}} >
        <Typography variant="h4" align='center'> Bienvenido a Cuba </Typography>
        <Typography sx={{my: 2}} variant="h5" align='center'> {estaRegistrado ? 'Registrate' : 'Iniciar Sesión'} </Typography>
        </Box>
        <form onSubmit={iniciarSesion} >
        <Box sx={{mx: 5, display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}} >
            <TextField sx={{my: 3}} id="email" label="Correo" variant="standard" />
            <FormControl sx={{ mb: 5}} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                />
                </FormControl>
            
                <Button sx={{mt: 2}} variant='contained' color="success" type="submit" >
                {estaRegistrado ? 'Registrate' : 'Iniciar Sesión'}
                </Button>
                <Button sx={{mb: 2, mt: 1}} onClick={() => setEstaRegistrado(!estaRegistrado)} variant='contained' color="secondary" >
                {estaRegistrado ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
                </Button>
            
        <Divider> ó </Divider>
        <Button sx={{mt: 2}} type="submit" variant='contained' color="error" onClick={() => signInWithPopup(auth, googleProvider)} >Ingresar con Google</Button>
        <Button sx={{my: 1}} type="submit" variant='contained' color="primary" onClick={signInWithFacebook}>Ingresar con Facebook</Button>                
        </Box>
        </form>
    </Container>
    </>
    )
}

export default Login