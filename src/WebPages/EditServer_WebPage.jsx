import React,{Component} from 'react';
import EditServer from '../components/EditServer';

import NotificationBell from '../components/Notification.jsx';
import AddServer from '../components/AddServer';
import AddVirtualMachine from '../components/AddVirtualMachine';
import AddClient from '../components/AddClient';
import ManageClients from '../components/ManageClients';
import Image from '../components/images/BackgroundImage_Default.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import Footer from '../components/Footer';
class MainPage extends Component {
    state = {  } 
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
          
           
            <div class="shadow-lg p-3 m-3  bg-body rounded"style={{
          backgroundColor:"rgba(237, 238, 240,0.9)",
          /* backgroundImage: `url(${Image})`, */
        
          backgroundImage: `url(${Image})`,
        backgroundRepeat  : 'no-repeat',
        backgroundSize:'Cover',
        borderradius: "20px",
        borderwidth:"20px"
        
      }}>
            {/* <ManageServer/> */}
            
              {/*<AddServer/> */}
               {/*<AddVirtualMachine/> */}
                {/*<AddClient/> */}
               {/*<ManageClients/> */}
              {/*<ManageContract/> */}
              <EditServer/>
              
          </div>
          
        );
    }
}
 
export default MainPage;