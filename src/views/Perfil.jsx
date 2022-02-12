import React, { useContext } from 'react'
import { CssBaseline, Container, Avatar, Toolbar, Box, Typography } from '@mui/material';
import { UserContext } from '../context/UserProvider';

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 1,
  width: 'auto',
  height: 'auto',
};

const Perfil = () => {

  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <>
    <CssBaseline />
    <Toolbar />
    <Container >
      <Box sx={{ 
        ...commonStyles, 
        borderColor: 'primary.main', 
        borderRadius: 3, 
        p: 3,
        maxWidth: 750,
        mx: 'auto' 
        }} >
        <Avatar       
          alt={user.name}
          src={user.photoURL}
          sx={{ width:45, height: 45 }}
        />
        <Typography sx={{ mb:2, mt:1 }} variant='h6' color='inherit'>{user.displayName}</Typography>
        <Typography variant='body2' color='inherit' >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe veniam quo sed provident ad repellat voluptates optio doloremque, ab eveniet ipsam deserunt odio molestias non animi pariatur fugit temporibus obcaecati rerum ex dolorem? Quos sequi molestiae odio, beatae, consequuntur quam ex et assumenda consequatur facere nam in sapiente quas illo tenetur nihil pariatur ab dolor necessitatibus, maiores deleniti. Dignissimos, veniam qui assumenda nulla, nobis beatae laudantium impedit fugit dolores quaerat doloribus illo rerum omnis voluptates aperiam. Porro, cupiditate sed vitae impedit et, vel vero at itaque commodi exercitationem necessitatibus. Voluptate, fuga harum! Aperiam voluptatem doloremque nulla vero quod, error dolores.</Typography>
      </Box>
    </Container>

    </>
  )
}

export default Perfil