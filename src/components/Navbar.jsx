

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
import {Popup} from './Popup2.jsx'
class NavBar extends Component {
    state = { Show:false } 

    constructor()
    {

super();
    }
    handlesearch=(props)=>
    {
      props.preventDefault();
     let Res=window.find(props.target[0].value)
    
     if(Res==false)
     {
      
      this.setState({Show:true},()=>{
        this.forceUpdate()
      })

   
     }

      
    }

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
        <Nav.Link href="/">Accueil</Nav.Link>
       
        <NavDropdown title="Gérer les serveurs" id="navbarScrollingDropdown">
          <NavDropdown.Item href="ManageServers">Consulter les serveurs</NavDropdown.Item>
          <NavDropdown.Item href="AddServer">Ajouter un nouveau serveur</NavDropdown.Item>
          <NavDropdown.Item href="AddServiceProvider">Ajouter un fournisseur de services</NavDropdown.Item>
          {/*<NavDropdown.Item href="AddVirtualMachine">Ajouter une nouvelle machine virtuelle</NavDropdown.Item>
          <NavDropdown.Item href="AddVMCompany">Ajouter une société de machine virtuelle</NavDropdown.Item>*/}

          <NavDropdown.Item href="AddOS">Ajouter un nouveau système d'exploitation</NavDropdown.Item>
          
          <NavDropdown.Item href="AddOSCompany">Ajouter une société de système d'exploitation</NavDropdown.Item>
          
          <NavDropdown.Divider />          
        </NavDropdown>
        <NavDropdown title="Gérer le client" id="navbarScrollingDropdown">
          <NavDropdown.Item href="ManageClients">Consulter les clients</NavDropdown.Item>
          <NavDropdown.Item href="AddClient">Ajouter un nouveau client</NavDropdown.Item>
          <NavDropdown.Divider />         
        </NavDropdown>
        <NavDropdown title="Gérer les contrats" id="navbarScrollingDropdown">
          <NavDropdown.Item href="ManagePartitionContracts">Consulter les contrats de VM serveur</NavDropdown.Item>
          <NavDropdown.Item href="ManageServersContracts">Consulter les contrats de serveur</NavDropdown.Item>
          <NavDropdown.Item href="AddPartitionContract">Ajouter un nouveau contrat de VM de serveur</NavDropdown.Item>
          <NavDropdown.Item href="AddServerContract">Ajouter un nouveau contrat de serveur</NavDropdown.Item>
          <NavDropdown.Divider />        
        </NavDropdown>     
        <NavDropdown title="Profil" id="navbarScrollingDropdown">
          <NavDropdown.Item href="ManageProfile">Gérer le profil</NavDropdown.Item>         
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={this.HandleLogout}>
            Se déconnecter
          </NavDropdown.Item>
        </NavDropdown>
        <Notification/>
        <Image roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/Default_Avatar_Male.png')}/>
        
      </Nav>
      <Form className="d-flex" onSubmit={this.handlesearch}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          name="SearchInput"
        />
        <Button variant="outline-success" type='submit'>Search</Button>
        <Popup status={this.state.Show}/>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>


            </reactElement>

        );
    }
}
 
export default NavBar;