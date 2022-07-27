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
   
let url="http://localhost:8000/api/RemoveDiskPByID?DiskPID="+props.DiskPID
  CallAPI(url);
    setShow(false);
    setTimeout(function () {
      
      window.location.replace("ManageDiskPartitions?"+"DiskID="+props.DiskID+"&ServerID="+props.ServerID)
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
        <Modal.Body>{"Êtes-vous sûr de vouloir supprimer votre partition de disque ?"}</Modal.Body>
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
    state = { modalShow:false,Partitions:[] } 
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
    componentDidMount(){
      const queryParams = new URLSearchParams(window.location.search);
      let diskid = queryParams.get('DiskID');
      let url ="http://localhost:8000/api/GetDiskPartitions?DiskID="+diskid
    let Json= this.SERVERAPICALL(url)
     
    Json.then((result)=>{
       let Partitions_List=[]
      
      result.map((server,index)=>{
      
        Partitions_List.push(server) 
      }
      )
      
      this.setState({Partitions:Partitions_List})
      
     }
     );
    
  }

    render()
    { 
      const queryParams = new URLSearchParams(window.location.search);
            let diskid = queryParams.get('DiskID');
            let srvrid = queryParams.get('ServerID');
        return (
            <reactElement>
<Container>
      <Row>
        <Col>
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
           
       
        
        <p class="text-justify" style={{color:"Black"}}>Les disques de partitions :</p>       
        <a class="btn btn-outline-primary btn-sm" href={"CreateDiskPartition?DiskID="+diskid+"&ServerID="+srvrid} data-abc="true" style={{marginRight:"10px",marginBottom:"10px",padding:"10px"}}>Ajouter une partition</a>
        <Table  bordered hover responsive>
      <thead>
        <tr>
          <th class="text-center">#ID</th>
          <th class="text-center">Image de partition</th>
          <th class="text-center">Nom de la partition de disque</th>
          <th class="text-center">Taille d'allocation de disque</th>
          <th class="text-center">Assigné à</th>
          <th class="text-center"> Éditer</th>
        </tr>
      </thead>


      <tbody>

        {

          this.state.Partitions.map((Partition)=>
          {
            return(
<tr>
          <td class="text-center">{Partition.DiskP_ID}</td>
          <td class="text-center"><a href="#"><Image  roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/Partition_Logo.webp')}/></a></td>
          <td class="text-center">{Partition.PartitionValue}</td>
          
          <td class="text-center">{Partition.PartitionUsage}</td>
          <td class="text-center">{Partition.PartitionName}</td>
          
          <td>

          <Container>
      <Row>
      
      <Col>
      <IconButton href="EditDiskPartition" aria-label="delete" size="large">
  <AddIcon fontSize="inherit" />
</IconButton>

      </Col>
      <Col>
      <Popup  show={this.state.modalShow}
        onHide={() => this.state.modalShow=true}
        DiskPID={Partition.DiskP_ID}
        DiskID={diskid}
        ServerID={srvrid}/>
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