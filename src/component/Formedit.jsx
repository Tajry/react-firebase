import * as React  from 'react';
import  {useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import { Grid, TextField , Avatar, Alert} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import { addDoc, collection, doc, setDoc,getDoc } from 'firebase/firestore/lite';
import { db } from '../database';
import { Link, useParams } from 'react-router-dom';

export default function Formedit(props) {
    const { eid } = useParams()
    const [datac ,setDatac] = useState(false)
    const [count , setCount] = useState(0)
    const [data , setData] = useState([])
    const [alert  , setAlert] = useState(false)

    const handlesubmit = (event)=>{ 
        event.preventDefault();
        const form = new FormData(event.currentTarget)
        // let id = Math.floor(Math.random() * 100000) + form.get("fname")
        const data = {
            eid:eid,  
            fname:form.get('fname'),
            lname:form.get('lname'),
            gender:form.get('gender'),
            address:form.get('address'),
            tel:form.get('tel'),
            age:form.get('age'),
            date:new Date(),
        }
       
        try{
            const save = setDoc(doc(db ,"employee" , eid),data)
            if (save) {

                setCount(count => count + 1)
                props.passtoparent(count)
                setAlert(true)
                setTimeout(() => {
                    window.location = '/em'
                }, 3000);
            }
        }catch(e){
            console.log("error " , e)
        }

    }


    const list = [
        { label: 'male', value: "male" },
        { label: 'female', value: "female" },
    ]

    const getData = async ()=>{
        const dcu = doc(db ,"employee" , eid)
        const res = await getDoc(dcu)
        res.exists()
        setData(res.data())
        setDatac(true)
    }

    
    
    React.useEffect(()=>{

        getData() //getdata form url eid

       

    },[])

    if (!datac) {
        return(<></>)
    }else{
   
    return (
    <>
       
            
        <Box>
            {alert && <Alert mx={2} severity="primary">Update Employee successfully</Alert>}

        </Box>
        <Box mx={2}>
            <Link to='/em'>
                <Button variant='contained' type='submit' color='secondary'>back</Button>
            </Link>
        </Box>
        <Box mt={10} py={5} mx={10}  component="form" onSubmit={handlesubmit} boxShadow={1}>
            <Typography variant="h6" mx={2} mb={4} color="success" gutterBottom>
                Edit Employee
            </Typography>
            <Grid container spacing={1}>
                <Grid item >
                    <Box mx={2}>
            
                        <TextField id="outlined-basic" name='fname' label="first name"  defaultValue={data && data?.fname} variant="outlined" />
                    </Box>
                </Grid>
                <Grid item >
                    <Box mx={2}>
                        <TextField id="outlined-basic" name='lname' label="last name" defaultValue={data?.lname} variant="outlined" />
                    </Box>
                </Grid>
                <Grid item >
                    <Box mx={2}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={list}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} name='gender' defaultValue={data?.gender}  label="gender" />}
                        />
                    </Box>
                </Grid>
                <Grid item >
                    <Box mx={2}>
                        <TextField id="outlined-basic" name='tel' label="tel" defaultValue={data?.tel} variant="outlined" />
                    </Box>
                </Grid>
              
                <Grid item >
                    <Box mx={2}>
                        <TextField id="outlined-basic" name='age' label="age" defaultValue={data?.age} variant="outlined" />
                    </Box>
                </Grid>
                <Grid item >
                    <Box mx={2}>
                        <TextField id="outlined-basic" name='address' label="address"defaultValue={data?.address} variant="outlined" />
                    </Box>
                </Grid>

            </Grid>
            <Grid container spacing={1} mt={5}>
                <Grid item xs={1}>
                    <Box mx={2}>
                        <Button variant='contained' type='submit' color='primary'>save</Button>
                    </Box>
                </Grid>
            </Grid>
    
            
        </Box>
        
    </>
  );
    }
}