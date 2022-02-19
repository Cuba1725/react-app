import React, { useContext } from 'react'
import firebaseApp from '../Credenciales'
import { 
    AppBar, Box, Toolbar, IconButton, Typography,
    Menu, Container, Avatar, ListItemIcon, Tooltip , MenuItem,
    CssBaseline, Drawer,
 } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Logout from '@mui/icons-material/Logout';
import {getAuth, signOut} from 'firebase/auth';
import { Link } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { UserContext } from '../context/UserProvider';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router-dom';

 const auth = getAuth(firebaseApp);


 const settings = [{
     nombre: 'Perfil',
     icono: <AccountBoxIcon />,
     url: '/perfil',
    }];

    const drawerWidth = 240;

const Navbar = (props) => {

    const { user } = useContext(UserContext);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        const toggler = 'hola';        
        setMobileOpen(!mobileOpen);
    };
    
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    
    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };   
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />    
        <AppBar 
            position="fixed"            
            sx={{ 
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }                            
             }}
            >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex'/* , md: 'none'  */} }}>
                            <IconButton
                                color="inherit"
                                aria-label='open drawer'
                                edge='start'
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { sm: 'none' } }}
                            >
                                <MenuOpenIcon />
                            </IconButton>                            
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
        {/* en este box van los 2 drawer */}
        <Box 
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label='mailbox folders'
        >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClick={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          { <Sidebar /> }
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },            
          }}
          open
        >
            { <Sidebar /> }    
        </Drawer>
        </Box>
        <Box
        component="main"        
        sx={{ 
            flexGrow: 1,              
            width: { sm: `calc(100% - ${drawerWidth}px)` },            
        }}
      > 
        { <Outlet /> }
      </Box>
    </Box>
  )
}

export default Navbar