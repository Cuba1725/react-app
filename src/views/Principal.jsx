import React from 'react'
import { 
  Toolbar, Box, Grid, 
  styled, Paper, Typography
} from '@mui/material';
import { Link } from 'react-router-dom';


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
    <Box sx={{ flexGrow: 1, m: 2 }}>
    <Grid container spacing={2}>
      
      <Grid item xs={12} md={3} sx={{mx: 'auto'}}>
        <Link to='/clima' style={{ 
                    textDecoration: 'none', 
                    color: 'inherit'}}>
          <Item>
            <Typography variant='h5'>App Clima</Typography>
          </Item>          
        </Link>
      </Grid>

      <Grid item xs={12} md={3} sx={{mx: 'auto'}}>
        <Item>
         
        </Item>
      </Grid>  

      <Grid item xs={12} md={3} sx={{mx: 'auto'}}>
        <Item>
         
        </Item>
      </Grid>    

       <Grid item xs={12} md={3} sx={{mx: 'auto'}}>
        <Item>
         
        </Item>
      </Grid>

    </Grid>
  </Box>
  </>
  )
}

export default Principal