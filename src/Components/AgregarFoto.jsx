import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { 
    Stack, Avatar, styled, Badge, 
    IconButton, Button, Modal 
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CargaDePosteo from './CargaDePosteo';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

const AgregarFoto = () => {

    const { user } = useContext(UserContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <Stack direction="row" spacing={2} justifyContent='space-between'>
        <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        >
        <Avatar 
            alt={user.displayName} 
            src={user.photoURL} 
        />
        </StyledBadge>
        <Button onClick={handleOpen} style={{ width: '100%' }} variant='outlined' color="secondary">
            ¿En qué estás pensando?
        </Button>     
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
            <CargaDePosteo close={open}/>    
        </Modal> 
        <IconButton>
            <AddPhotoAlternateIcon />
        </IconButton>
    </Stack>
  )
}

export default AgregarFoto