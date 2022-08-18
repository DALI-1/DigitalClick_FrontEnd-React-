import React,{Component,useState} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Edit';
import Split from '@mui/icons-material/Splitscreen';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
    const queryParams = new URLSearchParams(window.location.search);
      let srvid = queryParams.get('ServerID');
      let VLID = queryParams.get('VLID');

let url="http://localhost:8000/api/RemoveDiskByID?DiskID="+props.DiskID
  CallAPI(url);
  console.log(url);
    setShow(false);
    setTimeout(function () {
      window.location.replace('ManagePartitionDisks?ServerID='+props.ServerID+"&VLID="+VLID)
  }, 1000);
    
    
  }

  return (
    <>
    <IconButton aria-label="delete" size="large" onClick={handleShow}>
  <DeleteIcon fontSize="inherit" />
</IconButton>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Suppression de disque</Modal.Title>
        </Modal.Header>
        <Modal.Body>{"Êtes-vous sûr de vouloir supprimer le disque ?"}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Non je ne suis pas sûr
          </Button>
          <Button variant="primary" onClick={handleDelete}>                       
Oui, je suis sûr
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}




class ManageContract extends Component {
    state = { modalShow:false,Disks:[],DisksBackup:[]} 
    handlesearch=(props)=>
    {
      
     if(props.target.value!="")
     {
      let NewTab=[]
      let Servers=this.state.DisksBackup;
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
      this.setState({Disks:NewTab})
     }
     else
     {

      this.setState({DisksBackup:this.state.DisksBackup})
     } 
     
   
 
    }
    SERVERAPICALL = async (url) => {
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
       componentDidMount =()=>
{
  const queryParams = new URLSearchParams(window.location.search);
      let srvid = queryParams.get('ServerID');
      let VLID = queryParams.get('VLID');
let Json=null 
let url="http://127.0.0.1:8000/api/GetServerDisks?ServerID="+srvid+"&VL_ID="+VLID
Json=this.SERVERAPICALL(url)
Json.then((result)=>{
let Disks_List=[]
result.map((Disk)=>{
Disks_List.push(Disk) 
}
)
this.setState({DisksBackup:Disks_List})
this.setState({Disks:Disks_List}
)
}
);
}
    render()
    { 
      const queryParams = new URLSearchParams(window.location.search);
      let srvid = queryParams.get('ServerID');
      let VLID = queryParams.get('VLID');
        return (
          <>
          <NavBar CallSearchFunction={(props)=>{this.handlesearch(props)}}/>
          
            <reactElement>
<Container>
      <Row>
        <Col>
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
           
       
        <p class="text-justify" style={{color:"Black"}}>Les disques du serveur :</p>
        
        <a class="btn btn-outline-primary btn-sm" href={"AddDisk?ServerID="+srvid+"&VLID="+VLID} data-abc="true" style={{marginRight:"10px",marginBottom:"10px",padding:"10px"}}>Ajouter un nouveau disque </a>
        <a class="btn btn-outline-primary btn-sm" href={"AddDiskProvider?ServerID="+srvid+"&VLID="+VLID} data-abc="true" style={{marginRight:"10px",marginBottom:"10px",padding:"10px"}}>Ajouter un fournisseur de disque </a>
        <Table  bordered hover responsive>
          
      <thead>
        <tr>
          <th class="text-center">#ID</th>
          <th class="text-center">Image disque</th> 
          <th class="text-center">Fournisseur de disque</th>
          <th class="text-center">Modèle de disque </th> 
              
          <th class="text-center">Type de disque </th>
          <th class="text-center">Taille totale du disque </th>
          
          <th class="text-center"> Edit</th>
        </tr>
      </thead>
      <tbody>

        {
          this.state.Disks.map((Disk)=>{


return(
<tr>
          <td class="text-center">{Disk.Disk_ID}</td>
          <td class="text-center"><a href="#"><Image   style={{width: '50px',height:'50px'}} src={require('./images/HardDrive.png')}/></a></td>
          <td class="text-center">{Disk.DProvider_Company_Name}</td>
          <td class="text-center">{Disk.Disk_Model}</td>
          <td class="text-center">{Disk.Disk_Type}</td>
          <td class="text-center">{Disk.Total_Size+" MB"}</td>
          
          <td>
          <Container>
      <Row>
      <Col>
      <IconButton href={"ManageDiskPartitions?DiskID="+Disk.Disk_ID+"&ServerID="+srvid} aria-label="delete" size="large">
  <Split fontSize="inherit" />
</IconButton>

      </Col>
      <Col>
      <IconButton href={"EditDisk?DiskID="+Disk.Disk_ID+"&ServerID="+srvid+"&VLID="+VLID} aria-label="delete" size="large">
  <AddIcon fontSize="inherit" />
</IconButton>

      </Col>
      <Col>
      <Popup  show={this.state.modalShow}
        onHide={() => this.state.modalShow=true}
        DiskID={Disk.Disk_ID}
        ServerID={srvid}/>
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
    </div>
        </Col>
        
      </Row>
    </Container>
                
             
      
      
    
            </reactElement>
            
          </>
        );
    }
}
 
export default ManageContract;