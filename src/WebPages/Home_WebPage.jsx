import React,{Component} from 'react';

import ManageServer from '../components/ManageServer';

import NotificationBell from '../components/Notification.jsx';
import AddServer from '../components/AddServer';
import AddVirtualMachine from '../components/AddVirtualMachine';
import AddClient from '../components/AddClient';
import ManageClients from '../components/ManageClients';
import Image1 from '../components/images/Landing_Page.jpg'
import Image from 'react-bootstrap/Image'
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import SimpleImageSlider from "react-simple-image-slider";
class Home extends Component {
    state = {

      images : [
        { url: "../components/images/Landing_Page.jpg" },
        { url: "../components/images/Landing_Page.png" },
        { url: "../components/images//3.jpg" },
        { url: "images/4.jpg" },
        
      ]
      }
     
  CheckIdentification= ()=>
  {
    var CryptoJS = require("crypto-js");
    const cookies = new Cookies();
    let Username=cookies.get("Username")
      let Password_ciphered=cookies.get("Password")


     

       if(Username || Password)
       {
        var bytes = CryptoJS.AES.decrypt(Password_ciphered, 'DigitalClick');
        var Password = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        const url = "http://localhost:8000/api/SignIn?Username="+Username+"&Password="+Password
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
      let Json=CallSignInAPI(url)
      let LoggedIn=0
      Json.then((result)=>{
        for( var property in result)
        {
          if(property==="UserValidated" && result[property]==="Yes")
          {
  
                      LoggedIn=1;  
          }
        }
        if(LoggedIn===0)
        {
          window.location.replace('/SignIn')
         
        }
        
  
       }
       );
     
       }
       else
       {
        window.location.replace('/SignIn')
        
       } 

  }



  

    render() { 
      this.CheckIdentification();

     
        return (
            
            
          <div class="shadow-lg p-3 m-3  bg-body rounded" responsive style={{
        backgroundColor:"rgba(237, 238, 240,0.9)",
        /* backgroundImage: `url(${Image})`, */
      
        backgroundImage: `url(${Image1})`,
      backgroundRepeat  : 'no-repeat',
      backgroundSize:'Cover',
      borderradius: "20px",
      borderwidth:"20px"
      ,height:"560px"
      
    }}>
     
      <div class="d-flex justify-content-center">
         <Image   src={require('../components/images/Digital_Click.gif')} style={{
                marginTop:"10px",
                Height:"200px",
                width:"500px",
                
                
            }} alt="Digital Click"/>
            
          
            </div>
      
            

          
            
        </div>
       
        );
    }
}
 
export default Home;