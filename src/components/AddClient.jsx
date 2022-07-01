import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import UploadDragDrop from './UploadDragDrop';
import Image from 'react-bootstrap/Image'
class AddClient extends Component {
    state = { 
      PhoneNumberList: [0],
      EmailList: [0]
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



    render() { 
        return ( 
            <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <Image  roundedCircle={true} style={{width: '200px',height:'200px'}} src={require('./images/Client_Logo.gif')}/>

                </div>
                </div>
                
                <MDBContainer style={{marginTop:"30px"}}>
<Form>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >First name:</Form.Label>
        <Form.Control required type="text" placeholder="Enter Client Name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Last name:</Form.Label>
        <Form.Control required type="text" placeholder="Enter Client last name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <MDBRow>
      <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Nationality:</Form.Label>
        <Form.Select required>
          <option>Tunisia</option>
          <option>Egypt</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
      <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >City:</Form.Label>
        <Form.Select required>
          <option>Sfax</option>
          <option>Sousse</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
      </MDBRow>


      <MDBRow>
      
      <MDBCol size="50">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Company Logo:</Form.Label>
        <UploadDragDrop/>

        
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
        
      </MDBRow>





      <MDBRow>
      <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Company Name:</Form.Label>
        <Form.Control required type="text" placeholder="Enter Company name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
      <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Company Adress:</Form.Label>
        <Form.Control required type="text" placeholder="Enter Company Adress" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
      
      
      </MDBRow>

      

      <MDBRow>
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
      </MDBRow>

      <MDBRow>

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
      </MDBRow>



      


      





      
      
      <div class="row justify-content-center">
      <button type="button" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">Add Client</button>
</div>

      
      

      
    </Form>
    </MDBContainer>
    




    </div>

        

        );
    }
}
 
export default AddClient;