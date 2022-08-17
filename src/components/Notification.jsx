import React,{Component} from 'react';


import Notifications from "react-notifications-menu";
import Image1 from '../components/images/PaymentIcon.jpg'
import Image2 from '../components/images/MakeMoneyIcon.png'
import { Cookies } from 'react-cookie';

class Notification extends Component {
    state = { ServerNotification:[],ServerContractNotification:[],VMContractNotification:[],Data:[]} 


     
    CallServerListAPI = async (url) => {
      try {
        const response = await fetch(url,{
          method: "GET",
          headers: {
            "access-control-allow-origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
          }});
        const json = await response.json();
        
        return(json)
      } catch (error) {
        console.log("error", error);
        return("Error:Yes");
      }
    };
    TurnoffLoadingScreen=()=>{
      setTimeout(function () {
    }, 1000);
  
      this.setState({isLoading: false})
    }
    
    componentDidMount()
    {

      let url ="http://localhost:8000/api/GetServerNotifications"
      let Json= this.CallServerListAPI(url)
       let Tab=[]
      Json.then((result)=>{
         let Server_List=[]
        
        result.map((server)=>{
          Server_List.push(server) 
        }
        )
        this.setState({ServerNotification:Server_List}, () => {
          this.state.ServerNotification.map((Notif)=>{
          Tab.push(
            {
              image:
                Image1,
              message: (
                <div style={{margin:'1px'}}>
                  <div className="displayflex">
                    <div className="username">  </div>
                    <div className="time">Paiement du serveur </div>
                  </div>
                  <div className=" displayflex ">
                    <div className=" displayflex call">
                      <div className=" call__message">
                      {Notif.Notification_Description}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          )
          })
          
      })
        
       }
       );
        url ="http://localhost:8000/api/GetVMContractNotifications"
       Json= this.CallServerListAPI(url)
        
      Json.then((result)=>{
         let Server_List=[]
        
        result.map((server)=>{
          Server_List.push(server) 
        }
        )
        this.setState({VMContractNotification:Server_List}, () => {
          this.state.VMContractNotification.map((Notif)=>{
          Tab.push(
            {
              image:
              Image2,
              message: (
                <div style={{margin:'1px'}}>
                  <div className="displayflex">
                    <div className="username">  </div>
                    <div className="time">Paiement du serveur </div>
                  </div>
                  <div className=" displayflex ">
                    <div className=" displayflex call">
                      <div className=" call__message">
                      {Notif.Notification_Description}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          )
          })
          this.setState({Data:Tab})
          this.TurnoffLoadingScreen();
      })
        
       }
       );

       url ="http://localhost:8000/api/GetServerContractNotifications"
       Json= this.CallServerListAPI(url)
        
      Json.then((result)=>{
         let Server_List=[]
        
        result.map((server)=>{
          Server_List.push(server) 
        }
        )
        this.setState({VMContractNotification:Server_List}, () => {
          this.state.VMContractNotification.map((Notif)=>{
          Tab.push(
            {
              image:
              Image2,
              message: (
                <div style={{margin:'1px'}}>
                  <div className="displayflex">
                    <div className="username">  </div>
                    <div className="time">Paiement du serveur </div>
                  </div>
                  <div className=" displayflex ">
                    <div className=" displayflex call">
                      <div className=" call__message">
                      {Notif.Notification_Description}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          )
          })
          this.setState({Data:Tab})
          this.TurnoffLoadingScreen();
      })
        
       }
       );
    }
    render() { 
      if(this.state.isLoading)
      {
        return (
          <div className="d-flex justify-content-center" style={{margin:"10px"}}>
                  
      </div>
        )
       
      }
      else
      { 
        const cookies = new Cookies();
        let priv=cookies.get("Priv")
        return (

          <Notifications
          key="EEEEEEEEE"
          style={{zIndex:15}}
          data={(priv=="Normal_User")?[]:this.state.Data}
          header={{
            title: <h4 className="notification__heading">Notifications</h4>,
            option: {
              text: <p className="mark__read">Mark all as read</p>,
              onClick: () => {
                      let url="http://localhost:8000/api/ClearNotifications"
                   this.CallServerListAPI(url)
                   this.setState({Data:[]})
              }
            }
          }}
          markAsRead={(data) => {
            console.log(data);
          }}
        />
        );
      }
    }
}
 
export default Notification;