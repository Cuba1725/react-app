import React, { useState, useEffect } from 'react';
import { 
  styled, Box, Paper, Grid, Typography,
 } from '@mui/material';

const ClimaXgps = () => {
   
  const [clima, setClima] = useState({});  
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  useEffect(() => {
    climaPosition();
  }, [])

    const climaPosition = async() => {
        if("geolocation" in navigator){
          navigator.geolocation.getCurrentPosition(success);
    
          function success(position) {
            console.log('lat: ', position.coords.latitude, 'long: ', position.coords.longitude )
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            setLat(lat);
            setLong(long);
          }
          
    
        }else{
          alert('La geolocalizacion no esta disponible')
        }
      }
    
      climaPosition()
    
      const key = 'd3393ca241c12038ac4fb8a9a198e614';
    
      const geoClima = async() => {
        console.log(lat, long);
        const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`
    
        try {
          const resp = await fetch(url2);
          const data = await resp.json();
          console.log(data);
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
      geoClima();
      
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
   
   
             <Grid item xs={12} md={6} sx={{mx: 'auto'}}>
             <Item><Typography>Humedad: {clima.humidity}</Typography></Item>          
             </Grid>
   
         </Grid>  
       </Box>
     )
}

export default ClimaXgps
