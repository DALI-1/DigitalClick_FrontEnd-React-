
import React,{Component,useState} from 'react';
import './ManageClients.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBDropdownMenu,MDBDropdownItem,MDBDropdownToggle,MDBDropdown } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
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

class ManageClients extends Component {
    state = {  modalShow:false} 
    render() { 
        return (


            <div class="container mt-10"  >
              
                            	
                               
                                    <div class="row">
               <div class="col-md-4 col-sm-6">
                 <div class="card mb-10">
                  <a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img">
                       <img src={require('./images/Delice_Logo.jpg')} alt="Category"/>
                       <Container>
  <Row>
    <Col> <nobr><label style={{fontSize:"10px"}}>First Name :</label>
                     <p style={{fontSize:"10px"}}class="text-muted">Mohamed Ali </p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Last Name:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Gargouri</p></nobr></Col>
                     
  </Row>
  <Row>
  <Col><nobr><label style={{fontSize:"10px"}}>Company Name:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">SOMEF</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Client Nationality:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Tunisia</p></nobr></Col>
                 
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Company City:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Sfax</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Company Adress:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Route Lafrane km 5.5</p></nobr></Col>
                     
  </Row>

  

</Container>



                       </div>
                       <div class="thumblist"><img src={require('./images/Client_Default_Picture.png')} alt="Category"/>
                      
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
                     
                     
                     
                     <div class="container">
  <div class="row">
    <div class="col-md">
    <DropdownButton id="dropdown-basic-button" title="Numbers List"style={{margin:"10px"}} >
    <Dropdown.Item >56705203</Dropdown.Item>
  <Dropdown.Item >200408188</Dropdown.Item>
  <Dropdown.Item >97705230</Dropdown.Item>
</DropdownButton>
      
    </div>
    <div class="col-md">
     
       
<DropdownButton id="dropdown-basic-button" title="E-mails List" style={{margin:"10px"}}>
  <Dropdown.Item >Ahmed@gmail.com</Dropdown.Item>
  <Dropdown.Item >Melek@Yahoo.fr</Dropdown.Item>
  <Dropdown.Item >gb@Outlock.com</Dropdown.Item>
</DropdownButton>
    </div>
    
  </div>
</div>

                     <a class="btn btn-outline-primary btn-sm" href="ManageClientContracts" data-abc="true">View Contracts</a>






                   </div>
                 </div>
               </div>

               <div class="col-md-4 col-sm-6">
                 <div class="card mb-10">
                  <a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img">
                       <img src={require('./images/Delice_Logo.jpg')} alt="Category"/>
                       <Container>
  <Row>
    <Col> <nobr><label style={{fontSize:"10px"}}>First Name :</label>
                     <p style={{fontSize:"10px"}}class="text-muted">Mohamed Ali </p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Last Name:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Gargouri</p></nobr></Col>
                     
  </Row>
  <Row>
  <Col><nobr><label style={{fontSize:"10px"}}>Company Name:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">SOMEF</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Client Nationality:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Tunisia</p></nobr></Col>
                 
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Company City:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Sfax</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Company Adress:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Route Lafrane km 5.5</p></nobr></Col>
                     
  </Row>

  

</Container>



                       </div>
                       <div class="thumblist"><img src={require('./images/Client_Default_Picture.png')} alt="Category"/>
                      
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
                     
                     
                     
                     <div class="container">
  <div class="row">
    <div class="col-md">
    <DropdownButton id="dropdown-basic-button" title="Numbers List"style={{margin:"10px"}} >
    <Dropdown.Item >56705203</Dropdown.Item>
  <Dropdown.Item >200408188</Dropdown.Item>
  <Dropdown.Item >97705230</Dropdown.Item>
</DropdownButton>
      
    </div>
    <div class="col-md">
     
       
<DropdownButton id="dropdown-basic-button" title="E-mails List" style={{margin:"10px"}}>
  <Dropdown.Item >Ahmed@gmail.com</Dropdown.Item>
  <Dropdown.Item >Melek@Yahoo.fr</Dropdown.Item>
  <Dropdown.Item >gb@Outlock.com</Dropdown.Item>
</DropdownButton>
    </div>
    
  </div>
</div>

                     <a class="btn btn-outline-primary btn-sm" href="ManageClientContracts" data-abc="true">View Contracts</a>






                   </div>
                 </div>
               </div>
               <div class="col-md-4 col-sm-6">
                 <div class="card mb-10">
                  <a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img">
                       <img src={require('./images/Delice_Logo.jpg')} alt="Category"/>
                       <Container>
  <Row>
    <Col> <nobr><label style={{fontSize:"10px"}}>First Name :</label>
                     <p style={{fontSize:"10px"}}class="text-muted">Mohamed Ali </p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Last Name:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Gargouri</p></nobr></Col>
                     
  </Row>
  <Row>
  <Col><nobr><label style={{fontSize:"10px"}}>Company Name:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">SOMEF</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Client Nationality:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Tunisia</p></nobr></Col>
                 
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Company City:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Sfax</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Company Adress:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">Route Lafrane km 5.5</p></nobr></Col>
                     
  </Row>

  

</Container>



                       </div>
                       <div class="thumblist"><img src={require('./images/Client_Default_Picture.png')} alt="Category"/>
                      
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
                     
                     
                     
                     <div class="container">
  <div class="row">
    <div class="col-md">
    <DropdownButton id="dropdown-basic-button" title="Numbers List"style={{margin:"10px"}} >
    <Dropdown.Item >56705203</Dropdown.Item>
  <Dropdown.Item >200408188</Dropdown.Item>
  <Dropdown.Item >97705230</Dropdown.Item>
</DropdownButton>
      
    </div>
    <div class="col-md">
     
       
<DropdownButton id="dropdown-basic-button" title="E-mails List" style={{margin:"10px"}}>
  <Dropdown.Item >Ahmed@gmail.com</Dropdown.Item>
  <Dropdown.Item >Melek@Yahoo.fr</Dropdown.Item>
  <Dropdown.Item >gb@Outlock.com</Dropdown.Item>
</DropdownButton>
    </div>
    
  </div>
</div>

                     <a class="btn btn-outline-primary btn-sm" href="ManageClientContracts" data-abc="true">View Contracts</a>






                   </div>
                 </div>
               </div>
               


               
               </div>



               
             </div>





        );
    }
}
 
export default ManageClients;