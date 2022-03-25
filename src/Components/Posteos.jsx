import React, { useState } from 'react';
import { 
    Card, CardHeader, CardMedia, CardContent, 
    Avatar, IconButton, Typography,    
} from '@mui/material';
import { firebaseApp } from '../Credenciales';
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import 'moment/locale/es';



const db = getFirestore(firebaseApp);

const Posteos = () => {

    const [posteos, setPosteos] = useState([]);        

    const getPosteos = async ( ) => {
      const arrayPosteos = [];

      const snapshot = await getDocs(collection(db, 'posteos'))
      snapshot.forEach((doc) => {
        arrayPosteos.push(doc.data());
      })
      setPosteos([...arrayPosteos])
    }

    React.useEffect(() => {
      getPosteos()
    }, [posteos]);
    
    posteos.sort((a, b) => {
      if (b.id > a.id) {
        return 1;
      }
      if (b.id < a.id) {
        return -1;
      }
      return 0;
    })
    
  return (
   <>
    {posteos.map((item) => (        
      <Card elevation={1} key={item.id} sx={{maxWidth: 345, mx: 'auto', my: 1}}>  
        <CardHeader 
        avatar={<Avatar alt={item.nombre} src={item.user} />}
        action={ <IconButton aria-label='configuración'>
            <MoreVertIcon />
        </IconButton> }
        title={item.nombre}
        subheader={moment(item.id).fromNow()}        
        />        
        <CardMedia
          component='img'
          width='342'
          height='auto'
          image={item.image}
          alt={item.texto}
        />
        
        <CardContent>
            <Typography variante='body2'>
              {item.texto}
            </Typography>
        </CardContent>        
    </Card> 
      ))}      
    </>    
  )
}

export default Posteos
