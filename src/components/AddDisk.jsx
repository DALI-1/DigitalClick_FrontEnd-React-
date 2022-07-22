import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Image from 'react-bootstrap/Image'
import UploadDragDrop from './UploadDragDrop';
import LoadingSpinner from './LoadingSpinner';
class AddServer extends Component {
    state = {Providers:[],isLoading:true,SelectedProviderID:1  } 


    onChangeHandler = (e) => {
      const index = e.target.selectedIndex;   
        const el = e.target.childNodes[index]     
        const option =  el.getAttribute('id');
        this.state.SelectedProviderID=option;  
        
     
    }
    handlesubmit=(props)=>
    {
      props.preventDefault();
      let PropsString=""
      let i=0
      let url="http://127.0.0.1:8000/api/CreateDisk"
      for(i=0;i<6;i++)
      {
        
       if(i==0)
       {
         PropsString='?'+props.target[i].name+'='+this.state.SelectedProviderID
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
          <div class="d-flex justify-content-center" style={{margin:"10px"}}>
          <LoadingSpinner id="Spinner"/>         
      </div>
        )
       
      }
      else
      {
      const queryParams = new URLSearchParams(window.location.search);
      let srvid = queryParams.get('ServerID');
      
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
        >Disk Providers:</Form.Label>
        <Form.Select required name="DProvider_ID" onChange={this.onChangeHandler}>
          {
            this.state.Providers.map((Provider)=>
            {
                return(
<option id={Provider.DProvider_ID}>{Provider.DProvider_Company_Name}</option>
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
        >Disk Model:</Form.Label>
        <Form.Control required name="Disk_Model" type="text"  placeholder="Enter Disk Model" />
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Disk Total Size:</Form.Label>
        <Form.Control required name="Total_Size" type="number"   placeholder="Enter Disk Size " />
        <Form.Text className="text-muted">     
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        
        <Form.Control  name="Server_ID" type="hidden" value={srvid} />
        <Form.Text className="text-muted">     
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        
        <Form.Control  name="Disk_IMG_URL" type="hidden" value="/Images/DefaultDiskIMG" />
        <Form.Text className="text-muted">     
        </Form.Text>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
        style={{color: 'black'}}
        >Disk Type:</Form.Label>
        <Form.Select required name="Disk_Type">
          <option>HDD</option>
          <option>SSD</option>
          <option>M.2</option>
        </Form.Select>
       
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>


      
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
}
 
export default AddServer;