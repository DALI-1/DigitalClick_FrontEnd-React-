

import React,{Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Notification from './Notification'




import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import Image from 'react-bootstrap/Image'
import Cookies from 'universal-cookie';
class NavBar extends Component {
    state = {  } 



    HandleLogout= ()=>{
       const cookies = new Cookies()
       cookies.remove("Username")
       cookies.remove("Password")
       cookies.remove("AccessToken")
       window.location.replace('/SignIn')
      
    }

    render() { 
        return (
            <reactElement>

<Navbar bg="light" expand="lg">
  <Container fluid>
    <Navbar.Brand href="#">
    <Image src={require('./images/DigitalClickLogo.png')} style={{
                width:200,
                 height:50
              }} alt="Digital Click"/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="/">Home</Nav.Link>
       
        <NavDropdown title="Manage Servers" id="navbarScrollingDropdown">
          <NavDropdown.Item href="ManageServers">Consult Servers</NavDropdown.Item>
          <NavDropdown.Item href="AddServer">Add New Server</NavDropdown.Item>
          <NavDropdown.Item href="AddVirtualMachine">Add New VirtualMachine</NavDropdown.Item>
          <NavDropdown.Divider />
          
        </NavDropdown>
        <NavDropdown title="Manage Client" id="navbarScrollingDropdown">
          <NavDropdown.Item href="ManageClients">Consult Clients</NavDropdown.Item>
          <NavDropdown.Item href="AddClient">Add New Client</NavDropdown.Item>
          <NavDropdown.Divider />
          
        </NavDropdown>
        <NavDropdown title="Manage Contracts" id="navbarScrollingDropdown">
          <NavDropdown.Item href="ManageContracts">Consult Contracts</NavDropdown.Item>
          <NavDropdown.Item href="AddContract">Add New Contract</NavDropdown.Item>
          <NavDropdown.Divider />
          
        </NavDropdown>



        
        
        <NavDropdown title="Profile" id="navbarScrollingDropdown">
          <NavDropdown.Item href="ManageProfile">Manage Profile</NavDropdown.Item>
         
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={this.HandleLogout}>

            Logout
          </NavDropdown.Item>
        </NavDropdown>
        <Notification/>
        <Image roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/Default_Avatar_Male.png')}/>
        
      </Nav>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>


            </reactElement>

        );
    }
}
 
export default NavBar;