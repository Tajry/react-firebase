import * as React from 'react';
import { useEffect ,useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { db } from '../database';
import {collection ,deleteDoc,getDocs ,doc} from 'firebase/firestore/lite'
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';



export default  function Tbldata({count}) {
    const [alert  , setAlert] = useState(false)
    
    const [reload , setReload] = useState(0);
    const [data , setData] = useState();

    const handleDelete = async (event)=>{
        let id = event.target.id
        // console.log(id)
        let res = await deleteDoc(doc(db , "employee" ,id))
        setReload(reload => reload + 1)
        setAlert(true)

    }


    const fetchPost = async () => {
       const employee = await collection(db ,'employee')
       const get  = await getDocs(employee)
       const res = get.docs.map(doc =>({id:doc.id,...doc.data()}));
       setData(res)
    }

   useEffect(()=>{
        fetchPost()
        if(alert == true) {
            setTimeout(() => {
                setAlert(false)
            }, 3000);
        }
    },[count ,reload])


    



  return (
    <Box  mx={10} mt={10}>
        <Box>
            {alert && <Alert mx={2} severity="success">Delete Employee successfully</Alert>}

        </Box>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">number</TableCell>
                    <TableCell align="center">first name</TableCell>
                    <TableCell align="center">last name</TableCell>
                    <TableCell align="center">gender</TableCell>
                    <TableCell align="center">address</TableCell>
                    <TableCell align="center">tel</TableCell>
                    <TableCell align="center">age</TableCell>
                    <TableCell align="center">edit</TableCell>
                    <TableCell align="center">del</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                
                    {data?.map((e ,i)=>{
                        <TableCell align="center">1</TableCell>
                            return(
                                <TableRow
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                            
                                    <TableCell align="center">{i +1}</TableCell>
                                    <TableCell align="center">{e.fname}</TableCell>
                                    <TableCell align="center">{e.lname}</TableCell>
                                    <TableCell align="center">{e.gender}</TableCell>
                                    <TableCell align="center">{e.address}</TableCell>
                                    <TableCell align="center">{e.tel}</TableCell>
                                    <TableCell align="center">{e.age}</TableCell>
                                    <TableCell align="center">
                                        <Link to={`/em/edit/${e.id}`}>
                                            <Button variant="contained" >edit</Button>
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained"  id={e.eid} onClick={handleDelete} color="error">del</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                   
                
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  );
}