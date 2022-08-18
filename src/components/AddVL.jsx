import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Image from 'react-bootstrap/Image'
import UploadDragDrop from './UploadDragDrop';
import LoadingSpinner from './LoadingSpinner';
import Modal from 'react-bootstrap/Modal';
import NavBar from "./Navbar"
class AddServer extends Component {
    state = {Providers:[],isLoading:true,SelectedProviderID:1,Status:false  } 


    onChangeHandler = (e) => {
      const index = e.target.selectedIndex;   
        const el = e.target.childNodes[index]     
        const option =  el.getAttribute('id');
        this.state.SelectedProviderID=option;  
    }
    handlesubmit=(props)=>
    {
      
      props.preventDefault();
      const queryParams = new URLSearchParams(window.location.search);
      let srvid = queryParams.get('ServerID');
      this.setState({Status:true})
      let PropsString=""
      let i=0
      let url="http://127.0.0.1:8000/api/CreateVL"
      for(i=0;i<3;i++)
      {
        
       if(i==0)
       {
         PropsString='?'+props.target[i].name+'='+props.target[i].value
       }
       else 
       {
          PropsString=PropsString+"&"+props.target[i].name+"="+props.target[i].value
       }      
      }
      console.log(url+PropsString)
      this.SERVERAPICALL(url+PropsString)
      setTimeout(() => {window.location.replace('/managelogicalvolume?ServerID='+srvid)}, 2000);
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
    TurnoffLoadingScreen=()=>{

      this.setState({isLoading: false})
    }

    componentDidMount =()=>
{
let Json=null 
let url="http://127.0.0.1:8000/api/GetAllDiskProviders"
Json=this.SERVERAPICALL(url)
Json.then((result)=>{
let Providers_List=[]
result.map((Provider)=>{
Providers_List.push(Provider) 
}
)
this.setState({Providers:Providers_List}, () => {
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
      const queryParams = new URLSearchParams(window.location.search);
      let srvid = queryParams.get('ServerID');
      
        return ( 
          <>
          <NavBar/>
          
          <div class="d-flex justify-content-center" style={{margin:"10px"}}>
          <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <Image  style={{width: '150px',height:'150px'}} src={require('./images/VLDefault.png')}/>
                
                </div>
                </div>
                <MDBContainer style={{marginTop:"30px"}}>

<Form onSubmit={this.handlesubmit}>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Nom du Volume Logique</Form.Label>
        <Form.Control required name="VL_Name" type="text"   />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
       
        <Form.Control hidden required name="Total_Size" type="number" value="0" />
        <Form.Text className="text-muted">     
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        
        <Form.Control  hidden name="Server_ID" type="text" value={srvid} />
        <Form.Text className="text-muted">     
        </Form.Text>
      </Form.Group>
      
      <div class="row justify-content-center">
      <button type="submit" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark" style={{margin:"10px"}}>Créer un volume logique</button>
</div>

<div>
<Modal
        size="lg"
        show={this.state.Status}
        onHide={() => {this.setState({Status:false})}}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          Gestion des volumes logiques
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Volume logique ajouté avec succès
</Modal.Body>
      </Modal>
</div>
      
    </Form>
    </MDBContainer>




    </div>
    </div>


          </>   

        );
      }
      
    }
}
 
export default AddServer;