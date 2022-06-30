import React,{Component} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
class ManageContract extends Component {
    state = {  } 
    render() { 
        return (
            <reactElement>


<Container>
      <Row>
        <Col>
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
        <p class="text-justify" style={{color:"Black"}}>Contracts Management Table</p>
        <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th># Contract ID</th>
          <th>Server Name</th>
          <th>Virtual Machine</th>
          <th>Client</th>
          <th>Payment Type</th>
          <th>Price</th>
          <th>Next Facturation date</th>
          <th>Backup</th>
          <th>SSL Ending date</th>
          <th>Access status tempass</th>
          <th> Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>IBM X1056020</td>
          <td>VMWare V1.5.2.3</td>
          <td><a href="#"><Image  roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/EXIST_Logo.png')}/></a></td>
          <td>Monthly</td>
          <td>50$</td>
          <td>15/09/2020</td>
          <td>Yes</td>
          <td>15/09/2022</td>
          <td>Normal</td>
          <td>

          <Container>
      <Row>
        <Col><a href="#"><Image  roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/Edit_icon.png')}/></a></Col>
        <Col><a href="#"><Image  roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/Delete_Icon.png')}/></a></Col>
      </Row>
      
    </Container>
            
            
            

          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>IBM X1056020</td>
          <td>VMWare V1.5.2.3</td>
          <td><a href="#"><Image  roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/EXIST_Logo.png')}/></a></td>
          <td>Monthly</td>
          <td>50$</td>
          <td>15/09/2020</td>
          <td>Yes</td>
          <td>15/09/2022</td>
          <td>Normal</td>
          <td>

          <Container>
      <Row>
        <Col><a href="#"><Image  roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/Edit_icon.png')}/></a></Col>
        <Col><a href="#"><Image  roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/Delete_Icon.png')}/></a></Col>
      </Row>
      
    </Container>
            
            
            

          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>IBM X1056020</td>
          <td>VMWare V1.5.2.3</td>
          <td><a href="#"><Image  roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/EXIST_Logo.png')}/></a></td>
          <td>Monthly</td>
          <td>50$</td>
          <td>15/09/2020</td>
          <td>Yes</td>
          <td>15/09/2022</td>
          <td>Normal</td>
          <td>

          <Container>
      <Row>
        <Col><a href="#"><Image  roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/Edit_icon.png')}/></a></Col>
        <Col><a href="#"><Image  roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/Delete_Icon.png')}/></a></Col>
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