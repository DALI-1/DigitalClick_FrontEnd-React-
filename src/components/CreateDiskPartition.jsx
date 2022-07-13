import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Image from 'react-bootstrap/Image'
import UploadDragDrop from './UploadDragDrop';
class AddServer extends Component {
    state = {  } 
    render() { 
        return ( 
          <div class="d-flex justify-content-center" style={{margin:"10px"}}>
          <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <Image  style={{width: '150px',height:'150px'}} src={require('./images/SSD_Logo.gif')}/>
                
                </div>
                </div>
                <MDBContainer style={{marginTop:"30px"}}>

<Form>
     

     

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Disk ID:</Form.Label>
        <Form.Select required>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Partition Size:</Form.Label>
        <Form.Control type="number"  placeholder="Partition total size " />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Partition Used Size:</Form.Label>
        <Form.Control type="number"  placeholder="Partition Used size " />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
    

      
      <div class="row justify-content-center">
      <button type="button" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark" style={{margin:"10px"}}>Create Partition</button>
</div>
      
    </Form>
    </MDBContainer>




    </div>
    </div>

        

        );
    }
}
 
export default AddServer;