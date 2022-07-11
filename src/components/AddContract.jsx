
import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import UploadDragDrop from './UploadDragDrop';
import Image from 'react-bootstrap/Image'



class addContract extends Component {
    state = {  } 
    render() { 
        return (

            <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <Image roundedCircle={true} style={{width: '150px',height:'150px'}} src={require('./images/Contract_Logo.gif')}/>
                
                </div>
                </div>
                
                <MDBContainer style={{marginTop:"30px"}}>
<Form>


<div class="container">
  <div class="row">
    <div class="col-md">
    <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Rented Server:</Form.Label>
        <Form.Select required>
          <option>Server #1</option>
          <option>Server #2</option>
          <option>Server #3</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
    </div>
    <div class="col-md">
    <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Rented Partition:</Form.Label>
        <Form.Select required>
          <option>None (The whole server)</option>
          <option>Parition 1</option>
          <option>Partition 2</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
    </div>
    <div class="col-md">
    <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Client:</Form.Label>
        <Form.Select required>
          <option>None (Private)</option>
          <option>Client #1</option>
          <option>Client #2</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
    </div>
    <div class="row">
    <div class="col-md">
    <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Payment Type: </Form.Label>
        <Form.Select required>
          <option>Per Month</option>
          <option>Per Year</option>
          <option>Per Semester</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>

</div>
<div class="col-md">
<Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Price</Form.Label>
        <Form.Control required  type="number" min="0.00" max="10000.00" step="0.01" placeholder="Enter the price"   />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

    </div>
    <div class="col-md">
    
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Start Facturation date</Form.Label>
        <Form.Control required   type="date"  style={{
            
        }}  />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

    </div>

    </div>
    <div class="row">
    <div class="col-md">
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Set SSL Ending Date</Form.Label>
        <Form.Control    type="Date"    />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

    </div>
    <div class="col-md">
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Backup Status: </Form.Label>
        <Form.Select required>
          <option>OFF</option>
          <option>ON</option>
         
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
    </div>
    <div class="col-md">
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Access Status Temppass</Form.Label>
        <Form.Control   type="text"  placeholder="Enter Access Status Temppass" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
        </div>  


        <div class="col-md">
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Description</Form.Label>
        <Form.Control   type="text"  placeholder="Enter Description" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
        </div>  
    </div>
    
   




  </div>
</div>
     


<div class="row">
<button type="button" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">Create Contract</button>
      
</div>
      
    </Form>
    </MDBContainer>
    




    </div>




        );
    }
}
 
export default addContract;