import React from 'react'
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RssFeedIcon from '@mui/icons-material/RssFeed';

const Drawer = () => {

    const lista = [
        {nombre: 'Inicio', icon: <HomeIcon />, url: '/'}, 
        {nombre: 'Productos', icon: <CategoryIcon />, url: '/productos'}, 
        {nombre: 'Precios', icon: <AttachMoneyIcon />, url: '/precios'},
        {nombre: 'Blog', icon: <RssFeedIcon />, url: '/blog'}
    ];


  return (
    <>    
    <List>
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

export default Drawer