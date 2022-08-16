import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Modal from 'react-bootstrap/Modal';
import NavBar from "./Navbar"
class AddVirtualMachine extends Component {
    state = { Status:false } 
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

    handlesubmit=(props)=>
    {
      this.setState({Status:true})
       props.preventDefault();
       let PropsString=""
       let i=0
       let url="http://127.0.0.1:8000/api/CreateServiceProvider"
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
      
       this.SERVERAPICALL(url+PropsString)



    
    }
    render() { 
        return (
          <>
          <NavBar/>
           
          <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <img roundedCircle={true} style={{width: '150px',height:'150px'}} src={require('./images/ServiceProvider_Logo.png')} alt="Category"/>
                </div>
                </div>



                <MDBContainer style={{marginTop:"30px"}}>

<Form method="GET" action="http://localhost:8000/api/CreateServiceProvider" onSubmit={this.handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Nom du Fournisseur de services</Form.Label>
        <Form.Control type="text" name="Service_Provider_Company_Name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >E-mail du Fournisseur de services</Form.Label>
        <Form.Control type="email" 
        name="Service_Provider_Email" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Numéro de téléphone du fournisseur de services</Form.Label>
        <Form.Control type="number"  
        name="Service_Provider_PhoneNumber"/>
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
    
      <div class="row justify-content-center">
      <button type="submit" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">Ajouter un fournisseur de services</button>
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
           
          Fournisseur de services
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>      
Fournisseur de services ajouté!</Modal.Body>
      </Modal>




    </div>

        

 
          </>  );
    }
}
 
export default AddVirtualMachine;