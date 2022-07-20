import React,{Component,useState,useRef} from 'react';
import './ManageServer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import TextField from '@mui/material/TextField';
import Image from 'react-bootstrap/Image'
import LoadingSpinner from './LoadingSpinner';
import { createRef } from 'react';


class MangeServer extends Component {
  state = { modalShow:false,Servers:[],isLoading: true,OSs:[],countries:[],ServiceProviders:[],SOS:[]} 
  
    constructor()
    {
      super()
      
      this.inputref=createRef();
    }

    SERVERAPICALL = async (url) => {
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


  TurnoffLoadingScreen=()=>{
    setTimeout(function () {
     
  }, 2000);

    this.setState({isLoading: false})
  }
  componentDidMount(){
    
    
    this.CheckIdentification(); 
    const cookies = new Cookies();
    var CryptoJS = require("crypto-js");
    let Username=cookies.get("Username")
    let Password_ciphered=cookies.get("Password")
    var bytes = CryptoJS.AES.decrypt(Password_ciphered, 'DigitalClick');
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('ServerID');
      var Password = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    let url ="http://localhost:8000/api/GetServerByID?Username="+Username+"&Password="+Password+"&ServerID="+id
    
    let url1="http://127.0.0.1:8000/api/GetAllOSs"
    let url2="https://restcountries.com/v3.1/all"
    let url3="http://127.0.0.1:8000/api/GetAllServiceProviders"
    let url4 ="http://localhost:8000/api/GetServerOSProvider?&ServerID="+id
    let Res=null
    Res=this.SERVERAPICALL(url1)
    Res.then((result)=>{
    let OSs_List=[]
    result.map((server)=>{
    OSs_List.push(server) 
    }
    )
    
    this.setState({OSs:OSs_List})
    }
    );

    Res=this.SERVERAPICALL(url4)
    Res.then((result)=>{
    let SOS_List=[]
    result.map((server)=>{
    SOS_List.push(server) 
    }
    )
    /*SOS:Server Operating System*/
    this.setState({SOS:SOS_List})
    }
    );
    
    Res=this.SERVERAPICALL(url3)
    Res.then((result)=>{
    let ServiceProviders_List=[]
    result.map((server)=>{
    ServiceProviders_List.push(server) 
    }
    )
    
    this.setState({ServiceProviders:ServiceProviders_List})
    }
    );
    
    Res=this.SERVERAPICALL(url2)
    Res.then((result)=>{
    let Countries_List=[]
    result.map((Country)=>{
    Countries_List.push(Country) 
    }
    )
    
    this.setState({countries:Countries_List}, () => {
    this.TurnoffLoadingScreen();
    })
    
    }
    );
    







  let Json= this.SERVERAPICALL(url) 
  Json.then(
    (result)=>{
     let Server_List=[]
   
      let TempRes=[]
      TempRes.push(result)

      TempRes.map((server)=>{  
      Server_List.push(server) 
      
    }
    )
    
    this.setState({Servers:Server_List}, () => {
      this.TurnoffLoadingScreen();
  })
    
   }
   );
  
}
  
    render() {
      if(this.state.isLoading)
      {
        return (
          <div class="d-flex justify-content-center" style={{margin:"10px"}}>
          <LoadingSpinner id="Spinner"/>         
      </div>
        )
       
      }
      else
      {
        
        return (

       
          this.state.Servers.map((server)=>{
            
            const queryParams = new URLSearchParams(window.location.search);
            let srvid = queryParams.get('ServerID');
            return(
                      
                      
<div class="container mt-10" >
             <div className=" d-flex align-items-center justify-content-center">                    
                         <div class="col-md-4 col-sm-6" id="ProductsContainerID">
                                
                           <div class="card m-2"><a class="card-img-tiles" href="#" data-abc="true">
                               <div class="inner">
                                 <div class="main-img">
                                 
          <Container>
            <Row>
              <Col> 
              <TextField id="standard-basic" label="S.Name" variant="standard" size="small" contentEditable="true" defaultValue={server.Server_Name}/></Col>
              <Col> 
              <TextField id="standard-basic" label="S.Location" variant="standard" size="small" defaultValue={server.Server_Location}/></Col>
                               
            </Row>
            <Row>
            <Col> 
              <TextField id="standard-basic" label="IP Adress" variant="standard" size="small" defaultValue={server.Server_IP_Adress}/></Col>
              <Col> 
              <TextField id="standard-basic" label="MAC Adress" variant="standard" size="small" defaultValue={server.Server_MAC_Adress}/></Col>
                           
            </Row>
            <Row>
              <Col>
                              
              <TextField id="standard-basic" label="BIOS" variant="standard" size="small" defaultValue={server.BIOS}/>        
              
          
          
                               </Col>
                               <Col> 
              <TextField id="standard-basic" label="Nb Sockets" variant="standard" size="small" defaultValue={server.Nb_Sockets}/></Col>
                               
            </Row>
            <Row>
            <Col> 
              <TextField id="standard-basic" label="Nb V-Cores" variant="standard" size="small" defaultValue={server.Nb_Cores}/></Col>
              <Col> 
              <TextField id="standard-basic" label="RAM" variant="standard" size="small" defaultValue={server.RAM}/></Col>
                               
            </Row>
            
            <Row>
              
              
              <Form.Group className="" controlId="formBasicEmail" style={{marginTop:"10px"}}>
              
              <Form.Select required
        name="Server_Country" value={server.Server_Country}
        >
        {
        this.state.countries.map((Country)=>{
          
          return(
            <option>{Country.name.common } </option>
          )
        })
       } 
        </Form.Select>
             
              <Form.Text className="text-muted">
                
              </Form.Text>
            </Form.Group>
          
          
            </Row>
          
          
          
            <Row>
            
            <Form.Group className="" controlId="formBasicEmail" style={{marginTop:"10px"}}>
              
            <Form.Select required
        name="Server_OperatingSystem_ID"  onChange={this.onChangeHandler}  >
          
        {
        this.state.OSs.map((OS)=>{
          
          return(
            <option id={OS.OperatingSystem_ID}>{OS.OperatingSystem_Company_Name +" "+OS.OperatingSystem_Name } </option>
          )
        })
       } 
       
        </Form.Select>
             
              <Form.Text className="text-muted">
                
              </Form.Text>
            </Form.Group>
            
              </Row>
          
          
          <Row>
             
              <Form.Group className="C" controlId="formBasicEmail" style={{marginTop:"10px"}}>
              
              <Form.Select required> 
                <option ref="description">Real Machine</option>
                <option ref="" >Virtual Machine</option>
                
              </Form.Select>
             
              <Form.Text className="text-muted">
                
              </Form.Text>
            </Form.Group>
           
              
              
          
                               
            </Row>
            <Row>
            <Form.Group className="" controlId="formBasicEmail" style={{marginTop:"10px"}}>
            {

            }
              <Form.Select required>
                <option>Backup Enabled</option>
                <option>Backup Disabled</option>
                
              </Form.Select>
             
              <Form.Text className="text-muted">
                
              </Form.Text>
            </Form.Group>
            </Row>
            <Row>
            <a class="btn btn-outline-primary btn-sm" href={"ManagePartitionDisks?ServerID="+srvid} data-abc="true"  style={{marginRight:"10px",marginTop:"10px",color:"Black",backgroundColor:"white", borderColor:"#CFD3D6"}}>Manage Server disks</a>
            </Row>
            
          
          </Container>
                                
                               
                               
                               
                                 </div>
                                
                                 <div class="thumblist">
                                 <Image  src={require('./images/Server_Logo.gif')} class="img-fluid" alt="Responsive image"/>
                                 <Image src={'https://countryflagsapi.com/png/'+server.Server_Country} class="img-fluid" alt="Responsive image"/>
                                  
                                  
                                  </div>
                               </div></a>
                             <div class="card-body text-center">
                              <Container>
                              <Row>
            
                               <Col><nobr>
          
                               <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label
                  style={{color: 'black'}}
                  >Description: </Form.Label>
                  <Form.Control type="text" defaultValue={server.Description} />
                  <Form.Text className="text-muted">
                    
                  </Form.Text>
                </Form.Group>
                                </nobr></Col>
              <Col><nobr>
                
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label
                  style={{color: 'black'}}
                  >Next Facturation Date : </Form.Label>
                  <Form.Control type="date" defaultValue={server.NextFacturationDate} />
                  <Form.Text className="text-muted">
                    
                  </Form.Text>
                </Form.Group>
                </nobr></Col>
                               
            </Row>
            <Row>
              <Col>
              <Form.Group className="" controlId="formBasicEmail" style={{marginTop:"10px"}}>
              <Form.Label
                  style={{color: 'black'}}
                  >Payment Type : </Form.Label>
              <Form.Select required>
                <option>Monthly</option>
                <option>Weekly</option>
                
              </Form.Select>
             
              <Form.Text className="text-muted">
                
              </Form.Text>
            </Form.Group>
              </Col>
                               
              <Col><nobr>
                
              <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Service Provider:</Form.Label>
        <Form.Select required
        name="Service_Provider_ID" onChange={this.onChangeHandler2}>
        {
        this.state.ServiceProviders.map((SV)=>{
          
          return(
            <option id={SV.Service_Provider_ID}>{SV.service_Provider_Company_Name} </option>
          )
        })
       } 
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
                
                </nobr></Col>
                               
            </Row>
            <Row>
              
              
                               
            </Row>
            
                              </Container>
                              
                               
                               
                              <Button variant="primary m-4" size="lg">
                    Save Server Information
                  </Button>
                             </div>
                           </div>
                         </div>
                         </div>
          
                        
                         
                         
                         
                       
                       
                       </div>

            )

          
            
          }
          
          
                  ))
      }
    
    
    }
}
 
export default MangeServer;