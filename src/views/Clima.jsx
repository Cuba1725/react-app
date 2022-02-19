import React, {useState} from 'react'
import { 
    Toolbar, Box, Grid, 
    styled, Paper, TextField, IconButton, Button,
  } from '@mui/material';
  import SearchIcon from '@mui/icons-material/Search';
  import ClimaGPS from '../Components/ClimaGPS';



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Clima = () => {

  const [ciudad, setCiudad] = useState('Pilar');

    const enviarForm = (e) => {
        e.preventDefault();
        const busqueda = e.target.search.value;
        console.log(busqueda);
        e.target.search.value = '';
        setCiudad(busqueda.trim().toLowerCase());
    }

  return (
    <>
    <Toolbar />
    <Box sx={{ flexGrow: 1}}>
    <Grid container spacing={1}>

      <Grid item xs={12} md={10} sx={{mx: 'auto'}}>  
          <Item >
            <Box 
                component='form'
                onSubmit={enviarForm}
                sx={{ '& > :not(style)': { m: 1 }, display: 'flex', alignItems: 'flex-end' }}
                autoComplete='off'
            >
            <SearchIcon />
            <TextField color='primary' id="search" placeholder="Buscar..." variant="standard" />
            <Button sx={{ display: 'none' }} type='submit' ></Button>
            </Box>
          </Item>                  
      </Grid>

      <Grid item xs={12} md={10} sx={{mx: 'auto'}}>  
          <Item >
            <ClimaGPS ciudad={ciudad} />
          </Item>                  
      </Grid>       

    </Grid>
  </Box>
  </>
  )
}

export default Clima