import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { UserContext } from '../context/UserProvider';

const Sidebar = () => {

    const { user } = useContext(UserContext);

    const lista = [
        {nombre: 'Inicio', icon: <HomeIcon />, url: '/'}, 
        {nombre: 'Productos', icon: <CategoryIcon />, url: '/productos'}, 
        {nombre: 'Precios', icon: <AttachMoneyIcon />, url: '/precios'},
        {nombre: 'Blog', icon: <RssFeedIcon />, url: '/blog'}
    ];


  return (
    <>    
    <List sx={{ paddingTop: 0 }}>
        <Typography sx={{ p:2 }} variant='h6'>{user.displayName}</Typography>        
        <Divider />
        {lista.map((item) => (
            <ListItem button key={item.nombre}>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText >
                <Link style={{ 
                    textDecoration: 'none', 
                    color: 'inherit'}} 
                    to={item.url} > {item.nombre} </Link> 
                </ListItemText>
            </ListItem>
        ))}
    </List>
    
    
    </>
  )
}

export default Sidebar