import React, { useContext, useEffect, useState } from 'react';
import AgregarTarea from '../Components/AgregarTarea';
import ListarTareas from '../Components/ListarTareas';
import firebaseApp from '../Credenciales';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { Box, Grid, styled, Paper } from '@mui/material';
import { UserContext } from '../context/UserProvider'; 
import Drawer from '../Components/Drawer';

const firestore = getFirestore(firebaseApp);

//FUNCIONES
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Principal = () => {

    const { user } = useContext(UserContext)
    console.log(user.email);
    const [arrayTareas, setArrayTareas] = useState(null);
    const fakeData = [
      { id: 1, descripcion: "tarea falsa 1"},
      { id: 2, descripcion: "tarea falsa 2"},
      { id: 3, descripcion: "tarea falsa 3"},
    ];
  
    async function buscarOcrearDoc(idDocumento) {
      //crear referencia al documento
      const docuRef = doc(firestore, `usuarios/${idDocumento}`);
  
      //buscar documento
      const consulta = await getDoc(docuRef);
  
      //Revisar si el doc existe
      if(consulta.exists()){
        //si existe
        const infoDocu = consulta.data();
        return infoDocu.tareas;      
      }else {
        //si no existe
        await setDoc(docuRef, { tareas: [...fakeData] });
        const consulta = await getDoc(docuRef);
        const infoDocu = consulta.data();
        return infoDocu.tareas;
      }
    }
    
    useEffect(() => {
      async function fetchTareas() {
        const tareasFetchadas = await buscarOcrearDoc(
          user.email
        );
      setArrayTareas(tareasFetchadas);
    }
      fetchTareas();
    }, []);

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={10} sx={{mx: 'auto'}}>
        <Item><AgregarTarea
                  arrayTareas={arrayTareas}
                  setArrayTareas={setArrayTareas}
                  user={user.email}
                  /></Item>
      </Grid>   
      <Grid item xs={12} md={10} sx={{mx: 'auto'}}>
        <Item>
          {arrayTareas ? (
          <ListarTareas
          arrayTareas={arrayTareas}
          setArrayTareas={setArrayTareas}
          user={user.email}
          />
          ) : null}
        </Item>
      </Grid>
      <Grid item >
    <Item> <Drawer /> </Item>  
      </Grid>              
    </Grid>
  </Box>
  )
}

export default Principal