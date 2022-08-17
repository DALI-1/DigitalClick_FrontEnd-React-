import React,{Component,useState} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Edit';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupportAgentSharpIcon from '@mui/icons-material/SupportAgentSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'universal-cookie';
import LoadingSpinner from './LoadingSpinner';
import NavBar from "./Navbar"
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

let url="http://localhost:8000/api/DeleteUser?ID_Person="+props.ServerContract_ID
  CallAPI(url);
  console.log(url);
    setShow(false);
    setTimeout(function () {
      window.location.replace('admin')
  }, 1000);
    
    
  }

  return (
    <>
     
        
    <IconButton aria-label="delete" size="large" onClick={handleShow}>
  <DeleteIcon fontSize="inherit" />
</IconButton>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>{"Are you sure you want to delete "}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No don't delete
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

class ManageContract extends Component {
  state = { modalShow:false,Contracts:[],isLoading: true,ContractsBackup:[]
      
  } 

  handleAdminSet=(props)=>
  {
    const url = "http://localhost:8000/api/SetUserAdmin?ID_Person="+props
    let Json= this.CallServerListAPI(url);

    setTimeout(() => {window.location.replace('/admin')}, 1000);
    
  }
  handleUserSet=(props)=>
  {
    const url = "http://localhost:8000/api/SetUserUser?ID_Person="+props
    let Json= this.CallServerListAPI(url);
    setTimeout(() => {window.location.replace('/admin')}, 1000);
  }
  handleModeratorSet=(props)=>
  {
    const url = "http://localhost:8000/api/SetUserModerator?ID_Person="+props
    let Json= this.CallServerListAPI(url);
    setTimeout(() => {window.location.replace('/admin')}, 1000);
  }

  handlesearch=(props)=>
  {
    
   if(props.target.value!="")
   {
    let NewTab=[]
    let Servers=this.state.ContractsBackup
    Servers.map((Server,key)=>{
   let MatchingFound="0"


  Object.values(Server).map((val) => {
    
   if(val.toString().toLowerCase().includes(props.target.value.toLowerCase()))
   {
       MatchingFound="1"
   }
   
   })
   if(MatchingFound=="1")
   {
    NewTab.push(Server)
   }
   


    })
    this.setState({Contracts:NewTab})
   }
   else
   {

    this.setState({Contracts:this.state.ContractsBackup})
   } 
   
 

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

  CheckIdentification= ()=>
{
  var CryptoJS = require("crypto-js");
  const cookies = new Cookies();
  let Username=cookies.get("Username")
    let Password_ciphered=cookies.get("Password")
     if(Username || Password)
     {
      var bytes = CryptoJS.AES.decrypt(Password_ciphered, 'DigitalClick');
      var Password = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      const url = "http://localhost:8000/api/SignIn?Username="+Username+"&Password="+Password
      const CallSignInAPI = async (url) => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          
          return(json)
        } catch (error) {
          console.log("error", error);
          return("Error:Yes");
        }
      };
    let Json=CallSignInAPI(url)
    let LoggedIn=0
    Json.then((result)=>{
      for( var property in result)
      {
        if(property==="UserValidated" && result[property]==="Yes")
        {

                    LoggedIn=1;  
        }
      }
      if(LoggedIn===0)
      {
        window.location.replace('/SignIn')
       
      }
      

     }
     );
   
     }
     else
     {
      window.location.replace('/SignIn')
      
     } 


     

}
TurnoffLoadingScreen=()=>{
  setTimeout(function () {
}, 1000);

  this.setState({isLoading: false})
}
componentDidMount(){
  this.CheckIdentification(); 
  const cookies = new Cookies();
  let Username=cookies.get("Username")
  let url ="http://localhost:8000/api/GetAllUsers"
let Json= this.CallServerListAPI(url)

Json.then((result)=>{
   let Contract_List=[]
  
  result.map((server)=>{
    
    if(server.Username.toLowerCase()!=Username.toLowerCase())
    {
      Contract_List.push(server) 
    }
   
  }
  )
  this.setState({ContractsBackup:Contract_List})
  this.setState({Contracts:Contract_List}, () => {
    this.TurnoffLoadingScreen();
})
  
 }
 );

}
    render() { 

      if(this.state.isLoading)
      {
        return (
          <>
          <NavBar/>
          
          <div class="d-flex justify-content-center" style={{margin:"10px"}}>
          <LoadingSpinner id="Spinner"/>         
      </div>
      
          </>
        )
       
      }
      else
      {
        return (
          <>
          <NavBar CallSearchFunction={(props)=>{this.handlesearch(props)}}/>
          
            <reactElement>
<Container>
      <Row>
        <Col>
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
        <div class="d-flex justify-content-center mt-1">
                <Image roundedCircle={true} style={{width: '200px',height:'100px'}} src={require('./images/AdminIcon.gif')}/>
                
                </div>
        
        <p class="text-justify" style={{color:"Black"}}>Human Resources Management Table</p>
        
        <Table  bordered hover responsive>
      <thead>
        <tr>
          <th># User ID</th>
          <th>Username</th>
          
          <th>First_Name</th>
          <th>Last_Name</th>
          <th>Role</th>
          <th>Poste</th>
        
          
          <th> Edit</th>
        </tr>
      </thead>
      <tbody>
        
        {

          this.state.Contracts.map((Contract)=>
          {


            return(
<tr>
          <td>{Contract.ID_Person}</td>
          <td>{Contract.Username}</td>
          
          <td>{Contract.First_Name}</td>
          <td>{Contract.Last_Name}</td>
          <td>{Contract.Role}</td>
          <td>{Contract.Poste}</td>
          
          
          <td>

          <Container>
          <Row>
      <Col>
      <IconButton  onClick={()=>{this.handleAdminSet(Contract.ID_Person)}} aria-label="delete" size="large">
  <AdminPanelSettingsIcon fontSize="inherit" />
</IconButton>
      </Col>

      <Col>
      <IconButton onClick={()=>{this.handleModeratorSet(Contract.ID_Person)}}   aria-label="delete" size="large">
  <SupportAgentSharpIcon fontSize="inherit" />
</IconButton>
      </Col>
      <Col>
      <IconButton onClick={()=>{this.handleUserSet(Contract.ID_Person)}}  aria-label="delete" size="large">
  <AccountCircleSharpIcon fontSize="inherit" />
</IconButton>
      </Col>


      


      
      <Col>


      <Popup  show={this.state.modalShow}
        onHide={() => this.state.modalShow=true}
        ServerContract_ID={Contract.ID_Person}/>
      </Col>
     
      </Row>
      
    </Container>
          </td>
        </tr> 

            )
          })
        }
         
      </tbody>
    </Table>
      
    </div>
        </Col>
        
      </Row>
    </Container>
                
             
      
      
    
            </reactElement>
            
          </>
        );
      }
    }
}
 
export default ManageContract;