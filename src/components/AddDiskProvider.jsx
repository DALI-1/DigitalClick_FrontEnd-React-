import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Image from 'react-bootstrap/Image'
import UploadDragDrop from './UploadDragDrop';
import Modal from 'react-bootstrap/Modal';
class AddServer extends Component {
    state = {Status:false  } 


    handlesubmit=(props)=>
    {
      props.preventDefault();
      this.setState({Status:true})
      const queryParams = new URLSearchParams(window.location.search);
      let srvid = queryParams.get('ServerID');
    let url="http://127.0.0.1:8000/api/CreateDiskProvider"
    let PropsString=""
       PropsString='?'+props.target[0].name+'='+props.target[0].value
       
    this.SERVERAPICALL(url+PropsString)   
    
    setTimeout(() => {window.location.replace('/ManagePartitionDisks?ServerID='+srvid)}, 3000);
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
    render() { 


        return ( 
          <div class="d-flex justify-content-center" style={{margin:"10px"}}>
          <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <Image  style={{width: '150px',height:'150px'}} src={require('./images/SSD_Logo.gif')}/>
                
                </div>
                </div>
                <MDBContainer style={{marginTop:"30px"}}>

<Form onSubmit={this.handlesubmit}>
     

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >DProvider_Company_Name:</Form.Label>
        <Form.Control required type="text"  placeholder="Disk Provider Company Name " name="DProvider_Company_Name"/>
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <Modal
        size="lg"
        show={this.state.Status}
        onHide={() => {this.setState({Status:false})}}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Disk Management:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Disk Provider Added successfully</Modal.Body>
      </Modal>      
      <div class="row justify-content-center">
      <button type="submit" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark" style={{margin:"10px"}}>Create Disk</button>
</div>
      
    </Form>
    </MDBContainer>




    </div>
    </div>

        

        );
    }
}
 
export default AddServer;