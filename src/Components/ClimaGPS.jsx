import React, { useState, useEffect } from 'react';
import { 
  styled, Box, Paper, Grid, Typography,
 } from '@mui/material';
import { typography } from '@mui/system';



const ClimaGPS = ({ ciudad }) => {

  const [clima, setClima] = useState({});
  
  useEffect(() => {
    pintarClima(ciudad)
  }, [ciudad])

  
  
  const pintarClima = async (ciudad) => {
    console.log(ciudad);
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=d3393ca241c12038ac4fb8a9a198e614&lang=es`;

     try {
       const res = await fetch(url);
       const data = await res.json();
       console.log(data)
       setClima({
        temperature: Math.round(data.main.temp),
        wind: Math.round(data.wind.speed),
        city: data.name,
        feels_like: Math.round(data.main.feels_like),
        description: data.weather[0].description,
        humidity: data.main.humidity,        
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,        
      });       
     }catch(error) {
       console.log(error);
     }
   }
  

   const Item = styled(Paper)(({ theme }) => ({
     ...theme.typography.body2,
     padding: theme.spacing(1),
     textAlign: 'center',
     color: theme.palette.text.secondary,
   }));

  return (
    <Box sx={{flexGrow: 1 }}>     
      <Grid container spacing={2}>
          <Grid item xs={12} sx={{mx: 'auto'}}>
            <Item><Typography variant="h5">{clima.city}</Typography></Item>          
          </Grid>

          <Grid item xs={12} md={8} sx={{mx: 'auto'}}>
            <Item><img src={clima.icon}/></Item>          
          </Grid>

          <Grid item xs={6} md={6} sx={{mx: 'auto'}}>
            <Item sx={{ pb: 0 }}><Typography>Temp</Typography>
            <Typography variant="h3">{clima.temperature}º</Typography></Item>
          </Grid>

          <Grid item xs={6} md={6} sx={{mx: 'auto'}}>
          <Item sx={{ pb: 0 }}><Typography>S Term</Typography>
            <Typography variant="h3">{clima.feels_like}º</Typography></Item>
          </Grid>

          <Grid item xs={12} md={6} sx={{mx: 'auto'}}>
            <Item><Typography>{clima.description}</Typography></Item>          
          </Grid>


          <Grid item xs={10} md={6} sx={{mx: 'auto'}}>
          <Item><Typography>Humedad: {clima.humidity}</Typography></Item>          
          </Grid>

      </Grid>  
    </Box>
  )
}

export default ClimaGPS