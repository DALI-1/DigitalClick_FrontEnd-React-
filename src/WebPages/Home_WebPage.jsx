import React,{Component} from 'react';

import ManageServer from '../components/ManageServer';

import NotificationBell from '../components/Notification.jsx';
import AddServer from '../components/AddServer';
import AddVirtualMachine from '../components/AddVirtualMachine';
import AddClient from '../components/AddClient';
import ManageClients from '../components/ManageClients';
import Imagebck from '../components/images/Landing_Page.jpg'

import Image1 from '../components/images/Router.jpg'
import Image2 from '../components/images/modem.jpg'
import Image3 from '../components/images/Cables.jpg'
import Image4 from '../components/images/hub.png'
import Image5 from '../components/images/HDMI.jpg'
import ImageDigitalClick from '../components/images/DigitalClick.png'
import Image from 'react-bootstrap/Image'
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { slideInLeft,bounceInRight,fadeInUp,zoomIn,bounceInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import "./styles.css"
import DigitalClick from '../assets/img/Dclick.png'
import Pic1 from '../assets/img/Team1.jpg'
import Pic2 from '../assets/img/Team2.jpg'
import Expertise from '../assets/img/Expertise.jpg'
import CarouselFadeExample from "../components/ImageSlider.jsx";
import Footer from '../components/Footer';

class Home extends Component {
    state = {
       responsive : {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      }
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
      const styles = {
        bounce: {
          animation: 'x 1.5s',
          animationName: Radium.keyframes(slideInLeft, 'bounce')
        }
        ,bounceInRight: {
          animation: 'x 1.5s',
          animationName: Radium.keyframes(zoomIn, 'bounceInRight')
        }
        
        ,bounceInUp: {
          animation: 'x 1s',
          animationName: Radium.keyframes(bounceInUp, 'bounceInRight')
        }
      }

    
        return (    
          <>
       
          <StyleRoot>
          <div class="shadow-lg p-3 m-3  bg-body rounded" responsive style={{
        backgroundColor:"rgba(237, 238, 240,0.9)",
        /* backgroundImage: `url(${Image})`, */
      
        //backgroundImage: `url(${Image1})`,
      backgroundRepeat  : 'no-repeat',
      backgroundSize:'Cover',
      borderradius: "20px",
      borderwidth:"20px"
      
    }}>
      
     
</div>
</StyleRoot>


  
       </>
     );
    }
}

export default Home;