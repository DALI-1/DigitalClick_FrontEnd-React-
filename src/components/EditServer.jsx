import React,{Component,useState} from 'react';
import './ManageServer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import AddIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-bootstrap/Modal';

export function Popup() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <IconButton aria-label="delete" size="large" onClick={handleShow}>
  <DeleteIcon fontSize="inherit" />
</IconButton>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No don't delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Yes Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
class MangeServer extends Component {
    state = { modalShow:false } 

    constructor()
    {
      super()
      this.Servers=null;
    }
     CallServerListAPI = async (url) => {
      try {
        const response = await fetch(url);
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
  
    render() {
    /*  this.CheckIdentification(); 
      const cookies = new Cookies();
      var CryptoJS = require("crypto-js");
      let Username=cookies.get("Username")
      let Password_ciphered=cookies.get("Password")
      var bytes = CryptoJS.AES.decrypt(Password_ciphered, 'DigitalClick');
        var Password = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      let url ="http://localhost:8000/api/GetAllServers?Username="+Username+"&Password="+Password
    let Json= this.CallServerListAPI(url) 
    Json.then((result)=>{
      
      for( let key in result)
      {
        this.Servers=result

        

        
        
        
      }
      

     }
     );*/
     

        return (
<div class="container mt-10" >
                                    <div class="row">
               <div class="col-md-4 col-sm-6" id="ProductsContainerID">
                      
                 <div class="card m-30"><a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img">
<Container>
  <Row>
    <Col> <nobr><label style={{fontSize:"10px"}}>Server:</label>
                     <p style={{fontSize:"10px"}}class="text-muted">IBM X3650 </p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Server Location:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Sfax</p></nobr></Col>
                     
  </Row>
  <Row>
  <Col><nobr><label style={{fontSize:"10px"}}>IP-Address:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">192.168.1.2</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>MAC-Address:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">00-10-FA-6E-D6-ED</p></nobr></Col>
                 
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>OS</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Windows 11</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Number of Sockets:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">2</p></nobr></Col>
                     
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Number of V-Cores:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">16</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>RAM</label>
                     <p style={{fontSize:"10px"}} class="text-muted">16gb</p></nobr></Col>
                     
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Number of Disks:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">4</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Server Type:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Real Machine</p></nobr></Col>
                     
  </Row>
  

</Container>
                      
                     
                     
                     
                       </div>
                      
                       <div class="thumblist">
                       <img src={require('./images/Server_Default_icon.png')} class="img-fluid" alt="Responsive image"/>
                       <img src={require('./images/Tunisia_Flag.png')} class="img-fluid" alt="Responsive image"/>
                        
                        <Container>
                        <Row>
     
     
      </Row>
                        <Row>
      <Col>
      <IconButton  href="EditContract" aria-label="delete" size="large">
  <AddIcon fontSize="inherit" />
</IconButton>
      </Col>
      <Col>
      <Popup  show={this.state.modalShow}
        onHide={() => this.state.modalShow=true}/>
      </Col>
     
      </Row>
                        </Container>
                        </div>
                     </div></a>
                   <div class="card-body text-center">
                    <Container>
                    <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Bought Date:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">20/07/2007</p></nobr></Col>
                     <Col><nobr><label style={{fontSize:"10px"}}>Description:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Pour les test</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Next Facturation Date:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">10/09/2022</p></nobr></Col>
                     
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Payment Type:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Monthly</p></nobr></Col>
                     
    <Col><nobr><label style={{fontSize:"10px"}}>Server Provider:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">ONH</p></nobr></Col>
                     
  </Row>
  <Row>
    
    
                     
  </Row>
  
                    </Container>
                    
                     
                     
                     <a class="btn btn-outline-primary btn-sm" href="ManageServerPartitions" data-abc="true" style={{margin:"10px",padding:"10px"}}>View Virtual Machines</a>
                     
                     <a class="btn btn-outline-primary btn-sm" href="ManageServerContracts" data-abc="true" style={{margin:"10px",padding:"10px"}}>View Contracts</a>
                   </div>
                 </div>
               </div>

               <div class="col-md-4 col-sm-6" id="ProductsContainerID">
                      
                 <div class="card m-30"><a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img">
<Container>
  <Row>
    <Col> <nobr><label style={{fontSize:"10px"}}>Server:</label>
                     <p style={{fontSize:"10px"}}class="text-muted">IBM X3650 </p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Server Location:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Sfax</p></nobr></Col>
                     
  </Row>
  <Row>
  <Col><nobr><label style={{fontSize:"10px"}}>IP-Address:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">192.168.1.2</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>MAC-Address:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">00-10-FA-6E-D6-ED</p></nobr></Col>
                 
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>OS</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Windows 11</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Number of Sockets:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">2</p></nobr></Col>
                     
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Number of V-Cores:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">16</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>RAM</label>
                     <p style={{fontSize:"10px"}} class="text-muted">16gb</p></nobr></Col>
                     
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Number of Disks:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">4</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Server Type:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Real Machine</p></nobr></Col>
                     
  </Row>
  

</Container>
                      
                     
                     
                     
                       </div>
                      
                       <div class="thumblist">
                       <img src={require('./images/Server_Default_icon.png')} class="img-fluid" alt="Responsive image"/>
                       <img src={require('./images/Tunisia_Flag.png')} class="img-fluid" alt="Responsive image"/>
                        
                        <Container>
                        <Row>
     
     
      </Row>
                        <Row>
      <Col>
      <IconButton  href="EditContract" aria-label="delete" size="large">
  <AddIcon fontSize="inherit" />
</IconButton>
      </Col>
      <Col>
      <Popup  show={this.state.modalShow}
        onHide={() => this.state.modalShow=true}/>
      </Col>
     
      </Row>
                        </Container>
                        </div>
                     </div></a>
                   <div class="card-body text-center">
                    <Container>
                    <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Bought Date:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">20/07/2007</p></nobr></Col>
                     <Col><nobr><label style={{fontSize:"10px"}}>Description:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Pour les test</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Next Facturation Date:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">10/09/2022</p></nobr></Col>
                     
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Payment Type:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Monthly</p></nobr></Col>
                     
    <Col><nobr><label style={{fontSize:"10px"}}>Server Provider:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">ONH</p></nobr></Col>
                     
  </Row>
  <Row>
    
    
                     
  </Row>
  
                    </Container>
                    
                     
                     
                     <a class="btn btn-outline-primary btn-sm" href="ManageServerPartitions" data-abc="true" style={{margin:"10px",padding:"10px"}}>View Virtual Machines</a>
                     
                     <a class="btn btn-outline-primary btn-sm" href="ManageServerContracts" data-abc="true" style={{margin:"10px",padding:"10px"}}>View Contracts</a>
                   </div>
                 </div>
               </div>
               <div class="col-md-4 col-sm-6" id="ProductsContainerID">
                      
                 <div class="card m-30"><a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img">
<Container>
  <Row>
    <Col> <nobr><label style={{fontSize:"10px"}}>Server:</label>
                     <p style={{fontSize:"10px"}}class="text-muted">IBM X3650 </p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Server Location:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Sfax</p></nobr></Col>
                     
  </Row>
  <Row>
  <Col><nobr><label style={{fontSize:"10px"}}>IP-Address:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">192.168.1.2</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>MAC-Address:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">00-10-FA-6E-D6-ED</p></nobr></Col>
                 
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>OS</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Windows 11</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Number of Sockets:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">2</p></nobr></Col>
                     
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Number of V-Cores:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">16</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>RAM</label>
                     <p style={{fontSize:"10px"}} class="text-muted">16gb</p></nobr></Col>
                     
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Number of Disks:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">4</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Server Type:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Real Machine</p></nobr></Col>
                     
  </Row>
  

</Container>
                      
                     
                     
                     
                       </div>
                      
                       <div class="thumblist">
                       <img src={require('./images/Server_Default_icon.png')} class="img-fluid" alt="Responsive image"/>
                       <img src={require('./images/Tunisia_Flag.png')} class="img-fluid" alt="Responsive image"/>
                        
                        <Container>
                        <Row>
     
     
      </Row>
                        <Row>
      <Col>
      <IconButton  href="EditContract" aria-label="delete" size="large">
  <AddIcon fontSize="inherit" />
</IconButton>
      </Col>
      <Col>
      <Popup  show={this.state.modalShow}
        onHide={() => this.state.modalShow=true}/>
      </Col>
     
      </Row>
                        </Container>
                        </div>
                     </div></a>
                   <div class="card-body text-center">
                    <Container>
                    <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Bought Date:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">20/07/2007</p></nobr></Col>
                     <Col><nobr><label style={{fontSize:"10px"}}>Description:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Pour les test</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Next Facturation Date:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">10/09/2022</p></nobr></Col>
                     
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Payment Type:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Monthly</p></nobr></Col>
                     
    <Col><nobr><label style={{fontSize:"10px"}}>Server Provider:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">ONH</p></nobr></Col>
                     
  </Row>
  <Row>
    
    
                     
  </Row>
  
                    </Container>
                    
                     
                     
                     <a class="btn btn-outline-primary btn-sm" href="ManageServerPartitions" data-abc="true" style={{margin:"10px",padding:"10px"}}>View Virtual Machines</a>
                     
                     <a class="btn btn-outline-primary btn-sm" href="ManageServerContracts" data-abc="true" style={{margin:"10px",padding:"10px"}}>View Contracts</a>
                   </div>
                 </div>
               </div>
               
               
               
             </div>
             
             </div>

        );
    }
}
 
export default MangeServer;