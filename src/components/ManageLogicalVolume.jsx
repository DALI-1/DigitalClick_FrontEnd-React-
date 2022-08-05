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

let url="http://localhost:8000/api/RemoveDiskByID?DiskID="+props.DiskID
  CallAPI(url);
  console.log(url);
    setShow(false);
    setTimeout(function () {
      window.location.replace('ManagePartitionDisks?ServerID='+props.ServerID)
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
    state = { modalShow:false,Disks:[] } 
    
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
let Json=null 
let url="http://127.0.0.1:8000/api/GetAllVLs"
Json=this.SERVERAPICALL(url)
Json.then((result)=>{
let Disks_List=[]
result.map((Disk)=>{
Disks_List.push(Disk) 
}
)
this.setState({Disks:Disks_List}
)
}
);
}
    render()
    { 
      const queryParams = new URLSearchParams(window.location.search);
      let srvid = queryParams.get('ServerID');
        return (
            <reactElement>
<Container>
      <Row>
        <Col>
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
           
       
        <p class="text-justify" style={{color:"Black"}}>Les disques du serveur :</p>
        
        <a class="btn btn-outline-primary btn-sm" href={"AddVL?ServerID="+srvid} data-abc="true" style={{marginRight:"10px",marginBottom:"10px",padding:"10px"}}>Ajouter un nouveau VL </a>

        <Table  bordered hover responsive>
          
      <thead>
        <tr>
          <th class="text-center">#ID</th>
          <th class="text-center">Image VL</th> 
          <th class="text-center">Nom du Volume Logique</th> 
          <th class="text-center">Espace Volume Logique</th>
          
          
          <th class="text-center"> Edit</th>
        </tr>
      </thead>
      <tbody>

        {
          this.state.Disks.map((Disk)=>{


return(
<tr>
          <td class="text-center">{Disk.VL_ID}</td>
          <td class="text-center"><a href="#"><Image  roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/VLDefault.png')}/></a></td>
          <td class="text-center">{Disk.VL_Name}</td>
          <td class="text-center">{Disk.Total_Size}</td>
          
          
          <td>
          <Container>
      <Row>
      <Col>
      <IconButton href={"ManagePartitionDisks?VLID="+Disk.VL_ID+"&ServerID="+srvid} aria-label="delete" size="large">
  <Split fontSize="inherit" />
</IconButton>

      </Col>
      <Col>
      <IconButton href={"EditDisk?DiskID="+Disk.Disk_ID+"&ServerID="+srvid} aria-label="delete" size="large">
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
        );
    }
}
 
export default ManageContract;