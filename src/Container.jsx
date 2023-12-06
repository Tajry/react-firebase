import { useEffect, useState } from 'react'
import Tbldata from './component/Tbldata'
import Formadd from './component/Formadd'
import { Route, Routes } from 'react-router-dom'
import Formedit from './component/Formedit'
import { AppBar, Box, Button, Toolbar, Typography} from '@mui/material'
import { login } from './login'
import { getAuth ,  onAuthStateChanged } from 'firebase/auth'


function Container() {

  const [count , setCount] = useState()

  const handlelogout = ()=>{
    localStorage.removeItem('token')
    window.location = '/'
  }
  
  useEffect(()=>{

    const token = localStorage.getItem('token')
    if (!token) {
      window.location = '/'
    }
    const unsubscribe = getAuth().onAuthStateChanged((loggedInUser) => {
      if (loggedInUser) {
       
      } else {
       
      }
    });

    return ()=> unsubscribe();
  },[])
  
  return (
    <>
    <Box color="primary">
      <AppBar position="relative">
          <Toolbar>
            <Typography variant="h6" marginX={5} color="inherit" noWrap>
              Employee Manage
            </Typography>
              <Button variant="contained" mx={5}  onClick={handlelogout} color="error">logout</Button>

          </Toolbar>
        </AppBar>
    </Box>
    <Routes>
      <Route index element={<Formadd passtoparent={setCount} />} />
      <Route path='/edit/:eid' element={<Formedit passtoparent={setCount} />} />
    </Routes>
      
      <Tbldata  count={count} />
    </>
  )
}

export default Container
