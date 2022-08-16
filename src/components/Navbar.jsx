

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
import { slideInLeft,bounceInRight,fadeInDown,fadeInUp } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
class NavBar extends Component {
    state = { Show:false,Profile:[],isLoading:true } 

    constructor()
    {

super();
    }
    handlesearch=(props)=>
    {
      props.preventDefault();
      this.props.CallSearchFunction(props)   
    }
    handlesearchDefault=(props)=>
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
    doNothing=(props)=>{}

    HandleLogout= ()=>{
       const cookies = new Cookies()
       cookies.remove("Username")
       cookies.remove("Password")
       cookies.remove("AccessToken")
       window.location.replace('/SignIn')
      
    }
    CallServerListAPI = async (url,data) => {
      try {
        const response = await fetch(url,data);
        const json = await response.json();
        
        return(json)
      } catch (error) {
        console.log("error", error);
        return("Error:Yes");
      }
    };

    componentDidMount(){
        
      const cookies = new Cookies();
      
      let Username=cookies.get("Username")
     
      let url ="http://localhost:8000/api/GetUserbyusername?Username="+Username
    let Json= this.CallServerListAPI(url)
     
    Json.then((result)=>{
       let Profile_List=[]
      
      result.map((Profile1)=>{
          Profile_List.push(Profile1) 
      }
      )
      
      this.setState({Profile:Profile_List}, () => {

       
        this.TurnoffLoadingScreen();
    })
      
     }
     );
     let url2 ="http://localhost:8000/api/CheckServerFacturationDate"
        let url3 ="http://localhost:8000/api/CheckSRVRContractFacturationDate"
        let url4 ="http://localhost:8000/api/CheckVMContractFacturationDate"
     this.CallServerListAPI(url2)
     this.CallServerListAPI(url3)
     this.CallServerListAPI(url4)
  }
  TurnoffLoadingScreen=()=>{
    setTimeout(function () {
  }, 1000);
    this.setState({isLoading: false})
  }

    render() {
      
      const styles = {
        bounce: {
          animation: 'x 2.5s',
          animationName: Radium.keyframes(fadeInDown, 'bounce')
        }
        ,bounceInRight: {
          animation: 'x 1.5s',
          animationName: Radium.keyframes(fadeInUp, 'bounceInRight')
        }


        
      }


      if(this.state.isLoading)
      {
        return (
          <StyleRoot>
          <div className="d-flex justify-content-center"  style={styles.bounce}>
            
           
           
      </div>
      </StyleRoot>
        )
      }
      else
      {
      
        if(this.state.Profile.length!=0)
        {
          return (
            <StyleRoot>
            <div style={styles.bounce}>

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
        <div style={{marginRight:"20px",marginLeft:"20px",marginTop:"10px"}}>
        <Notification/>
        </div>
        <p style={{fontsize: 'xx-small'}}><small>
          {this.state.Profile[0].First_Name+" "+this.state.Profile[0].Last_Name}
          </small></p>   
        <Image roundedCircle={true} style={{width: '60px',height:'50px',marginRight:"35px"}} src={this.state.Profile[0].PFP_URL=="Default"? require('./images/Default_Avatar_Male.png'):"http://localhost:8000/Images/"+this.state.Profile[0].PFP_URL}/>
         
      </Nav>
      
      <Form className="d-flex" show="false" onSubmit={(this.props.CallSearchFunction)? this.handlesearch:this.handlesearchDefault}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          name="SearchInput"
          onChange={(this.props.CallSearchFunction)? this.handlesearch:this.handlesearchDefault}
        />
        <Button variant="outline-success" type='submit'>Search</Button>
        <Popup status={this.state.Show}/>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>


            </div>
            </StyleRoot>
        );

        }
        else
        {
         return( 
          <StyleRoot>
         <div style={styles.bounce}>

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
                  <Nav.Link href="/SignIn">S'identifier</Nav.Link>
                  <Nav.Link href="/SignUp">S'inscrire</Nav.Link>
                  
                </Nav>

                
                <Form className="d-flex">
                  <FormControl onSubmit={this.handlesearchDefault}
                  
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
         
          
                      </div>
                      </StyleRoot>)

        }
       }
    }
}
 
export default NavBar;