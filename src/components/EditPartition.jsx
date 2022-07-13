import React,{Component,useState} from 'react';
import './ManageServer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import AddIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import Image from 'react-bootstrap/Image'
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink } from 'mdb-react-ui-kit';


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
   <div className=" d-flex align-items-center justify-content-center">                    
               <div class="col-md-4 col-sm-6" id="ProductsContainerID">
                      
                 <div class="card m-2"><a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img">
<Container>
  <Row>
    <Col> 
    <TextField id="standard-basic" label="P.Name" variant="standard" size="small"/></Col>
    <Col> 
    <TextField id="standard-basic" label="Virtual Machine" variant="standard" size="small"/></Col>
                     
  </Row>
  <Row>
  <Col> 
    <TextField id="standard-basic" label="IP Adress" variant="standard" size="small"/></Col>
    <Col> 
    <TextField id="standard-basic" label="MAC Adress" variant="standard" size="small"/></Col>
                 
  </Row>
  
  <Row>
  <Col> 
    <TextField id="standard-basic" label="Allocated Cores" variant="standard" size="small"/></Col>
    <Col> 
    <TextField id="standard-basic" label="Allocated RAM" variant="standard" size="small"/></Col>
                     
  </Row>
 
    
  <Row>   
  <Form.Group className="" controlId="formBasicEmail" style={{marginTop:"10px"}}>
  
  <Form.Select required>
    <option>Backup Disabled</option>
    <option>Backup Enabled</option>
    
  </Form.Select>
 
  <Form.Text className="text-muted">
    
  </Form.Text>
</Form.Group>
  </Row>
  <Row>
    
    
    
    <a class="btn btn-outline-primary btn-sm" href="ManageServerDisks" data-abc="true"  style={{marginleft:"50px",marginTop:"10px",padding:"10px",color:"Black",backgroundColor:"white", borderColor:"#CFD3D6"}}>Edit Disks</a>

    
  

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
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Creation Date: </Form.Label>
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
    <Col>
    <Form.Group className="" controlId="formBasicEmail" style={{marginTop:"10px"}}>
    <Form.Label
        style={{color: 'black'}}
        >Client : </Form.Label>
    <Form.Select required>
      <option>Client #1</option>
      <option>Client #2</option>
      
    </Form.Select>
   
    <Form.Text className="text-muted">
      
    </Form.Text>
  </Form.Group>
    </Col>
    
      
      </nobr></Col>
                     
  </Row>
  <Row>
    
    
                     
  </Row>
  
                    </Container>
                    
                     
                     
                    <Button variant="primary m-4" size="lg">
          Save Partition Information
        </Button>
                   </div>
                 </div>
               </div>
               </div>

              
               
               
               
             
             
             </div>

        );
    }
}
 
export default MangeServer;