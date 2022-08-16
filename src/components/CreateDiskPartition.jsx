import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal';
import NavBar from "./Navbar"
class AddServer extends Component {
    state = { Partitions:[],SelectedParitionID:"",Status:false }
    
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

    handlePartitionChange=(e)=>{
      const index = e.target.selectedIndex;   
      const el = e.target.childNodes[index]     
      const option =  el.getAttribute('id');

      this.setState({SelectedParitionID:option})
    }
    componentDidMount(){
      const queryParams = new URLSearchParams(window.location.search);
      let srvrid = queryParams.get('ServerID');
      let url ="http://localhost:8000/api/GetServerPartitions?ServerID="+srvrid
    let Json= this.SERVERAPICALL(url)
     
    Json.then((result)=>{
       let Partitions_List=[]
      
      result.map((server,index)=>{
        if(index==0)
        {
          this.setState({SelectedParitionID:server.ServerVMPartition_ID})
        }

        
        Partitions_List.push(server) 
      }
      )
      
      this.setState({Partitions:Partitions_List})
      
     }
     );
    
  }

  handlesubmit=(props)=>
  {
    props.preventDefault();
    const queryParams = new URLSearchParams(window.location.search);
    this.setState({Status:true})
    let srvid = queryParams.get('ServerID');
    let diskid = queryParams.get('DiskID');
    let PropsString=""
    let i=0
    let url="http://127.0.0.1:8000/api/CreateDiskPartition"
    for(i=0;i<4;i++)
    {
      
     if(i==0)
     {
       PropsString='?'+props.target[i].name+'='+props.target[i].value
     }

     else if(props.target[i].name=="ServerVMPartition_ID")
     {
      PropsString=PropsString+"&"+props.target[i].name+"="+this.state.SelectedParitionID
     }
     else 
     {
        PropsString=PropsString+"&"+props.target[i].name+"="+props.target[i].value
     }      
    }
    
  this.SERVERAPICALL(url+PropsString)

  setTimeout(() => {window.location.replace('/ManageDiskPartitions?ServerID='+srvid+'&DiskID='+diskid)}, 2000);

  }
    render() { 

      const queryParams = new URLSearchParams(window.location.search);
      let diskid = queryParams.get('DiskID');
        return ( 
          <>
          <NavBar/>
          
          <div class="d-flex justify-content-center" style={{margin:"10px"}}>
          <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <Image  style={{width: '150px',height:'150px'}} src={require('./images/Partition_Logo.webp')}/>
                
                </div>
                </div>
                <MDBContainer style={{marginTop:"30px"}}>

<Form onSubmit={this.handlesubmit}>
<Form.Group className="mb-3" controlId="formBasicEmail">       
        <Form.Control type="text" hidden name="Disk_ID" value={diskid} />
        <Form.Text className="text-muted">         
        </Form.Text>
      </Form.Group>  
<Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Nom de la partition :</Form.Label>
        <Form.Control type="text"   name="PartitionValue" />
        <Form.Text className="text-muted">          
        </Form.Text>
      </Form.Group>  
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >
        Taille de la partition (MB):</Form.Label>
        <Form.Control type="text"   name="PartitionUsage" />
        <Form.Text className="text-muted">         
        </Form.Text>
      </Form.Group>    
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Sélectionnez la partition VM :</Form.Label>
        <Form.Select required
        name="ServerVMPartition_ID" onChange={this.handlePartitionChange}>
          {
            this.state.Partitions.map((Partition)=>{
              return(
                    <option key={Partition.ServerVMPartition_ID} id={Partition.ServerVMPartition_ID}>{Partition.PartitionName}</option>
              )
            })
          }        
            
        </Form.Select>      
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>  
      <div class="row justify-content-center">
      <button type="submit" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark" style={{margin:"10px"}}>
Ajouter une partition</button>
</div>
      
    </Form>
    </MDBContainer>


    <Modal
        size="lg"
        show={this.state.Status}
        onHide={() => {this.setState({Status:false})}}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          Ajout de partition de disque:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Partition de disque ajoutée avec succès!</Modal.Body>
      </Modal>

    </div>
    </div>

   
          </> 

        );
    }
}
 
export default AddServer;