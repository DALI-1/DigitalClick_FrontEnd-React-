import React,{Component,useState} from 'react';
import './ManageServer.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/Button';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Cookies from 'universal-cookie';
import AddIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import LoadingSpinner from './LoadingSpinner';
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
let url="http://localhost:8000/api/RemovePartitionByID?PartitionID="+props.Partition_ID
  CallAPI(url);
  console.log(url);
    setShow(false);
    setTimeout(function () {
      //window.location.replace('ManageServerPartitions?ServerID='+props.Server_ID)
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
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
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
class MangeServer extends Component {
    state = { modalShow:false,isLoading: true,Paritions:[] } 

    constructor()
    {
      super()
      this.Servers=null;
    }
     CallServerListAPI = async (url) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        
        return(json)
      } catch (error) {
        console.log("error", error);
        return("Error:Yes");
      }
    };
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
    var CryptoJS = require("crypto-js");
    let Username=cookies.get("Username")
    let Password_ciphered=cookies.get("Password")
    var bytes = CryptoJS.AES.decrypt(Password_ciphered, 'DigitalClick');
      var Password = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      const queryParams = new URLSearchParams(window.location.search);
      let srvid = queryParams.get('ServerID');
    let url ="http://localhost:8000/api/GetServerPartitions?ServerID="+srvid
    
  let Json= this.CallServerListAPI(url)
   
  Json.then((result)=>{
     let Partitions_List=[]
    
    result.map((server)=>{
      Partitions_List.push(server) 
    }
    )
    
    this.setState({Paritions:Partitions_List}, () => {
      this.TurnoffLoadingScreen();
  })
    
   }
   );
  
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
     const queryParams = new URLSearchParams(window.location.search);
     let srvid = queryParams.get('ServerID');
        return (
<div class="container mt-10" >
<a class="btn btn-outline-primary btn-sm" href={"AddServerPartition?ServerID="+srvid} data-abc="true" style={{margin:"10px",padding:"10px"}}>Add Partition</a>
                                    <div class="row">


                                      {
                                        this.state.Paritions.map((Partition)=>
                                        {



                                          return(
                                            <div class="col-md-4 col-sm-6" id="ProductsContainerID">
                      
                 <div class="card m-2"><a class="card-img-tiles" href="#" data-abc="true">
                     <div class="inner">
                       <div class="main-img">
<Container>
  
  <Row>
  <Col><nobr><label style={{fontSize:"10px"}}>IP-Address:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">{Partition.SVMP_IP_Adress}</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>MAC-Address:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">{Partition.SVMP_MAC_Adress}</p></nobr></Col>
                 
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>OS</label>
                     <p style={{fontSize:"10px"}} class="text-muted">{Partition.OperatingSystem_Company_Name+" "+Partition.OperatingSystem_Name}</p></nobr></Col>
                     <Col><nobr><label style={{fontSize:"10px"}}> Virtual Machine:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">{Partition.VMProvider_Company_Name+" "+Partition.VM_Name}</p></nobr></Col>
                     
                     
  </Row>
  <Row>
  <Col><nobr><label style={{fontSize:"10px"}}>Allocated V-Cores:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">{Partition.Nb_Allocated_Cores}</p></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}> Allocated RAM:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">{Partition.Allocated_RAM} GB</p></nobr></Col>
                     
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}> Allocated Disks:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">NOT AVAILABLE</p></nobr>
        
                     </Col>
                     <Col><nobr><label style={{fontSize:"10px"}}> Partition Name:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">{Partition.PartitionName}</p></nobr></Col>
  
                     
  </Row>
  <Row>
                     <Col><nobr><label style={{fontSize:"10px"}}> Backup</label>
                     <p style={{fontSize:"10px"}} class="text-muted">{Partition.Backup}</p></nobr></Col>             
  </Row>
  

</Container>
                      
                     
                     
                     
                       </div>
                      
                       <div class="thumblist">
                       <Image roundedCircle={true} src={require('./images/Partition_Logo.gif')} class="img-fluid" alt="Responsive image"/>
                       
                        
                        <Container>
                        <Row>
     
     
      </Row>
                        <Row>
      <Col>
      <IconButton  href="EditPartition" aria-label="delete" size="large">
  <AddIcon fontSize="inherit" />
</IconButton>
      </Col>
      <Col>
      <Popup  show={this.state.modalShow}
        onHide={() => this.state.modalShow=true}
        Partition_ID={Partition.ServerVMPartition_ID}
        Server_ID={srvid}/>
      </Col>
     
      </Row>
                        </Container>
                        </div>
                     </div></a>
                   <div class="card-body text-center">
                    <Container>
                    <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Creation Date:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">{Partition.SVMP_IP_Adress}</p></nobr></Col>
                     <Col><nobr><label style={{fontSize:"10px"}}>Description:</label>
                     <a href=""><p style={{fontSize:"10px"}} class="text-muted">{Partition.SVMP_IP_Adress}</p></a></nobr></Col>
    <Col><nobr><label style={{fontSize:"10px"}}>Next Facturation Date:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">NOT AVAILABLE YET</p></nobr></Col>
                     
  </Row>
  <Row>
    <Col><nobr><label style={{fontSize:"10px"}}>Payment Type:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">NOT AVAILABLE YET</p></nobr></Col>
                     <Col><nobr><label style={{fontSize:"10px"}}>Client:</label>
                     <a href=""><p style={{fontSize:"10px"}} class="text-muted">NOT AVAILABLE YET</p></a></nobr></Col>
                     
    <Col><nobr><label style={{fontSize:"10px"}}>Description:</label>
                     <p style={{fontSize:"10px"}} class="text-muted">{Partition.SVMP_IP_Adress}</p></nobr></Col>
                     
  </Row>
  <Row>
    
    
                     
  </Row>
  
                    </Container>
                    
                     
                     
                     <a class="btn btn-outline-primary btn-sm" href="ManagePartitionDisks" data-abc="true" style={{margin:"10px",padding:"10px"}}>View Allocated Disks</a>
                     
                    
                   </div>
                 </div>
               </div>


                                          )
                                        })
                                      }
               

               
               
             </div>
             
             </div>

        );
      }
    }
}
 
export default MangeServer;