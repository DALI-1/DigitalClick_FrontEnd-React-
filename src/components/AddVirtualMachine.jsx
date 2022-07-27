import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import LoadingSpinner from './LoadingSpinner';
import Modal from 'react-bootstrap/Modal';
class AddVirtualMachine extends Component {
  state = { VMProviders:null, isLoading:true,Status:false } 
  constructor()
  {
    super()
    this.SelectedID = React.createRef();
    this.SelectedID="1"
  }
  onChangeHandler = (e) => {
    const index = e.target.selectedIndex;   
    const el = e.target.childNodes[index]     
    const option =  el.getAttribute('id');
    this.SelectedID=option;  
    setTimeout(() => {},1000);
  }
  handlesubmit=(props)=>
  {
    this.setState({Status:true})
    props.preventDefault();
    let PropsString=""
    let i=0
    let url="http://127.0.0.1:8000/api/AddVirtualMachine"
    for(i=0;i<2;i++)
    {
     if(i==0)
     {
       PropsString='?'+props.target[i].name+'='+this.SelectedID
     }
     else
     {
       PropsString=PropsString+"&"+props.target[i].name+"="+props.target[i].value
     }
     
    }

    console.log(url+PropsString)
    this.SERVERAPICALL(url+PropsString)

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
let url="http://127.0.0.1:8000/api/GetVMProviders"

Json=this.SERVERAPICALL(url)
Json.then((result)=>{
let VMProviders_List=[]
result.map((server)=>{
VMProviders_List.push(server) 
}
)

this.setState({VMProviders:VMProviders_List}, () => {
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
        return ( 
          <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <img  src={require('./images/Virtual_Machine_Default_icon.png')} alt="Category"/>
                </div>
                </div>



                <MDBContainer style={{marginTop:"30px"}}>

<Form onSubmit={this.handlesubmit}>
<Form.Group className="mb-3" >
        <Form.Label
        style={{color: 'black'}}
        >Fournisseur de système d'exploitation du Virtual Machine:</Form.Label>
        <Form.Select required name="VMProvider_ID" onChange={this.onChangeHandler}>
{
 this.state.VMProviders.map((VMProvider)=>{   
   return(
     <option key={VMProvider.VMProvider_ID}id={VMProvider.VMProvider_ID}>{VMProvider.VMProvider_Company_Name } </option>
   )
 })
} 
 
 </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Nom du Système d'exploitation du Virtual Machine</Form.Label>
        <Form.Control type="text" placeholder="Nom du Système d'exploitation"
        name="VM_Name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      


      <div class="row justify-content-center">
      <button type="submit" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">Ajouter Système d'exploitation du Virtual Machine</button>
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
           
          Système d'exploitation du Virtual Machine
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Système d'exploitation du Virtual Machine ajouté!</Modal.Body>
      </Modal>


    </div>

        

        );
      }
    }
}
 
export default AddVirtualMachine;