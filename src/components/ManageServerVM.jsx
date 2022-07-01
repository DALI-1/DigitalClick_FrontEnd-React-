import React,{Component,useState} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Edit';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
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




class ManageContract extends Component {
    state = { modalShow:false } 
    
   

    render()
    { 
        return (
            <reactElement>
<Container>
      <Row>
        <Col>
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
        <Form className="d-flex" style={{float:"Right",margin:'1px'}}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
        <p class="text-justify" style={{color:"Black"}}>The Server VM partitions</p>
        <br/>
        <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#  ID</th>
         
          <th>Virtual Machine</th>
          <th>Client</th>
          
          <th>Next Facturation date</th>
          
          <th> Edit</th>
        </tr>
      </thead>








      <tbody>
        <tr>
          <td>1</td>
          
          <td>VMWare V1.5.2.3</td>
          <td><a href="#"><Image  roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/EXIST_Logo.png')}/></a></td>
          
          <td>15/09/2020</td>
          
          <td>

          <Container>
      <Row>
      <Col>
      <IconButton href="EditContract" aria-label="delete" size="large">
  <AddIcon fontSize="inherit" />
</IconButton>
      </Col>
      <Col>
      <Popup  show={this.state.modalShow}
        onHide={() => this.state.modalShow=true}/>
      </Col>
      
      </Row>
      
    </Container>
            
            
            

          </td>
        </tr>
        
        
      </tbody>
    </Table>
    </div>   
    </div>
        </Col>
        
      </Row>
    </Container>
                
             
      
      
    
            </reactElement>
        );
    }
}
 
export default ManageContract;