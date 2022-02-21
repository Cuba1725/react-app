import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { 
    styled, Card, CardHeader, CardMedia, CardContent, 
    CardActions, Collapse, Avatar, IconButton, Typography,    
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import Mendoza from '../image/mendoza.jpg'

const Posteos = () => {

    const { user } = useContext(UserContext);

  return (
    <Card sx={{maxWidth: 345, mx: 'auto'}}>
      <CardHeader
      avatar={<Avatar alt={user.displayName} src={user.photoURL} />}
      action={ <IconButton aria-label='configuración'>
          <MoreVertIcon />
      </IconButton> }
      title={user.displayName}
      subheader='Febrero 20, 2022'
      />
      <CardMedia
        component='img'
        height='194'
        image={Mendoza}
        alt='mendoza'
      />
      <CardContent>
          <Typography variante='body2'>
              Hermosa mañana en Potrerillos, Mendoza.
          </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='Me gusta'>
            <FavoriteIcon color='error'/>
        </IconButton>
        <IconButton aria-label='Comentar'>
            <ChatBubbleOutlineRoundedIcon/>
        </IconButton>
        <IconButton style={{ marginLeft: 'auto' }} aria-label='Compartir'>
            <ReplyRoundedIcon/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Posteos
