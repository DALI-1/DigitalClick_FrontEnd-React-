
import React, { useState,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'universal-cookie';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Digital Click
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  let [SignInMessage, setSignInMessage] = React.useState("");

  const CallSignUpAPI = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      
      return(json)
    } catch (error) {
      console.log("error", error);
      return("Error:Yes");
    }
  };


  useEffect(() => {
   
}, []);








  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let Username= data.get('Username')
    let First_Name= data.get('First_Name')
    let Last_Name=data.get('Last_Name')
    let Password=data.get('Password')
    let C_Password= data.get('C_Password')
    const url = "http://localhost:8000/api/SignUp?Username="+Username+"&Password="+Password+"&C_Password="+C_Password+"&First_Name="+First_Name+"&Last_Name="+Last_Name;
    let added=0
    let Json=CallSignUpAPI(url)
     Json.then((result)=>{
      for( var property in result)
      {
        if(property==="UserAdded" && result[property]==="Yes")
        {
               
               added=1
               setSignInMessage("User Successfully Added!")
               setTimeout(() => {   }, 2000);
               const cookies = new Cookies();
               cookies.remove("Username");
               cookies.remove("Password");
               cookies.remove("AccessToken");

               
               window.location.replace('/SignIn')
               
        }
      }
      if(added===0)
      {
        
        setSignInMessage("Error Username exist or the Password is wrong!")
      }
      

     }
     );
    
    
  };

  return (
    <ThemeProvider theme={theme}>
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="First_Name"
                  required
                  fullWidth
                  id="First_Name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Last_Name"
                  label="Last Name"
                  name="Last_Name"
                  autoComplete="family-name"
                />
              </Grid>
              
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  name="Username"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="Password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="C_Password"
                  label="ConfirmPassword"
                  type="password"
                  id="C_password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <h4>{SignInMessage}</h4>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}