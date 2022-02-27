import React from 'react'
import { 
  Toolbar, Box, Grid, styled, Paper
} from '@mui/material';

import AgregarFoto from '../Components/AgregarFoto'
import Posteos from '../Components/Posteos';


//FUNCIONES
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Principal = () => {

   

  return (
    <>
    <Toolbar />
    <Box sx={{ flexGrow: 1, mt: 1 }}>
    <Grid container spacing={2}>
      
      <Grid item xs={11} md={6}sx={{mx: 'auto'}}>
        <AgregarFoto />        
      </Grid>  

      <Grid item xs={11} md={10} sx={{mx: 'auto'}}>
        <Posteos />         
      </Grid>    

    </Grid>
  </Box>
  </>
  )
}

export default Principal