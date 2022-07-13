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
import UploadDragDrop from './UploadDragDrop';
import Image from 'react-bootstrap/Image'



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
    state = { 
      PhoneNumberList: [0],
      EmailList: [0],
      modalShow:false
     } 



     AddNewEmailInput = () => {
      this.setState({EmailList:[...this.state.EmailList,this.state.EmailList[this.state.EmailList.length-1]+1]})
      
 
    };
    RemoveNewEmailInput = () => {
      if(this.state.EmailList.length>1)
      {

      let NewState=this.state.EmailList.slice(0,this.state.EmailList.length-1);
      this.setState({EmailList:[...NewState]})
      
      }
 
    };







    AddNewPhoneInput = () => {
      this.setState({PhoneNumberList:[...this.state.PhoneNumberList,this.state.PhoneNumberList[this.state.PhoneNumberList.length-1]+1]})
      
 
    };

    
    RemoveNewPhoneInput = () => {
      if(this.state.PhoneNumberList.length>1)
      {

      let NewState=this.state.PhoneNumberList.slice(0,this.state.PhoneNumberList.length-1);
      this.setState({PhoneNumberList:[...NewState]})
      
      }
 
    };


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
    <TextField id="standard-basic" label="F.Name" variant="standard" size="small"/></Col>
    <Col> 
    <TextField id="standard-basic" label="L.Name" variant="standard" size="small"/></Col>
                     
  </Row>
  <Row>
  <Col> 
    <TextField id="standard-basic" label="Company Name" variant="standard" size="small"/></Col>
    <Col> 
    <TextField id="standard-basic" label="Company Adress" variant="standard" size="small"/></Col>
                 
  </Row>
  
  
  <Row>
  <Col> 
    <TextField id="standard-basic" label="Company City" variant="standard" size="small"/></Col>
    <Col>
    <Form.Group className="" controlId="formBasicEmail" style={{marginTop:"10px"}}>
    
    <Form.Select required>
      <option>Tunisia</option>
      <option>USA</option>
      <option>Libya</option>
    </Form.Select>
   
    <Form.Text className="text-muted">
      
    </Form.Text>
  </Form.Group>

</Col>
  </Row>



  
  

</Container>
                      
                     
                     
                     
                       </div>
                      
                       <div class="thumblist">
                       <img src={require('./images/Client_Logo.gif')} class="img-fluid" alt="Responsive image"/>
                       
                        </div>
                     </div></a>
                   <div class="card-body text-center">
                    <Container>
                    <Row>
    <Col><nobr>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Company Logo:</Form.Label>
        <UploadDragDrop/>

        
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
                     </nobr></Col>
                        
  </Row>
  <Row>
    
    {this.state.PhoneNumberList.map((Inputlist)=>{ return(
        <MDBCol size="6">
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Phone number {Inputlist}:</Form.Label>
        <Form.Control required type="text" placeholder={'Enter PhoneNumber '+Inputlist}  />
        <Form.Text className="text-muted">
        
          
        </Form.Text>
      </Form.Group>
      </MDBCol>

      )
      })}
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Button variant="outline-primary" onClick={this.AddNewPhoneInput}>Add</Button>{' '}
      <Button variant="outline-primary" onClick={this.RemoveNewPhoneInput}>Remove</Button>{' '}
      </Form.Group>
    
                     
  </Row>
  <Row>
    
  {this.state.EmailList.map((Inputlist)=>{ return(
        <MDBCol size="6">
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Email Adress {Inputlist}:</Form.Label>
        <Form.Control required type="Email" placeholder={'Enter Email Adress '+Inputlist}  />
        <Form.Text className="text-muted">
        
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
      )
      })}
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Button variant="outline-primary" onClick={this.AddNewEmailInput}>Add</Button>{' '}
      <Button variant="outline-primary" onClick={this.RemoveNewEmailInput}>Remove</Button>{' '}
      </Form.Group>
                     
  </Row>
  
                    </Container>
                    <Button variant="primary" size="lg">
          Save Client Information
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