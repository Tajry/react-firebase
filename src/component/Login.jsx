import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState ,useEffect } from 'react';


import {initializeApp} from 'firebase/app';
import  {getAuth , signInWithEmailAndPassword} from 'firebase/auth';
import { getAlertTitleUtilityClass } from '@mui/material';
const firebaseConfig = {
  apiKey: "AIzaSyB2dAyKYQrWR9r4xkD22hpZ5eq3C0zAQAE",
  authDomain: "em-test-b0cb0.firebaseapp.com",
  projectId: "em-test-b0cb0",
  storageBucket: "em-test-b0cb0.appspot.com",
  messagingSenderId: "537722019494",
  appId: "1:537722019494:web:b0cba9937e4be6ccbf1e67",
  measurementId: "G-RLK8PKFM01"
};

const login = initializeApp(firebaseConfig)
const auth = getAuth(login)
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


export default function SignIn() {
    const [data , setData] = useState();

    const [email ,setUserEmail ] = useState('');
    const [password ,setPassword ] = useState('');


    const handleSubmit = async (event) => {
      event.preventDefault();
      
      try {
        const userCredential = await signInWithEmailAndPassword(auth ,email ,password)
        // Handle successful login
        let token =  userCredential.user.accessToken

         
        localStorage.setItem('token' , token)
        window.location = '/em'
        
      
        


      }catch(error) {
        alert("Email or password wrong!!!")
      }
      
    };


  useEffect(()=>{
    
  },[])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User email"
              name="email"
              type="email"
              
              autoFocus
              onChange={event => setUserEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="text"
              id="password"
              onChange={event => setPassword(event.target.value)}

            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log in
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}