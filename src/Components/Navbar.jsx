import React, { useContext } from 'react'
import firebaseApp from '../Credenciales'
import { 
    AppBar, Box, Toolbar, IconButton, Typography,
    Menu, Container, Avatar, ListItemIcon, Tooltip , MenuItem
 } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Logout from '@mui/icons-material/Logout';
import {getAuth, signOut} from 'firebase/auth';
import { Link } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { UserContext } from '../context/UserProvider';

 const auth = getAuth(firebaseApp);


 const pages = [
     {nombre: 'Inicio', url: '/'},
     {nombre: 'Productos', url: '/productos'},
     {nombre: 'Precios', url: '/precios'},
     {nombre: 'Blog', url: '/blog'},
    ];
 const settings = [{
     nombre: 'Perfil',
     icono: <AccountBoxIcon />,
     url: '/perfil',
    }];

const Navbar = () => {

    const { user } = useContext(UserContext);

    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenNavMenu = (e) => {
        setAnchorElNav(e.currentTarget);
    };
    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

  return (
    <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex'/* , md: 'none'  */} }}>
                        <IconButton
                            size="large"
                            aria-label="usuario"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuOpenIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOriginal={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block' },
                            }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onCLick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                           <Link style={{textDecoration: 'none', color: 'inherit'}} to={page.url} >{page.nombre}</Link> 
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: {xs: 'flex'} }}>
                            Cubex
                    </Typography>                  
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip  title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p:0 }}>
                                <Avatar alt={user.displayName} src={user.photoURL} />
                            </IconButton>
                        </Tooltip >
                        <Menu   
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <ListItemIcon> {setting.icono} </ListItemIcon>
                                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={setting.url} >{setting.nombre}</Link> 
                                    </MenuItem>
                                ))}
                                <MenuItem >
                                    <ListItemIcon>
                                        <Logout fontSize='small' />
                                    </ListItemIcon>
                                    <Typography textAlign='center' onClick={() => signOut(auth)} >Cerrar Sesión</Typography>
                                </MenuItem>
                            </Menu>
                    </Box>
            </Toolbar>
        </Container>
    </AppBar>
  )
}

export default Navbar