import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
class AddVirtualMachine extends Component {
    state = {  } 
    render() { 
        return ( 
          <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <img roundedCircle={true} style={{width: '150px',height:'150px'}} src={require('./images/ServiceProvider_Logo.png')} alt="Category"/>
                </div>
                </div>



                <MDBContainer style={{marginTop:"30px"}}>

<Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Service Provider Company name:</Form.Label>
        <Form.Control type="text" placeholder="Provider Company name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Service Provider Email:</Form.Label>
        <Form.Control type="email" placeholder="xx@gmail.com" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Service Provider Phone Number</Form.Label>
        <Form.Control type="number" placeholder="Phone Number here" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
    

      


      <div class="row justify-content-center">
      <button type="button" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">Add Service Provider</button>
</div>
      
    </Form>
    </MDBContainer>




    </div>

        

        );
    }
}
 
export default AddVirtualMachine;