import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import UploadDragDrop from './UploadDragDrop';
import Image from 'react-bootstrap/Image'
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import NavBar from "./Navbar"
class AddClient extends Component {
    state = { 
      PhoneNumberList: [0],
      EmailList: [0],
      isLoading:true,
      countries:null,
      Status:false,
      PFP:""
     } 
     AddNewEmailInput = () => {
      this.setState({EmailList:[...this.state.EmailList,this.state.EmailList[this.state.EmailList.length-1]+1]})
    };
    RemoveNewEmailInput = () => {
      if(this.state.EmailList.length>1)
      {
      let NewState=this.state.EmailList.slice(0,this.state.EmailList.length-1);
      this.setState({EmailList:[...NewState]})  
      }
    };
    AddNewPhoneInput = () => {
      this.setState({PhoneNumberList:[...this.state.PhoneNumberList,this.state.PhoneNumberList[this.state.PhoneNumberList.length-1]+1]})
    }; 
    RemoveNewPhoneInput = () => {
      if(this.state.PhoneNumberList.length>1)
      {
      let NewState=this.state.PhoneNumberList.slice(0,this.state.PhoneNumberList.length-1);
      this.setState({PhoneNumberList:[...NewState]})
      }
    }

    handlesubmit=(props)=>
    {
      props.preventDefault();
      this.setState({Status:true})
      let i=0
      let CompanyName=""
      let nbarguments=10+this.state.PhoneNumberList.length+this.state.EmailList.length
    let url="http://127.0.0.1:8000/api/AddClient"
    let PropsString=""

    for(i=0;i<nbarguments;i++)
    {
     if(i==0 &&props.target[i].value!="")
     {
       PropsString='?'+props.target[i].name+'='+props.target[i].value
     }
     else if(props.target[i].value!="")
     {    
          if(props.target[i].name=="ClientPFP")  
          {
              
          } 
          else if(props.target[i].name=="Company_Name")
          {
            CompanyName=props.target[i].value
            PropsString=PropsString+"&"+props.target[i].name+"="+props.target[i].value 
          }
          else
          {
            PropsString=PropsString+"&"+props.target[i].name+"="+props.target[i].value 
          }    
        
     }
     
    }

   const formData = new FormData();
   formData.append('ClientPFP', this.state.PFP);
   formData.append('CompanyName', CompanyName);
   const optionADDCLIENT = {
        
    method: 'POST',
    body: formData,
    // If you add this, upload won't work
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // }
  };
   fetch(url+PropsString,optionADDCLIENT );  
   
   setTimeout(() => {window.location.replace('/ManageClients')}, 2000);
      
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
let url="https://restcountries.com/v3.1/all" 
Json=this.SERVERAPICALL(url)
Json.then((result)=>{
let Countries_List=[]
result.map((Country)=>{
Countries_List.push(Country) 
}
)

this.setState({countries:Countries_List}, () => {
this.TurnoffLoadingScreen();
})

}
);

}

handleUpload = (e) =>{


  let Data=e.target.files[0]
  this.setState({PFP:Data})
 
 
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
        return ( 
          <>
          <NavBar/>
          
            <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
            
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <Image  roundedCircle={true} style={{width: '200px',height:'200px'}} src={require('./images/Client_Logo.gif')}/>

                </div>
                </div>
                
                <MDBContainer style={{marginTop:"30px"}}>
<Form onSubmit={this.handlesubmit}>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Prénom</Form.Label>
        <Form.Control required type="text" placeholder="Prénom"  name="First_Name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Nom de famille</Form.Label>
        <Form.Control required type="text" placeholder="Enter Client last name"  name="Last_Name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Adresse client</Form.Label>
        <Form.Control required type="text" placeholder="Client Adress here"  name="Adress" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <MDBRow>
      <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Nationalité du client</Form.Label>
        <Form.Select required name="C_Nationality">
          {
            this.state.countries.map((Country)=>
            {
                return(
<option>{Country.name.common}</option>
                ) 

            })
          }
          
          
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
      <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Ville</Form.Label>
        <Form.Control required type="text" placeholder="Enter City"  name="C_City" />
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
      </MDBRow>


      <MDBRow>
      
      <MDBCol size="50">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Logo d'entreprise</Form.Label>
        <Form.Control  type="file" placeholder="Enter the Company Image" onChange={this.handleUpload}  name="ClientPFP"  />  
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
        
      </MDBRow>





      <MDBRow>
      <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Nom de l'entreprise</Form.Label>
        <Form.Control required type="text" placeholder="Enter Company name"  name="Company_Name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
      <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Adresse de l'entreprise</Form.Label>
        <Form.Control required type="text" placeholder="Enter Company Adress"  name="	Company_Adress" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
      
      
      </MDBRow>

      

      <MDBRow>
      {this.state.PhoneNumberList.map((Inputlist)=>{ return(
        <MDBCol size="6">
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Numéro de téléphone no:{Inputlist}:</Form.Label>
        <Form.Control required type="text" placeholder={'Enter PhoneNumber '+Inputlist}  name={"Phone_Number_"+Inputlist}  />
        <Form.Text className="text-muted">
        
          
        </Form.Text>
      </Form.Group>
      </MDBCol>

      )
      })}
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Button variant="outline-primary" onClick={this.AddNewPhoneInput}>Ajouter</Button>{' '}
      <Button variant="outline-primary" onClick={this.RemoveNewPhoneInput}>
Retirer</Button>{' '}
      </Form.Group>
      </MDBRow>

      <MDBRow>

      {this.state.EmailList.map((Inputlist)=>{ return(
        <MDBCol size="6">
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Adresse e-mail no:{Inputlist}:</Form.Label>
        <Form.Control required type="Email" placeholder={'Enter Email Adress '+Inputlist} name={"Email_"+Inputlist} />
        <Form.Text className="text-muted">
        
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
      )
      })}
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Button variant="outline-primary" onClick={this.AddNewEmailInput}>
Ajouter</Button>{' '}
      <Button variant="outline-primary" onClick={this.RemoveNewEmailInput}>
Retirer</Button>{' '}
      </Form.Group>
      </MDBRow>
      <div class="row justify-content-center">
      <button type="submit" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">
Ajouter un client</button>
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
           La gestion des clients
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
Client ajouté avec succès!</Modal.Body>
      </Modal>
    </div>
    </>);
    }
    }
  }
 
export default AddClient;