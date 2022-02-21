import React, { useContext, useState }from 'react'
import { UserContext} from '../context/UserProvider';
import { 
    Button, Typography, Avatar,
    Stack, TextField, Box
} from '@mui/material';

const CargaDePosteo = () => {

    const { user } = useContext(UserContext);

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

    const enviarPost = (e) => {
        e.preventDefault();
        const texto = e.target.texto.value;
        console.log(texto);
        e.target.texto.value = '';
    }

  return (
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
                '& .MuiTextField-root': { m: 1, width: '100%', mx: 'auto'  },
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
            <Button type="submit" variant="contained" >Publicar</Button>
        </Box>
        
    </Box>
    
  )
}

export default CargaDePosteo
