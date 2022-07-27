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
  state = { modalShow:false,Servers:[[]],isLoading: true,OSs:[],countries:[],ServiceProviders:[],SOS:[],Provider_ID:"",OperatingSystem_ID:"",Server_Country:""} 
    constructor()
    {
      super()
      this.inputref=createRef();
    }
    onChangeHandler = (e) => {
      const index = e.target.selectedIndex;   
        const el = e.target.childNodes[index]     
        const option =  el.getAttribute('id');
        this.state.OperatingSystem_ID=option;  
       
    }
    onChangeHandler2 = (e) => {
      const index = e.target.selectedIndex;   
        const el = e.target.childNodes[index]     
        const option =  el.getAttribute('id');
        this.state.Provider_ID=option;  
     
    }
    handleflagchange=(e)=>
    {
      
      const index = e.target.selectedIndex;   
        const el = e.target.childNodes[index]     
        const option =  el.getAttribute('id');
        
        this.state.Server_Country=option;
        this.forceUpdate(); 
    }


    handlesubmit=(props)=>
  {
    props.preventDefault();
    let PropsString=""
    let i=0
    let url="http://127.0.0.1:8000/api/EditServer"
    for(i=0;i<17;i++)
    {
     if(i==0)
     {
       PropsString='?'+props.target[i].name+'='+props.target[i].value
     }
     else
     {
      if(props.target[i].name=="Server_OperatingSystem_ID")
      {
        
        PropsString=PropsString+"&"+props.target[i].name+"="+this.state.OperatingSystem_ID
        
      }
      else if(props.target[i].name=="Service_Provider_ID")
      {
        
        PropsString=PropsString+"&"+props.target[i].name+"="+this.state.Provider_ID
      }
      else
      {
        PropsString=PropsString+"&"+props.target[i].name+"="+props.target[i].value
      }
       
     }
     
    }
 
    this.SERVERAPICALL(url+PropsString)


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
    
    this.setState({countries:Countries_List})
    
    }
    );


  let Json= this.SERVERAPICALL(url) 
  Json.then(
    (result)=>{
     let Server_List=[]
   
      let TempRes=[]
      TempRes.push(result)
      this.setState({OperatingSystem_ID:result[0].OperatingSystem_ID})
      this.setState({Provider_ID:result[0].Service_Provider_ID})
      this.setState({Server_Country:result[0].Server_Country})
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
          this.state.Servers[0].map((server)=>{   
            const queryParams = new URLSearchParams(window.location.search);
            let srvid = queryParams.get('ServerID');
            return(
                      
                      
<div class="container mt-10" >
             <div className=" d-flex align-items-center justify-content-center">                          
                         <div class="col-md-8 col-sm-6" id="ProductsContainerID">
                         <Form onSubmit={this.handlesubmit}>   
                           <div class="card m-2 shadow"><a class="card-img-tiles" href="#" data-abc="true">
                           
                               <div class="inner">
                                 <div class="main-img">
                                 
          <Container>
            
            <Row>
              <Col> 
              
              <TextField id="standard-basic" label="Nom du serveur" name="Server_Name" variant="standard" size="small" contentEditable="true" defaultValue={server.Server_Name}/></Col>
              <Col> 
              <TextField id="standard-basic" label="Emplacement du serveur" name="Server_Location" variant="standard" size="small" defaultValue={server.Server_Location}/></Col>
                               
            </Row>
            <Row>
            <Col> 
              <TextField id="standard-basic" label="IP Adress" name="Server_IP_Adress" variant="standard" size="small" defaultValue={server.Server_IP_Adress}/></Col>
              <Col> 
              <TextField id="standard-basic" label="MAC Adress" name="Server_MAC_Adress" variant="standard" size="small" defaultValue={server.Server_MAC_Adress}/></Col>
                  
            </Row>
            <Row>
              <Col>             
              <TextField id="standard-basic" label="BIOS" name="BIOS" variant="standard" size="small" defaultValue={server.BIOS}/>        
                               </Col>
                               <Col> 
              <TextField id="standard-basic" name="Nb_Sockets" label="Nombre des Sockets" variant="standard" size="small" defaultValue={server.Nb_Sockets}/></Col>
                               
            </Row>
            <Row>
            <Col> 
              <TextField id="standard-basic" name="Nb_Cores" label="Nombre des cores" variant="standard" size="small" defaultValue={server.Nb_Cores}/></Col>
              <Col> 
              <TextField id="standard-basic" name="RAM" label="Taille du RAM" variant="standard" size="small" defaultValue={server.RAM}/></Col>
                               
            </Row>
            
            <Row>
              
              
              <Form.Group className="" controlId="formBasicEmail" style={{marginTop:"10px"}}>
              
              <Form.Select required
        name="Server_Country"  defaultValue={server.Server_Country} onChange={this.handleflagchange}
        >
        {
        this.state.countries.map((Country)=>{
          
          return(
            <option id={Country.name.common}>{Country.name.common } </option>
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
            
        name="Server_OperatingSystem_ID"  onChange={this.onChangeHandler} defaultValue={server.OperatingSystem_Company_Name +" "+server.OperatingSystem_Name}  >          
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
             
              <Form.Group className="C" controlId="formBasicEmail" style={{marginTop:"10px"}} >
              
              <Form.Select required name="Server_Type" defaultValue={server.Server_Type}> 

                <option >Virtual Machine</option>
                <option >Real Machine</option>
                
              </Form.Select>
             
              <Form.Text className="text-muted">
                
              </Form.Text>
            </Form.Group>                              
            </Row>
            <Row>
            <Form.Group className="" controlId="formBasicEmail" style={{marginTop:"10px"}}>       
              <Form.Select required name="Backup" defaultValue={server.Backup}>
                <option>Enabled</option>
                <option>Disabled</option>
                
              </Form.Select>
             
              <Form.Text className="text-muted">
                
              </Form.Text>
            </Form.Group>
            </Row>
            <Row>
            <a class="btn btn-outline-primary btn-sm" href={"ManagePartitionDisks?ServerID="+srvid} data-abc="true"  style={{marginRight:"10px",marginTop:"10px",color:"Black",backgroundColor:"white", borderColor:"#CFD3D6"}}>
Gérer les disques du serveur</a>
            </Row>        
          </Container>               
                                 </div>
                                
                                 <div class="thumblist">
                                 <Image  src={require('./images/Server_Logo.gif')} class="img-fluid" alt="Responsive image"/>
                                 <Image src={'https://countryflagsapi.com/png/'+this.state.Server_Country} class="img-fluid" alt="Responsive image"/>
                                  
                                  
                                  </div>
                               </div></a>
                             <div class="card-body text-center">
                              <Container>
                              <Row>
            
                               <Col><nobr>
          
                               <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Label
                  style={{color: 'black'}}
                  >Description </Form.Label>
                  <Form.Control type="text" name="Description" defaultValue={server.Description} />
                  <Form.Text className="text-muted">
                    
                  </Form.Text>
                </Form.Group>
                                </nobr></Col>


                                 <Col><nobr>
          
                               <Form.Group className="mb-1" controlId="formBasicEmail">
                 
                  <Form.Control type="text" hidden name="Server_ID" defaultValue={srvid} />
                  <Form.Text className="text-muted">
                    
                  </Form.Text>
                </Form.Group>
                                </nobr></Col>
              <Col><nobr>
                
              <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label
                  style={{color: 'black'}}
                  >Prochaine date de Facturation</Form.Label>
                  <Form.Control type="date" name="NextFacturationDate" defaultValue={server.NextFacturationDate} />
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
                  >Type de paiement </Form.Label>
              <Form.Select required name="PaymentType" defaultValue={server.PaymentType}>
                <option>Per Month</option>
                <option>Per Year</option>
                
              </Form.Select>
             
              <Form.Text className="text-muted">
                
              </Form.Text>
            </Form.Group>
              </Col>
                               
              <Col>
                
              <Form.Group className="mb-1" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black',marginTop:"10px"}}
        >
        Fournisseur de services</Form.Label>


        <Form.Select required
        
        name="Service_Provider_ID" onChange={this.onChangeHandler2} defaultValue={server.service_Provider_Company_Name}>
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
                </Col>                            
            </Row>
            <Row>           
            </Row>
            
                              </Container>
                              <Button  type="submit" variant="btn btn-outline-primary  m-4" size="lg">
                    
Enregistrer les informations du serveur
                  </Button>
                
                             </div>
                             
                           </div>
                           </Form>
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