import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
class AddVirtualMachine extends Component {
    state = {  } 
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

       props.preventDefault();
       let PropsString=""
       let i=0
       let url="http://127.0.0.1:8000/api/AddOSProvider"
       for(i=0;i<1;i++)
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
          <div class="shadow  p-5  mb-5 mt-5 bg-light rounded" >
                <div class="shadow  p-1  mb-1  bg-light rounded">
                <div class="d-flex justify-content-center mb-4">
                <img roundedCircle={true} style={{width: '150px',height:'150px'}} src={require('./images/Default_OS_Logo.png')} alt="Category"/>
                </div>
                </div>



                <MDBContainer style={{marginTop:"30px"}}>

<Form onSubmit={this.handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >OS Company name:</Form.Label>
        <Form.Control type="text" placeholder="OS Company name here" 
        name="OperatingSystem_Company_Name"/>
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
    

      


      <div class="row justify-content-center">
      <button  type="submit" class="btn btn-outline-primary btn-rounded" data-mdb-ripple-color="dark">Add OS Company</button>
</div>
      
    </Form>
    </MDBContainer>




    </div>

        

        );
    }
}
 
export default AddVirtualMachine;