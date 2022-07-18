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
  state = { modalShow:false,Servers:[],isLoading: true} 
  
    constructor()
    {
      super()
      
      this.inputref=createRef();
    }

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

    this.setState({isLoading: false})
  }
  componentDidMount(){
    setTimeout(function() {
   
    }, 1000);
    
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
   
  let Json= this.CallServerListAPI(url) 
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
              
              <Form.Select required>
                <option>Tunisia</option>
                <option>USA</option>
                <option>Libya</option>
              </Form.Select>
             
              <Form.Text className="text-muted">
                
              </Form.Text>
            </Form.Group>
          
          
            </Row>
          
          
          
            <Row>
            
            <Form.Group className="" controlId="formBasicEmail" style={{marginTop:"10px"}}>
              
              <Form.Select required>
                <option selected>Windows 11</option>
                <option >Windows 7</option>
                <option >Ubunto</option>
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
            
              <Form.Select required>
                <option>Backup Enabled</option>
                <option>Backup Disabled</option>
                
              </Form.Select>
             
              <Form.Text className="text-muted">
                
              </Form.Text>
            </Form.Group>
            </Row>
            <Row>
            <a class="btn btn-outline-primary btn-sm" href="ManagePartitionDisks" data-abc="true"  style={{marginRight:"10px",marginTop:"10px",color:"Black",backgroundColor:"white", borderColor:"#CFD3D6"}}>Manage Server disks</a>
            </Row>
            
          
          </Container>
                                
                               
                               
                               
                                 </div>
                                
                                 <div class="thumblist">
                                 <Image  src={require('./images/Server_Logo.gif')} class="img-fluid" alt="Responsive image"/>
                                 <Image src={require('./images/Tunisia_Flag.png')} class="img-fluid" alt="Responsive image"/>
                                  
                                  
                                  </div>
                               </div></a>
                             <div class="card-body text-center">
                              <Container>
                              <Row>
              <Col><nobr>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label
                  style={{color: 'black'}}
                  >Bought Date: </Form.Label>
                  <Form.Control type="date"  />
                  <Form.Text className="text-muted">
                    
                  </Form.Text>
                </Form.Group>
                               </nobr></Col>
                               <Col><nobr>
          
                               <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label
                  style={{color: 'black'}}
                  >Description: </Form.Label>
                  <Form.Control type="text"  />
                  <Form.Text className="text-muted">
                    
                  </Form.Text>
                </Form.Group>
                                </nobr></Col>
              <Col><nobr>
                
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label
                  style={{color: 'black'}}
                  >Next Facturation Date : </Form.Label>
                  <Form.Control type="date"  />
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
                
              <Form.Group className="mt-2" controlId="formBasicEmail">
                  <Form.Label
                  style={{color: 'black'}}
                  >Service Provider: </Form.Label>
                  <Form.Control type="text"  />
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