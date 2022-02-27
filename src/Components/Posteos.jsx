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

    
  return (
   <>
    {posteos.map((item) => (      
      <Card elevation={0} key={item.id} sx={{maxWidth: 345, mx: 'auto', my: 1}}>  
        <CardHeader 
        avatar={<Avatar alt={item.nombre} src={item.user} />}
        action={ <IconButton aria-label='configuración'>
            <MoreVertIcon />
        </IconButton> }
        title={item.nombre}
        subheader={moment().startOf(item.id).fromNow()}
        />        
        <CardMedia
          component='img'
          width='344'
          height='auto'
          image={item.image}
          alt={item.texto}
        />
        
        <CardContent>
            <Typography variante='body2'>
              {item.texto}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='Me gusta' >
              {meGusta ? <FavoriteIcon color='error'/> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton aria-label='Comentar'>
              <ChatBubbleOutlineRoundedIcon/>
          </IconButton>
          <IconButton style={{ marginLeft: 'auto' }} aria-label='Compartir'>
              <ReplyRoundedIcon/>
          </IconButton>
        </CardActions>
    </Card> 
      ))}      
    </>    
  )
}

export default Posteos
