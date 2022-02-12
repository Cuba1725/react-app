import React, { useContext } from 'react'
import { Box, TextField, IconButton, } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import firebaseApp from '../Credenciales';
import { getFirestore, updateDoc, doc } from 'firebase/firestore'
import { UserContext } from '../context/UserProvider';

const firestore = getFirestore(firebaseApp);





const AgregarTarea = ({ setArrayTareas, arrayTareas }) => {

  const { user } = useContext(UserContext);
 
    async function añadirTarea(e){
        e.preventDefault();
        const descripcion = e.target.descripcion.value;
        
        //Crear nuevo Array de tareas
        const nvoArrayTareas = [
            ...arrayTareas,
            {
              id: +new Date(),
              descripcion: descripcion,
            },
          ];

        //Actualizar base de datos
        const docuRef = doc(firestore, `usuarios/${user.email}`);
        updateDoc(docuRef, { tareas: [...nvoArrayTareas] });
        //actualizar estado
        setArrayTareas(nvoArrayTareas);
        //Limpiar form
        e.target.descripcion.value = '';
    }
 
 
    return (
    <Box component="form" onSubmit={añadirTarea}
    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
    noValidate
    autoComplete="off">
        
         <TextField
          required
          id="descripcion"
          placeholder='Nueva tarea'
          variant="standard"
        />
        <IconButton type='submit' sx={{ p: '15px' }} aria-label="Agregar tarea">
            <SendIcon />
        </IconButton>
    </Box>
  )
}

export default AgregarTarea