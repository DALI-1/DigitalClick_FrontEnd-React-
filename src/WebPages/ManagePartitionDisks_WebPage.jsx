import React,{Component} from 'react';
import ManageServer from '../components/ManageServer';
import Image from '../components/images/BackgroundImage_Default.jpg';
import NotificationBell from '../components/Notification.jsx';
import AddServer from '../components/AddServer';
import AddVirtualMachine from '../components/AddVirtualMachine';
import AddClient from '../components/AddClient';
import ManageClients from '../components/ManageClients';
import ManagePartitionDisks from '../components/ManagePartitionDisks';
import 'bootstrap/dist/css/bootstrap.min.css';
class MainPage extends Component {
    state = {  } 
    render() { 
        return (
          <div class="shadow-lg p-3 m-3  bg-body rounded">
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
        <ManagePartitionDisks/>
      
    </div>
    </div>
    
        );
    }
}
 
export default MainPage;