import React, { useState } from 'react';
import { 
    styled, Card, CardHeader, CardMedia, CardContent, 
    CardActions, Collapse, Avatar, IconButton, Typography,    
} from '@mui/material';
import { firebaseApp } from '../Credenciales';
import { getFirestore, getDocs, collection } from 'firebase/firestore'
import moment from 'moment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';


const db = getFirestore(firebaseApp);

const Posteos = () => {

    const [posteos, setPosteos] = useState([]);
    const [meGusta, setMeGusta ] = useState(false);
    const [img, setImg] = useState(null);

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

    const hora = (id) => {
      moment.locale('es');
      moment(id).fromNow();
    }
    
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
        subheader={hora(item.id)}        
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
