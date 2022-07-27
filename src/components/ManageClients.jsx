
import React,{Component,useState} from 'react';
import './ManageClients.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBDropdownMenu,MDBDropdownItem,MDBDropdownToggle,MDBDropdown } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import AddIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-bootstrap/Modal';
import LoadingSpinner from './LoadingSpinner';
import Table from 'react-bootstrap/Table';
export function Popup(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const CallAPI = async (url) => {
    try {
      const response = await fetch(url,{
        method: "GET",
        headers: {
          "access-control-allow-origin" : "*",
          "Content-type": "application/json; charset=UTF-8"
        }});
      const json = await response.json();
      
      return(json)
    } catch (error) {
      console.log("error", error);
      return("Error:Yes");
    }
  };



  const handleDelete = ()=>{

let url="http://localhost:8000/api/RemoveClientByID?ClientID="+props.Client_ID
  CallAPI(url);
  console.log(url);
    setShow(false);
    setTimeout(function () {
      window.location.replace('ManageClients')
  }, 1000);
    
    
  }

  return (
    <>
    <IconButton aria-label="delete" size="large" onClick={handleShow}>
  <DeleteIcon fontSize="inherit" />
</IconButton>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
Suppression du client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
Êtes-vous sûr de vouloir supprimer le Client et tous les contrats qui lui sont liés ? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            
Non ne supprimez pas
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            
Oui Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

class ManageClients extends Component {
    state = {  modalShow:false,Clients:[],isLoading: true,NumbersAll:[{}]} 
    constructor()
    {
      super()
      this.PhoneNumbers=[];
    }
     

    CallServerListAPI = async (url) => {
      try {
        const response = await fetch(url,{
          method: "GET",
          headers: {
            "access-control-allow-origin" : "*",
            "Content-type": "application/json; charset=UTF-8"
          }});
        const json = await response.json();
        
        return(json)
      } catch (error) {
        console.log("error", error);
        return("Error:Yes");
      }
    };

    TurnoffLoadingScreen=()=>{
      setTimeout(function () {
    }, 1000);
  
      this.setState({isLoading: false})
    }
    componentDidMount(){
      
    let url="http://localhost:8000/api/GetAllClients"
   let res=this.CallServerListAPI(url)
     
    res.then((result)=>{
       let Client_List=[]
      result.map((Client)=>{
        Client_List.push(Client) 
      })
      this.setState({Clients:Client_List})
     }
     );
     let urlS="http://localhost:8000/api/GetAllClientNumbers"
     let rip=this.CallServerListAPI(urlS)
     let NumbersList=[]
     rip.then((result)=>{                                             
       result.map((PhoneNumber)=>{
        NumbersList.push(PhoneNumber)
       }
       ) 
      }
      ); 

      this.setState({NumbersAll:NumbersList}, () => {
        this.TurnoffLoadingScreen();
    })
    }
    
    render() { 

      if(this.state.isLoading)
      {
        return (
          <div class="d-flex justify-content-center" style={{margin:"10px"}}>
          <LoadingSpinner id="Spinner"/>         
      </div>
        )
       
      }
      else
      {
        return (


          <div class="container mt-10"  >
              <div class="row">
                     {this.state.Clients.map((Client)=>{        
                         
                              
                           this.state.NumbersAll.map((PhoneNumber)=>{
                         }) 
                                           
                      return(
<div class="col-md-6 col-sm-1 ">
               <div class="card m-2 shadow-sm" >
                <a class="card-img-tiles" href="#" data-abc="true">
                   <div class="inner">
                     <div class="main-img">
                     <img src={require('./images/Delice_Logo.jpg')} alt="Category"/>
                     <Container>
<Row>
  <Col> <nobr><label style={{fontSize:"10px"}}>Prénom</label>
                   <p style={{fontSize:"10px"}}class="text-muted">{Client.First_Name} </p></nobr></Col>
  <Col><nobr><label style={{fontSize:"10px"}}>Nom de famille</label>
                   <p style={{fontSize:"10px"}} class="text-muted">{Client.Last_Name}</p></nobr></Col>
                   
</Row>
<Row>
<Col><nobr><label style={{fontSize:"10px"}}>Nom de l'entreprise</label>
                   <p style={{fontSize:"10px"}} class="text-muted">{Client.Company_Name}</p></nobr></Col>
  <Col><nobr><label style={{fontSize:"10px"}}>Nationalité cliente</label>
                   <p style={{fontSize:"10px"}} class="text-muted">{Client.C_Nationality}</p></nobr></Col>
               
</Row>
<Row>
  <Col><nobr><label style={{fontSize:"10px"}}>Ville de l'entreprise</label>
                   <p style={{fontSize:"10px"}} class="text-muted">{Client.C_City}</p></nobr></Col>
  <Col><nobr><label style={{fontSize:"10px"}}>Adresse de la société</label>
                   <p style={{fontSize:"10px"}} class="text-muted">{Client.Company_Adress}</p></nobr></Col>
                   
</Row>
</Container>
                     </div>
                     <div class="thumblist"><img src={require('./images/Client_Logo.gif')} alt="Category"/>
                    
                     <Container>
                      <Row>
    </Row>
                      <Row>
    <Col>
    <IconButton  href="EditClient" aria-label="delete" size="large">
<AddIcon fontSize="inherit" />
</IconButton>
    </Col>
    <Col>
    <Popup  show={this.state.modalShow}
      onHide={() => this.state.modalShow=true} Client_ID={Client.Client_ID}/>
    </Col>
   
    </Row>
                      </Container>
                     </div>
                   </div></a>
                 <div class="card-body text-center">
                   
                   
                   
                   <div class="container">
<div class="row">
  <div class="col-md">
  <DropdownButton id="dropdown-basic-button" title="Numbers List"style={{margin:"10px"}} >

    {
      
     
    }
           
  </DropdownButton>        
  </div>
  <div class="col-md">
   
     
<DropdownButton id="dropdown-basic-button" title="E-mails List" style={{margin:"10px"}}>
<Dropdown.Item >Ahmed@gmail.com</Dropdown.Item>
<Dropdown.Item >Melek@Yahoo.fr</Dropdown.Item>
<Dropdown.Item >gb@Outlock.com</Dropdown.Item>
</DropdownButton>
  </div>
  
</div>
</div>

                   <a class="btn btn-outline-primary btn-sm" href="ManageClientContracts" data-abc="true">
Voir les contrats liés au client</a>






                 </div>
               </div>
             </div>

                      );
                     })


                     }


             

           
             
             


             
             </div>



             
           </div>





      );
      }
        
    }
}
 
export default ManageClients;