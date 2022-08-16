import React,{Component,useState} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Edit';
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

let url="http://localhost:8000/api/RemoveServerContractByID?ServerContractID="+props.ServerContract_ID
  CallAPI(url);
  console.log(url);
    setShow(false);
    setTimeout(function () {
      window.location.replace('ManageServersContracts')
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
  
  let url ="http://localhost:8000/api/GetAllServerContracts"
let Json= this.CallServerListAPI(url)
 
Json.then((result)=>{
   let Contract_List=[]
  
  result.map((server)=>{
    Contract_List.push(server) 
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
                <Image roundedCircle={true} style={{width: '70px',height:'70px'}} src={require('./images/Contract_Logo.gif')}/>
                
                </div>
        
        <p class="text-justify" style={{color:"Black"}}>Server Contracts Management Table</p>
        
        <Table  bordered hover responsive>
      <thead>
        <tr>
          <th># Contract ID</th>
          <th>Server Name</th>
          
          <th>Client Name</th>
          <th>Payment Type</th>
          <th>Price</th>
          <th>Start Facturation Date</th>
          <th>Next Facturation date</th>
          
          <th>SSL Ending date</th>
          <th>Access status tempass</th>
          
          <th> Edit</th>
        </tr>
      </thead>
      <tbody>
        
        {

          this.state.Contracts.map((Contract)=>
          {


            return(
<tr>
          <td>{Contract.SContract_ID}</td>
          <td>{Contract.Server_Name}</td>
          
          <td>{Contract.First_Name+' '+Contract.Last_Name}</td>
          <td>{Contract.Payment_Type}</td>
          <td>{Contract.Rent_price+" TND"}</td>
          <td>{Contract.created_at}</td>
          <td>{Contract.Next_Facturation_Date}</td>
  
          <td>{Contract.SSL_Ending_Date}</td>
          <td>{Contract.Access_status_Temppass}</td>
          
          <td>

          <Container>
          <Row>
      <Col>
      <IconButton  href={"EditSrvrContract?ContractID="+Contract.SContract_ID} aria-label="delete" size="large">
  <AddIcon fontSize="inherit" />
</IconButton>
      </Col>
      <Col>
      <Popup  show={this.state.modalShow}
        onHide={() => this.state.modalShow=true}
        ServerContract_ID={Contract.SContract_ID}/>
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