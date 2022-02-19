import React, { useContext } from 'react'
import { 
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import firebaseApp from '../Credenciales';
import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import { UserContext } from '../context/UserProvider';

const firestore = getFirestore(firebaseApp);


const ListarTareas = ({ arrayTareas, setArrayTareas }) => {

    const { user } = useContext(UserContext);

    async function eliminarTarea(idTareaAEliminar) {
        //crear nuevo array de tareas
        const nvoArrayTareas = arrayTareas.filter(
            (objetoTarea) => objetoTarea.id !== idTareaAEliminar
        );
        //Actualizar la base de datos
        const docuRef = doc(firestore, `usuarios/${user.email}`);
        updateDoc(docuRef, { tareas: [...nvoArrayTareas] });
        //actualizar state
        setArrayTareas(nvoArrayTareas);        
    }


  return (
    <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 750, mx: 'auto'  }} aria-label="simple tabla">
            <TableHead>
                <TableRow>                    
                    <TableCell>Tarea</TableCell>
                    <TableCell align="right">Eliminar</TableCell>
                </TableRow>
            </TableHead>
             <TableBody>
                {arrayTareas.map((doc) => (
                    <TableRow key={doc.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >                
                <TableCell>{doc.descripcion}</TableCell>
                <TableCell align="right"><IconButton onClick={() => eliminarTarea(doc.id)} ><DeleteIcon /></IconButton></TableCell>
            </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default ListarTareas