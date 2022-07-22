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
export function Popup() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




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
          <Button variant="primary" onClick={handleClose}>
            Yes Delete
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
let url="http://127.0.0.1:8000/api/GetServerDisks?ServerID="+srvid
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
           
       
        <p class="text-justify" style={{color:"Black"}}>The Server disks:</p>
        
        <a class="btn btn-outline-primary btn-sm" href={"AddDisk?ServerID="+srvid} data-abc="true" style={{margin:"10px",padding:"10px"}}>Add New Disk </a>
        <a class="btn btn-outline-primary btn-sm" href={"AddDiskProvider?ServerID="+srvid} data-abc="true" style={{margin:"10px",padding:"10px"}}>Add Disk Provider </a>
        <Table  bordered hover responsive>
          
      <thead>
        <tr>
          <th class="text-center">#ID</th>
          <th class="text-center">Disk image:</th> 
          <th class="text-center">Disk Provider:</th>
          <th class="text-center">Disk Model:</th> 
              
          <th class="text-center">Disk Type:</th>
          <th class="text-center">Disk Total size:</th>
          <th class="text-center">Disk Total Usage</th>
          <th class="text-center"> Edit</th>
        </tr>
      </thead>
      <tbody>

        {
          this.state.Disks.map((Disk)=>{


return(
<tr>
          <td class="text-center">{Disk.Disk_ID}</td>
          <td class="text-center"><a href="#"><Image  roundedCircle={true} style={{width: '50px',height:'50px'}} src={require('./images/Disk_Default_Picture.jpg')}/></a></td>
          <td class="text-center">{Disk.DProvider_Company_Name}</td>
          <td class="text-center">{Disk.Disk_Model}</td>
          <td class="text-center">{Disk.Disk_Type}</td>
          <td class="text-center">{Disk.Total_Size}</td>
          <td class="text-center">NOT AVAILABLE</td>
          
          
          <td>

          <Container>
      <Row>
      <Col>
      <IconButton href={"ManageDiskPartitions?DiskID="+Disk.Disk_ID+"&ServerID="+srvid} aria-label="delete" size="large">
  <Split fontSize="inherit" />
</IconButton>

      </Col>
      <Col>
      <IconButton href="EditDisk" aria-label="delete" size="large">
  <AddIcon fontSize="inherit" />
</IconButton>

      </Col>
      <Col>
      <Popup  show={this.state.modalShow}
        onHide={() => this.state.modalShow=true}/>
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