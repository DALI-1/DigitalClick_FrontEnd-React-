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
import Modal from 'react-bootstrap/Modal';
import NavBar from "./Navbar"
class MangeServer extends Component {
  state = { modalShow:false,Servers:[[]],isLoading: true,OSs:[],countries:[],ServiceProviders:[],SOS:[],Provider_ID:"",OperatingSystem_ID:"",Server_Country:"",Status:false,VLS:[],SVLM:[{VL_ID:"-1",VL_Name:'None'}]
,NSLVM:"-1"
} 
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

  onChangeHandler3 = (e) => {
    const index = e.target.selectedIndex;   
      const el = e.target.childNodes[index]     
      const option =  el.getAttribute('id');
      this.state.NSLVM=option;   
      
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
  const queryParams = new URLSearchParams(window.location.search);
  let srvid = queryParams.get('ServerID');
  let pid = queryParams.get('ServerVMPartition_ID');
  this.setState({Status:true})
  let PropsString=""
  let i=0
  let url="http://127.0.0.1:8000/api/EditServerVM"
  for(i=0;i<11;i++)
  {
   if(i==0)
   {
     PropsString='?'+props.target[i].name+'='+props.target[i].value
   }
   else
   {
    if(props.target[i].name=="OperatingSystem_ID")
    {
      PropsString=PropsString+"&"+props.target[i].name+"="+this.state.OperatingSystem_ID
    }
    else
    {
      PropsString=PropsString+"&"+props.target[i].name+"="+props.target[i].value
    }
     
   }
   
  }

  this.SERVERAPICALL(url+PropsString)
if(this.state.NSLVM!=this.state.SVLM[0].VL_ID)
{
  if(this.state.SVLM!="-1")
  {
    let url2="http://127.0.0.1:8000/api/DeAssociateDiskToVL?ServerVMPartition_ID="+pid;
    this.SERVERAPICALL(url2)
  }
 
  if(this.state.NSLVM!="-1")
  {
    let url3="http://127.0.0.1:8000/api/AssociateDiskToVL?VL_ID="+this.state.NSLVM+"&ServerVMPartition_ID="+pid;
    this.SERVERAPICALL(url3)
  }
  
}

  setTimeout(() => {window.location.replace('/ManageServerPartitions?ServerID='+srvid)}, 2000);


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
  let Password_ciphered=cookies.get("Password")
  var bytes = CryptoJS.AES.decrypt(Password_ciphered, 'DigitalClick');
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('ServerID');
  const pid = queryParams.get('ServerVMPartition_ID');
  let url ="http://localhost:8000/api/GetPartitionByID?PartitionID="+pid
  let url1="http://127.0.0.1:8000/api/GetAllOSs"
  let url3="http://127.0.0.1:8000/api/GetAllServiceProviders"
  let url4 ="http://localhost:8000/api/GetServerOSProvider?&ServerID="+id
  let url7 ="http://localhost:8000/api/GetAllVLs?Server_ID="+id
  let url5 ="http://localhost:8000/api/GetPartitionVL?ServerVMPartition_ID="+pid
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


  Res=this.SERVERAPICALL(url5)
  Res.then((result)=>{
  let V=[]
  result.map((server)=>{
  V.push(server) 
  }
  )
  if(V.length!=0)
  {
    this.setState({SVLM:V})
    this.setState({NSLVM:V[0].VL_ID})
  }
  }
  );


  Res=this.SERVERAPICALL(url7)
  Res.then((result)=>{
  let VL=[]
  result.map((server)=>{
  VL.push(server) 
  }
  )
  this.setState({VLS:VL})
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
        <>
        <NavBar/>
        
        <div class="d-flex justify-content-center" style={{margin:"10px"}}>
        <LoadingSpinner id="Spinner"/>         
    </div>
    
          </>
      )
     
    }
    else
    {
      
      return ( 
        this.state.Servers[0].map((server)=>{   
          const queryParams = new URLSearchParams(window.location.search);
          let srvid = queryParams.get('ServerID');
          let pid = queryParams.get('ServerVMPartition_ID');
          console.log(this.state.SVLM);
          return(
                    
            <>
            <NavBar/>
                  
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
            
            <TextField id="standard-basic" label="Nom du VM" name="PartitionName" variant="standard" size="small" contentEditable="true" defaultValue={server.PartitionName}/></Col>
            
                             
          </Row>
          <Row>
          <Col> 
            <TextField id="standard-basic" label="IP Adress" name="SVMP_IP_Adress" variant="standard" size="small" defaultValue={server.SVMP_IP_Adress}/></Col>
            <Col> 
            <TextField id="standard-basic" label="MAC Adress" name="SVMP_MAC_Adress" variant="standard" size="small" defaultValue={server.SVMP_MAC_Adress}/></Col>
                
          </Row>
          <Row>
           
                             
          </Row>
          <Row>
          <Col> 
            <TextField id="standard-basic" name="Nb_Allocated_Cores" label="Nombre des cores" variant="standard" size="small" defaultValue={server.Nb_Allocated_Cores}/></Col>
            <Col> 
            <TextField id="standard-basic" name="Allocated_RAM" label="Taille du RAM" variant="standard" size="small" defaultValue={server.Allocated_RAM}/></Col>
                             
          </Row>
          
          
          <Row>  
              
          <Form.Group className="" controlId="formBasicEmail" style={{marginTop:"10px"}}>  
          <Form.Label
                style={{color: 'black'}}
                >Operating System </Form.Label>    
          <Form.Select required
          
      name="OperatingSystem_ID"  onChange={this.onChangeHandler} defaultValue={server.OperatingSystem_Company_Name +" "+server.OperatingSystem_Name}  >          
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
           
                                         
          </Row>
          <Row>
          <Form.Group className="" controlId="formBasicEmail" style={{marginTop:"10px"}}>  
          <Form.Label
                style={{color: 'black'}}
                >Backup </Form.Label>      
            <Form.Select required name="Backup" defaultValue={server.Backup}>
              <option>Enabled</option>
              <option>Disabled</option>
              
            </Form.Select>
           
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group className="" controlId="formBasicEmail" style={{marginTop:"10px"}}>  
          <Form.Label
                style={{color: 'black'}}
                >Logical Volume </Form.Label>      
            <Form.Select required name="VL" defaultValue={this.state.SVLM[0].VL_Name} onChange={this.onChangeHandler3}>
              
            <option id="-1" >None</option>
              {               
                this.state.VLS.map((VL)=>{
                  return(
                      <option id={VL.VL_ID} key={VL.VL_ID}>{VL.VL_Name}</option>
                  )
                })
              }
              
              
              
            </Form.Select>
           
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>
          </Row>
                
        </Container>               
                               </div>
                              
                               <div class="thumblist">
                               <Image  src={require('./images/Partition_Logo.gif')} class="img-fluid" alt="Responsive image"/>
                               
                                
                                
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
                             
          
                               <Form.Group className="mb-1" controlId="formBasicEmail">
                 
                  <Form.Control type="text" hidden name="Server_ID" defaultValue={srvid} />
                  <Form.Text className="text-muted">
                    
                  </Form.Text>
                </Form.Group> 

                 <Form.Group className="mb-1" controlId="formBasicEmail">
                 
                  <Form.Control type="text" hidden name="ServerVMPartition_ID" defaultValue={pid} />
                  <Form.Text className="text-muted">
                    
                  </Form.Text>
                </Form.Group>     



                            
          </Row>
 </Container>
                            <Button  type="submit" variant="btn btn-outline-primary  m-4" size="lg">
                 
Enregistrer les informations du Partition
                </Button>


                <Modal
        size="lg"
        show={this.state.Status}
        onHide={() => {this.setState({Status:false})}}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
                  Partition Management:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Partition Updated successfully</Modal.Body>
      </Modal>
              
                           </div>
                           
                         </div>
                         </Form>
                       </div>
                       
                       </div>  
                        
                     </div>
               
          </>)
        }
                ))
    } 
  }
}
 
export default MangeServer;