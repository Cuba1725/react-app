import React, { useState } from 'react'
import { 
    Box, Typography, Button, CssBaseline, 
    Stack, Container, Card, CardMedia,
} from '@mui/material';
import firebaseApp from '../Credenciales';
import logo from '../image/logo.png';
import { getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider
 } from 'firebase/auth';
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();




const Login = () => {  
 
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
        <Card sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardMedia
                component='img'
                sx={{ width: 200, height: 250 }}                
                image={logo}
                />
                <Stack direction="column" spacing={1}>
                    <Button  type="submit" variant='contained' color="error" onClick={() => signInWithPopup(auth, googleProvider)} >Ingresar con Google</Button>
                    <Button  type="submit" variant='contained' color="primary" onClick={signInWithFacebook}>Ingresar con Facebook</Button>                                
                </Stack>
            </Box>
        </Card>
        </Box>        
    </Container>
    </>
    )
}

export default Login