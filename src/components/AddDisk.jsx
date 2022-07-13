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
        >Disk Provider:</Form.Label>
        <Form.Control required type="text" placeholder="Enter Server name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Disk Model:</Form.Label>
        <Form.Control required type="text" minlength="7" maxlength="15" size="15" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" placeholder="Enter Server IP " />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Disk Type:</Form.Label>
        <Form.Select required>
          <option>HDD</option>
          <option>SSD</option>
          <option>M.2</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>


      

     

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Disk Total size:</Form.Label>
        <Form.Control type="number"  placeholder="Enter Disk total size " />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
    
<div class="d-flex justify-content-center" style={{margin:"10px"}}>
<UploadDragDrop/>

</div>
      
      <div class="row justify-content-center">
      <button type="button" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark" style={{margin:"10px"}}>Create Disk</button>
</div>
      
    </Form>
    </MDBContainer>




    </div>
    </div>

        

        );
    }
}
 
export default AddServer;