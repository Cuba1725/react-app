import React from 'react';
import { createContext } from 'react'
import { firebaseApp } from '../Credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
const auth = getAuth(firebaseApp);

export const UserContext = createContext();

const UserProvider = (props) => {

    const [user, setUser] = React.useState(null);    

    onAuthStateChanged(auth, (usuarioFirebase) => {
      if(usuarioFirebase) {
        //en caso de que haya iniciado sesión
        setUser(usuarioFirebase);        
      }else {
        //en caso de que no tenga sesión iniciada
        setUser(null);
      }
    }); 
  
    
  return (    

    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
