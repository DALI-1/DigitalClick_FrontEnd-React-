import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import UploadDragDrop from './UploadDragDrop';
import Image from 'react-bootstrap/Image'
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
class AddClient extends Component {
    state = { 
      PhoneNumberList: [0],
      EmailList: [0],
      isLoading:true,
      countries:null
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

  const fd=new FormData()
  fd.append(
   "ClientPFP",e.target.files[0] 
  )
    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/api/UploadIMG",
   
      data: fd,
  }).then(res => {
    // listarChamados.innerHTML = res.data;
    console.log(res);
})
.catch(err => {
    console.error(err);
})
  console.log("Posted!")
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
                <Image  roundedCircle={true} style={{width: '200px',height:'200px'}} src={require('./images/Client_Logo.gif')}/>

                </div>
                </div>
                
                <MDBContainer style={{marginTop:"30px"}}>
<Form onSubmit={this.handlesubmit}>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >First name:</Form.Label>
        <Form.Control required type="text" placeholder="Enter Client Name"  name="First_Name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Last name:</Form.Label>
        <Form.Control required type="text" placeholder="Enter Client last name"  name="Last_Name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      <MDBRow>
      <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Client Nationality:</Form.Label>
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
        >City:</Form.Label>
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
        >Company Logo:</Form.Label>
        <Form.Control required type="file" placeholder="Enter the Company Image"  name="ClientPFP" onChange={this.handleUpload} />  
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
        >Company Name:</Form.Label>
        <Form.Control required type="text" placeholder="Enter Company name"  name="Company_Name" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
      <MDBCol size="6">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Company Adress:</Form.Label>
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
        >Phone number {Inputlist}:</Form.Label>
        <Form.Control required type="text" placeholder={'Enter PhoneNumber '+Inputlist}  name={"Phone_Number_"+Inputlist}  />
        <Form.Text className="text-muted">
        
          
        </Form.Text>
      </Form.Group>
      </MDBCol>

      )
      })}
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Button variant="outline-primary" onClick={this.AddNewPhoneInput}>Add</Button>{' '}
      <Button variant="outline-primary" onClick={this.RemoveNewPhoneInput}>Remove</Button>{' '}
      </Form.Group>
      </MDBRow>

      <MDBRow>

      {this.state.EmailList.map((Inputlist)=>{ return(
        <MDBCol size="6">
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Email Adress {Inputlist}:</Form.Label>
        <Form.Control required type="Email" placeholder={'Enter Email Adress '+Inputlist}  name={"Email_"+Inputlist} />
        <Form.Text className="text-muted">
        
          
        </Form.Text>
      </Form.Group>
      </MDBCol>
      )
      })}
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Button variant="outline-primary" onClick={this.AddNewEmailInput}>Add</Button>{' '}
      <Button variant="outline-primary" onClick={this.RemoveNewEmailInput}>Remove</Button>{' '}
      </Form.Group>
      </MDBRow>



      


      





      
      
      <div class="row justify-content-center">
      <button type="submit" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">Add Client</button>
</div>

      
      

      
    </Form>
    </MDBContainer>
    




    </div>

        

        );
    }
    }
  }
 
export default AddClient;