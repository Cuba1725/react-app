import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { 
    Stack, Avatar, styled, Badge, Typography,
    IconButton, Button, Modal, Box, TextField, 
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { storage } from '../Credenciales';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { firebaseApp } from '../Credenciales';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore'

const db = getFirestore(firebaseApp);

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

const AgregarFoto = () => {

    const { user } = useContext(UserContext);
    const [texto, setTexto] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const Input = styled('input')({
      display: 'none',
    }); 

  const enviarPost = async (e) => {
      e.preventDefault();
      const textoAEnviar = e.target.texto.value;
      try {
        const docRef = await addDoc(collection(db, 'posteos'), {
            id: +new Date(),
            texto: textoAEnviar,
            image: url,
            user: user.photoURL,
            nombre: user.displayName, 
            like: false,    
        }); 
        console.log('doc id: ', docRef.id );
        } catch (e) {
          console.error(e)
        }
   
      //cerramos la ventana de posteos
      handleClose();      
      //limpiamos el form
      e.target.texto.value = '';      
  }

  
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);

  const archivoHandler = async (e) => {       
    e.preventDefault();
    const archivo = e.target.files[0];
    cargarArchivo(archivo);
  }

  const cargarArchivo = (archivo) => {
    if(!archivo) return;
    const storageRef = ref(storage, `archivos/${archivo.name}`);
    const uploadTask = uploadBytesResumable(storageRef, archivo);

    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(prog);
    },
    (error) => console.log(error),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('archivo disponible como: ', downloadURL);
        setUrl(downloadURL);
        handleOpen();
      });
    }
    );
  };

  return (
    <Stack direction="row" spacing={2} justifyContent='space-between'>
        <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        >
        <Avatar 
            alt={user.displayName} 
            src={user.photoURL} 
        />
        </StyledBadge>
        <Button onClick={handleOpen} style={{ width: '100%' }} variant='outlined' color="secondary" size="small">
            ¿En qué estás pensando?
        </Button>     
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
            <Box sx={style}>     
              <Stack direction='row' alignItems='center' sx={{ mb: 3 }} >
                  <Avatar 
                          alt={user.displayName} 
                          src={user.photoURL} 
                          sx={{ marginRight: 2 }}
                      />
                  <Typography>{user.displayName}</Typography>
              </Stack>        
              <Box component='form'
                  sx={{
                      '& .MuiTextField-root': { m: 1, width: '100%', mx: 'auto' },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={enviarPost}
                >
                  <TextField
                      id='texto'
                      multiline
                      rows={5}
                      placeholder='¿Qué estás pensando?'
                  />
                  {url ? <img src={url} style={{ width: 'auto', height: 100 }} /> : ''}
                  <br />                  
                  <Button type="submit" variant="contained" sx={{ mt: 2 }} >Publicar</Button>
              </Box>  
            </Box>  
        </Modal> 
        <label htmlFor='icon-button-file'>
          <Input accept='image/*' id='icon-button-file' type='file' onChange={archivoHandler} />
          <IconButton component='span'>
            <AddPhotoAlternateIcon />
        </IconButton>
        </label>
    </Stack>
  )
}

export default AgregarFoto