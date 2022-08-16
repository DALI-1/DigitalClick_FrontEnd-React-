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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'universal-cookie';
import {useEffect} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import NavBar from "./Navbar"
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        DigitalClick
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();




export function BorderExample(props) {

  if(props==true)
  return <Spinner variant="primary" animation="border" />;
}
export default function SignIn() {
  let [SignInMessage, setSignInMessage] = React.useState("");
  let [FailLoad, setFailLoad] = React.useState(false);
  let [Token, setToken] = React.useState("");
  var CryptoJS = require("crypto-js");
  const cookies = new Cookies();
  useEffect(() => {
   
    let Username_Check=cookies.get("Username")
    let Password_Check=cookies.get("Password")
    if(Username_Check || Password_Check)
  {
    handleCookie()  
  }
  else
  {   
  }  
  }, []); 
  const CallSignInAPI = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      
      return(json)
    } catch (error) {
      console.log("error", error);
      return("Error:Yes");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setSignInMessage(true)
    const data = new FormData(event.currentTarget);
      let Username=data.get('Username')
      let Password=data.get('Password')
      const url = "http://localhost:8000/api/SignIn?Username="+Username+"&Password="+Password
    let Json=CallSignInAPI(url)
    let LoggedIn=0
    Json.then((result)=>{
      for( var property in result)
      {
        if(property==="UserValidated" && result[property]==="Yes")
        {
               
                    LoggedIn=1;

                    
 
                     
                    setToken(result['Token'])

                    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(Password), 'DigitalClick').toString();
                  // var bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
                  // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                  //To Decrypte use this!
                    
                    cookies.set('Username', Username);
                cookies.set('AccessToken',result['Token']);
                cookies.set('Password', ciphertext);
                setFailLoad(true)
                setSignInMessage("You have been logged in Successfully!")
                setTimeout(() => {window.location.replace('/')   }, 2000);
                

                  //  console.Log(result['Token']);
              // console.Log("Logged in!");
               
        }
      }
      if(LoggedIn===0)
      {
        setSignInMessage("Error! Wrong password or Username")
        setFailLoad(true)


         
        //console.Log("Wrong password or Username!");
      }
      

     }
     );


  
  };




  const handleCookie = () => {
   
      let Username=cookies.get("Username")
      let Password_ciphered=cookies.get("Password")
      var bytes = CryptoJS.AES.decrypt(Password_ciphered, 'DigitalClick');
       var Password = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));



      const url = "http://localhost:8000/api/SignIn?Username="+Username+"&Password="+Password
    let Json=CallSignInAPI(url)
    let LoggedIn=0
    Json.then((result)=>{
      for( var property in result)
      {
        if(property==="UserValidated" && result[property]==="Yes")
        {
               
                    LoggedIn=1;

                    setToken(result['Token'])

                    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(Password), 'DigitalClick').toString();
                  // var bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
                  // var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                  //To Decrypte use this!
                    
                    cookies.set('Username', Username);
                cookies.set('AccessToken',result['Token']);
                cookies.set('Password', ciphertext);
                setSignInMessage("You have been logged in Successfully!")
                setTimeout(() => {
                  window.location.replace('/')
                }, 5000);
               
                  //  console.Log(result['Token']);
              // console.Log("Logged in!");
               
        }
      }
      if(LoggedIn===0)
      {
        setSignInMessage("Error! Wrong password or Username")
       
        //console.Log("Wrong password or Username!");
      }
      

     }
     );


  
  };

  return (
    <>
    <NavBar/>
    
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
            Sign in
          </Typography>

          <div>

          <Modal
        size="lg"
        show={FailLoad}
        onHide={() => {setFailLoad(false)}}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Sign in
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{SignInMessage}</Modal.Body>
      </Modal>
          </div>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="Username"
              autoComplete="Username"      
              autoFocus
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type="password"
              
              id="Password"
              autoComplete="current-password"
            />
           
           

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <div className="d-flex justify-content-center" style={{margin:"10px"}}>
            {BorderExample(SignInMessage)}     
            </div>
            <Grid container justifyContent="center">
              <Grid item>                       
                
              </Grid>
            </Grid>
            <Grid container>
              
              <Grid item>
                <Link href="SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
   
          </>



  );
}