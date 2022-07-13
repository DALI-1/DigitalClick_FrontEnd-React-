import React,{Component,useState} from 'react';
import './ManageServer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import AddIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

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
                      
                 <div class="card m-2"><a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img">
<Container>
  
  <Row>
  <Col><nobr><label style={{fontSize:"10px"}}>IP-Address:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">192.168.1.2</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>MAC-Address:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">00-10-FA-6E-D6-ED</p></nobr></Col>
                 
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>OS</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Windows 11</p></nobr></Col>
                     <Col><nobr><label style={{fontSize:"10px"}}> Virtual Machine:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">VM Ware 1.3</p></nobr></Col>
                     
                     
  </Row>
  <Row>
  <Col><nobr><label style={{fontSize:"10px"}}>Allocated V-Cores:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">2</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}> Allocated RAM:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">1 GB</p></nobr></Col>
                     
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}> Allocated Disks:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">2</p></nobr>
        
                     </Col>
                     <Col><nobr><label style={{fontSize:"10px"}}> Partition Name:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Partition 1</p></nobr></Col>
  
                     
  </Row>
  <Row>
                     <Col><nobr><label style={{fontSize:"10px"}}> Backup</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Disabled</p></nobr></Col>             
  </Row>
  

</Container>
                      
                     
                     
                     
                       </div>
                      
                       <div class="thumblist">
                       <Image roundedCircle={true} src={require('./images/Partition_Logo.gif')} class="img-fluid" alt="Responsive image"/>
                       
                        
                        <Container>
                        <Row>
     
     
      </Row>
                        <Row>
      <Col>
      <IconButton  href="EditPartition" aria-label="delete" size="large">
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
    <Col><nobr><label style={{fontSize:"10px"}}>Creation Date:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">20/07/2007</p></nobr></Col>
                    
    <Col><nobr><label style={{fontSize:"10px"}}>Next Facturation Date:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">10/09/2022</p></nobr></Col>
                     
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Payment Type:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Monthly</p></nobr></Col>
                     <Col><nobr><label style={{fontSize:"10px"}}>Client:</label>
                     <a href=""><p style={{fontSize:"10px"}} class="text-muted">Client #1</p></a></nobr></Col>
                     
    <Col><nobr><label style={{fontSize:"10px"}}>Description:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Info</p></nobr></Col>
                     
  </Row>
  <Row>
    
    
                     
  </Row>
  
                    </Container>
                    
                     
                     
                     <a class="btn btn-outline-primary btn-sm" href="ManagePartitionDisks" data-abc="true" style={{margin:"10px",padding:"10px"}}>View Allocated Disks</a>
                     
                     <a class="btn btn-outline-primary btn-sm" href="ManageServerContracts" data-abc="true" style={{margin:"10px",padding:"10px"}}>View The Contract</a>
                   </div>
                 </div>
               </div>

               
               
             </div>
             
             </div>

        );
    }
}
 
export default MangeServer;