import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class AddServer extends Component {
    state = {  } 
    render() { 
        return ( 
          <div class="d-flex justify-content-center" style={{margin:"10px"}}>
          <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <Image  style={{width: '150px',height:'150px'}} src={require('./images/Server_Logo.gif')}/>
                
                </div>
                </div>
                <MDBContainer style={{marginTop:"30px"}}>
                  

<Form>
<Container>
      <Row>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Server name:</Form.Label>
        <Form.Control required type="text" placeholder="Enter Server name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col>  <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Server IP Adress:</Form.Label>
        <Form.Control required type="text" minlength="7" maxlength="15" size="15" pattern="^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$" placeholder="Enter Server IP " />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Server MAC Adress:</Form.Label>
        <Form.Control required type="text"  pattern="^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$" placeholder="Enter Server MAC address " />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Server Country:</Form.Label>
        <Form.Select required>
          <option>Tunisia</option>
          <option>Egypt</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
      </Row>
      <Row>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Server City:</Form.Label>
        <Form.Select required>
          <option>Sfax</option>
          <option>Tunis</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Operating System:</Form.Label>
        <Form.Select required>
          <option>Ubuntu 1.2</option>
          <option>Windows 11</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Number of Sockets:</Form.Label>
        <Form.Control type="number"  placeholder="Enter Number of Sockets " />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Number of Virtual Cores </Form.Label>
        <Form.Control type="number"  placeholder="Enter Number of VCores per CPU " />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
      </Row>

      <Row>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >BIOS : </Form.Label>
        <Form.Control type="text"  placeholder="Enter BIOS  "  />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >RAM:</Form.Label>
        <Form.Control type="number"  placeholder="Enter RAM size" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Server Type:</Form.Label>
        <Form.Select required>
          <option>Real Machine</option>
          <option>Virtual Machine</option>
        </Form.Select>
        
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Service Provider:</Form.Label>
        <Form.Select required>
          <option>Provider 1</option>
          <option>Provider 2</option>
          <option>Provider 3</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
      </Row>
      <Row>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Bought Date: </Form.Label>
        <Form.Control type="date"  />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col><Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Payment Type:</Form.Label>
        <Form.Select required>
          <option>Per Month</option>
          <option>Per Semester</option>
          <option>Per Year</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        <Col> <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Next Facturation Date : </Form.Label>
        <Form.Control type="date"  />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group></Col>
        
      </Row>
      <Row>
       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Description:</Form.Label>
        <Form.Control type="text"  placeholder="Enter Server description " />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </Row>
  
    </Container>
     

      <div class="row justify-content-center">
      <button type="button" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">Add Server</button>
</div>
      
    </Form>
    </MDBContainer>




    </div>

     </div>   

        );
    }
}
 
export default AddServer;